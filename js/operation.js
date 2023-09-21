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

router.post("/home/:operation/get_max_id_operation", async (req, res) => {
  var sql = "SELECT MAX (ID) FROM operation";
  var result;

  result = await query(sql);
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
  var sql = "DELETE FROM tram_untec WHERE ID_LOT = ?";
  var result;

  result = await query(sql, req.body.id_lot);
  sql = "DELETE FROM lot WHERE ID = ?";
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
  var sql = "UPDATE lot SET NOM = ?, NUMERO = ?, ENTREPRISE = ?, DATE = ?, FINI = ? WHERE ID = ?";
  var result;

  result = await query(sql, [req.body.nom, req.body.numero, req.body.entreprise, req.body.date, req.body.fini, req.body.id_lot]);
  res.status('200').json(result);
})

router.post("/home/:operation/update_op", async (req, res) => {
  var sql = "UPDATE operation SET NOM_OP = ?, NOM_CLIENT = ?, NOM_SITE = ?, CATEGORIE_SITE = ?, SOUS_CATEGORIE_SITE = ?, COMPOSITION_SITE = ?, LOCALISATION = ?, ADRESSE = ?, LONGITUDE = ?, LATITUDE = ?, DESCRIPTION = ?, DATE_AO = ?, TYPOLOGIE_MARCHE2 = ?, TYPOLOGIE_OPERATION = ?, NBR_ELEVE = ?, NBR_CLASSE = ?, NBR_SALLE = ?, NBR_LOGEMENT = ?, NBR_BUREAUX = ?, NBR_CHAMBRE = ?, NBR_COMMERCE = ?, NBR_PARKING_INFRA = ?, NBR_PARKING_INT_SUPERSTRUCT = ?, NBR_PARKING_EXT = ?, S_LOCAUX_TECHNIQUE = ?, S_GARAGE_LOCAUX_ANNEXES = ?, SHAB = ?, SU = ?, SDO = ?, SDP = ?, NBR_NIV_INFRA = ?, NBR_NIV_SUPERSTRUCT = ?, PARCELLE = ?, ESPACE_VERT = ?, S_MINERALE = ?, EMPRISE_SOL = ?, S_TOITURE = ?, S_FACADE = ?, S_FACADE_PLEINE = ?, S_VITRAGE = ?, FINI = ?, PERF_ENVIRONNEMENTALE = ?, NIVEAU_PERF = ?, PERF_THERMIQUE = ?, ID_OP = ?, IMPORTANCE = ? WHERE ID = ?";
  var result;

  result = await query(sql, [req.body.nom_op, req.body.maitre, req.body.nom_site, req.body.categorie, req.body.sous_categorie, req.body.composition, req.body.localisation, req.body.adresse, req.body.longitude, req.body.latitude, req.body.description, req.body.date_ao, req.body.typologie_marche, req.body.typologie_operation, req.body.nb_eleve, req.body.nb_classe, req.body.nb_salle, req.body.nb_logement, req.body.nb_bureaux, req.body.nb_chambre, req.body.nb_commerce, req.body.nb_parking_infra, req.body.nb_parking_int_super, req.body.nb_parking_ext, req.body.s_locaux_tech, req.body.s_locaux_annexe, req.body.shab, req.body.su, req.body.sdo, req.body.sdp, req.body.nb_niv_infra, req.body.nb_niv_super, req.body.emprise_parcelle, req.body.s_espace_vert, req.body.s_mineral, req.body.emprise_sol, req.body.s_toiture, req.body.emprise_facade, req.body.s_facade, req.body.s_vitrage, req.body.fini, req.body.perf_environnementale, req.body.niveau_perf, req.body.perf_thermique, req.body.id_op, req.body.importance, req.body.id]);
  res.status('200').json(result);
})

