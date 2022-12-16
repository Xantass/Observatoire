/**
 * Required External Modules
 */

 const express = require('express');
 const query = require('./db.js').query;

 /**
   * App Variables
   */

 const router = global.router;
 /**
   *  App Configuration
   */

 /**
   * Routes Definitions
   */

router.get("/client", async (req, res) => {
  var sql = "SELECT * FROM session WHERE TOKEN = ?";
  var result;

  result = await query(sql, req.cookies['connect.sid'].substring(2, 34));
  if (result[0] == undefined) {
    res.redirect('/');
  }
  else {
    res.render('client');
  }
})

router.post("/client/get_client", async (req, res) => {
  var sql = "SELECT * FROM maitre_ouvrage";
  var result;

  result = await query(sql);
  res.status('200').json(result);
})

router.post("/client/add_client", async (req, res) => {
  var sql = "INSERT INTO maitre_ouvrage (NOM, ADRESSE, ABREVIATION) VALUES (?, ?, ?)";
  var result;

  result = await query(sql, [req.body.nom, req.body.adresse, req.body.abreviation]);
  res.status('200').json(result);
})

router.post("/client/delete_client", async (req, res) => {
  var sql = "INSERT INTO maitre_ouvrage (NOM, ADRESSE, ABREVIATION) VALUES (?, ?, ?)";
  var result;

  result = await query(sql, [req.body.nom, req.body.adresse, req.body.abreviation]);
  res.status('200').json(result);
})

 /**
   * Server Activation
   */

module.exports = router;