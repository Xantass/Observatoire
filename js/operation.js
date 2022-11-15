/**
 * Required External Modules
 */

 const express = require('express');
 const path = require("path");
 const connection = require('./db.js').connection;
 const query = require('./db.js').query;
 const util = require('util');

 /**
   * App Variables
   */

 const app = express();
 const router = global.router;
 /**
   *  App Configuration
   */

 /**
   * Routes Definitions
   */

router.post("/home/:operation/load_info_generale", async (req, res) => {
  var sql = "SELECT * FROM operation WHERE NOM_OP = ?"
  var result;

  result = await query(sql, req.body.operation);
  res.status('200').json(result[0]);
})

router.post("/home/:operation/load_info_lot", async (req, res) => {
  var sql = "SELECT * FROM lot WHERE ID_OP = ?"
  var result;

  result = await query(sql, req.body.id);
  res.status('200').json(result);
})

router.post("/home/:operation/get_max_id_lot", async (req, res) => {
  var sql = "SELECT MAX (ID) FROM lot";
  var result;

  result = await query(sql);
  res.status('200').json(result);
})

router.post("/home/:operation/get_article", async (req, res) => {
  console.log("req: " + req.body.id_lot)
  var sql = "SELECT * FROM tram_untec WHERE ID_LOT = ?";
  var result;

  result = await query(sql, req.body.id_lot);
  console.log(result);
  res.status('200').json(result);
})

router.post("/home/:operation/load_tram", async (req, res) => {
  var sql = "SELECT SECTION FROM tram_untec";
  var result;

  result = await query(sql);
  res.status('200').json(result);
})

router.get("/home/:operation", (req, res) => {
  res.render('operation');
})

 /**
   * Server Activation
   */


 module.exports = router;