router.post("/home/:operation/add_op", async (req, res) => {
  var sql = "INSERT INTO operation (NOM_OP, NOM_CLIENT, NOM_SITE, CATEGORIE_SITE, SOUS_CATEGORIE_SITE, COMPOSITION_SITE, LOCALISATION, ADRESSE, LONGITUDE, LATITUDE, DESCRIPTION, DATE_AO, TYPOLOGIE_MARCHE2, TYPOLOGIE_OPERATION, NBR_ELEVE, NBR_CLASSE, NBR_SALLE, NBR_LOGEMENT, NBR_BUREAUX, NBR_CHAMBRE, NBR_COMMERCE, NBR_PARKING_INFRA, NBR_PARKING_INT_SUPERSTRUCT, NBR_PARKING_EXT, S_LOCAUX_TECHNIQUE, S_GARAGE_LOCAUX_ANNEXES, SHAB, SU, SDO, SDP, NBR_NIV_INFRA, NBR_NIV_SUPERSTRUCT, PARCELLE, ESPACE_VERT, S_MINERALE, EMPRISE_SOL, S_TOITURE, S_FACADE, S_FACADE_PLEINE, S_VITRAGE, FINI, ID, CREATEUR, PERF_ENVIRONNEMENTALE, NIVEAU_PERF, PERF_THERMIQUE, ID_OP, IMPORTANCE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  var result;

  result = await query(sql, [req.body.nom_op, req.body.maitre, req.body.nom_site, req.body.categorie, req.body.sous_categorie, req.body.composition, req.body.localisation, req.body.adresse, req.body.longitude, req.body.latitude, req.body.description, req.body.date_ao, req.body.typologie_marche, req.body.typologie_operation, req.body.nb_eleve, req.body.nb_classe, req.body.nb_salle, req.body.nb_logement, req.body.nb_bureaux, req.body.nb_chambre, req.body.nb_commerce, req.body.nb_parking_infra, req.body.nb_parking_int_super, req.body.nb_parking_ext, req.body.s_locaux_tech, req.body.s_locaux_annexe, req.body.shab, req.body.su, req.body.sdo, req.body.sdp, req.body.nb_niv_infra, req.body.nb_niv_super, req.body.emprise_parcelle, req.body.s_espace_vert, req.body.s_mineral, req.body.emprise_sol, req.body.s_toiture, req.body.emprise_facade, req.body.s_facade, req.body.s_vitrage, req.body.fini, req.body.id, utilisateur, req.body.perf_environnementale, req.body.niveau_perf, req.body.perf_thermique, req.body.id_op, req.body.importance]);
  res.status('200').json(result);
})

router.post("/home/:operation/load_entreprise", async (req, res) => {
  var sql = "SELECT * FROM entreprise";
  var result;

  result = await query(sql);
  res.status('200').json(result);
})

router.post("/home/:operation/add_entreprise", async (req, res) => {
  var sql = "INSERT INTO entreprise (NOM, ADRESSE) VALUES (?, ?)";
  var result;

  result = await query(sql, [req.body.nom, req.body.adresse]);
  res.status('200').json(result);
})

