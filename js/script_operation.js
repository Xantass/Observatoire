var past = 0;
var lot = 0;
let lot_e;
let projet_e;
let image_e;

function load_data() {
    console.log("DATA");
    lot_e = document.getElementsByClassName("container of the lot");
    projet_e = document.getElementById("main information of the list of the operation");
    image_e = document.getElementById("1");

    for (i = 0; i < lot_e.length; i++) {
        lot_e[i].addEventListener('click', change_background);
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
    var input = document.getElementById("text title header of the main box");
    var box_title = document.getElementById("shape");

    console.log("FOCUS");
    past = 1;
    input.removeAttribute("readonly");
    input.focus();
    box_title.style.strokeWidth = "4px";
    box_title.style.strokeDashoffset = "0";
    box_title.style.strokeDasharray = "1840";
}

function reset () {
    var box_title = document.getElementById("shape");
    var input = document.getElementById("text title header of the main box");

    console.log("RESET");
    if (past == 0) {
        box_title.style.strokeWidth = "5px";
        box_title.style.strokeDashoffset = "1050";
        box_title.style.strokeDasharray = "740 1240";
        input.setAttribute("readonly", "readonly");
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

    e.stopPropagation();
    projet_background.style.background = "none";
    for (i = 0; i < lot_background.length; i++) {
        lot_background[i].style.background = "none";
    }
    this.style.backgroundColor = "#45bab85d";
}