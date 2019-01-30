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

router.post("/login", function(req, res, next) {
  const leerlingnummer = req.body.leerlingnummer;
  const geboortedatum = req.body.geboortedatum;

  const connection = getConnection();
  const queryString =
    "SELECT Roepnaam,Achternaam FROM leerlingen WHERE Leerlingnummer = ? AND Geboortedatum = ?";
  connection.query(queryString, [leerlingnummer, geboortedatum], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    console.log(results);
    res.send(results);
  });
});

module.exports = router;
