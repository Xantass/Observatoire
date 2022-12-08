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
var element_result = [];
var tram;
var max_id = 0;
var article;
var value;
var operation_id;
var liste_entreprise;
var arbre;
var _new;
var id_delete_lot = 0;
let lot_e;
let projet_e;
let image_e;
let button_e;
let current_operation = "";


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
    httpRequest.onreadystatechange = requete_entreprise;
    httpRequest.open('POST', '/home/:operation/load_entreprise', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();
    httpRequest.onreadystatechange = requete;
    httpRequest.open('POST', '/home/:operation/load_info_generale', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`operation=${current_operation}`);
    await create_arborescence();
    httpRequest.onreadystatechange = requete_tram;
    httpRequest.open('POST', '/home/:operation/get_tram', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();
    create_tram();
    await load_element();
    if (value == undefined) {
        _new = 0;
        load_title_op(current_operation, "");
        return;
    }
    if (value.FINI == "select") {
        document.getElementById("box validation de l'operation").childNodes[3].click();
    }
    _new = 1;
    operation_id = value.ID;
    await load_title_op(value.NOM_OP, value.NOM_CLIENT);
    await load_form_generale_op([value.NOM_SITE, value.CATEGORIE_SITE, value.SOUS_CATEGORIE_SITE, value.COMPOSITION_SITE, value.LOCALISATION, value.ADRESSE, value.LONGITUDE, value.LATITUDE, value.DESCRIPTION, value.DATE_AO, value.TYPOLOGIE_MARCHE2, value.TYPOLOGIE_OPERATION]);
    await load_form_dimension_op([value.NBR_ELEVE, value.NBR_CLASSE, value.NBR_SALLE, value.NBR_LOGEMENT, value.NBR_BUREAUX, value.NBR_CHAMBRE, value.NBR_COMMERCE, value.NBR_PARKING_INFRA, value.NBR_PARKING_INT_SUPERSTRUCT, value.NBR_PARKING_EXT, value.S_LOCAUX_TECHNIQUE, value.S_GARAGE_LOCAUX_ANNEXES, value.SHAB, value.SU, value.SDO, value.SDP, value.NBR_NIV_INFRA, value.NBR_NIV_SUPERSTRUCT, value.PARCELLE, value.ESPACE_VERT, value.S_MINERALE, value.EMPRISE_SOL, value.S_TOITURE, value.S_FACADE, value.S_FACADE_PLEINE, value.S_VITRAGE]);
    httpRequest.onreadystatechange = requete;
    httpRequest.open('POST', '/home/:operation/load_info_lot', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`id=${value.ID}`);
    await load_lot(value);
    await load_totale_value_op();
    await load_element();
}

async function load_totale_value_op() {
    var temp = 0;
    var montant_totale = 0;
    var liste_lot = document.getElementsByClassName("container form lot");
    var op = document.getElementById("container form operation");

    for (i = 0; i < liste_lot.length; i++) {
        temp = liste_lot[i].childNodes[3].childNodes[3].textContent;
        temp = temp.replace(' ', '');
        montant_totale = montant_totale + parseFloat(temp);
    }
    montant_totale = Math.round(montant_totale * 100) / 100;
    temp = montant_totale.toString();
    temp = await beautiful_number(temp);
    op.childNodes[7].childNodes[3].textContent = temp;
}

async function load_totale_value_lot(container) {
    var temp = 0;
    var montant_totale = 0;

    for (i = 0; i < container.childElementCount; i++) {
        temp = container.childNodes[i].childNodes[5].childNodes[0].textContent;
        temp = temp.replace(' ', '');
        if (temp != "") {
            montant_totale = montant_totale + parseFloat(temp);
        }
    }
    montant_totale = Math.round(montant_totale * 100) / 100;
    temp = montant_totale.toString();
    temp = await beautiful_number(temp);
    container.parentNode.childNodes[3].childNodes[3].textContent = temp;
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

async function requete_entreprise() {
    if (httpRequest.readyState == 4) {
        liste_entreprise = JSON.parse(httpRequest.response);
    }
}

async function requete_arbre() {
    if (httpRequest.readyState == 4) {
        arbre = JSON.parse(httpRequest.response);
    }
}

async function requete_nothing() {
    if (httpRequest.readyState == 4) {
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

function slide_ajout(e) {
    var container = document.getElementById("recherche d'article");
    var container_bis = document.getElementById("main box");

    e.stopPropagation();
    if (this.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[4].childNodes[2].id == "select") {
        return;
    }
    container.style.marginTop = `0px`;
    container.className = "recherche d'article " + this.parentNode.parentNode.id.substring(4);
    container_bis.style.display = "none";
    container.style.display = "flex";
}

function slide_ajout_entreprise(e) {
    var container = document.getElementById("navigation d'ajout d'entreprise");

    e.stopPropagation();
    if (this.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[4].childNodes[2].id == "select") {
        return;
    }
    container.style.marginLeft = `${window.innerWidth - 440}px`;
}

function slide_modif_article(e) {
    var container = document.getElementById("navigation d'ajout d'article");

    if (this.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[4].childNodes[2].id == "select") {
        return;
    }
    e.stopPropagation();
    container.style.marginLeft = `${window.innerWidth - 440}px`;
    container.childNodes[3].childNodes[1].childNodes[3].value = this.childNodes[1].childNodes[0].textContent;
    container.childNodes[3].childNodes[3].childNodes[3].value = this.childNodes[2].childNodes[0].textContent;
    container.childNodes[3].childNodes[5].childNodes[3].value = this.childNodes[3].childNodes[0].textContent;
    container.childNodes[3].childNodes[7].childNodes[3].value = this.childNodes[4].childNodes[0].textContent;
    container.childNodes[3].childNodes[9].childNodes[3].value = this.childNodes[5].childNodes[0].textContent;
    container.childNodes[3].childNodes[11].childNodes[3].value = this.id.substring(8);
    container.childNodes[3].childNodes[13].childNodes[3].value = this.childNodes[6].childNodes[0].textContent;
}

function slide_add_article_tram() {
    var container = document.getElementById("navigation d'ajout d'article a la tram");

    container.style.display = "flex";
    container.style.marginLeft = `${window.innerWidth - 440}px`;
}

function cancel_slide() {
    var container = document.getElementById("recherche d'article");
    var input = document.getElementById("search bar article");
    var temp = document.getElementById("aborescence article");
    var container_bis = document.getElementById("main box");
    var check = 0;
    var height = 0;

    container.style.display = "none";
    container_bis.style.display = "flex";
    container.style.marginTop = `${window.innerHeight}px`;
    input.value = "";
    for (i = 0; i < temp.childElementCount; i++) {
        if (temp.childNodes[i].childNodes[0].childNodes[0].id == "moins") {
            height = height + parseInt(temp.childNodes[i].style.height.substring(0, temp.childNodes[i].style.height.length - 1)) - 20;
            temp.childNodes[i].childNodes[0].childNodes[0].id = "plus";
            temp.childNodes[i].childNodes[0].childNodes[0].src = "/image/add_bis.png";
            temp.childNodes[i].style.height = "20px";
            temp.childNodes[i].childNodes[1].style.display = "none";
            temp = temp.childNodes[i].childNodes[1];
            i = -1;
            check = 1;
        }
    }
    temp = temp.parentNode;
    if (check == 1) {
        while (1) {
            if (temp.className == "option filtrage section") {
                break;
            }
            temp = temp.parentNode.parentNode;
            temp.style.height = `${parseInt(temp.style.height.substring(0, temp.style.height.length - 1)) - height}px`;
        }
    }
    for (i = 0; i < element_result.length; i++) {
        element_result[i][8].style.display = "none";
        if (element_result[i][8].childNodes[2].childNodes[1].id == "select") {
            element_result[i][8].childNodes[2].childNodes[1].click();
        }
    }
}

function cancel_slide_entreprise() {
    var container = document.getElementById("navigation d'ajout d'entreprise");

    container.style.marginLeft = `${window.innerWidth}px`;
    container.childNodes[3].childNodes[1].childNodes[3].value = "";
}

async function cancel_slide_modif_article() {
    var container = document.getElementById("navigation d'ajout d'article");
    var container_bis = document.getElementById("article " + container.childNodes[3].childNodes[11].childNodes[3].value);

    container.style.marginLeft = `${window.innerWidth}px`;
    await load_totale_value_lot(container_bis.parentNode);
    await load_totale_value_op();
}

function cancel_slide_add_article_tram() {
    var container = document.getElementById("navigation d'ajout d'article a la tram");
    var theme = document.getElementsByClassName("selection theme");
    var chapitre = document.getElementsByClassName("selection chapitre");
    var sous_chapitre = document.getElementsByClassName("selection sous_chapitre");
    var prestation = document.getElementsByClassName("selection prestation");
    var nom = document.getElementById("container selection nom");
    var unite = document.getElementById("container selection unite");

    nom.childNodes[3].value = "";
    unite.childNodes[3].value = "";
    container.style.marginLeft = `${window.innerWidth}px`;
    container.style.display = "none";
    for (i = 0; i < theme.length; i++) {
        theme[i].style.display = "none";
    }
    for (i = 0; i < chapitre.length; i++) {
        chapitre[i].style.display = "none";
    }
    for (i = 0; i < sous_chapitre.length; i++) {
        sous_chapitre[i].style.display = "none";
    }
    for (i = 0; i < prestation.length; i++) {
        prestation[i].style.display = "none";
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
    var max = 0;
    var container = document.createElement('div');
    var image = document.createElement('img');
    var span = document.createElement('span');
    var del = document.createElement('img');
    var reference = document.getElementById("container add lot");
    var parent = document.getElementById("list of the lot of the operation");

    container.className = "container of the lot";
    httpRequest = new XMLHttpRequest();
    if (arg[2] == "any") {
        if (!httpRequest)
            console.log("NO REQUEST");
        httpRequest.onreadystatechange = requete_bis;
        httpRequest.open('POST', '/home/:operation/get_max_id_lot', false);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpRequest.send();
        max = max_id[0]["MAX (ID)"] + 1;
        arg[2] = max;
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
    del.addEventListener('click', get_valid);
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
    var input_entreprise_lot = document.createElement('select');
    var box_date_lot = document.createElement('div');
    var span_date_lot = document.createElement('span');
    var input_date_lot = document.createElement('input');
    var box_check_lot = document.createElement('div');
    var span_check_lot = document.createElement('span');
    var input_check_lot = document.createElement('input');
    var label_check_lot = document.createElement('label');
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
    var button_add_entreprise = document.createElement('button');
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
    input_nom_lot.className = "input lot";
    input_nom_lot.addEventListener('keyup', maj_nom_lot);
    box_numero_lot.className = "2 input lot";
    span_numero_lot.id = "title input";
    span_numero_lot.textContent = "Numero du lot";
    input_numero_lot.name = "numero_lot";
    input_numero_lot.value = arg[3];
    input_numero_lot.id = "numero_lot";
    input_numero_lot.className = "input lot";
    input_numero_lot.addEventListener('keypress', function() { return verif_bis(event, '1234567890'); }, false);
    box_entreprise_lot.className = "2 input lot";
    span_entreprise_lot.id = "title input";
    span_entreprise_lot.textContent = "Entreprise";
    input_entreprise_lot.name = "entreprise_lot";
    input_entreprise_lot.id = "entreprise_lot";
    input_entreprise_lot.className = "input lot";
    create_option_entreprise(input_entreprise_lot, arg[4]);
    box_date_lot.className = "2 input lot";
    span_date_lot.id = "title input";
    span_date_lot.textContent = "Date";
    input_date_lot.name = "date_lot";
    input_date_lot.value = arg[5];
    input_date_lot.id = "date_lot";
    input_date_lot.className = "input lot";
    input_date_lot.addEventListener('keypress', function() { return verif_bis(event, '1234567890/'); }, false);
    box_check_lot.className = "3 input lot";
    span_check_lot.id = "title input";
    span_check_lot.textContent = "Lot validé";
    label_check_lot.setAttribute("for", "switch " + values.ID);
    label_check_lot.id = "not";
    label_check_lot.addEventListener('click', select_lot);
    input_check_lot.type = "checkbox";
    input_check_lot.id = "switch " + values.ID;
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
    text_prix_totale_champ.textContent = "Prix Total (HT)";
    box_tva_champ.className = "champ";
    box_tva_champ.id = "TVA champ";
    text_tva_champ.id = "text";
    text_tva_champ.textContent = "TVA";
    container_article.className = "container article";
    container_submit.id = "container submit";
    text_box_montant.id = "text montant totale lot";
    text_box_montant.textContent = "Montant Total du Lot (HT) :";
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
    button_add_entreprise.type = "button";
    button_add_entreprise.className = "button1";
    button_add_entreprise.textContent = "Ajouter Entreprise";
    button_add_entreprise.id = "button add entreprise";
    button_add_entreprise.onclick = slide_ajout_entreprise;

    main_container.appendChild(container_form);
    container_form.appendChild(container_info_generale_lot);
    container_info_generale_lot.appendChild(container_input_info_generale_lot);
    container_input_info_generale_lot.appendChild(box_nom_lot);
    container_input_info_generale_lot.appendChild(box_numero_lot);
    container_input_info_generale_lot.appendChild(box_entreprise_lot);
    container_input_info_generale_lot.appendChild(box_date_lot);
    container_input_info_generale_lot.appendChild(box_check_lot);
    box_nom_lot.appendChild(span_nom_lot);
    box_nom_lot.appendChild(input_nom_lot);
    box_numero_lot.appendChild(span_numero_lot);
    box_numero_lot.appendChild(input_numero_lot);
    box_entreprise_lot.appendChild(span_entreprise_lot);
    box_entreprise_lot.appendChild(input_entreprise_lot);
    box_date_lot.appendChild(span_date_lot);
    box_date_lot.appendChild(input_date_lot);
    box_check_lot.appendChild(span_check_lot);
    box_check_lot.appendChild(input_check_lot);
    box_check_lot.appendChild(label_check_lot);
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
    for (i = 0; i < article.length; i = i + 1) {
        temp = await create_article(article[i], container_article);
        temp = temp.replace(' ', '');
        if (temp != "") {
            montant_totale = montant_totale + parseFloat(temp);
        }
    }
    container_form.appendChild(container_submit);
    container_submit.appendChild(button_add_entreprise);
    container_submit.appendChild(button_add);
    container_submit.appendChild(text_box_montant);
    container_submit.appendChild(box_montant);
    container_submit.appendChild(button_submit);
    montant_totale = Math.round(montant_totale * 100) / 100;
    temp = montant_totale.toString();
    temp = await beautiful_number(temp);
    box_montant.textContent = temp;
    if (values.FINI == "select") {
        label_check_lot.addEventListener('click', select_lot_bis(label_check_lot));
        label_check_lot.click();
        label_check_lot.addEventListener('click', select_lot);
    }
}

function create_option_entreprise(container, arg) {
    var temp;
    var option;

    option = document.createElement('option');
    option.id = "nothing";
    option.textContent = "";
    container.appendChild(option);
    for (i = 0; i < liste_entreprise.length; i++) {
        option = document.createElement('option');
        option.id = liste_entreprise[i].NOM;
        option.textContent = liste_entreprise[i].NOM;
        container.appendChild(option);
    }
    for (i = 0; i < container.childNodes.length; i++) {
        if (container.childNodes[i].textContent == arg) {
            container.childNodes[i].selected = true;
            break;
        }
    }
}

async function create_article(article, container) {
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
    box_article.id = "article " + article.ID;
    box_article.addEventListener('click', slide_modif_article);
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
    article.QTE = await beautiful_number(article.QTE);
    text_quantite.textContent = article.QTE;
    article.TOTAL = await beautiful_number(article.TOTAL);
    text_prix_totale.textContent = article.TOTAL;
    article.PU = await beautiful_number(article.PU);
    text_prix_unitaire.textContent = article.PU;
    text_unite.textContent = article.U;
    text_tva.textContent = article.TVA;

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

async function beautiful_number(string) {
    var virgule = 0;
    var result = "";

    if (string == "" || string == undefined)
        return result;
    string = string.replace(' ', '');
    if (string.includes(',') || string.includes('.')) {
        if (string.includes(',')) {
            virgule = string.indexOf(',');
        }
        if (string.includes('.')) {
            virgule = string.indexOf('.');
        }
    }
    else {
        virgule = string.length;
    }
    result = await format_number(string, virgule);
    return result;
}

function format_number(string, index) {
    var result = "";

    string = string.replace(',', '.');
    if (index <= 3) {
        return string;
    }
    for (; index > 3; index = index - 3) {
        result = string.substring(0, index - 3);
        result = result + " ";
        result = result + string.substring(index - 3);
        string = result;
    }
    return result;
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

function delete_lot() {
    var container = document.getElementById("lot " + id_delete_lot);
    var container_bis = document.getElementById(id_delete_lot);

    container_bis.remove();
    container.remove();
    httpRequest = new XMLHttpRequest();
    if (!httpRequest)
            console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete_nothing;
    httpRequest.open('DELETE', '/home/:operation/del_lot', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`id_lot=${id_delete_lot}`);
    cancel_sup();
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
    var check = container.childNodes[0].childNodes[0].childNodes[4].childNodes[2].id;

    e.stopPropagation()
    httpRequest = new XMLHttpRequest();
    if (!httpRequest)
            console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete_nothing;
    httpRequest.open('POST', '/home/:operation/update_lot', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    console.log(check);
    httpRequest.send(`id_lot=${this.parentNode.parentNode.id.substring(4)}&&nom=${nom}&&numero=${numero}&&entreprise=${entreprise}&&date=${date}&&fini=${check}`);
}

function maj_op(e) {
    e.stopPropagation();
    var nom_op = document.getElementsByName("nom_operation")[0].value;
    var maitre = document.getElementsByName("maitre_ouvrage")[0].value;
    var nom_site = document.getElementsByName("Nom_site")[0].value;
    var categorie = document.getElementsByName("Categorie")[0].value;
    var sous_categorie = document.getElementsByName("Sous_Categorie");
    var composition = document.getElementsByName("Composition")[0].value;
    var localisation = document.getElementsByName("Localisation")[0].value;
    var adresse = document.getElementsByName("Adresse_du_site")[0].value;
    var longitude = document.getElementsByName("Longitude")[0].value;
    var latitude = document.getElementsByName("Latitude")[0].value;
    var description = document.getElementsByName("Description")[0].value;
    var date_ao = document.getElementsByName("Date_AO")[0].value;
    var typologie_marche = document.getElementsByName("Typologie_marche")[0].value;
    var typologie_operation = document.getElementsByName("Typologie_operation")[0].value;
    var nb_eleve = document.getElementsByName("Nombre_d'eleve")[0].value;
    var nb_classe = document.getElementsByName("Nombre_de_classe_(salle_d'enseignement)")[0].value;
    var nb_salle = document.getElementsByName("Nombre_de_salle_(poly_spectacle_sport)")[0].value;
    var nb_logement = document.getElementsByName("Nombre_de_logement")[0].value;
    var nb_bureaux = document.getElementsByName("Nombre_de_bureaux_/_autres_locaux")[0].value;
    var nb_chambre = document.getElementsByName("Nombre_de_chambre")[0].value;
    var nb_commerce = document.getElementsByName("Nombre_de_commerce")[0].value;
    var nb_parking_infra = document.getElementsByName("Nombre_place_de_parking_Infrastructure")[0].value;
    var nb_parking_int_super = document.getElementsByName("Nombre_de_places_de_parking_interieur_dans_la_superstructure")[0].value;
    var nb_parking_ext = document.getElementsByName("Nombre_de_places_de_parking_exterieur")[0].value;
    var s_locaux_tech = document.getElementsByName("Surface_de_locaux_technique")[0].value;
    var s_locaux_annexe = document.getElementsByName("Surface_des_garages_et_locaux_annexes")[0].value;
    var shab = document.getElementsByName("SHAB")[0].value;
    var su = document.getElementsByName("SU")[0].value;
    var sdo = document.getElementsByName("SDO")[0].value;
    var sdp = document.getElementsByName("SDP")[0].value;
    var nb_niv_infra = document.getElementsByName("Nombre_de_niveaux_Infrastructure")[0].value;
    var nb_niv_super = document.getElementsByName("Nombre_de_niveaux_superstructure")[0].value;
    var emprise_parcelle = document.getElementsByName("Emprise_de_la_parcelle")[0].value;
    var s_espace_vert = document.getElementsByName("Surface_d'espace_verts")[0].value;
    var s_minerale = document.getElementsByName("Surface_minerale")[0].value;
    var emprise_sol = document.getElementsByName("Emprise_au_sol")[0].value;
    var s_toiture = document.getElementsByName("Surface_de_toiture_(isolee_thermiquement)")[0].value;
    var emprise_facade = document.getElementsByName("Emprise_de_facade_totale")[0].value;
    var s_facade = document.getElementsByName("Dont_surface_de_facade_pleine")[0].value;
    var s_vitrage = document.getElementsByName("Dont_surface_de_vitrage")[0].value;
    var check = 0;
    var finie = document.getElementById("box validation de l'operation").childNodes[3];

    for (i = 0; i < sous_categorie.length; i++) {
        if (sous_categorie[i].style.display == "flex") {
            sous_categorie = sous_categorie[i].value;
            check = 1;
            break;
        }
    }
    if (check == 0)
        sous_categorie = "";
    httpRequest = new XMLHttpRequest();
    if (!httpRequest)
            console.log("NO REQUEST");
    if (_new == 0) {
        httpRequest.onreadystatechange = requete_nothing;
        httpRequest.open('POST', '/home/:operation/add_op', false);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpRequest.send(`id=${operation_id}&&nom_op=${nom_op}&&maitre=${maitre}&&nom_site=${nom_site}&&categorie=${categorie}&sous_categorie=${sous_categorie}&&composition=${composition}&&localisation=${localisation}&&adresse=${adresse}&&longitude=${longitude}&&latitude=${latitude}&&description=${description}&&date_ao=${date_ao}&&typologie_marche=${typologie_marche}&&typologie_operation=${typologie_operation}&&nb_eleve=${nb_eleve}&&nb_classe=${nb_classe}&&nb_salle=${nb_salle}&&nb_logement=${nb_logement}&&nb_bureaux=${nb_bureaux}&&nb_chambre=${nb_chambre}&&nb_commerce=${nb_commerce}&&nb_parking_infra=${nb_parking_infra}&&nb_parking_int_super=${nb_parking_int_super}&&nb_parking_ext=${nb_parking_ext}&&s_locaux_tech=${s_locaux_tech}&&s_locaux_annexe=${s_locaux_annexe}&&shab=${shab}&&su=${su}&&sdo=${sdo}&&sdp=${sdp}&&nb_niv_infra=${nb_niv_infra}&&nb_niv_super=${nb_niv_super}&&emprise_parcelle=${emprise_parcelle}&&s_espace_vert=${s_espace_vert}&&s_mineral=${s_minerale}&&emprise_sol=${emprise_sol}&&s_toiture=${s_toiture}&&emprise_facade=${emprise_facade}&&s_facade=${s_facade}&&s_vitrage=${s_vitrage}&&fini=${finie.id}`);
        _new = 1;
    }
    else {
        httpRequest.onreadystatechange = requete_nothing;
        httpRequest.open('POST', '/home/:operation/update_op', false);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpRequest.send(`id=${operation_id}&&nom_op=${nom_op}&&maitre=${maitre}&&nom_site=${nom_site}&&categorie=${categorie}&sous_categorie=${sous_categorie}&&composition=${composition}&&localisation=${localisation}&&adresse=${adresse}&&longitude=${longitude}&&latitude=${latitude}&&description=${description}&&date_ao=${date_ao}&&typologie_marche=${typologie_marche}&&typologie_operation=${typologie_operation}&&nb_eleve=${nb_eleve}&&nb_classe=${nb_classe}&&nb_salle=${nb_salle}&&nb_logement=${nb_logement}&&nb_bureaux=${nb_bureaux}&&nb_chambre=${nb_chambre}&&nb_commerce=${nb_commerce}&&nb_parking_infra=${nb_parking_infra}&&nb_parking_int_super=${nb_parking_int_super}&&nb_parking_ext=${nb_parking_ext}&&s_locaux_tech=${s_locaux_tech}&&s_locaux_annexe=${s_locaux_annexe}&&shab=${shab}&&su=${su}&&sdo=${sdo}&&sdp=${sdp}&&nb_niv_infra=${nb_niv_infra}&&nb_niv_super=${nb_niv_super}&&emprise_parcelle=${emprise_parcelle}&&s_espace_vert=${s_espace_vert}&&s_mineral=${s_minerale}&&emprise_sol=${emprise_sol}&&s_toiture=${s_toiture}&&emprise_facade=${emprise_facade}&&s_facade=${s_facade}&&s_vitrage=${s_vitrage}&&fini=${finie.id}`);
    }
}

async function add_modif_article() {
    var container = document.getElementById("navigation d'ajout d'article");
    var container_bis = document.getElementById("article " + container.childNodes[3].childNodes[11].childNodes[3].value);
    var string = "";

    if (!httpRequest)
            console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete_nothing;
    httpRequest.open('POST', '/home/:operation/modif_article', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`quantite=${container.childNodes[3].childNodes[5].childNodes[3].value}&&prix_u=${container.childNodes[3].childNodes[7].childNodes[3].value}&&prix_t=${container.childNodes[3].childNodes[9].childNodes[3].value}&&tva=${container.childNodes[3].childNodes[13].childNodes[3].value}&&id=${container.childNodes[3].childNodes[11].childNodes[3].value}`);
    console.log(container_bis.childNodes[3].childNodes[0].textContent);
    string = await beautiful_number(container.childNodes[3].childNodes[5].childNodes[3].value);
    container_bis.childNodes[3].childNodes[0].textContent = string;
    string = await beautiful_number(container.childNodes[3].childNodes[7].childNodes[3].value);
    container_bis.childNodes[4].childNodes[0].textContent = string;
    string = await beautiful_number(container.childNodes[3].childNodes[9].childNodes[3].value);
    container_bis.childNodes[5].childNodes[0].textContent = string;
    string = await beautiful_number(container.childNodes[3].childNodes[13].childNodes[3].value);
    container_bis.childNodes[6].childNodes[0].textContent = string;
    await load_totale_value_lot(container_bis.parentNode);
    await load_totale_value_op();
    cancel_slide_modif_article();
    return;
}

function delete_article() {
    var container = document.getElementById("navigation d'ajout d'article");
    var container_bis = document.getElementById("article " + container.childNodes[3].childNodes[11].childNodes[3].value);

    httpRequest.onreadystatechange = requete_nothing;
    httpRequest.open('POST', '/home/:operation/del_article', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`id=${container.childNodes[3].childNodes[11].childNodes[3].value}`);
    container_bis.remove();
    cancel_slide_modif_article();
    return;
}

function add_entreprise() {
    var input = document.getElementById("Nom entreprise");

    if (!httpRequest)
            console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete_nothing;
    httpRequest.open('POST', '/home/:operation/add_entreprise', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`nom=${input.value}`);
    cancel_slide_entreprise();
}

async function create_arborescence() {
    var container = document.getElementById("aborescence article");
    var options = document.createElement('div');
    var text = document.createElement('div');
    var img = document.createElement('img');
    var select = document.createElement('select');
    var option_select = document.createElement('option');
    var container_select;
    var liste;
    var temp;

    if (!httpRequest)
            console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete_arbre;
    httpRequest.open('POST', '/home/:operation/get_section', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();
    container_select = document.getElementById("container selection section");
    select.className = "selection section";
    select.addEventListener('click', selection_theme);
    container_select.appendChild(select);
    for (i = 0; i < arbre.length; i++) {
        options = document.createElement('div');
        text = document.createElement('div');
        img = document.createElement('img');
        options.className = "option filtrage section";
        text.className = "texte section";
        img.src = "/image/add_bis.png";
        img.className = "deploiement";
        img.id = "plus";
        options.id = "Section " + arbre[i].ID;
        options.style.height = "20px";
        text.appendChild(img);
        text.innerHTML += arbre[i].NOM;
        options.appendChild(text);
        text.onclick = deploiement_arbre;
        container.appendChild(options);
        option_select = document.createElement('option');
        option_select.id = "selection section option " + arbre[i].ID;
        option_select.textContent = arbre[i].NOM;
        select.appendChild(option_select);
    }
    container_select = document.getElementById("container selection theme");
    temp = document.getElementsByClassName("option filtrage section");
    for (i = 0; i < temp.length; i++) {
        httpRequest.onreadystatechange = requete_arbre;
        httpRequest.open('POST', '/home/:operation/get_theme', false);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpRequest.send(`id=${temp[i].id.substring(8)}`);
        liste = document.createElement('div');
        liste.className = "liste options filtrage theme";
        temp[i].appendChild(liste);
        select = document.createElement('select');
        select.className = "selection theme";
        select.id = "select theme of section " + temp[i].id.substring(8);
        select.addEventListener('click', selection_chapitre);
        container_select.appendChild(select);
        for (j = 0; j < arbre.length; j++) {
            options = document.createElement('div');
            text = document.createElement('div');
            img = document.createElement('img');
            options.className = "option filtrage theme";
            text.className = "texte theme";
            img.src = "/image/add_bis.png";
            img.className = "deploiement";
            img.id = "plus";
            options.id = "Theme " + arbre[j].ID;
            options.style.height = "20px";
            text.appendChild(img);
            text.innerHTML += arbre[j].NOM;
            text.onclick = deploiement_arbre;
            options.appendChild(text);
            liste.appendChild(options);
            option_select = document.createElement('option');
            option_select.id = "selection theme option " + arbre[j].ID;
            option_select.textContent = arbre[j].NOM;
            select.appendChild(option_select);
        }
    }
    container_select = document.getElementById("container selection chapitre");
    temp = document.getElementsByClassName("option filtrage theme");
    for (i = 0; i < temp.length; i++) {
        httpRequest.onreadystatechange = requete_arbre;
        httpRequest.open('POST', '/home/:operation/get_chapitre', false);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpRequest.send(`id=${temp[i].id.substring(6)}`);
        liste = document.createElement('div');
        liste.className = "liste options filtrage chapitre";
        temp[i].appendChild(liste);
        select = document.createElement('select');
        select.className = "selection chapitre";
        select.id = "select chapitre of theme " + temp[i].id.substring(6);
        select.addEventListener('click', selection_sous_chapitre);
        container_select.appendChild(select);
        for (j = 0; j < arbre.length; j++) {
            options = document.createElement('div');
            text = document.createElement('div');
            img = document.createElement('img');
            options.className = "option filtrage chapitre";
            text.className = "texte chapitre";
            img.src = "/image/add_bis.png";
            img.className = "deploiement";
            img.id = "plus";
            options.id = "Chapitre " + arbre[j].ID;
            options.style.height = "20px";
            text.appendChild(img);
            text.innerHTML += arbre[j].NOM;
            text.onclick = deploiement_arbre;
            options.appendChild(text);
            liste.appendChild(options);
            option_select = document.createElement('option');
            option_select.id = "selection chapitre option " + arbre[j].ID;
            option_select.textContent = arbre[j].NOM;
            select.appendChild(option_select);
        }
    }
    httpRequest.onreadystatechange = requete_arbre;
    httpRequest.open('POST', '/home/:operation/get_sous_chapitre', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();
    temp = document.getElementsByClassName("option filtrage chapitre");
    container_select = document.getElementById("container selection sous_chapitre");
    for (i = 0; i < temp.length; i++) {
        liste = document.createElement('div');
        liste.className = "liste options filtrage sous_chapitre";
        temp[i].appendChild(liste);
        select = document.createElement('select');
        select.className = "selection sous_chapitre";
        select.id = "select sous_chapitre of chapitre " + temp[i].id.substring(9);
        select.addEventListener('click', selection_prestation);
        container_select.appendChild(select);
        for (j = 0; j < arbre.length; j++) {
            if (arbre[j].ID_CHAPITRE == temp[i].id.substring(9)) {
                options = document.createElement('div');
                text = document.createElement('div');
                img = document.createElement('img');
                options.className = "option filtrage sous_chapitre";
                text.className = "texte sous_chapitre";
                img.src = "/image/add_bis.png";
                img.className = "deploiement";
                img.id = "plus";
                options.id = "Sous_chapitre " + arbre[j].ID;
                options.style.height = "20px";
                text.appendChild(img);
                text.innerHTML += arbre[j].NOM;
                text.onclick = deploiement_arbre;
                options.appendChild(text);
                liste.appendChild(options);
                option_select = document.createElement('option');
                option_select.id = "selection sous_chapitre option " + arbre[j].ID;
                option_select.textContent = arbre[j].NOM;
                select.appendChild(option_select);
            }
        }
    }
    httpRequest.onreadystatechange = requete_arbre;
    httpRequest.open('POST', '/home/:operation/get_prestation', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();
    temp = document.getElementsByClassName("option filtrage sous_chapitre");
    container_select = document.getElementById("container selection prestation");
    for (i = 0; i < temp.length; i++) {
        liste = document.createElement('div');
        liste.className = "liste options filtrage prestation";
        temp[i].appendChild(liste);
        select = document.createElement('select');
        select.className = "selection prestation";
        select.id = "select prestation of sous_chapitre " + temp[i].id.substring(14);
        container_select.appendChild(select);
        for (j = 0; j < arbre.length; j++) {
            if (arbre[j].ID_SOUSCHAPITRE == temp[i].id.substring(14)) {
                options = document.createElement('div');
                text = document.createElement('div');
                img = document.createElement('img');
                options.className = "option filtrage prestation";
                text.className = "texte prestation";
                img.src = "/image/add_bis.png";
                img.className = "deploiement";
                img.id = "plus";
                options.id = "Prestation " + arbre[j].ID;
                options.style.height = "20px";
                text.appendChild(img);
                text.innerHTML += arbre[j].NOM;
                text.onclick = deploiement_arbre;
                options.appendChild(text);
                liste.appendChild(options);
                option_select = document.createElement('option');
                option_select.id = "selection prestation option " + arbre[j].ID;
                option_select.textContent = arbre[j].NOM;
                select.appendChild(option_select);
            }
        }
    }
}

function deploiement_arbre(e) {
    var container = document.getElementById("test");
    var temp
    var int;
    var height = 0;
    var temp;
    var check = 0;

    e.stopPropagation();
    container = this.parentNode;
    if (container.childNodes[0].childNodes[0].id == "plus") {
        if (container.className == "option filtrage prestation") {
            console.log(container);
            container.childNodes[0].childNodes[0].id = "moins";
            container.childNodes[0].childNodes[0].src = "/image/moins.png";
            maj_liste_article(this.parentNode.parentNode.parentNode);
            return;
        }
        temp = container.parentNode;
        for (i = 0; i < temp.childElementCount; i++) {
            if (temp.childNodes[i].childNodes[0].childNodes[0].id == "moins") {
                height = height + parseInt(temp.childNodes[i].style.height.substring(0, temp.childNodes[i].style.height.length - 1)) - 20;
                temp.childNodes[i].childNodes[0].childNodes[0].id = "plus";
                temp.childNodes[i].childNodes[0].childNodes[0].src = "/image/add_bis.png";
                temp.childNodes[i].style.height = "20px";
                temp.childNodes[i].childNodes[1].style.display = "none";
                temp = temp.childNodes[i].childNodes[1];
                i = -1;
                check = 1;
            }
        }
        temp = temp.parentNode;
        if (check == 1) {
            while (1) {
                if (temp.className == "option filtrage section") {
                    break;
                }
                temp = temp.parentNode.parentNode;
                temp.style.height = `${parseInt(temp.style.height.substring(0, temp.style.height.length - 1)) - height}px`;
            }
        }
        height = parseInt(container.style.height.substring(0, container.style.height.length - 1)) + (30 * (container.childNodes[container.childElementCount - 1].childElementCount));
        container.style.height = `${parseInt(container.style.height.substring(0, container.style.height.length - 1)) + (30 * (container.childNodes[container.childElementCount - 1].childElementCount))}px`;
        container.childNodes[container.childElementCount - 1].style.display = "flex";
        container.childNodes[0].childNodes[0].id = "moins";
        container.childNodes[0].childNodes[0].src = "/image/moins.png";
        while (1) {
            if (container.className == "option filtrage section") {
                break;
            }
            container = container.parentNode;
            container.style.height = `${parseInt(container.style.height.substring(0, container.style.height.length - 1)) + (height - 20)}px`;
        }
        maj_liste_article(this.parentNode);
    }
    else {
        if (container.className == "option filtrage prestation") {
            console.log(container);
            container.childNodes[0].childNodes[0].id = "plus";
            container.childNodes[0].childNodes[0].src = "/image/add_bis.png";
            maj_liste_article(this.parentNode.parentNode.parentNode);
            return;
        }
        height = container.style.height.substring(0, container.style.height.length - 2);
        console.log(height);
        container.style.height = `20px`;
        container.childNodes[container.childElementCount - 1].style.display = "none";
        container.childNodes[0].childNodes[0].id = "plus";
        container.childNodes[0].childNodes[0].src = "/image/add_bis.png";
        temp = container;
        temp = temp.childNodes[1];
        for (i = 0; i < temp.childElementCount; i++) {
            if (temp.childNodes[i].childNodes[0].childNodes[0].id == "moins") {
                temp.style.display = "none";
                temp.childNodes[i].childNodes[0].childNodes[0].id = "plus";
                temp.childNodes[i].childNodes[0].childNodes[0].src = "/image/add_bis.png";
                temp.childNodes[i].style.height = "20px";
                temp.childNodes[i].childNodes[1].style.display = "none";
                temp = temp.childNodes[i].childNodes[1];
                i = -1;
            }
        }
        while (1) {
            if (container.className == "option filtrage section") {
                break;
            }
            container = container.parentNode.parentNode;
            container.style.height = `${parseInt(container.style.height.substring(0, container.style.height.length - 1)) - (height - 20)}px`;
        }
        maj_liste_article(this.parentNode.parentNode.parentNode);
    }
}

function create_tram() {
    var container;

    for (i = 0; i < tram.length; i++) {
        container = create_element_tram(tram[i]);
        element_result.push([tram[i].ID, tram[i].ID_SECTION, tram[i].ID_THEME, tram[i].ID_CHAPITRE, tram[i].ID_SOUS_CHAPITRE, tram[i].ID_PRESTATION, tram[i].NOM, tram[i].PRESTATION, container, tram[i].U]);
    }
}

function select_article(e) {
    e.stopPropagation();

    if (this.id == "not") {
        this.id = "select";
    }
    else {
        this.id = "not";
    }
}

function select_lot(e) {
    var container = document.getElementById(this.parentNode.parentNode.parentNode.parentNode.id.substring(4));
    var temp = this.parentNode.parentNode.parentNode.parentNode;
    e.stopPropagation();

    if (this.id == "not") {
        this.id = "select";
        container.childNodes[0].src = "/image/check_lot.png";
        container.childNodes[2].style.display = "none";
        temp.childNodes[0].childNodes[0].childNodes[0].childNodes[1].setAttribute('disabled', true);
        temp.childNodes[0].childNodes[0].childNodes[1].childNodes[1].setAttribute('disabled', true);
        temp.childNodes[0].childNodes[0].childNodes[2].childNodes[1].setAttribute('disabled', true);
        temp.childNodes[0].childNodes[0].childNodes[3].childNodes[1].setAttribute('disabled', true);
    }
    else {
        this.id = "not";
        container.childNodes[0].src = "/image/lot.png";
        container.childNodes[2].style.display = "flex";
        temp.childNodes[0].childNodes[0].childNodes[0].childNodes[1].removeAttribute('disabled');
        temp.childNodes[0].childNodes[0].childNodes[1].childNodes[1].removeAttribute('disabled');
        temp.childNodes[0].childNodes[0].childNodes[2].childNodes[1].removeAttribute('disabled');
        temp.childNodes[0].childNodes[0].childNodes[3].childNodes[1].removeAttribute('disabled');
    }
}

function select_lot_bis(container_bis) {
    var container = document.getElementById(container_bis.parentNode.parentNode.parentNode.parentNode.id.substring(4));
    var temp = container_bis.parentNode.parentNode.parentNode.parentNode;

    if (container_bis.id == "not") {
        container_bis.id = "not";
        container.childNodes[0].src = "/image/lot.png";
        container.childNodes[2].style.display = "flex";
        temp.childNodes[0].childNodes[0].childNodes[0].childNodes[1].setAttribute('disabled', true);
        temp.childNodes[0].childNodes[0].childNodes[1].childNodes[1].setAttribute('disabled', true);
        temp.childNodes[0].childNodes[0].childNodes[2].childNodes[1].setAttribute('disabled', true);
        temp.childNodes[0].childNodes[0].childNodes[3].childNodes[1].setAttribute('disabled', true);
    }
    else {
        container_bis.id = "select";
        container.childNodes[0].src = "/image/check_lot.png";
        container.childNodes[2].style.display = "none";
    }
}

function select_operation(e) {
    var container = document.getElementById("main information of the list of the operation");
    var check = document.getElementById("box validation de l'operation").childNodes[3];
    var temp = document.getElementsByClassName("input generale");
    var temp_bis = document.getElementsByClassName("input generale_bis");

    if (check.id == "not") {
        check.id = "select";
        container.childNodes[3].src = "/image/check_operation.png";
        for (i = 0; i < temp.length; i++) {
            temp[i].setAttribute('disabled', true);
        }
        for (i = 0; i < temp_bis.length; i++) {
            temp_bis[i].setAttribute('disabled', true);
        }
    }
    else {
        check.id = "not";
        container.childNodes[3].src = "/image/operation.png";
        for (i = 0; i < temp.length; i++) {
            temp[i].removeAttribute('disabled');
        }
        for (i = 0; i < temp_bis.length; i++) {
            temp_bis[i].removeAttribute('disabled');
        }
    }
}

function create_element_tram(values) {
    var container = document.getElementById("liste article");
    var article = document.createElement('div');
    var nom_of_article = document.createElement('div');
    var unite_of_article = document.createElement('div');
    var button_of_article = document.createElement('div');
    var input = document.createElement('input');
    var label = document.createElement('label');
    var test = document.createElement('div');
    var section = document.getElementById("selection section option " + values.ID_SECTION).textContent;
    var theme = document.getElementById("selection theme option " + values.ID_SECTION).textContent;
    var chapitre = document.getElementById("selection chapitre option " + values.ID_SECTION).textContent;
    var sous_chapitre = document.getElementById("selection sous_chapitre option " + values.ID_SECTION).textContent;
    var prestation = document.getElementById("selection prestation option " + values.ID_SECTION).textContent;

    test.id = "test box hover";
    test.textContent = section.substring(0, 13) + "/" + theme.substring(0, 13) + "/" + chapitre.substring(0, 13) + "/" + sous_chapitre.substring(0, 13) + "/" + prestation; //13
    label.setAttribute("for", "switch " + values.ID);
    label.id = "not";
    label.addEventListener('click', select_article);
    input.type = "checkbox";
    input.id = "switch " + values.ID;
    button_of_article.className = "selection of article of liste";
    unite_of_article.className = "unite of article of liste";
    unite_of_article.textContent = values.U;
    nom_of_article.className = "nom of article of liste";
    nom_of_article.textContent = values.NOM;
    article.className = "article of liste";
    article.id = "article of list " + values.ID;
    article.addEventListener('mouseover', display_info_on);
    article.addEventListener('mouseout', display_info_off);

    button_of_article.appendChild(input);
    button_of_article.appendChild(label);
    article.appendChild(nom_of_article);
    article.appendChild(unite_of_article);
    article.appendChild(button_of_article);
    article.appendChild(test);
    container.appendChild(article);
    return article;
}

function maj_liste_article(container) {
    var check = document.getElementsByClassName("option filtrage section");

    if (check[0].childNodes[0].childNodes[0].id == "plus" &&
        check[1].childNodes[0].childNodes[0].id == "plus" &&
        check[2].childNodes[0].childNodes[0].id == "plus") {
        for (i = 0; i < element_result.length; i++) {
            element_result[i][8].style.display = "none";
        }
        return;
    }
    if (container.id.substring(0, 2) == "Se") {
        for (i = 0; i < element_result.length; i++) {
            if (container.id.substring(8) == element_result[i][1]) {
                element_result[i][8].style.display = "flex";
            }
            else {
                element_result[i][8].style.display = "none";
            }
        }
    }
    if (container.id.substring(0, 2) == "Th") {
        for (i = 0; i < element_result.length; i++) {
            if (container.id.substring(6) == element_result[i][2]) {
                element_result[i][8].style.display = "flex";
            }
            else {
                element_result[i][8].style.display = "none";
            }
        }
    }
    if (container.id.substring(0, 2) == "Ch") {
        for (i = 0; i < element_result.length; i++) {
            if (container.id.substring(9) == element_result[i][3]) {
                element_result[i][8].style.display = "flex";
            }
            else {
                element_result[i][8].style.display = "none";
            }
        }
    }
    if (container.id.substring(0, 2) == "So") {
        for (i = 0; i < element_result.length; i++) {
            if (container.id.substring(14) == element_result[i][4]) {
                element_result[i][8].style.display = "flex";
            }
            else {
                element_result[i][8].style.display = "none";
            }
        }
    }
    if (container.id.substring(0, 2) == "Pr") {
        for (i = 0; i < element_result.length; i++) {
            if (container.id.substring(11) == element_result[i][5]) {
                element_result[i][8].style.display = "flex";
            }
            else {
                element_result[i][8].style.display = "none";
            }
        }
    }
}

function filtre_element_article() {
    var input = document.getElementById("search bar article").value;

    for (i = 0; i < element_result.length; i++) {
        if (element_result[i][6].toLowerCase().includes(input.toLowerCase()))
          element_result[i][8].style.display = "flex";
        else
          element_result[i][8].style.display = "none";
    }
}

function add_article_to_lot() {
    var temp = document.getElementById("recherche d'article");
    var container = document.getElementById("lot " + temp.className.substring(20));

    console.log(element_result);
    for (i = 0; i < element_result.length; i++) {
        if (element_result[i][8].childNodes[2].childNodes[1].id == "select") {
            create_article_bis([element_result[i][8].id.substring(16), element_result[i][8].childNodes[0].textContent, element_result[i][7], "", "", "", element_result[i][9], "20%"], container.childNodes[2]);
            httpRequest.onreadystatechange = requete_nothing;
            httpRequest.open('POST', '/home/:operation/add_article_to_lot', false);
            httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            httpRequest.send(`id_article=${element_result[i][0]}&&prestation=${element_result[i][7]}&&nom=${element_result[i][8].childNodes[0].textContent}&&id_lot=${temp.className.substring(20)}&&unite=${element_result[i][9]}&&tva=20%`);
        }
    }
    cancel_slide();
}

function create_article_bis(article, container) {
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
    box_article.id = "article " + article[0];
    box_article.addEventListener('click', slide_modif_article);
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
    text_article.textContent = article[1];
    text_prestation.textContent = article[2];
    text_quantite.textContent = article[3];
    text_prix_totale.textContent = article[4];
    text_prix_unitaire.textContent = article[5];
    text_unite.textContent = article[6];
    text_tva.textContent = article[7];

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

function get_valid() {
    var container = document.getElementById("container validation");

    id_delete_lot = this.parentNode.id;
    container.style.display = "flex";
}
function cancel_sup() {
    var update = document.getElementById("container validation");

    update.style.display = "none";
}

function display_info_on(e) {
    e.stopPropagation();

    this.childNodes[3].style.display = "flex";
}

function display_info_off(e) {
    e.stopPropagation();

    this.childNodes[3].style.display = "none";
}

async function maj_totale_article() {
    var quantite = document.getElementById("quantite modif article");
    var prix_unitaire = document.getElementById("prix unitaire modif article");
    var prix_totale = document.getElementById("prix totale modif article");
    var nb = 0;
    var string = "";

    if (quantite.value != "" && prix_unitaire.value != "") {
        nb = parseFloat(quantite.value.replace(' ', '')) * parseFloat(prix_unitaire.value.replace(' ', ''));
        nb = Math.round(nb * 100) / 100;
        string = nb.toString();
        string = await beautiful_number(string);
        prix_totale.value = string;
    }
    else {
        prix_totale.value = "";
    }
}

function verif(evt, accept) {
    var keyCode = evt.which ? evt.which : evt.keyCode;
    if (accept.indexOf(String.fromCharCode(keyCode)) >= 0) {
        return true;
    } else {
        return false;
    }
}

function verif_bis(evt, accept) {
    var keyCode = evt.which ? evt.which : evt.keyCode;

    if (accept.indexOf(String.fromCharCode(keyCode)) >= 0) {
        return true;
    } else {
        preventDefault(evt);
        return false;
    }
}

function preventDefault(e)
{
    e= e || event;
    e.preventDefault? e.preventDefault() : e.returnValue = false;
}

function selection_theme(e) {
    var temp;
    var theme = document.getElementsByClassName("selection theme");
    var chapitre = document.getElementsByClassName("selection chapitre");
    var sous_chapitre = document.getElementsByClassName("selection sous_chapitre");
    var prestation = document.getElementsByClassName("selection prestation");

    e.stopPropagation();
    for (i = 0; i < theme.length; i++) {
        theme[i].style.display = "none";
    }
    for (i = 0; i < chapitre.length; i++) {
        chapitre[i].style.display = "none";
    }
    for (i = 0; i < sous_chapitre.length; i++) {
        sous_chapitre[i].style.display = "none";
    }
    for (i = 0; i < prestation.length; i++) {
        prestation[i].style.display = "none";
    }
    for (i = 0; i < this.childElementCount; i++) {
        if (this.childNodes[i].selected) {
            temp = document.getElementById("select theme of section " + this.childNodes[i].id.substring(25));
            temp.style.display = "flex";
        }
        else {
            temp = document.getElementById("select theme of section " + this.childNodes[i].id.substring(25));
            temp.style.display = "none";
        }
    }
}

function selection_chapitre(e) {
    var temp;
    var chapitre = document.getElementsByClassName("selection chapitre");
    var sous_chapitre = document.getElementsByClassName("selection sous_chapitre");
    var prestation = document.getElementsByClassName("selection prestation");

    e.stopPropagation();
    for (i = 0; i < chapitre.length; i++) {
        chapitre[i].style.display = "none";
    }
    for (i = 0; i < sous_chapitre.length; i++) {
        sous_chapitre[i].style.display = "none";
    }
    for (i = 0; i < prestation.length; i++) {
        prestation[i].style.display = "none";
    }
    for (i = 0; i < this.childElementCount; i++) {
        if (this.childNodes[i].selected) {
            temp = document.getElementById("select chapitre of theme " + this.childNodes[i].id.substring(23));
            temp.style.display = "flex";
        }
        else {
            temp = document.getElementById("select chapitre of theme " + this.childNodes[i].id.substring(23));
            temp.style.display = "none";
        }
    }
}

function selection_sous_chapitre(e) {
    var temp;
    var sous_chapitre = document.getElementsByClassName("selection sous_chapitre");
    var prestation = document.getElementsByClassName("selection prestation");

    e.stopPropagation();
    for (i = 0; i < sous_chapitre.length; i++) {
        sous_chapitre[i].style.display = "none";
    }
    for (i = 0; i < prestation.length; i++) {
        prestation[i].style.display = "none";
    }
    for (i = 0; i < this.childElementCount; i++) {
        if (this.childNodes[i].selected) {
            temp = document.getElementById("select sous_chapitre of chapitre " + this.childNodes[i].id.substring(26));
            temp.style.display = "flex";
        }
        else {
            temp = document.getElementById("select sous_chapitre of chapitre " + this.childNodes[i].id.substring(26));
            temp.style.display = "none";
        }
    }
}

function selection_prestation(e) {
    var temp;
    var prestation = document.getElementsByClassName("selection prestation");

    e.stopPropagation();
    for (i = 0; i < prestation.length; i++) {
        prestation[i].style.display = "none";
    }
    for (i = 0; i < this.childElementCount; i++) {
        if (this.childNodes[i].selected) {
            temp = document.getElementById("select prestation of sous_chapitre " + this.childNodes[i].id.substring(31));
            temp.style.display = "flex";
        }
        else {
            temp = document.getElementById("select prestation of sous_chapitre " + this.childNodes[i].id.substring(31));
            temp.style.display = "none";
        }
    }
}

function add_article_tram() {
    var section = document.getElementsByClassName("selection section");
    var section_nom;
    var theme;
    var theme_nom;
    var chapitre;
    var chapitre_nom;
    var sous_chapitre;
    var sous_chapitre_nom;
    var prestation;
    var prestation_nom;
    var nom = document.getElementById("container selection nom").childNodes[3].value;
    var unite = document.getElementById("container selection unite").childNodes[3].value;

    for (i = 0; i < section[0].childElementCount; i++) {
        if (section[0].childNodes[i].selected) {
            section_nom = section[0].childNodes[i].textContent;
            theme = document.getElementById("select theme of section " + section[0].childNodes[i].id.substring(25));
            break;
        }
    }
    for (i = 0; i < theme.childElementCount; i++) {
        if (theme.childNodes[i].selected) {
            theme_nom = theme.childNodes[i].textContent;
            chapitre = document.getElementById("select chapitre of theme " + theme.childNodes[i].id.substring(23));
            break;
        }
    }
    for (i = 0; i < chapitre.childElementCount; i++) {
        if (chapitre.childNodes[i].selected) {
            chapitre_nom = chapitre.childNodes[i].textContent;
            sous_chapitre = document.getElementById("select sous_chapitre of chapitre " + chapitre.childNodes[i].id.substring(26));
            break;
        }
    }
    for (i = 0; i < sous_chapitre.childElementCount; i++) {
        if (sous_chapitre.childNodes[i].selected) {
            sous_chapitre_nom = sous_chapitre.childNodes[i].textContent;
            prestation = document.getElementById("select prestation of sous_chapitre " + sous_chapitre.childNodes[i].id.substring(31));
            break;
        }
    }
    for (i = 0; i < prestation.childElementCount; i++) {
        if (prestation.childNodes[i].selected) {
            prestation_nom = prestation.childNodes[i].textContent;
            break;
        }
    }
    cancel_slide_add_article_tram();
}

// creer un identifiant a partir de l'aborescence (section, theme, chapitre, sous-chapitre) + identifiant unique
// creer une page pour l'incrementation de l'indice bt