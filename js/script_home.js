var name = 0;
var creator = 0;
var MAJ = 0;
var date = 0;
var past = 0;
var httpRequest;
var value;
var array_elem;
var name_operation;
var id_operation;
var categorie_array;


async function load_operation() {
    var i = 0;
    past = 0;
    httpRequest = new XMLHttpRequest();
    if (!httpRequest)
      console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete;
    httpRequest.open('POST', `/home:id`, false);
    httpRequest.send();
    value = value.split(',');
    for (values of value) {
      values = values.replace('[', '').replace(']', '');
      values = values.replace('[', '').replace(']', '');
      values = values.replace('\"', '').replace('\"', '');
      value[i] = values;
      i = i + 1;
    }
    for (j = 0; j < value.length; j = j + 6) {
      await create_element_html(value[j], value[j + 1], value[j + 3], value[j + 2], value[j + 4], value[j + 5]);
    }
    array_elem = new Array();
    let ChildsNods = document.getElementById('container List Operation').childNodes;
    i = 4;
    for (j = 0; j < ChildsNods.length; i = i + 6, j++) {
      array_elem.push([ChildsNods[j].id, ChildsNods[j].childNodes[2].textContent, ChildsNods[j].childNodes[3].textContent, ChildsNods[j].childNodes[4].textContent, ChildsNods[j].childNodes[5].textContent, ChildsNods[j], value[i]]);
    }
    if (!httpRequest)
      console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete_categorie;
    httpRequest.open('POST', `/home/maitre`, false);
    httpRequest.send();
    for (tmp of categorie_array) {
      await create_options_select(tmp.NOM);
    }
}

async function create_options_select(value) {
  var container = document.getElementById("select maitre");
  var option = document.createElement("option");

  option.value = value;
  option.textContent = value;
  container.appendChild(option);
}

async function create_element_html(nom, fini, maj, createur, Id, categorie) {
  var container = document.getElementById("container List Operation");
  var box = document.createElement('div');
  var box_color = document.createElement('div');
  var img = document.createElement('img');
  var NOM = document.createElement('div');
  var MAJ = document.createElement('div');
  var DATE = document.createElement('div');
  var CREATEUR = document.createElement('div');
  var CATEGORIE = document.createElement('div');
  var update = document.createElement('button');
  var img_bis = document.createElement('img');
  var ID = document.createElement('div');

  box.className = "Box Operation";
  box.id = `${box.className} N ${Id}`;
  box.addEventListener('click', get_op);
  box_color.id = "Box color";
  img.src = "/image/dossier.png";
  img.id = "dossier";
  NOM.id = "Nom Operation";
  NOM.textContent = nom;
  MAJ.id = "MAJ Operation";
  MAJ.textContent = maj;
  CREATEUR.id = "Createur Operation";
  CREATEUR.textContent = createur;
  CATEGORIE.id = "Categorie Operation";
  CATEGORIE.textContent = categorie;
  DATE.id = "Date Operation";
  if (fini == "select") {
    DATE.textContent = "terminée"
  } else
    DATE.textContent = "en cours ..."
  update.id = "Update Operation";
  update.addEventListener('click', get_position);
  img_bis.id = "point de suspension";
  img_bis.src = "/image/ellipse.png";
  ID.id = "ID Operation";
  ID.textContent = Id;
  update.appendChild(img_bis);
  box.appendChild(box_color);
  box.appendChild(img);
  box.appendChild(NOM);
  box.appendChild(CATEGORIE);
  box.appendChild(DATE);
  box.appendChild(MAJ);
  box.appendChild(CREATEUR);
  box.appendChild(update);
  box.appendChild(ID);
  container.appendChild(box);
  return;
}

function get_op(e) {
  e.stopPropagation();
  window.location = `/home/${this.childNodes[2].textContent}`;
}

function get_new_op() {
  window.location = `/home/Nouvelle Operation`;
}

function get_position(e) {
  e.stopPropagation();
  past = 1;
  let cord = this.getBoundingClientRect();
  var box_update = document.getElementById("box update operation");

  name_operation = this.parentNode.childNodes[2].textContent;
  id_operation = this.parentNode.childNodes[7].textContent;
  box_update.style.left = cord.x + (-130) + "px";
  box_update.style.top = cord.y + "px";
  box_update.style.display = "flex";
  return;
}

async function requete() {
      if (httpRequest.readyState == 4) {
        value = httpRequest.response;
      }
}

