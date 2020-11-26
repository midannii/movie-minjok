const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require("body-parser"); // request body parsing 미들웨어
const cookieParser = require("cookie-parser");
// const {auth} = require('./middleware/auth.js');

const config = require("./config/key");

// connect with mysql
const mysql = require('mysql');
const dbconfig = require('./config/DB.js');
const conn = mysql.createConnection(dbconfig);

const app = express();

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

// for login, logout
const session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const MySQLStore = require('express-mysql-session')(session);

// middleware 사용을 위한 configuration
app.use(session({
  secret: 'spemnv2395@#lsore*&@#oso3$%^#&#$@#$!',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore({
    host: 'localhost', // 서버주소(domain)
    port: 3306, // 서버상의 mysql 포트 (default는 3306임)
    user: 'root',
    password: 'newlife4829', // mysql 비밀번호
    database: 'o2' // mysql 서버에서 생성한 database 이름
  })
}));

app.use(passport.initialize()); // passport 사용 하도록 세팅
app.use(passport.session()); // passport 사용 시 session을 활용

/*
// connect with mongoDB
// https://www.youtube.com/watch?v=TTmfGULw0Uw&list=PL9a7QRYt5fqly7BrCxOS71BqLLb9OeXKd&index=2
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true}).then(() => console.log('DB connected'))
                        .catch(err => console.error(err));
*/



/*
app.get("/api/users/auth", auth, (req, res) =>{
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    nickname: req.user.nickname,
    pw: req.user.pw,
    lastname: req.user.lastname,
    birth: req.user.birth
    // role: req.user.role
    //user_id, nickname, email, name, pw (,lastname, birth )
  })
})


// 회원가입을 위해 register router 만들기
// add info with postman: https://www.youtube.com/watch?v=FW7MfF4RDjg&list=PL9a7QRYt5fqly7BrCxOS71BqLLb9OeXKd&index=6
app.post('/api/users/register', (req,res)=> {
  const user = new User(req.body)

  // 정보 저장 전에, password를 hash 과정 거쳐서 저장
  user.save((err, userData) => {
    if(err) return res.json({success: false, err});
    return res.status(200);
  })
});
*/

app.get('/', function(req, res){ // 뷰 rendering
            res.render('index');
});

// 회원가입 & password 암호화 (bcrypt)
app.post('/api/user', function(req, res){

  var ID = req.body.user_Id;
  var NICK = req.body.user_nick;
  var PW1 = req.body.user_pw1;
  var PW2 = req.body.user_pw2;
  var NAME = req.body.user_name;
  var EMAIL = req.body.user_email;

  if(PW1 === PW2){
      bcrypt.hash(PW1, null, null, function(err, hash){
      var sql = 'INSERT INTO user(user_id, nickname, pw, name, email) VALUES(?, ?, ?, ?, ?)';
      var params = [ID, NICK, hash, NAME, EMAIL];
      conn.query(sql, params, function(err, rows){
            if(err){
                console.log(err);
                res.status(500).send("ERROR");
            }
            console.log('success sign-up!');
            console.log(hash);
            res.redirect('/join');         //회원가입 버튼을 누르고 나서 redirect로 경로를
        });                                    //  /join 으로 설정을 함.
      })
    }
});


/*
// login
app.post('/api/user/login', (req, res) => {
  // find the e-email
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user)
    return res.json({
      loginSuccess:false, message: "No user matches"
    })
  })
  // compare Password
  user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch){
      return res.json({  loginSuccess:false, message: "wrong password"})
    }
  })
  //generateToken
  user.generateToken((err, user) => {
    if(err) return res.status(400).send(err);
    res.cookie("x_auth", user.tocken).status(200).json({
      loginSuccess: true});
  })
});
*/

// login
app.post('/api/user/login', (req, res) => {
  var loginID = req.body.login_id;                  // 경로로 이동할 것이고 login_user 경로가 된다면 app.post를 실행함 뜻
  var loginPW = req.body.login_pw;                        // input 의 id,pw를 입력 후에 데이터를 서버로 보내는 과정에서
  var loginsql = 'SELECT * FROM topic WHERE ID = ?';      // 난 express 모듈을 사용하기 때문에, bodyParser를 이용함

  conn.query(loginsql, loginID, function (err, rows, fields) {
        if (err) {
                 console.log('err :' + err);
        } else {
                console.log(rows);
                if (rows[0]!=undefined) {
                        if (!bcrypt.compareSync(loginPW, rows[0].PW)) {     // 비밀번호는 bcrypt를 이용한 암호화를 했으
                                console.log('패스워드가 일치하지 않습니다');  //므로, bcrypt.compareSync 명령어실행
                        } else {
                                console.log('로그인 성공');
                                req.session.name = rows[0].name;
                                req.session.save(function(){
                                  return res.redirect('/welcome');
                                })
                                //res.redirect('/welcome');
                        }
                } else {
                        console.log(rows[0]);
                        console.log('해당 유저가 없습니다');
                }
        }
        })

});


/*
//logout
app.get("/api/user/logout", auth, (req,res) =>{
  User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, doc) =>{
    if(err) return res.json({'success':false, err})
    return res.status(200).send({
      success:true
    })
  })
})
*/

// logout
app.get('/api/user/logout', (req, res) => {
  req.logout();
  req.session.save(function(){
    res.redirect('/');
  });
});

app.listen(5000);
