var past = 0;
var lot = 0;
var slide_nb = 0;
var sous_categorie_1 = 0;
var sous_categorie_2 = 0;
var sous_categorie_3 = 0;
var sous_categorie_4 = 0;
let lot_e;
let projet_e;
let image_e;
let button_e;

function load_data() {
    var urlcourante = document.location.href;
    var queue_url;

    urlcourante = urlcourante.replace(/\/$/, "");
    queue_url = urlcourante.substring (urlcourante.lastIndexOf( "/" )+1 );
    queue_url = decodeURIComponent(queue_url);
    load_element();
    console.log(queue_url);
}

function load_element() {
    console.log("DATA");
    lot_e = document.getElementsByClassName("container of the lot");
    projet_e = document.getElementById("main information of the list of the operation");
    image_e = document.getElementById("1");
    button_e = document.getElementsByClassName("button info");

    for (i = 0; i < lot_e.length; i++) {
        lot_e[i].addEventListener('click', change_background);
    }
    for (i = 0; i < button_e.length; i++) {
        button_e[i].addEventListener('click', select_form_operation);
    }
    projet_e.addEventListener('click', change_background);
    image_e.addEventListener('click', get_lot);
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

function get_focus() {
    var input = document.getElementById("text nom title header of the main box");
    var box_title = document.getElementById("shape_nom");

    console.log("FOCUS");
    past = 1;
    input.removeAttribute("readonly");
    input.focus();
    box_title.style.strokeWidth = "4px";
    box_title.style.strokeDashoffset = "0";
    box_title.style.strokeDasharray = "1840";
}

function get_focus_bis() {
    var input = document.getElementById("text maitre title header of the main box");
    var box_title = document.getElementById("shape_maitre");

    console.log("FOCUS");
    past = 1;
    input.focus();
    box_title.style.strokeWidth = "4px";
    box_title.style.strokeDashoffset = "0";
    box_title.style.strokeDasharray = "1840";
}

function reset () {
    var box_title = document.getElementById("shape_nom");
    var box_title_bis = document.getElementById("shape_maitre");

    console.log("RESET");
    if (past == 0) {
        box_title.style.strokeWidth = "5px";
        box_title.style.strokeDashoffset = "1050";
        box_title.style.strokeDasharray = "740 1240";
        box_title_bis.style.strokeWidth = "5px";
        box_title_bis.style.strokeDashoffset = "1050";
        box_title_bis.style.strokeDasharray = "740 1240";
    }
    else {
        past = 0;
    }
}

function get_lot(e) {
    e.stopPropagation();
    console.log("GET LOT");
    var box = document.getElementsByClassName("container of the lot");
    var add = document.getElementById("container add lot");
    var image = document.getElementById("1");

    if (lot == 0) {
        for (i = 0; i < box.length; i++) {
            box[i].style.display = "flex";
        }
        add.style.display = "flex";
        image.src = "/image/triangle_haut.png";
        lot = 1;
    }
    else {
        for (i = 0; i < box.length; i++) {
            box[i].style.display = "none";
        }
        add.style.display = "none";
        image.src = "/image/triangle_bas.png";
        lot = 0;
    }
}

function change_background (e) {
    let lot_background = document.getElementsByClassName("container of the lot");
    let projet_background = document.getElementById("main information of the list of the operation");
    let form_ilot = document.getElementsByClassName("container form lot");
    let form_operation = document.getElementById("container form operation");

    e.stopPropagation();
    projet_background.style.background = "none";
    projet_background.style.fontWeight = "normal";
    for (i = 0; i < lot_background.length; i++) {
        lot_background[i].style.background = "none";
        lot_background[i].style.fontWeight = "normal";
    }
    this.style.backgroundColor = "#45bab871";
    this.style.fontWeight = "bold";
    if (this.id == "main information of the list of the operation") {
        for (i = 0; i < form_ilot.length; i++)
            form_ilot[i].style.display = "none";
        form_operation.style.display = "flex";
    }
    else {
        form_operation.style.display = "none";
        for (i = 0; i < form_ilot.length; i++) {
            if (form_ilot[i].id.substring(4) == this.id) {
                form_ilot[i].style.display = "flex";
            }
            else {
                form_ilot[i].style.display = "none";
            }
        }
    }
}

function slide() {
    var image = document.getElementById("arrow");
    var container = document.getElementById("container nav operation");
    var box = document.getElementById("list element of the operation");
    var button = document.getElementById("extented the nav");
    var form_operation = document.getElementById("container form operation");
    let form_ilot = document.getElementsByClassName("container form lot");

    console.log(this);
    console.log(container.style.Maxheight);
    if (slide_nb == 0) {
        box.style.display = "none";
        image.src = "/image/right_arrow.png";
        container.style.transform = "translateX(-320px)";
        button.style.marginTop = container.style.maxHeight;
        form_operation.style.marginLeft = "-320px";
        for (i = 0; i < form_ilot.length; i++) {
            form_ilot[i].style.marginLeft = "-320px";
        }
        slide_nb = 1;
    }
    else {
        image.src = "/image/left_arrow.png";
        container.style.transform = "translateX(0px)";
        box.style.display = "flex";
        button.style.marginTop = "0px"
        form_operation.style.marginLeft = "0px";
        for (i = 0; i < form_ilot.length; i++) {
            form_ilot[i].style.marginLeft = "0px";
        }
        slide_nb = 0;
    }
}

function select_form_operation(e) {
    var generale = document.getElementById("container form generale");
    var dimension = document.getElementById("container form dimensionnelle");

    for (i = 0; i < button_e.length; i++) {
        button_e[i].style.backgroundColor = "#fff";
        button_e[i].style.color = "#22334d";
    }
    e.stopPropagation();
    this.style.color = "#fff";
    this.style.backgroundColor = "#22334d";
    if(this.id == "button info generale") {
        generale.style.display = "block";
        dimension.style.display = "none";
    }
    else {
        generale.style.display = "none";
        dimension.style.display = "block";
        dimension.childNodes
    }
}

function deroule_form_1() {
    var box = document.getElementById("sous_categorie 1");
    var form = box.childNodes[3];

    console.log(form);
    if (sous_categorie_1 == 0) {
        console.log("here");
        sous_categorie_1 = 1;
        form.style.display = "flex";
        box.style.height = "670px";
    }
    else {
        console.log("HERERRER");
        sous_categorie_1 = 0;
        form.style.display = "none";
        box.style.height = "70px";
    }
}

function deroule_form_2() {
    var box = document.getElementById("sous_categorie 2");
    var form = box.childNodes[3];

    console.log(form);
    if (sous_categorie_2 == 0) {
        console.log("here");
        sous_categorie_2 = 1;
        form.style.display = "flex";
        box.style.height = "470px";
    }
    else {
        console.log("HERERRER");
        sous_categorie_2 = 0;
        form.style.display = "none";
        box.style.height = "70px";
    }
}

function deroule_form_3() {
    var box = document.getElementById("sous_categorie 3");
    var form = box.childNodes[3];

    console.log(form);
    if (sous_categorie_3 == 0) {
        console.log("here");
        sous_categorie_3 = 1;
        form.style.display = "flex";
        box.style.height = "270px";
    }
    else {
        console.log("HERERRER");
        sous_categorie_3 = 0;
        form.style.display = "none";
        box.style.height = "70px";
    }
}

function deroule_form_4() {
    var box = document.getElementById("sous_categorie 4");
    var form = box.childNodes[3];

    console.log(form);
    if (sous_categorie_4 == 0) {
        console.log("here");
        sous_categorie_4 = 1;
        form.style.display = "flex";
        box.style.height = "370px";
    }
    else {
        console.log("HERERRER");
        sous_categorie_4 = 0;
        form.style.display = "none";
        box.style.height = "70px";
    }
}

function add_lot_to_operation() {
    var container = document.createElement('div');
    var image = document.createElement('img');
    var span = document.createElement('span');
    var reference = document.getElementById("container add lot");
    var parent = document.getElementById("list of the lot of the operation");

    container.className = "container of the lot";
    container.id = "third";
    container.style.display = "flex";
    image.src = "/image/lot.png";
    image.id = "operation";
    span.id = "text element of list";
    span.textContent = "Lot";
    container.appendChild(image);
    container.appendChild(span);
    parent.insertBefore(container, reference);
    create_form_lot();
    load_element();
}

function create_form_lot() {
    var container_form = document.createElement('div');
    var container_info_generale_lot = document.createElement('div');
    var container_input_info_generale_lot = document.createElement('div');
    var box_nom_lot = document.createElement('div');
    var span_nom_lot = document.createElement('span');
    var input_nom_lot = document.createElement('input');
    var box_numero_lot = document.createElement('div');
    var span_numero_lot = document.createElement('span');
    var input_numero_lot = document.createElement('input');
    var box_entreprise_lot = document.createElement('div');
    var span_entreprise_lot = document.createElement('span');
    var input_entreprise_lot = document.createElement('input');
    var box_date_lot = document.createElement('div');
    var span_date_lot = document.createElement('span');
    var input_date_lot = document.createElement('input');
    var span_title = document.createElement('span');
    var container_champ = document.createElement('div');
    var box_prestation_champ = document.createElement('div');
    var text_prestation_champ= document.createElement('div');
    var box_article_champ = document.createElement('div');
    var text_article_champ = document.createElement('div');
    var box_unite_champ = document.createElement('div');
    var text_unite_champ = document.createElement('div');
    var box_quantite_champ = document.createElement('div');
    var text_quantite_champ = document.createElement('div');
    var box_prix_unitaire_champ = document.createElement('div');
    var text_prix_unitaire_champ = document.createElement('div');
    var box_prix_totale_champ = document.createElement('div');
    var text_prix_totale_champ = document.createElement('div');
    var box_tva_champ = document.createElement('div');
    var text_tva_champ = document.createElement('div');
    var container_article = document.createElement('div');
    var main_container = document.getElementById("container main information");

    container_form.className = "container form lot";
    container_form.id = "lot third";
    container_info_generale_lot.className = "container info generale lot";
    container_input_info_generale_lot.className = "container 2 input dimension";
    box_nom_lot.className = "1 input lot";
    span_nom_lot.id = "title input";
    span_nom_lot.textContent = "Nom du lot";
    input_nom_lot.name = "nom_lot";
    input_nom_lot.value = "";
    input_nom_lot.id = "nom_lot";
    input_nom_lot.className = "input generale";
    box_numero_lot.className = "2 input lot";
    span_numero_lot.id = "title input";
    span_numero_lot.textContent = "Numero du lot";
    input_numero_lot.name = "numero_lot";
    input_numero_lot.value = "";
    input_numero_lot.id = "numero_lot";
    input_numero_lot.className = "input generale";
    box_entreprise_lot.className = "2 input lot";
    span_entreprise_lot.id = "title input";
    span_entreprise_lot.textContent = "Entreprise";
    input_entreprise_lot.name = "entreprise_lot";
    input_entreprise_lot.value = "";
    input_entreprise_lot.id = "entreprise_lot";
    input_entreprise_lot.className = "input generale";
    box_date_lot.className = "2 input lot";
    span_date_lot.id = "title input";
    span_date_lot.textContent = "Date";
    input_date_lot.name = "date_lot";
    input_date_lot.value = "";
    input_date_lot.id = "date_lot";
    input_date_lot.className = "input generale";
    span_title.className = "title liste d'article";
    span_title.textContent = "Liste des Articles";
    container_champ.className = "container champ";
    box_prestation_champ.className = "champ";
    box_prestation_champ.id = "Prestation champ";
    text_prestation_champ.id = "text";
    text_prestation_champ.textContent = "Prestation";
    box_article_champ.className = "champ";
    box_article_champ.id = "Article champ";
    text_article_champ.id = "text";
    text_article_champ.textContent = "Article";
    box_unite_champ.className = "champ";
    box_unite_champ.id = "Unite champ";
    text_unite_champ.id = "text";
    text_unite_champ.textContent = "Unite";
    box_quantite_champ.className = "champ";
    box_quantite_champ.id = "Quantite champ";
    text_quantite_champ.id = "text";
    text_quantite_champ.textContent = "Quantite";
    box_prix_unitaire_champ.className = "champ";
    box_prix_unitaire_champ.id = "Prix Unitaire champ";
    text_prix_unitaire_champ.id = "text";
    text_prix_unitaire_champ.textContent = "Prix Unitaire";
    box_prix_totale_champ.className = "champ";
    box_prix_totale_champ.id = "Prix totale champ";
    text_prix_totale_champ.id = "text";
    text_prix_totale_champ.textContent = "Prix Totale";
    box_tva_champ.className = "champ";
    box_tva_champ.id = "TVA champ";
    text_tva_champ.id = "text";
    text_tva_champ.textContent = "TVA";
    container_article.className = "container article";

    main_container.appendChild(container_form);
    container_form.appendChild(container_info_generale_lot);
    container_info_generale_lot.appendChild(container_input_info_generale_lot);
    container_input_info_generale_lot.appendChild(box_nom_lot);
    container_input_info_generale_lot.appendChild(box_numero_lot);
    container_input_info_generale_lot.appendChild(box_entreprise_lot);
    container_input_info_generale_lot.appendChild(box_date_lot);
    box_nom_lot.appendChild(span_nom_lot);
    box_nom_lot.appendChild(input_nom_lot);
    box_numero_lot.appendChild(span_numero_lot);
    box_numero_lot.appendChild(input_numero_lot);
    box_entreprise_lot.appendChild(span_entreprise_lot);
    box_entreprise_lot.appendChild(input_entreprise_lot);
    box_date_lot.appendChild(span_date_lot);
    box_date_lot.appendChild(input_date_lot);
    container_form.appendChild(span_title);
    container_form.appendChild(container_champ);
    container_champ.appendChild(box_prestation_champ);
    container_champ.appendChild(box_article_champ);
    container_champ.appendChild(box_unite_champ);
    container_champ.appendChild(box_quantite_champ);
    container_champ.appendChild(box_prix_unitaire_champ);
    container_champ.appendChild(box_prix_totale_champ);
    container_champ.appendChild(box_tva_champ);
    box_prestation_champ.appendChild(text_prestation_champ);
    box_article_champ.appendChild(text_article_champ);
    box_unite_champ.appendChild(text_unite_champ);
    box_quantite_champ.appendChild(text_quantite_champ);
    box_prix_unitaire_champ.appendChild(text_prix_unitaire_champ);
    box_prix_totale_champ.appendChild(text_prix_totale_champ);
    box_tva_champ.appendChild(text_tva_champ);
    container_form.appendChild(container_article);
}