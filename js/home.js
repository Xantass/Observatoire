/**
 * Required External Modules
 */

 const query = require('./db.js').query;

 /**
   * App Variables
   */

 const router = global.router;
 var utilisateur;

 /**
   *  App Configuration
   */

 /**
   * Routes Definitions
   */

router.get("/home", async (req, res) => {
  var sql = "SELECT * FROM session WHERE TOKEN = ?";
  var result;

  result = await query(sql, req.cookies['connect.sid'].substring(2, 34));
  if (result[0] == undefined) {
    res.redirect('/');
  }
  else {
    utilisateur = result[0].UTILISATEUR;
    res.render('home');
  }
})

router.post("/home/log_out", async (req, res) => {
  var sql = "DELETE FROM session WHERE TOKEN = ?";
  var result;

  result = await query(sql, req.cookies['connect.sid'].substring(2, 34));
  res.status('200').json(result);
})

router.post("/home:id", async (req, res) => {
  var sql = "SELECT * FROM operation"
  var value = [];
  var content_operation;
  content_operation = await query(sql);
  for (element of content_operation) {
    value.push(await get_value_operation(element));
  }
  res.status('200').json(value);
})

router.post("/home/rename", async (req, res) => {
  var sql = "UPDATE operation SET NOM_OP = ? WHERE ID = ?";
  var value = [req.body.operation, req.body.id];
  var result;

  result = await query(sql, value);
  res.status('200').json(result);
})

