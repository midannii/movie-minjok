
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var mysql = require('mysql');
var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'dlekdms97',
  database:'movie_minjok'
});
db.connect();
 
function templateHTML(title, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">Home</a></h1>
    <a href="/create">회원가입</a>
    <p></p>
    <a href="/login">로그인</a>
    <p></p>
    ${body}
  </body>
  </html>
  `;
}
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      var title='Home';
      var body='';
      var template=templateHTML(title,body);
      response.end(template);
    } 
    else if(pathname === '/create'){
        var title = 'create';
        var template = templateHTML(title, `
          <form action="http://localhost:3000/create_process" method="post">
            <p><input type="text" name='id' placeholder="id"></p>
            <p>
              <input type='password' name='pw' placeholder='password'>
            </p>
            <p>
              <input type="text" name='email' placeholder='email'>
              <select name="mail">
                <option value='naver'>@ naver.com</option>
                <option value='daum'>@ daum.net</option>
                <option value='gmail'>@ gmail.com</option>
              </select>
            </p>
            <p>
              <input type="submit" value='회원가입'>
            </p>
          </form>
        `);
        response.end(template);
    } 
    else if(pathname === '/create_process'){
      var title='success';
      var body = '<p>회원가입 성공</p><p> 로그인 하세요!</p>';
      var template=templateHTML(title,body);
      var body='';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;     
          var pw = post.pw;
      var sql = 'INSERT INTO member (member_id, pw) values (?, ?)';
      var params = [id, pw];
    
      db.query(sql, params, function(err, rows, fields) {
        if(err)
          console.log(err);
        else {
          console.log(rows);
        }
      });
      });
      
      response.end(template);
    } 
    else if(pathname === '/login'){
      var title = 'login';
      var template = templateHTML(title, `
        <form action="http://localhost:3000/login_process" method="post">
          <p><input type="text" name='id' placeholder="id"></p>
          <p>
            <input type='password' name='pw' placeholder='password'>
          </p>
          <p>
            <input type="submit" value='로그인'>
          </p>
        </form>
      `);
      response.end(template);
    }
    else if(pathname === '/login_process'){
      var body='';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;    
          var pw = post.pw;
      var sql = 'select * from member where member_id=?';
      var params = [id];
    
      db.query(sql, params, function(err, rows, fields) {
        var member=rows[0];
        if(member.pw==pw){
          var title='login_success';
          var body = '<p>로그인성공!</p>';
          var template=templateHTML(title,body);
          response.end(template);
        }
        else{
          var title='login_fail';
          var body = '<p>로그인실패!</p>';
          var template=templateHTML(title,body);
          response.end(template);
        }
        
      });
    });
   
    }
    else {
      response.writeHead(404);
      response.end('Not found');
    }
 
 
 
});
app.listen(3000);