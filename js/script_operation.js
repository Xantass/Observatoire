var past = 0;
var lot = 0;
var slide_nb = 0;
var sous_categorie_1 = 0;
var sous_categorie_2 = 0;
var sous_categorie_3 = 0;
var sous_categorie_4 = 0;
var httpRequest;
var Section = [];
var Theme = [];
var Chapitre = [];
var Sous_Chapitre = [];
var Prestation = [];
var tram;
var max_id;
var article;
var value;
var operation_id;
let lot_e;
let projet_e;
let image_e;
let button_e;
let current_operation;


async function load_data() {
    var urlcourante = document.location.href;
    var queue_url;

    max_id = 0;
    urlcourante = urlcourante.replace(/\/$/, "");
    queue_url = urlcourante.substring (urlcourante.lastIndexOf( "/" )+1 );
    queue_url = decodeURIComponent(queue_url);
    current_operation = queue_url;
    httpRequest = new XMLHttpRequest();
    if (!httpRequest)
      console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete;
    httpRequest.open('POST', '/home/:operation/load_info_generale', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`operation=${current_operation}`);
    if (value == undefined) {
        load_title_op(current_operation, "");
        return;
    }
    operation_id = value.ID;
    await load_title_op(value.NOM_OP, value.NOM_CLIENT);
    await load_form_generale_op([value.NOM_SITE, value.CATEGORIE_SITE, value.SOUS_CATEGORIE_SITE, value.COMPOSITION_SITE, value.LOCALISATION, value.ADRESSE, value.LONGITUDE, value.LATITUDE, value.DESCRIPTION, value.DATE_AO, value.TYPOLOGIE_MARCHE2, value.TYPOLOGIE_OPERATION]);
    await load_form_dimension_op([value.NBR_ELEVE, value.NBR_CLASSE, value.NBR_SALLE, value.NBR_LOGEMENT, value.NBR_BUREAUX, value.NBR_CHAMBRE, value.NBR_COMMERCE, value.NBR_PARKING_INFRA, value.NBR_PARKING_INT_SUPERSTRUCT, value.NBR_PARKING_EXT, value.S_LOCAUX_TECHNIQUE, value.S_GARAGE_LOCAUX_ANNEXES, value.SHAB, value.SU, value.SDO, value.SDP, value.NBR_NIV_INFRA, value.NBR_NIV_SUPERSTRUCT, value.PARCELLE, value.ESPACE_VERT, value.S_MINERALE, value.EMPRISE_SOL, value.S_TOITURE, value.S_FACADE, value.S_FACADE_PLEINE, value.S_VITRAGE]);
    httpRequest.open('POST', '/home/:operation/load_info_lot', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`id=${value.ID}`);
    await load_lot(value);
    await load_totale_value_op();
    await load_element();
    /*
    httpRequest.onreadystatechange = requete_tram;
    httpRequest.open('POST', '/home/:operation/load_tram', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();
    */
}

function load_totale_value_op() {
    var temp = 0;
    var montant_totale = 0;
    var liste_lot = document.getElementsByClassName("container form lot");
    var op = document.getElementById("container form operation");
    var virgule = -1;
    var string;

    for (i = 0; i < liste_lot.length; i++) {
        temp = liste_lot[i].childNodes[3].childNodes[1].textContent;
        temp = temp.replace(' ', '');
        montant_totale = montant_totale + parseFloat(temp);
    }
    montant_totale = Math.round(montant_totale * 100) / 100;
    op.childNodes[7].childNodes[3].textContent = montant_totale;
    virgule = op.childNodes[7].childNodes[3].textContent.indexOf('.');
    if (virgule != -1) {
        for (i = virgule; i - 3 > 0; i = i - 3) {
            string = op.childNodes[7].childNodes[3].textContent.substring(0, i - 3);
            string = string + " ";
            string = string + op.childNodes[7].childNodes[3].textContent.substring(i - 3);
        }
    }
    op.childNodes[7].childNodes[3].textContent = string;
}

async function load_lot(value) {
    for (values of value) {
        await add_lot_to_operation([values.NOM, "none", values.ID, values.NUMERO, values.ENTREPRISE, values.DATE]);
    }
}

