const mysql = require("mysql");

//Connecting to db
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "new_grapes_db",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = connection;
