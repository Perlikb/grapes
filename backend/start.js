const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mysql = require("mysql");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//Middlewares
app.use(cors(corsOptions));
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
});

con.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + con.threadId);

  con.query(
    "CREATE DATABASE if not exists new_grapes_db",
    function (err, result) {
      if (err) throw err;
      console.log("Database created");
    }
  );
  con.end(function (err) {
    if (err) {
      return console.log(err.message);
    }
  });
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "new_grapes_db",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/tables", (req, res) => {
  let createTables = `CREATE TABLE if not exists grape_types(
    id int primary key auto_increment,
    name varchar(255)not null,
    color varchar(255)not null,
    wine varchar(255)
)`;
  connection.query(createTables, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    res.send("Table created");
  });
});

app.post("/insert", (req, res) => {
  console.log(req.body);
  const sqlInsert = `INSERT INTO grape_types (name, color, wine) VALUES ("${req.body.name}", "${req.body.color}", "${req.body.wine}")`;
  connection.query(sqlInsert, (err, result) => {
    res.send("Inserted");
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
