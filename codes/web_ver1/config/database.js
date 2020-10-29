/*
module.exports = {
  host     : 'localhost',
  user     : 'root',
  password : 'midaniya26',
  database : 'movie'
};
*/

var mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'midaniya26',
  database : 'movie'
});
connection.connect();

module.exports = connection;
