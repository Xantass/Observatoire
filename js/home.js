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

  document.addEventListener('DOMContentLoaded', () => {
    console.log("LOAD !!!!!");
});

router.get("/home:id", async (req, res) => {
    res.render('home');
    var temp;
    const id = req.params.id;
    var sql = "SELECT * FROM operation WHERE id_user=?"
    var value = [id];
    var content_operation;
    content_operation = await query(sql, value);
    const forEach = util.promisify(content_operation.forEach).bind(content_operation);
    await forEach(async (element) => {
        await get_value_operation(element, id);
    });
    console.log("finish");
});

 /**
   * Server Activation
   */

  async function get_value_operation(element, id) {
      var nom;
      var date;
      var maj;
      var createur;

      nom = get_name(element);
      createur = await get_createur(id);
      date = get_date(element.dates);
      maj = get_date(element.maj);
      //await create_element_html();
  };

  async function create_element_html(nom, date, maj, createur) {
    var container = document.getElementById("container List Operation");
    var box = document.createElement('div');
    var box_color = document.createElement('div');
    var img = document.createElement('img');
    var NOM = document.createElement('div');
    var DATE = document.createElement('div');
    var MAJ = document.createElement('div');
    var CREATEUR = document.createElement('div');

    box.id = "Box Operation";
    box_color.id = "Box color";
    img.src = "/image/dossier.png";
    img.id = "dossier";
    NOM.id = "Nom Operation";
    NOM.textContent = nom;
    DATE.id = "Date Operation";
    DATE.textContent = date;
    MAJ.id = "MAJ Operation";
    MAJ.textContent = maj;
    CREATEUR.id = "Createur Operation";
    CREATEUR.textContent = createur;
    box.appendChild(box_color);
    box.appendChild(img);
    box.appendChild(NOM);
    box.appendChild(DATE);
    box.appendChild(MAJ);
    box.appendChild(CREATEUR);
    console.log(container);
    //container.appendChild(box);
    return;
  }

  function get_date(value) {
      date = new Date(value).toISOString().substring(0, 10);
      const [year, month, day] = date.split('-');
      date = day + "/" + month + "/" + year;
      return date;
  };

  async function get_createur(id) {
      var temp = await query("SELECT identifiant FROM user WHERE id=?", id);
      return temp[0].identifiant;
  };

  function get_name(content_operation) {
      return content_operation.nom;
  };


 module.exports = router;