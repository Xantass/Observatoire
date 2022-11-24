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

router.post("/home/:operation/update_op", async (req, res) => {
  var sql = "UPDATE operation SET NOM_OP = ?, NOM_CLIENT = ?, NOM_SITE = ?, CATEGORIE_SITE = ?, SOUS_CATEGORIE_SITE = ?, COMPOSITION_SITE = ?, LOCALISATION = ?, ADRESSE = ?, LONGITUDE = ?, LATITUDE = ?, DATE_AO = ?, TYPOLOGIE_MARCHE2 = ?, TYPOLOGIE_OPERATION = ?, NBR_ELEVE = ?, NBR_CLASSE = ?, NBR_SALLE = ?, NBR_LOGEMENT = ?, NBR_BUREAUX = ?, NBR_CHAMBRE = ?, NBR_COMMERCE = ?, NBR_PARKING_INFRA = ?, NBR_PARKING_INT_SUPERSTRUCT = ?, NBR_PARKING_EXT = ?, S_LOCAUX_TECHNIQUE = ?, S_GARAGE_LOCAUX_ANNEXES = ?, SHAB = ?, SU = ?, SDO = ?, SDP = ?, NBR_NIV_INFRA = ?, NBR_NIV_SUPERSTRUCT = ?, PARCELLE = ?, ESPACE_VERT = ?, S_MINERALE = ?, EMPRISE_SOL = ?, S_TOITURE = ?, S_FACADE = ?, S_FACADE_PLEINE = ?, S_VITRAGE = ? WHERE ID = ?";
  var result;

  result = await query(sql, [req.body.nom_op, req.body.maitre, req.body.nom_site, req.body.categorie, req.body.sous_categorie, req.body.composition, req.body.localisation, req.body.adresse, req.body.longitude, req.body.latitude, req.body.date_ao, req.body.typologie_marche, req.body.typologie_operation, req.body.nb_eleve, req.body.nb_classe, req.body.nb_salle, req.body.nb_logement, req.body.nb_bureaux, req.body.nb_chambre, req.body.nb_commerce, req.body.nb_parking_infra, req.body.nb_parking_int_super, req.body.nb_parking_ext, req.body.s_locaux_tech, req.body.s_locaux_annexe, req.body.shab, req.body.su, req.body.sdo, req.body.sdp, req.body.nb_niv_infra, req.body.nb_niv_super, req.body.emprise_parcelle, req.body.s_espace_vert, req.body.s_mineral, req.body.emprise_sol, req.body.s_toiture, req.body.emprise_facade, req.body.s_facade, req.body.s_vitrage, req.body.id]);
  res.status('200').json(result);
})

router.post("/home/:operation/load_entreprise", async (req, res) => {
  var sql = "SELECT * FROM entreprise";
  var result;

  result = await query(sql);
  res.status('200').json(result);
})

router.post("/home/:operation/add_entreprise", async (req, res) => {
  var sql = "INSERT INTO entreprise (NOM) VALUES (?)";
  var result;

  result = await query(sql, req.body.nom);
  res.status('200').json(result);
})

router.post("/home/:operation/get_section", async (req, res) => {
  var sql = "SELECT * FROM section";
  var result;

  result = await query(sql);
  res.status('200').json(result);
})

router.post("/home/:operation/get_theme", async (req, res) => {
  var sql = "SELECT * FROM theme WHERE ID_SECTION = ?";
  var result;

  result = await query(sql, req.body.id);
  res.status('200').json(result);
})

router.post("/home/:operation/get_chapitre", async (req, res) => {
  var sql = "SELECT * FROM chapitre WHERE ID_THEME = ?";
  var result;

  result = await query(sql, req.body.id);
  res.status('200').json(result);
})

router.post("/home/:operation/get_tram", async (req, res) => {
  var sql = "SELECT * FROM article";
  var result;

  result = await query(sql, req.body.id);
  res.status('200').json(result);
})

router.get("/home/:operation", (req, res) => {
  res.render('operation');
})

 /**
   * Server Activation
   */


 module.exports = router;