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

router.get("/indice_bt", async (req, res) => {
  var sql = "SELECT * FROM session WHERE TOKEN = ?";
  var result;

  result = await query(sql, req.cookies['connect.sid'].substring(2, 34));
  if (result[0] == undefined) {
    res.redirect('/');
  }
  else {
    res.render('indice_bt');
  }
})

router.post("/indice_bt/log_out", async (req, res) => {
  var sql = "DELETE FROM session WHERE TOKEN = ?";
  var result;

  result = await query(sql, req.cookies['connect.sid'].substring(2, 34));
  res.status('200').json(result);
})

router.post("/indice_bt/get_indice", async (req, res) => {
  var sql = "SELECT * FROM indice_bt";
  var result;

  result = await query(sql);
  res.status('200').json(result);
})

router.post("/indice_bt/add_indice", async (req, res) => {
  var sql = "INSERT INTO indice_bt (BT_DATE, BT_INDICE, BT_PARUTION) VALUES (?, ?, ?)";
  var result;

  result = await query(sql, [req.body.date_bt, req.body.indice, req.body.date_parution]);
  res.status('200').json(result);
})

 /**
   * Server Activation
   */

 module.exports = router;