router.post("/home/duplicate", async (req, res) => {
  var sql = "SELECT * FROM operation WHERE ID = ?";
  var result;
  var value = [req.body.id];
  var arg = new Array();

  result = await query(sql, value);
  arg.push(result[0].NOM_OP + " (COPY)");
  arg.push(result[0].NOM_CLIENT);
  arg.push(result[0].NOM_SITE);
  arg.push(result[0].CATEGORIE_SITE);
  arg.push(result[0].SOUS_CATEGORIE_SITE);
  arg.push(result[0].COMPOSITION_SITE);
  arg.push(result[0].LOCALISATION);
  arg.push(result[0].ADRESSE);
  arg.push(result[0].LONGITUDE);
  arg.push(result[0].LATITUDE);
  arg.push(result[0].DATE_AO);
  arg.push(result[0].TYPOLOGIE_MARCHE2);
  arg.push(result[0].TYPOLOGIE_OPERATION);
  arg.push(result[0].NBR_ELEVE);
  arg.push(result[0].NBR_CLASSE);
  arg.push(result[0].NBR_SALLE);
  arg.push(result[0].NBR_LOGEMENT);
  arg.push(result[0].NBR_BUREAUX);
  arg.push(result[0].NBR_CHAMBRE);
  arg.push(result[0].NBR_COMMERCE);
  arg.push(result[0].NBR_PARKING_INFRA);
  arg.push(result[0].NBR_PARKING_INT_SUPERSTRUCT);
  arg.push(result[0].NBR_PARKING_EXT);
  arg.push(result[0].S_LOCAUX_TECHNIQUE);
  arg.push(result[0].S_GARAGE_LOCAUX_ANNEXES);
  arg.push(result[0].SHAB);
  arg.push(result[0].SU);
  arg.push(result[0].SDO);
  arg.push(result[0].SDP);
  arg.push(result[0].NBR_NIV_INFRA);
  arg.push(result[0].NBR_NIV_SUPERSTRUCT);
  arg.push(result[0].PARCELLE);
  arg.push(result[0].ESPACE_VERT);
  arg.push(result[0].S_MINERALE);
  arg.push(result[0].EMPRISE_SOL);
  arg.push(result[0].S_TOITURE);
  arg.push(result[0].S_FACADE);
  arg.push(result[0].S_FACADE_PLEINE);
  arg.push(result[0].S_VITRAGE);
  arg.push(result[0].FINI);
  arg.push(result[0].CREATEUR);
  arg.push(result[0].PERF_ENVIRONNEMENTALE);
  arg.push(result[0].NIVEAU_PERF);
  arg.push(result[0].PERF_THERMIQUE);
  arg.push(result[0].ID_OP);
  arg.push(result[0].IMPORTANCE);
  sql = "INSERT INTO operation (NOM_OP, NOM_CLIENT, NOM_SITE, CATEGORIE_SITE, SOUS_CATEGORIE_SITE, COMPOSITION_SITE, LOCALISATION, ADRESSE, LONGITUDE, LATITUDE, DATE_AO, TYPOLOGIE_MARCHE2, TYPOLOGIE_OPERATION, NBR_ELEVE, NBR_CLASSE, NBR_SALLE, NBR_LOGEMENT, NBR_BUREAUX, NBR_CHAMBRE, NBR_COMMERCE, NBR_PARKING_INFRA, NBR_PARKING_INT_SUPERSTRUCT, NBR_PARKING_EXT, S_LOCAUX_TECHNIQUE, S_GARAGE_LOCAUX_ANNEXES, SHAB, SU, SDO, SDP, NBR_NIV_INFRA, NBR_NIV_SUPERSTRUCT, PARCELLE, ESPACE_VERT, S_MINERALE, EMPRISE_SOL, S_TOITURE, S_FACADE, S_FACADE_PLEINE, S_VITRAGE, FINI, CREATEUR, PERF_ENVIRONNEMENTALE, NIVEAU_PERF, PERF_THERMIQUE, ID_OP, IMPORTANCE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  result = await query(sql, arg);
  var id_op = result.insertId;
  var id_lot;
  sql = "SELECT * FROM lot WHERE ID_OP = ?";
  var lot = await query(sql, req.body.id);
  for (i = 0; i < lot.length; i++) {
    sql = "INSERT INTO lot (ID_OP, ID_ENTREPRISE, NOM, DATE, NUMERO, ENTREPRISE, FINI) VALUES (?, ?, ?, ?, ?, ?, ?)";
    id_lot = await query(sql, [id_op, lot[i].ID_ENTREPRISE, lot[i].NOM, lot[i].DATE, lot[i].NUMERO, lot[i].ENTREPRISE, lot[i].FINI]);
    id_lot = id_lot.insertId;
    sql = "SELECT * FROM tram_untec WHERE ID_LOT = ?";
    result = await query(sql, [lot[i].ID]);
    for (j = 0; j < result.length; j++) {
      sql = "INSERT INTO tram_untec (PRESTATION, ARTICLE, U, QTE, PU, TOTAL, ID_LOT, TVA, ID_ARTICLE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      await query(sql, [result[j].PRESTATION, result[j].ARTICLE, result[j].U, result[j].QTE, result[j].PU, result[j].TOTAL, id_lot, result[j].TVA, result[j].ID_ARTICLE]);
    }
  }
  res.status('200').json(result);
})

router.post("/home/delete", async (req, res) => {
  var sql = "DELETE FROM operation WHERE ID = ?";
  var value = [req.body.id];
  var result;

  sql = "SELECT * FROM lot WHERE ID_OP = ?";
  result = await query(sql, value);
  for (i = 0; i < result.length; i++) {
    sql = "DELETE FROM tram_untec WHERE ID_LOT = ?";
    await query(sql, result[i].ID);
  }
  sql = "DELETE FROM lot WHERE ID_OP = ?";
  await query(sql, value);
  sql = "DELETE FROM operation WHERE ID = ?";
  result = await query(sql, value);
  res.status('200').json(result);
})

router.post("/home/maitre", async (req, res) => {
  var sql = "SELECT * FROM maitre_ouvrage";
  var result;

  result = await query(sql);
  res.status('200').json(result);
})

 /**
   * Server Activation
   */

  async function get_value_operation(element) {
      var value = [];

      value.push(get_name(element));
      value.push(element.FINI);
      value.push(element.DATE_AO);
      value.push(get_maitre(element.NOM_CLIENT));
      value.push(element.ID);
      value.push(element.CATEGORIE_SITE);
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