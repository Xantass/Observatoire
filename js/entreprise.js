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

router.get("/entreprise", async (req, res) => {
  var sql = "SELECT * FROM session WHERE TOKEN = ?";
  var result;

  result = await query(sql, req.cookies['connect.sid'].substring(2, 34));
  if (result[0] == undefined) {
    res.redirect('/');
  }
  else {
    res.render('entreprise');
  }
})

router.post("/entreprise/get_entreprise", async (req, res) => {
  var sql = "SELECT * FROM entreprise";
  var result;

  result = await query(sql);
  res.status('200').json(result);
})

router.post("/entreprise/add_entreprise", async (req, res) => {
  var sql = "INSERT INTO entreprise (NOM, ADRESSE) VALUES (?, ?)";
  var result;

  result = await query(sql, [req.body.nom, req.body.adresse]);
  res.status('200').json(result);
})

router.post("/entreprise/delete_entreprise", async (req, res) => {
  var sql = "SELECT * FROM lot WHERE ENTREPRISE = ?";
  var result;

  result = await query(sql, [req.body.nom]);
  if (result[0] != undefined)
    res.status('200').json(result);
  else {
    sql = "DELETE FROM entreprise WHERE ID = ?"
    await query(sql, [req.body.id]);
    res.status('200').json(result);
  }
})

 /**
   * Server Activation
   */

module.exports = router;