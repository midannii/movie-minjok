// connect with mysql
var mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'midaniya26',
  database : 'webs'
});

// print messages
connection.connect();
module.exports = connection;


// about member database
connection.query('CREATE TABLE user( user_id INT(10) NOT NULL AUTO_INCREMENT,nickname VARCHAR(20) NOT NULL UNIQUE,email VARCHAR(40) NOT NULL UNIQUE,name VARCHAR(20) NOT NULL,lastname varchar(20),birth datetime,pw varchar(50) NOT NULL,primary key(user_id));')
// CREATE TABLE user(
//  user_id INT(10) NOT NULL AUTO_INCREMENT,
//  nickname VARCHAR(20) NOT NULL UNIQUE,
//  email VARCHAR(40) NOT NULL UNIQUE,
//  name VARCHAR(20) NOT NULL,
//  lastname varchar(20),
//  pw varchar(50) NOT NULL,
//  birth datetime,
//  primary key(user_id)
// );
