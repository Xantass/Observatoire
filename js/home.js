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

router.get("/home", (req, res) => {
  res.render('home');
})

router.get("/home:id", async (req, res) => {
  console.log("IM HERE");
  var sql = "SELECT * FROM operation"
  var value = [];
  var content_operation;
  content_operation = await query(sql);
  for (element of content_operation) {
    value.push(await get_value_operation(element, 1));
  }
  //console.log(value);
  res.status('200').json(value);
})

 /**
   * Server Activation
   */

  async function get_value_operation(element, id) {
      var value = [];

      value.push(get_name(element));
      value.push( await get_createur(id));
      value.push(element.DATE_AO);
      value.push(get_maitre(element.NOM_CLIENT));
      return value;
  };

  async function get_createur(id) {
      var temp = await query("SELECT identifiant FROM user WHERE id=?", id);
      return temp[0].identifiant;
  };

  function get_name(content_operation) {
      return content_operation.NOM_OP;
  };

  function get_maitre(value) {
    return value;
};


 module.exports = router;