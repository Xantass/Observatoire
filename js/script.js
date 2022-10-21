var name = 0;
var creator = 0;
var MAJ = 0;
var date = 0;
const query = require('./db.js').query;

async function load_operation() {
  var sql = "SELECT * FROM operation WHERE id_user=?"
  var value = [1];
  var content_operation;
  content_operation = await query(sql, value);
  console.log(content_operation);
}

function slide_right_dashboard () {
    var dashboard = document.getElementById("shadow Dashboard");
    dashboard.style.transform = "translateX(+0px)";
    var main = document.getElementById("main box");
    main.style.paddingLeft = "275px";
  }

  function slide_left_dashboard() {
    var dashboard = document.getElementById("shadow Dashboard")
    dashboard.style.transform = "translateX(-203px)";
    var main = document.getElementById("main box");
    main.style.paddingLeft = "72px";
  }

  function change_icon_name() {
    var image = document.getElementById("name filter image");
    if (name == 0) {
        console.log("PAST !!!!");
        image.src = "/image/chevron-en-haut.png";
        name = -1;
    }
    else {
        image.src = "/image/chevron-en-bas.png";
        name = 0;
    }
  }

  function change_icon_creator() {
    var image = document.getElementById("creator filter image");
    if (creator == 0) {
        image.src = "/image/chevron-en-haut.png";
        creator = -1;
    }
    else {
        image.src = "/image/chevron-en-bas.png";
        creator = 0;
    }
  }

  function change_icon_MAJ() {
    var image = document.getElementById("MAJ filter image");
    if (MAJ == 0) {
        image.src = "/image/chevron-en-haut.png";
        MAJ = -1;
    }
    else {
        image.src = "/image/chevron-en-bas.png";
        MAJ = 0;
    }
  }

  function change_icon_date() {
    var image = document.getElementById("date filter image");
    if (date == 0) {
        image.src = "/image/chevron-en-haut.png";
        date = -1;
    }
    else {
        image.src = "/image/chevron-en-bas.png";
        date = 0;
    }
  }