function load_form_dimension_op(values) {
    var zero = document.getElementById("Nombre d'eleve");
    var one = document.getElementById("Nombre de classe");
    var two = document.getElementById("Nombre de salle");
    var three = document.getElementById("Nombre de logement");
    var four = document.getElementById("Nombre de bureaux / autres locaux");
    var five = document.getElementById("Nombre de chambre");
    var six = document.getElementById("Nombre de commerce");
    var seven = document.getElementById("Nombre place de parking Infrastructure");
    var height = document.getElementById("Nombre de places de parking interieur dans la superstructure");
    var nine = document.getElementById("Nombre de places de parking exterieur");
    var ten = document.getElementById("Surface de locaux technique");
    var eleven = document.getElementById("Surface des garages et locaux annexes");
    var twelve = document.getElementById("SHAB");
    var thirteen = document.getElementById("SU");
    var fourteen = document.getElementById("SDO");
    var fifteen = document.getElementById("SDP");
    var sixteen = document.getElementById("Nombre de niveaux Infrastructure");
    var seventeen = document.getElementById("Nombre de niveaux superstructure");
    var heighteen = document.getElementById("Emprise de la parcelle");
    var nineteen = document.getElementById("Surface d'espace verts");
    var twenty = document.getElementById("Surface minerale");
    var twenty_one = document.getElementById("Emprise au sol");
    var twenty_two = document.getElementById("Surface de toiture (isolee thermiquement)");
    var twenty_three = document.getElementById("Emprise de facade totale");
    var twenty_four = document.getElementById("Dont surface de facade pleine");
    var twenty_five = document.getElementById("Dont surface de vitrage");

    zero.value = values[0];
    one.value = values[1];
    two.value = values[2];
    three.value = values[3];
    four.value = values[4];
    five.value = values[5];
    six.value = values[6];
    seven.value = values[7];
    height.value = values[8];
    nine.value = values[9];
    ten.value = values[10];
    eleven.value = values[11];
    twelve.value = values[12];
    thirteen.value = values[13];
    fourteen.value = values[14];
    fifteen.value = values[15];
    sixteen.value = values[16];
    seventeen.value = values[17];
    heighteen.value = values[18];
    nineteen.value = values[19];
    twenty.value = values[20];
    twenty_one.value = values[21];
    twenty_two.value = values[22];
    twenty_three.value = values[23];
    twenty_four.value = values[24];
    twenty_five.value = values[25];
}

function load_form_generale_op(values) {
    var zero = document.getElementById("Nom du site");
    var one = document.getElementById("Categorie du site");
    var two;
    var three = document.getElementById("Composition");
    var four = document.getElementById("Localisation");
    var five = document.getElementById("Adresse du site");
    var six = document.getElementById("Longitude");
    var seven = document.getElementById("Latitude");
    var height = document.getElementById("Description");
    var nine = document.getElementById("Date AO");
    var ten = document.getElementById("Typologie d'operation");
    var eleven = document.getElementById("Typologie de marche");
    var containers = document.getElementsByClassName("input generale_bis");

    zero.value = values[0];
    for (i = 0; i < one.childElementCount; i++) {
        if (one[i].id.toLowerCase().trim() == values[1].toLowerCase().trim()) {
            one[i].selected = true;
            containers[i - 1].style.display = "flex";
            two = document.getElementById(containers[i - 1].id);
        }
    }
    //one.value = values[1];
    for (i = 0; i < two.childElementCount; i++) {
        if (two[i].id.toLowerCase().trim() == values[2].toLowerCase().trim()) {
            two[i].selected = true;
        }
    }
    //two.value = values[2];
    for (i = 0; i < three.childElementCount; i++) {
        if (three[i].id.toLowerCase().trim() == values[3].toLowerCase().trim()) {
            three[i].selected = true;
        }
    }
    //three.value = values[3];
    four.value = values[4];
    five.value = values[5];
    six.value = values[6];
    seven.value = values[7];
    height.value = values[8];
    nine.value = values[9];
    for (i = 0; i < ten.childElementCount; i++) {
        if (ten[i].id.toLowerCase().trim() == values[10].toLowerCase().trim()) {
            ten[i].selected = true;
        }
    }
    //ten.value = values[10];
    for (i = 0; i < eleven.childElementCount; i++) {
        if (eleven[i].id.toLowerCase().trim() == values[11].toLowerCase().trim()) {
            eleven[i].selected = true;
        }
    }
    //eleven.value = values[11];
}

function load_title_op(_nom_op, _nom_maitre) {
    var nom_op = document.getElementById("text nom title header of the main box");
    var nom_maitre = document.getElementById("text maitre title header of the main box");

    nom_op.value = _nom_op;
    nom_maitre.value = _nom_maitre;
}

async function requete() {
    if (httpRequest.readyState == 4) {
        value = JSON.parse(httpRequest.response);
    }
}

async function requete_bis() {
    if (httpRequest.readyState == 4) {
        max_id = JSON.parse(httpRequest.response);
    }
}

