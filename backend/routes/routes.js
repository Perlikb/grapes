const router = require("express").Router();
const sql = require("../connection");
const grapes = require("../controllers/grape.controller");

router.get("/", (req, res) => {
  res.send("Hi");
});

router.get("/tables", (req, res) => {
  let createTables = `CREATE TABLE if not exists grape_types(
      id int primary key auto_increment,
      name varchar(255)not null,
      color varchar(255)not null,
      wine varchar(255)
  )`;
  sql.query(createTables, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    res.send("Table created");
  });
});

router.post("/insert", grapes.create);
router.get("/listgrapes", grapes.listAll);
router.get("/listgrapes/:id", grapes.findOne);
router.delete("/deletegrape/:id", grapes.deleteOne);
router.patch("/updateitem/:id", grapes.updateOne);

module.exports = router;
