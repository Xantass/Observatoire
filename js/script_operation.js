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
    var image = document.getElementById("1");

    if (lot == 0) {
        for (i = 0; i < box.length; i++) {
            box[i].style.display = "flex";
        }
        image.src = "/image/triangle_haut.png";
        lot = 1;
    }
    else {
        for (i = 0; i < box.length; i++) {
            box[i].style.display = "none";
        }
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
    this.style.backgroundColor = "#45bab85d";
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