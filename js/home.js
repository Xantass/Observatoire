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

router.post("/home:id", async (req, res) => {
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

router.post("/home/rename", async (req, res) => {
  var sql = "UPDATE operation SET NOM_OP = ? WHERE ID = ?";
  var value = [req.body.operation, req.body.id];

  await query(sql, value);
})

router.post("/home/duplicate", async (req, res) => {
  var sql = "SELECT * FROM operation WHERE ID = ?";
  var result;
  var value = [req.body.id];
  var arg = new Array();

  result = await query(sql, value);
  arg.push(result[0].ID_OP);
  arg.push(result[0].NOM_OP + " (COPY)");
  arg.push(result[0].NOM_SITE);
  arg.push(result[0].CATEGORIE_SITE);
  arg.push(result[0].SOUS_CATEGORIE_SITE);
  arg.push(result[0].NOM_CLIENT);
  arg.push(result[0].COMPOSITION_SITE);
  arg.push(result[0].IMPORTANCE);
  arg.push(result[0].NBR_LOGEMENT);
  arg.push(result[0].ADRESSE);
  arg.push(result[0].DESCRIPTION);
  arg.push(result[0].DATE_AO);
  arg.push(result[0].TYPOLOGIE_OPERATION);
  arg.push(result[0].TYPOLOGIE_MARCHE2);
  arg.push(result[0].PERF_THERMIQUE);
  arg.push(result[0].PERF_ENVIRONNEMENTALE);
  arg.push(result[0].NIVEAU_PERF);
  arg.push(result[0].SU);
  arg.push(result[0].SHAB);
  arg.push(result[0].SDO);
  arg.push(result[0].SDP);
  arg.push(result[0].PARCELLE);
  arg.push(result[0].ESPACE_VERT);
  arg.push(result[0].S_MINERALE);
  arg.push(result[0].CLOTURE);
  arg.push(result[0].ENTREE_SITE);
  arg.push(result[0].EMPRISE_SOL);
  arg.push(result[0].S_TOITURE);
  arg.push(result[0].S_FACADE);
  arg.push(result[0].S_VITRAGE);
  arg.push(result[0].MONTANT_TRAVAUX);
  arg.push(result[0].MONTANT_BDD_UNTEC);
  arg.push(result[0].TAUX_TVA);
  arg.push(result[0].LATITUDE);
  arg.push(result[0].LONGITUDE);
  sql = "INSERT INTO `observatoire`.`operation` (`ID_OP`, `NOM_OP`, `NOM_SITE`, `CATEGORIE_SITE`, `SOUS_CATEGORIE_SITE`, `NOM_CLIENT`, `COMPOSITION_SITE`, `IMPORTANCE`, `NBR_LOGEMENT`, `ADRESSE`, `DESCRIPTION`, `DATE_AO`, `TYPOLOGIE_OPERATION`, `TYPOLOGIE_MARCHE2`, `PERF_THERMIQUE`, `PERF_ENVIRONNEMENTALE`, `NIVEAU_PERF`, `SU`, `SHAB`, `SDO`, `SDP`, `PARCELLE`, `ESPACE_VERT`, `S_MINERALE`, `CLOTURE`, `ENTREE_SITE`, `EMPRISE_SOL`, `S_TOITURE`, `S_FACADE`, `S_VITRAGE`, `MONTANT_TRAVAUX`, `MONTANT_BDD_UNTEC`, `TAUX_TVA`, `LATITUDE`, `LONGITUDE`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  result = await query(sql, arg);
})

router.post("/home/delete", async (req, res) => {
  var sql = "DELETE FROM operation WHERE ID = ?";
  var value = [req.body.id];

  await query(sql, value);
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
      value.push(element.ID);
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