async function requete_categorie() {
  if (httpRequest.readyState == 4) {
    categorie_array = JSON.parse(httpRequest.response);
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

  function get_value_status() {
    input = document.getElementById('select status').value;

    let ChildsNods = document.getElementById('container List Operation').childNodes;
    if (input == "aucun") {
      for (i = 0; i < ChildsNods.length; i++) {
        array_elem[i][5].style.display = "flex";
      }
    } else {
      for (i = 0; i < ChildsNods.length; i++) {
        if (array_elem[i][3].toLowerCase() == input.toLowerCase())
          array_elem[i][5].style.display = "flex";
        else
          array_elem[i][5].style.display = "none";
      }
    }
  }

  function get_value_categorie() {
    input = document.getElementById('select categorie').value;

    let ChildsNods = document.getElementById('container List Operation').childNodes;
    if (input == "aucun") {
      for (i = 0; i < ChildsNods.length; i++) {
        array_elem[i][5].style.display = "flex";
      }
    } else {
      for (i = 0; i < ChildsNods.length; i++) {
        if (array_elem[i][2].toLowerCase() == input.toLowerCase())
          array_elem[i][5].style.display = "flex";
        else
          array_elem[i][5].style.display = "none";
      }
    }
  }

  function get_value_maitre() {
    input = document.getElementById('select maitre').value;

    let ChildsNods = document.getElementById('container List Operation').childNodes;
    if (input == "aucun") {
      for (i = 0; i < ChildsNods.length; i++) {
        array_elem[i][5].style.display = "flex";
      }
    } else {
      for (i = 0; i < ChildsNods.length; i++) {
        if (array_elem[i][4].toLowerCase() == input.toLowerCase())
          array_elem[i][5].style.display = "flex";
        else
          array_elem[i][5].style.display = "none";
      }
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

  function reset_shadow_box(e) {
    var box_update = document.getElementById("box update operation");

    box_update.style.display = "none";
  }

  function get_rename() {
    var update = document.getElementById("container rename operation");
    var update_bis = document.getElementById("box update operation");
    var input_rename = document.getElementById("name input");

    input_rename.value = name_operation;
    update_bis.style.display = "none";
    update.style.display = "flex";
  }

  function back_to_home() {
    var update = document.getElementById("container rename operation");

    update.style.display = "none";
  }

  function go_to_update() {
    var input = document.getElementById("name input");
    var update = document.getElementById("container rename operation");
    var box = document.getElementById(`Box Operation N ${id_operation}`).childNodes[2];

    httpRequest = new XMLHttpRequest();
    if (!httpRequest)
      console.log("NO REQUEST");
    httpRequest.open('POST', '/home/rename', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`operation=${input.value}&id=${id_operation}`);
    update.style.display = "none";
    box.textContent = input.value;
    Swal.fire({icon: 'success', title: 'Operation renommer', showConfirmButton: false, timer: 1200});
  }

  function get_duplicate() {
    httpRequest = new XMLHttpRequest();
    var update_bis = document.getElementById("box update operation");
    var myNode = document.getElementById("container List Operation");

    if (!httpRequest)
      console.log("NO REQUEST");
    httpRequest.open('POST', '/home/duplicate', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`id=${id_operation}`);
    update_bis.style.display = "none";
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    load_operation();
    Swal.fire({icon: 'success', title: 'Operation duppliquer', showConfirmButton: false, timer: 1200});
  }

  function get_sup() {
    httpRequest = new XMLHttpRequest();
    var update_bis = document.getElementById("box update operation");
    var element = document.getElementById(`Box Operation N ${id_operation}`);

    if (!httpRequest)
      console.log("NO REQUEST");
    httpRequest.open('POST', '/home/delete', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`id=${id_operation}`);
    update_bis.style.display = "none";
    element.remove();
    cancel_sup();
    Swal.fire({icon: 'error', title: 'Operation Supprimer', showConfirmButton: false, timer: 1200});
  }
  function get_valid() {
    var container = document.getElementById("container validation");
    var update_bis = document.getElementById("box update operation");

    container.style.display = "flex";
    update_bis.style.display = "none";
  }
  function cancel_sup() {
    var update = document.getElementById("container validation");

    update.style.display = "none";
  }
  function log_out() {
    if (!httpRequest)
      console.log("NO REQUEST");
    httpRequest.open('POST', '/home/log_out', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();
  }