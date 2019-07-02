var express = require("express");
var router = express.Router();
var mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "signup",
  port: 3306
});

function getConnection() {
  return pool;
}

/* GET users listing. */
router.get("/students", function(req, res, next) {
  const connection = getConnection();
  connection.query("SELECT * from leerlingen", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

module.exports = router;
