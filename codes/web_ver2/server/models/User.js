const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0
    },
    image: String,
    token : {
        type: String,
    },
    // token 유효기간
    tokenExp :{
        type: Number
    }
})

// hash password before save
userSchema.pre('save', function( next ) {
    var user = this; // this 는 userSchema를 의미

    if(user.isModified('password')){
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){ //Salt 생성
            if(err) return next(err);
            // 만든 salt로 hash 거침
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
});

// compare password for login
userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

// make token
userSchema.methods.generateToken = function(cb) {
    var user = this;
    console.log('user',user);
    console.log('userSchema', userSchema);
    // sign
    var token =  jwt.sign(user._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

// token을 이용해 find

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }
