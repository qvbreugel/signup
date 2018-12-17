var express = require("express");
var router = express.Router();
var mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "students",
  port: 8889
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
