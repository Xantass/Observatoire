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

router.post("/home/:operation/load", async (req, res) => {
  var sql = "SELECT * FROM operation WHERE NOM_OP = ?"
  var result;

  result = await query(sql, req.body.operation);
  console.log(result);
  res.status('200').json(result[0]);
})

router.get("/home/:operation", (req, res) => {
  res.render('operation');
})

 /**
   * Server Activation
   */


 module.exports = router;