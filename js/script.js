var name = 0;
var creator = 0;
var MAJ = 0;
var date = 0;
var past = 0;
const query = require('./db.js').query;
var httpRequest;
var value;
var array_elem;


async function load_operation() {
    var i = 0;
    past = 0;
    httpRequest = new XMLHttpRequest();
    if (!httpRequest)
      console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete;
    httpRequest.open('GET', `/home:id`, false);
    httpRequest.send();
    value = value.split(',');
    for (values of value) {
      values = values.replace('[', '').replace(']', '');
      values = values.replace('[', '').replace(']', '');
      values = values.replace('\"', '').replace('\"', '');
      value[i] = values;
      i = i + 1;
    }
    for (j = 0; j < value.length; j = j + 4) {
      await create_element_html(value[j], value[j + 1], value[j + 3], value[j + 2]);
    }
    array_elem = new Array();
    let ChildsNods = document.getElementById('container List Operation').childNodes;
    for (j = 0; j < ChildsNods.length; j++) {
      array_elem.push([ChildsNods[j].id, ChildsNods[j].childNodes[2].childNodes[0].textContent, ChildsNods[j].childNodes[3].childNodes[0].textContent, ChildsNods[j].childNodes[4].childNodes[0].textContent, ChildsNods[j].childNodes[5].childNodes[0].textContent, ChildsNods[j]]);
    }
    console.log("length array : " + array_elem.length);
    console.log(array_elem);
}

async function create_element_html(nom, date, maj, createur) {
  var container = document.getElementById("container List Operation");
  var box = document.createElement('div');
  var box_color = document.createElement('div');
  var img = document.createElement('img');
  var NOM = document.createElement('div');
  var DATE = document.createElement('div');
  var MAJ = document.createElement('div');
  var CREATEUR = document.createElement('div');
  var update = document.createElement('button');
  var img_bis = document.createElement('img');

  box.className = "Box Operation";
  box.id = `${box.className} ${nom}`;
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
  update.id = "Update Operation";
  update.onclick = get_position;
  img_bis.id = "point de suspension";
  img_bis.src = "/image/ellipse.png";
  update.appendChild(img_bis);
  box.appendChild(box_color);
  box.appendChild(img);
  box.appendChild(NOM);
  box.appendChild(DATE);
  box.appendChild(MAJ);
  box.appendChild(CREATEUR);
  box.appendChild(update);
  container.appendChild(box);
  return;
}

function get_position() {
  console.log("get position");
  past = 1;
  let cord = this.getBoundingClientRect();
  var box_update = document.getElementById("box update operation");

  box_update.style.left = cord.left + (-130) + "px";
  box_update.style.top = cord.top + "px";
  box_update.style.display = "flex";
  return;
}

