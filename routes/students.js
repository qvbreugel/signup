var express = require("express");
var router = express.Router();
var mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  database: "students"
});

function getConnection() {
  return pool;
}

router.post("/login", function(req, res, next) {
  const leerlingnummer = req.body.leerlingnummer;
  const geboortedatum = req.body.geboortedatum;

  const connection = getConnection();
  const queryString =
    "SELECT Roepnaam,Achternaam,registered FROM leerlingen WHERE Leerlingnummer = ? AND Geboortedatum = ?";
  connection.query(queryString, [leerlingnummer, geboortedatum], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    console.log(typeof results[0]);
    if (typeof results[0] === "undefined") {
      res.send({ error: true });
    } else {
      res.send(results[0]);
    }
  });
});

router.get("/beroepen", function(req, res, next) {
  const connection = getConnection();
  const queryString = "SELECT * FROM beroepen WHERE NOT vrije_plaatsen=0";
  connection.query(queryString, function(error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.send(results);
  });
});

router.post("/gegevens", function(req, res, next) {
  const leerlingnummer = req.body.leerlingnummer;

  const connection = getConnection();
  const queryString = "SELECT * FROM leerlingen WHERE Leerlingnummer=?";
  connection.query(queryString, [leerlingnummer], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    console.log(results);
    res.send(results);
  });
});

router.post("/keuze", function(req, res, next) {
  const keuze_1 = req.body.keuze_1;
  const keuze_2 = req.body.keuze_2;
  const keuze_3 = req.body.keuze_3;
  const leerlingnummer = req.body.leerlingnummer;

  const connection = getConnection();
  const queryString =
    "UPDATE leerlingen SET Beroep_1 = ?, Beroep_2 = ?, Beroep_3 = ? WHERE Leerlingnummer = ?";
  connection.query(
    queryString,
    [keuze_1, keuze_2, keuze_3, leerlingnummer],
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

router.post("/plaatsen", function(req, res, next) {
  const leerlingnummer = req.body.leerlingnummer;

  const connection = getConnection();
  const queryString =
    "SELECT Beroep_1, Beroep_2, Beroep_3 FROM leerlingen  WHERE Leerlingnummer = ?";

  const setRegistered =
    "UPDATE leerlingen SET registered = TRUE WHERE Leerlingnummer = ?";
  connection.query(setRegistered, [leerlingnummer], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    connection.query(queryString, [leerlingnummer], function(
      error,
      results,
      fields
    ) {
      if (error) throw error;
      console.log(results);
      const keuze_1 = results[0]["Beroep_1"];
      const keuze_2 = results[0]["Beroep_2"];
      const keuze_3 = results[0]["Beroep_3"];

      const retreiveSpaces =
        "SELECT vrije_plaatsen FROM beroepen WHERE beroep = ?";

      const decreaseSpaces =
        "UPDATE beroepen SET vrije_plaatsen = ? WHERE beroep = ?";

      connection.query(retreiveSpaces, [keuze_1], function(
        error,
        results,
        fields
      ) {
        if (error) throw error;
        const decreasedSpaces_1 = results[0]["vrije_plaatsen"] - 1;
        connection.query(decreaseSpaces, [decreasedSpaces_1, keuze_1], function(
          error,
          results,
          fields
        ) {
          if (error) throw error;
          connection.query(retreiveSpaces, [keuze_2], function(
            error,
            results,
            fields
          ) {
            if (error) throw error;
            const decreasedSpaces_2 = results[0]["vrije_plaatsen"] - 1;
            connection.query(
              decreaseSpaces,
              [decreasedSpaces_2, keuze_2],
              function(error, results, fields) {
                if (error) throw error;
                connection.query(retreiveSpaces, [keuze_3], function(
                  error,
                  results,
                  fields
                ) {
                  if (error) throw error;
                  const decreasedSpaces_3 = results[0]["vrije_plaatsen"] - 1;
                  connection.query(
                    decreaseSpaces,
                    [decreasedSpaces_3, keuze_3],
                    function(error, results, fields) {
                      if (error) throw error;
                      res.send(results);
                    }
                  );
                });
              }
            );
          });
        });
      });
    });
  });
});

module.exports = router;
