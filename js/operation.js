/**
 * Required External Modules
 */

 const { Console } = require('console');
const express = require('express');
 const path = require("path");
const { nextTick } = require('process');
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
  var sql = "SELECT * FROM tram_untec WHERE ID_LOT = ?";
  var result;

  result = await query(sql, req.body.id_lot);
  res.status('200').json(result);
})

router.post("/home/:operation/load_tram", async (req, res) => {
  var sql = "SELECT SECTION FROM tram_untec";
  var result;

  result = await query(sql);
  res.status('200').json(result);
})

router.delete("/home/:operation/del_lot", async (req, res) => {
  var sql = "DELETE FROM lot WHERE ID = ?";
  var result;

  result = await query(sql, req.body.id_lot);
  res.status('200').json(result);
})

router.post("/home/:operation/add_lot", async (req, res) => {
  var sql = "INSERT INTO lot (ID, ID_OP) VALUES (?, ?)";
  var result;

  result = await query(sql, [req.body.id_lot, req.body.id_op]);
  res.status('200').json(result);
})

router.post("/home/:operation/update_lot", async (req, res) => {
  var sql = "UPDATE lot SET NOM = ?, NUMERO = ?, ENTREPRISE = ?, DATE = ? WHERE ID = ?";
  var result;

  result = await query(sql, [req.body.nom, req.body.numero, req.body.entreprise, req.body.date, req.body.id_lot]);
  res.status('200').json(result);
})

router.get("/home/:operation", (req, res) => {
  res.render('operation');
})

 /**
   * Server Activation
   */


 module.exports = router;