async function requete() {
      if (httpRequest.readyState == 4) {
        value = httpRequest.response;
      }
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
    var image_maitre = document.getElementById("Maitre d'ouvrage filter image");
    var image_date = document.getElementById("date filter image");
    var image_creator = document.getElementById("creator filter image");
    var image_name = document.getElementById("name filter image");

    if (name == 0) {
        image_name.src = "/image/chevron-en-haut.png";
        image_date.src = "/image/chevron-en-bas.png";
        image_creator.src = "/image/chevron-en-bas.png";
        image_maitre.src = "/image/chevron-en-bas.png";
        creator = 0;
        date = 0;
        MAJ = 0;
        name = -1;
        array_elem.sort();
        tri_node()
    }
    else {
        image_name.src = "/image/chevron-en-bas.png";
        name = 0;
        array_elem.reverse();
        tri_node()
    }
  }

  function change_icon_creator() {
    var image_maitre = document.getElementById("Maitre d'ouvrage filter image");
    var image_date = document.getElementById("date filter image");
    var image_creator = document.getElementById("creator filter image");
    var image_name = document.getElementById("name filter image");

    if (creator == 0) {
        image_creator.src = "/image/chevron-en-haut.png";
        image_maitre.src = "/image/chevron-en-bas.png";
        image_date.src = "/image/chevron-en-bas.png";
        image_name.src = "/image/chevron-en-bas.png";
        name = 0;
        MAJ = 0;
        date = 0;
        creator = -1;
        array_elem.sort(tri_createur_croissant);
        tri_node();
    }
    else {
        image_creator.src = "/image/chevron-en-bas.png";
        creator = 0;
        array_elem.sort(tri_createur_decroissant);
        tri_node();
    }
  }

  function change_icon_Maitre() {
    var image_maitre = document.getElementById("Maitre d'ouvrage filter image");
    var image_date = document.getElementById("date filter image");
    var image_creator = document.getElementById("creator filter image");
    var image_name = document.getElementById("name filter image");

    if (MAJ == 0) {
        image_maitre.src = "/image/chevron-en-haut.png";
        image_date.src = "/image/chevron-en-bas.png";
        image_creator.src = "/image/chevron-en-bas.png";
        image_name.src = "/image/chevron-en-bas.png";
        name = 0;
        creator = 0;
        date = 0;
        MAJ = -1;
        array_elem.sort(tri_maitre_croissant);
        tri_node();
    }
    else {
        image_maitre.src = "/image/chevron-en-bas.png";
        MAJ = 0;
        array_elem.sort(tri_maitre_decroissant);
        tri_node();
    }
  }

  function change_icon_date() {
    var image_maitre = document.getElementById("Maitre d'ouvrage filter image");
    var image_date = document.getElementById("date filter image");
    var image_creator = document.getElementById("creator filter image");
    var image_name = document.getElementById("name filter image");

    if (date == 0) {
        image_date.src = "/image/chevron-en-haut.png";
        image_maitre.src = "/image/chevron-en-bas.png";
        image_creator.src = "/image/chevron-en-bas.png";
        image_name.src = "/image/chevron-en-bas.png";
        name = 0;
        creator = 0;
        MAJ = 0;
        date = -1;
        array_elem.sort(tri_date_croissant);
        tri_node();
    }
    else {
        image_date.src = "/image/chevron-en-bas.png";
        date = 0;
        array_elem.sort(tri_date_decroissant);
        tri_node();
    }
  }

  function get_value_input() {
    input = document.getElementById('search input').value;

    let ChildsNods = document.getElementById('container List Operation').childNodes;
    for (i = 0; i < ChildsNods.length; i++) {
      if (array_elem[i][1].toLowerCase().includes(input.toLowerCase()))
        array_elem[i][5].style.display = "flex";
      else
        array_elem[i][5].style.display = "none";
    }
  }

  function tri_createur_croissant(a, b) {
    for(i = 0; i < Math.min(a[2].length, b[2].length); i++) {
      if(a[2].charCodeAt(i) != b[2].charCodeAt(i))//comparing unicode values
          return a[2].charCodeAt(i) - b[2].charCodeAt(i);
    }
    if(a[2].length != b[2].length)//smaller word is occurs at the beginning of the larger word
      return a[2].length - b[2].length;
    else
      return 0;
  }

  function tri_createur_decroissant(a, b) {
    for(i = 0; i < Math.min(a[2].length, b[2].length); i++) {
      if(b[2].charCodeAt(i) != a[2].charCodeAt(i))//comparing unicode values
          return b[2].charCodeAt(i) - a[2].charCodeAt(i);
    }
    if(b[2].length != a[2].length)//smaller word is occurs at the beginning of the larger word
      return b[2].length - a[2].length;
    else
      return 0;
  }

  function tri_maitre_croissant(a, b) {
    for(i = 0; i < Math.min(a[3].length, b[3].length); i++) {
      if(a[3].charCodeAt(i) != b[3].charCodeAt(i)) {//comparing unicode values
          return a[3].charCodeAt(i) - b[3].charCodeAt(i);
      }
    }
    if(a[3].length != b[3].length) {//smaller word is occurs at the beginning of the larger word
      return a[3].length - b[3].length;
    }
    else {
      return 0;
    }
  }

  function tri_maitre_decroissant(a, b) {
    for(i = 0; i < Math.min(a[3].length, b[3].length); i++) {
      if(b[3].charCodeAt(i) != a[3].charCodeAt(i))//comparing unicode values
          return b[3].charCodeAt(i) - a[3].charCodeAt(i);
    }
    if(b[3].length != a[3].length)//smaller word is occurs at the beginning of the larger word
      return b[3].length - a[3].length;
    else
      return 0;
  }

  function tri_date_croissant(a, b) {
    temp_a = a[4].split('/');
    temp_b = b[4].split('/');
    if ((temp_a[2] - temp_b[2]) == 0) {
      if ((temp_a[1] - temp_b[1]) == 0) {
        if ((temp_a[0] - temp_b[0]) == 0) {
          return 0;
        }
        else {
          return temp_b[0] - temp_a[0];
        }
      }
      else {
        return temp_b[1] - temp_a[1];
      }
    }
    else {
      return temp_b[2] - temp_a[2];
    }
  }

  function tri_date_decroissant(a, b) {
    temp_a = a[4].split('/');
    temp_b = b[4].split('/');
    if ((temp_a[2] - temp_b[2]) == 0) {
      if ((temp_a[1] - temp_b[1]) == 0) {
        if ((temp_a[0] - temp_b[0]) == 0) {
          return 0;
        }
        else {
          return temp_a[0] - temp_b[0];
        }
      }
      else {
        return temp_a[1] - temp_b[1];
      }
    }
    else {
      return temp_a[2] - temp_b[2];
    }
  }

  function tri_node() {
    var main = document.getElementById("container List Operation");

    for (i = 0; i < array_elem.length; i++) {
      main.append(array_elem[i][5]);
    }
  }

  function reset_shadow_box() {
    console.log("reset box");
    var box_update = document.getElementById("box update operation");

    if (past == 0) {
      box_update.style.display = "none";
    }
    else {
      past = 0;
    }
  }