router.post("/home/:operation/add_maitre", async (req, res) => {
  var sql = "INSERT INTO maitre_ouvrage (NOM, ADRESSE, ABREVIATION) VALUES (?, ?, ?)";
  var result;

  result = await query(sql, [req.body.nom, req.body.adresse, req.body.abreviation]);
  sql = "SELECT * FROM maitre_ouvrage WHERE ID = ?";
  result = await query(sql, [result.insertId]);
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

router.post("/home/:operation/get_sous_chapitre", async (req, res) => {
  var sql = "SELECT * FROM sous_chapitre";
  var result;

  result = await query(sql);
  res.status('200').json(result);
})

router.post("/home/:operation/get_prestation", async (req, res) => {
  var sql = "SELECT * FROM prestation";
  var result;

  result = await query(sql);
  res.status('200').json(result);
})

router.post("/home/:operation/get_tram", async (req, res) => {
  var sql = "SELECT * FROM article";
  var result;

  result = await query(sql, req.body.id);
  res.status('200').json(result);
})

router.post("/home/:operation/modif_article", async (req, res) => {
  var sql = "UPDATE tram_untec SET QTE = ?, PU = ?, TOTAL = ?, TVA = ? WHERE ID = ?";
  var result;

  result = await query(sql, [req.body.quantite, req.body.prix_u, req.body.prix_t, req.body.tva, req.body.id]);
  res.status('200').json(result);
})

router.post("/home/:operation/del_article", async (req, res) => {
  var sql = "DELETE FROM tram_untec WHERE ID = ?";
  var result;

  result = await query(sql, req.body.id);
  res.status('200').json(result);
})

router.post("/home/:operation/get_tram_untec", async (req, res) => {
  var sql = "SELECT * FROM article";
  var result;

  res.status('200').json(result);
})

router.post("/home/:operation/add_article_to_tram_untec", async (req, res) => {
  var sql;
  var result;
  var id_article;

  sql = "SELECT N_SOUSCHAPITRE FROM sous_chapitre WHERE ID = ?";
  result = await query(sql, [req.body.id_sous_chapitre]);
  console.log(result);
  id_article = result[0].N_SOUSCHAPITRE + "-";
  sql = "INSERT INTO article (ID_SECTION, ID_THEME, ID_CHAPITRE, ID_SOUS_CHAPITRE, ID_PRESTATION, PRESTATION, NOM, U) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  result = await query(sql, [req.body.id_section, req.body.id_theme, req.body.id_chapitre, req.body.id_sous_chapitre, req.body.id_prestation, req.body.prestation, req.body.nom, req.body.unite]);
  sql = "UPDATE article SET N_ARTICLE = ? WHERE ID = ?";
  id_article = id_article + result.insertId;
  await query(sql, [id_article, result.insertId]);
  sql = "SELECT * FROM article WHERE ID = ?";
  result = await query(sql, [result.insertId]);
  res.status('200').json(result);
})

router.post("/home/:operation/add_sous_chapitre_to_tram_untec", async (req, res) => {
  var sql;
  var result;
  var id_sous_chapitre;
  var temp;
  var add;

  console.log(req.body.last);
  sql = "SELECT N_SOUSCHAPITRE FROM sous_chapitre WHERE ID = ?";
  result = await query(sql, [req.body.last]);
  id_sous_chapitre = result[0].N_SOUSCHAPITRE;
  console.log(id_sous_chapitre);
  temp = id_sous_chapitre.substring(0, id_sous_chapitre.length - 1);
  if (id_sous_chapitre[id_sous_chapitre.length - 1] == "9") {
    add = "10";
  }
  else {
    add = (parseInt(id_sous_chapitre[id_sous_chapitre.length - 1]) + 1).toString();
  }
  id_sous_chapitre = temp + add;
  sql = "INSERT INTO sous_chapitre (ID_CHAPITRE, NOM) VALUES (?, ?)";
  result = await query(sql, [req.body.id_chapitre, req.body.nom]);
  sql = "UPDATE sous_chapitre SET N_SOUSCHAPITRE = ? WHERE ID = ?";
  await query(sql, [id_sous_chapitre, result.insertId]);
  sql = "SELECT * FROM sous_chapitre WHERE ID = ?";
  result = await query(sql, [result.insertId]);
  res.status('200').json(result);
})

router.post("/home/:operation/add_prestation_to_tram_untec", async (req, res) => {
  var sql;
  var result;

  sql = "INSERT INTO prestation (ID_SOUSCHAPITRE, NOM) VALUES (?, ?)";
  result = await query(sql, [req.body.id_sous_chapitre, req.body.nom]);
  sql = "SELECT * FROM prestation WHERE ID = ?";
  result = await query(sql, [result.insertId]);
  res.status('200').json(result);
})

router.post("/home/:operation/add_article_to_lot", async (req, res) => {
  var sql = "INSERT INTO tram_untec (PRESTATION, ARTICLE, U, ID_LOT, ID_ARTICLE, TVA) VALUES (?, ?, ?, ?, ?, ?)";
  var result;

  result = await query(sql, [req.body.prestation, req.body.nom, req.body.unite, req.body.id_lot, req.body.id_article, req.body.tva]);
  res.status('200').json(result);
})

router.post("/home/:operation/load_client", async (req, res) => {
  var sql = "SELECT * FROM maitre_ouvrage";
  var result;

  result = await query(sql);
  res.status('200').json(result);
})

router.get("/home/:operation", async (req, res) => {
  var sql = "SELECT * FROM session WHERE TOKEN = ?";
  var result;

  result = await query(sql, req.cookies['connect.sid'].substring(2, 34));
  if (result[0] == undefined) {
    res.redirect('/');
  }
  else {
    utilisateur = result[0].UTILISATEUR;
    res.render('operation');
  }
})

router.post("/home/:operation/log_out", async (req, res) => {
  var sql = "DELETE FROM session WHERE TOKEN = ?";
  var result;

  result = await query(sql, req.cookies['connect.sid'].substring(2, 34));
  res.status('200').json(result);
})

 /**
   * Server Activation
   */


 module.exports = router;