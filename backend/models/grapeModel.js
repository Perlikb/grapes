const sql = require("../connection");

//Class constructor
const Grape = function (grape) {
  this.name = grape.name;
  this.color = grape.color;
  this.wine = grape.wine;
};

Grape.create = (grape, result) => {
  sql.query("INSERT INTO grape_types SET ?", grape, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // console.log("created grape: ", { id: res.insertId, ...grape });
    result(null, { id: res.insertId, ...grape });
  });
};

Grape.list = (name, color, wine, page, numPerPage, result) => {
  let myLine;
  if (name) {
    myLine = `SELECT * FROM  grape_types WHERE name REGEXP ?`;
    sql.query(myLine, [name], (err, res) => {
      if (err) {
        console.log("error", err);
        result(null, err);
        return;
      }
      // console.log(res);
      result(null, res);
    });
  } else if (color) {
    console.log(color);
    myLine = `SELECT * FROM  grape_types WHERE color REGEXP ?`;
    sql.query(myLine, [color], (err, res) => {
      if (err) {
        console.log("error", err);
        result(null, err);
        return;
      }
      // console.log(res);
      result(null, res);
    });
  } else if (wine) {
    myLine = `SELECT * FROM  grape_types WHERE wine REGEXP ?`;
    sql.query(myLine, [wine], (err, res) => {
      if (err) {
        console.log("error", err);
        result(null, err);
        return;
      }
      // console.log(res);
      result(null, res);
    });
  } else {
    myLine = `SELECT * , count(*) OVER() AS full_count FROM grape_types ORDER BY id ASC LIMIT ? OFFSET ?`;
    console.log(myLine);
    sql.query(myLine, [numPerPage, page * numPerPage], (err, res) => {
      if (err) {
        console.log("error", err);
        result(null, err);
        return;
      }
      // console.log(res);
      result(null, res);
    });
  }
};

Grape.findById = (id, result) => {
  sql.query(`SELECT * FROM grape_types WHERE id = ?`, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found grape: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Grape with the id ???
    result({ kind: "not_found" }, null);
  });
};

Grape.remove = (id, result) => {
  sql.query(`DELETE FROM grape_types WHERE id = ?`, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted grapetype with id: ", id);
    result(null, res);
  });
};

Grape.updateItem = (id, grapeData, result) => {
  sql.query(
    "UPDATE grape_types SET name = ?, color = ?, wine = ? WHERE id = ?",
    [grapeData.name, grapeData.color, grapeData.wine, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found grape with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated grape: ", { id: id, ...grapeData });
      result(null, { id: id, ...grapeData });
    }
  );
};

module.exports = Grape;
