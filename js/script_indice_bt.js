var value;

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

function load() {
    httpRequest = new XMLHttpRequest();
    if (!httpRequest)
      console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete;
    httpRequest.open('POST', '/indice_bt/get_indice', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();
    for (i = 0; i < value.length; i++) {
        create_box_indice(value[i]);
    }
}

function slide_indice() {
    var container = document.getElementById("navigation d'ajout d'indice");

    container.style.marginLeft = `${window.innerWidth - 440}px`;
}

function cancel_slide_indice() {
    var container = document.getElementById("navigation d'ajout d'indice");

    container.style.marginLeft = `${window.innerWidth}px`;
    container.childNodes[3].childNodes[1].childNodes[3].value = "";
}

function ajout_indice() {
    var indice = document.getElementById("indice").value;
    var date_parution = document.getElementById("date parution").value;
    var date_bt = document.getElementById("date bt").value;

    if (!httpRequest)
      console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete;
    httpRequest.open('POST', '/indice_bt/add_indice', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`indice=${indice}&&date_parution=${date_parution}&&date_bt=${date_bt}`);
    cancel_slide_indice();
}

function create_box_indice(values) {
    var container = document.getElementById("List Indice");
    var box = document.createElement('div');
    var text_indice = document.createElement('div');
    var text_date = document.createElement('div');

    box.className = "Box Indice";
    text_indice.className = "text indice";
    text_indice.textContent = values.BT_INDICE;
    text_date.className = "text date";
    text_date.textContent = values.BT_PARUTION;

    box.appendChild(text_indice);
    box.appendChild(text_date);
    container.appendChild(box);
}

async function requete() {
    if (httpRequest.readyState == 4) {
        value = JSON.parse(httpRequest.response);
    }
}