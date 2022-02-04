const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mysql = require("mysql");

//Import routes
const Route = require("./routes/routes");

//Can post from frontend
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//Middlewares
app.use(cors(corsOptions));
app.use(express.json());

//Initialize database if it doesn't exist
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

//Route middleware
app.use("/api", Route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
