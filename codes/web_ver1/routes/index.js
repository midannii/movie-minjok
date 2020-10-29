const express = require('express');
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'midaniya26',
  database : 'movie'
});


connection.connect();

connection.query('SELECT * from movie', (error, rows, fields) => {
  if (error) throw error;
  console.log('User info is: ', rows[2]['title']);
});



// 추가
const db = require('/Users/midan/web-for-mm/config/database.js');
const app = express();

// configuration =========================
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  //res.send("Let's start ~ This is my project");
  db.query('SELECT * FROM movie', req.query.num,(err, rows, fields) => {
      res.send('the name of movie: '+rows[0]['title']);
    });

});








app.get('/users', (req, res) => {
  connection.query('SELECT * from movie', (error, rows, fields) => {
    if (error) throw error;
    console.log('First movie of list is: ', rows[0]['title']);
    res.send(rows[0]);
  });
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

connection.end();