async function requete_article() {
    if (httpRequest.readyState == 4) {
        article = JSON.parse(httpRequest.response);
    }
}

async function requete_tram() {
    if (httpRequest.readyState == 4) {
        tram = JSON.parse(httpRequest.response);
    }
}

function load_element() {
    lot_e = document.getElementsByClassName("container of the lot");
    projet_e = document.getElementById("main information of the list of the operation");
    image_e = document.getElementById("1 chevron");
    button_e = document.getElementsByClassName("button info");
    button_save = document.getElementById("button save op");

    for (i = 0; i < lot_e.length; i++) {
        lot_e[i].addEventListener('click', change_background);
    }
    for (i = 0; i < button_e.length; i++) {
        button_e[i].addEventListener('click', select_form_operation);
    }
    projet_e.addEventListener('click', change_background);
    image_e.addEventListener('click', get_lot);
    button_save.addEventListener('click', maj_op);
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
    var box = document.getElementsByClassName("container of the lot");
    var add = document.getElementById("container add lot");
    var image = document.getElementById("1 chevron");

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

function slide_ajout() {
    var container = document.getElementById("navigation d'ajout d'article");

    container.style.marginLeft = "1480px";
}

function cancel_slide() {
    var container = document.getElementById("navigation d'ajout d'article");

    container.style.marginLeft = "1920px";
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

    if (sous_categorie_1 == 0) {
        sous_categorie_1 = 1;
        form.style.display = "flex";
        box.style.height = "570px";
    }
    else {
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
        sous_categorie_2 = 1;
        form.style.display = "flex";
        box.style.height = "470px";
    }
    else {
        sous_categorie_2 = 0;
        form.style.display = "none";
        box.style.height = "70px";
    }
}

function deroule_form_3() {
    var box = document.getElementById("sous_categorie 3");
    var form = box.childNodes[3];

    if (sous_categorie_3 == 0) {
        sous_categorie_3 = 1;
        form.style.display = "flex";
        box.style.height = "270px";
    }
    else {
        sous_categorie_3 = 0;
        form.style.display = "none";
        box.style.height = "70px";
    }
}

function deroule_form_4() {
    var box = document.getElementById("sous_categorie 4");
    var form = box.childNodes[3];

    if (sous_categorie_4 == 0) {
        sous_categorie_4 = 1;
        form.style.display = "flex";
        box.style.height = "370px";
    }
    else {
        sous_categorie_4 = 0;
        form.style.display = "none";
        box.style.height = "70px";
    }
}

async function add_lot_to_operation(arg) {
    var container = document.createElement('div');
    var image = document.createElement('img');
    var span = document.createElement('span');
    var del = document.createElement('img');
    var reference = document.getElementById("container add lot");
    var parent = document.getElementById("list of the lot of the operation");

    container.className = "container of the lot";
    httpRequest = new XMLHttpRequest();
    if (arg[2] == "any") {
        if (max_id == 0) {
            if (!httpRequest)
                console.log("NO REQUEST");
            httpRequest.onreadystatechange = requete_bis;
            httpRequest.open('POST', '/home/:operation/get_max_id_lot', false);
            httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            httpRequest.send();
            max_id = max_id[0]["MAX (ID)"] + 1;
        }
        else {
            max_id++;
        }
        arg[2] = max_id;
        httpRequest.open('POST', '/home/:operation/add_lot', false);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpRequest.send(`id_lot=${arg[2]}&&id_op=${this.operation_id}`);
    }
    container.id = arg[2];
    container.style.display = arg[1];
    image.src = "/image/lot.png";
    image.id = "operation";
    span.id = "text element of list";
    span.textContent = arg[0];
    del.src = "/image/bouton-de-suppression-de-la-poubelle.png";
    del.id = "del";
    del.addEventListener('click', delete_lot);
    container.appendChild(image);
    container.appendChild(span);
    container.appendChild(del);
    parent.insertBefore(container, reference);
    await create_form_lot(arg);
    load_element();
}

async function create_form_lot(arg) {
    var temp = 0.00;
    var montant_totale = 0.00;
    var virgule = -1;
    var string;
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
    var container_submit = document.createElement('div');
    var text_box_montant = document.createElement('div');
    var box_montant = document.createElement('div');
    var button_submit = document.createElement('button');
    var button_add = document.createElement('button');
    var main_container = document.getElementById("container main information");

    container_form.className = "container form lot";
    container_form.id = "lot " + arg[2];
    container_info_generale_lot.className = "container info generale lot";
    container_input_info_generale_lot.className = "container 2 input dimension";
    box_nom_lot.className = "1 input lot";
    span_nom_lot.id = "title input";
    span_nom_lot.textContent = "Nom du lot";
    input_nom_lot.name = "nom_lot";
    input_nom_lot.value = arg[0];
    input_nom_lot.id = "nom_lot";
    input_nom_lot.className = "input generale";
    input_nom_lot.addEventListener('keyup', maj_nom_lot);
    box_numero_lot.className = "2 input lot";
    span_numero_lot.id = "title input";
    span_numero_lot.textContent = "Numero du lot";
    input_numero_lot.name = "numero_lot";
    input_numero_lot.value = arg[3];
    input_numero_lot.id = "numero_lot";
    input_numero_lot.className = "input generale";
    box_entreprise_lot.className = "2 input lot";
    span_entreprise_lot.id = "title input";
    span_entreprise_lot.textContent = "Entreprise";
    input_entreprise_lot.name = "entreprise_lot";
    input_entreprise_lot.value = arg[4];
    input_entreprise_lot.id = "entreprise_lot";
    input_entreprise_lot.className = "input generale";
    box_date_lot.className = "2 input lot";
    span_date_lot.id = "title input";
    span_date_lot.textContent = "Date";
    input_date_lot.name = "date_lot";
    input_date_lot.value = arg[5];
    input_date_lot.id = "date_lot";
    input_date_lot.className = "input generale";
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
    text_prix_unitaire_champ.textContent = "Prix Unite";
    box_prix_totale_champ.className = "champ";
    box_prix_totale_champ.id = "Prix totale champ";
    text_prix_totale_champ.id = "text";
    text_prix_totale_champ.textContent = "Prix Totale";
    box_tva_champ.className = "champ";
    box_tva_champ.id = "TVA champ";
    text_tva_champ.id = "text";
    text_tva_champ.textContent = "TVA";
    container_article.className = "container article";
    container_submit.id = "container submit";
    text_box_montant.id = "text montant totale lot";
    text_box_montant.textContent = "Montant Totale du Lot :";
    box_montant.id = "box montant totale lot";
    button_submit.type = "button";
    button_submit.className = "button1";
    button_submit.textContent = "Sauvegarder";
    button_submit.addEventListener('click', update_lot);
    button_add.type = "button";
    button_add.className = "button1";
    button_add.textContent = "Ajouter Article";
    button_add.id = "button add article";
    button_add.onclick = slide_ajout;

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
    httpRequest = new XMLHttpRequest();
    if (!httpRequest)
            console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete_article;
    httpRequest.open('POST', '/home/:operation/get_article', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`id_lot=${arg[2]}`);
    for (i = 0; i < article.length; i++) {
        temp = await create_article(article[i], container_article);
        temp = temp.replace(',', '.');
        montant_totale = montant_totale + parseFloat(temp);
    }
    container_form.appendChild(container_submit);
    container_submit.appendChild(button_add);
    container_submit.appendChild(text_box_montant);
    container_submit.appendChild(box_montant);
    container_submit.appendChild(button_submit);
    montant_totale = Math.round(montant_totale * 100) / 100;
    box_montant.textContent = montant_totale;
    virgule = box_montant.textContent.indexOf('.');
    if (virgule != -1) {
        for (i = virgule; i - 3 > 0; i = i - 3) {
            string = box_montant.textContent.substring(0, i - 3);
            string = string + " ";
            string = string + box_montant.textContent.substring(i - 3)
        }
    }
    box_montant.textContent = string;
}

function create_article(article, container) {
    var virgule = -1;
    var string;
    var box_article = document.createElement('div');
    var champ_prestation = document.createElement('div');
    var champ_article = document.createElement('div');
    var champ_unite = document.createElement('div');
    var champ_quantite = document.createElement('div');
    var champ_prix_unitaire = document.createElement('div');
    var champ_prix_totale = document.createElement('div');
    var champ_tva = document.createElement('div');
    var text_prestation = document.createElement('div');
    var text_article = document.createElement('div');
    var text_unite = document.createElement('div');
    var text_quantite = document.createElement('div');
    var text_prix_unitaire = document.createElement('div');
    var text_prix_totale = document.createElement('div');
    var text_tva = document.createElement('div');


    box_article.className = "box article";
    champ_prestation.id = "Prestation article";
    champ_prestation.className = "champ article";
    champ_article.id = "Article article";
    champ_article.className = "champ article";
    champ_unite.id = "Unite article";
    champ_unite.className = "champ article";
    champ_quantite.id = "Quantite article";
    champ_quantite.className = "champ article";
    champ_prix_unitaire.id = "Prix Unitaire article";
    champ_prix_unitaire.className = "champ article";
    champ_prix_totale.id = "Prix totale article";
    champ_prix_totale.className = "champ article";
    champ_tva.id = "TVA article";
    champ_tva.className = "champ article";
    text_article.id = "text";
    text_prestation.id = "text";
    text_quantite.id = "text";
    text_prix_totale.id = "text";
    text_prix_unitaire.id = "text";
    text_unite.id = "text";
    text_tva.id = "text";
    text_article.textContent = article.ARTICLE;
    text_prestation.textContent = article.PRESTATION;
    text_quantite.textContent = article.QTE;
    text_prix_totale.textContent = article.TOTAL;
    text_prix_unitaire.textContent = article.PU;
    text_unite.textContent = article.U;
    text_tva.textContent = "20%";

    container.appendChild(box_article);
    box_article.appendChild(champ_prestation);
    box_article.appendChild(champ_article);
    box_article.appendChild(champ_unite);
    box_article.appendChild(champ_quantite);
    box_article.appendChild(champ_prix_unitaire);
    box_article.appendChild(champ_prix_totale);
    box_article.appendChild(champ_tva);
    champ_prestation.appendChild(text_prestation);
    champ_article.appendChild(text_article);
    champ_unite.appendChild(text_unite);
    champ_quantite.appendChild(text_quantite);
    champ_prix_unitaire.appendChild(text_prix_unitaire);
    champ_prix_totale.appendChild(text_prix_totale);
    champ_tva.appendChild(text_tva);
    return article.TOTAL;
}

function select_categorie(value) {
    var containers = document.getElementsByClassName("input generale_bis");
    var select = document.getElementById("Categorie du site");
    var temp;

    for (i = 0; i < 5; i++) {
        if (select.options[i].selected && i != 0) {
            temp = document.getElementById(containers[i - 1].id)
            temp.style.display = "flex";
        }
        else if (i != 0) {
            temp = document.getElementById(containers[i - 1].id)
            temp.style.display = "none";
        }
    }
}

function delete_lot(e) {
    var container = document.getElementById("lot " + this.parentNode.id);

    e.stopPropagation();
    this.parentNode.remove();
    container.remove();
    httpRequest = new XMLHttpRequest();
    if (!httpRequest)
            console.log("NO REQUEST");
    httpRequest.open('DELETE', '/home/:operation/del_lot', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`id_lot=${this.parentNode.id}`);
}

function maj_nom_lot(e) {
    var container = document.getElementById(this.parentNode.parentNode.parentNode.parentNode.id.substring(4));

    e.stopPropagation();
    container.childNodes[1].textContent = this.value;
}

function update_lot(e) {
    var container = document.getElementById("lot " + this.parentNode.parentNode.id.substring(4));
    var nom = container.childNodes[0].childNodes[0].childNodes[0].childNodes[1].value;
    var numero = container.childNodes[0].childNodes[0].childNodes[1].childNodes[1].value;
    var entreprise = container.childNodes[0].childNodes[0].childNodes[2].childNodes[1].value;
    var date = container.childNodes[0].childNodes[0].childNodes[3].childNodes[1].value;

    e.stopPropagation()
    httpRequest = new XMLHttpRequest();
    if (!httpRequest)
            console.log("NO REQUEST");
    httpRequest.open('POST', '/home/:operation/update_lot', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`id_lot=${this.parentNode.parentNode.id.substring(4)}&&nom=${nom}&&numero=${numero}&&entreprise=${entreprise}&&date=${date}`);
}

function maj_op(e) {
    e.stopPropagation();
    console.log(this.parentNode.parentNode);
    console.log(document.getElementsByName("nom_operation")[0].value);
    console.log(document.getElementsByName("maitre_ouvrage")[0].value);
    console.log(document.getElementsByName("Nom_site")[0].value);
    console.log(document.getElementsByName("Nom_site")[0].value);
    console.log(document.getElementsByName("Nom_site")[0].value);
    console.log(document.getElementsByName("Nom_site")[0].value);
    console.log(document.getElementsByName("Nom_site")[0].value);
    console.log(document.getElementsByName("Nom_site")[0].value);
    console.log(document.getElementsByName("Nom_site")[0].value);
    console.log(document.getElementsByName("Nom_site")[0].value);
    console.log(document.getElementsByName("Nom_site")[0].value);
    console.log(document.getElementsByName("Nom_site")[0].value);
    console.log(document.getElementsByName("Nom_site")[0].value);
    console.log(document.getElementsByName("Nom_site")[0].value);
}