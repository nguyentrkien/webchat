var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kien1342001",
    database: "serverchat"
  });
  module.exports = con;