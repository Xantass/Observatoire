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
    httpRequest.open('POST', '/client/get_client', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();
    for (i = 0; i < value.length; i++) {
        create_box_client(value[i]);
    }
}

function slide_client() {
    var container = document.getElementById("navigation d'ajout d'client");

    container.style.marginLeft = `${window.innerWidth - 440}px`;
}

function cancel_slide_client() {
    var container = document.getElementById("navigation d'ajout d'client");

    container.style.marginLeft = `${window.innerWidth}px`;
    container.childNodes[3].childNodes[1].childNodes[3].value = "";
}

function ajout_client() {
    var nom = document.getElementById("nom").value;
    var adresse = document.getElementById("adresse").value;
    var abreviation = document.getElementById("abreviation").value;

    if (!httpRequest)
      console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete;
    httpRequest.open('POST', '/client/add_client', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`nom=${nom}&&adresse=${adresse}&&abreviation=${abreviation}`);
    cancel_slide_client();
}

function create_box_client(values) {
    var container = document.getElementById("List Client");
    var box = document.createElement('div');
    var text_nom = document.createElement('div');
    var text_ab = document.createElement('div');
    var text_adresse = document.createElement('div');
    var img = document.createElement('img');

    box.className = "Box Client";
    text_nom.className = "text client";
    text_nom.textContent = values.NOM;
    text_ab.className = "text abreviation";
    text_ab.textContent = values.ABREVIATION;
    text_adresse.className = "text adresse";
    text_adresse.textContent = values.ADRESSE;
    img.src = "/image/bouton-de-suppression-de-la-poubelle.png";
    img.id = "del";

    box.appendChild(text_nom);
    box.appendChild(text_ab);
    box.appendChild(text_adresse);
    box.appendChild(img);
    container.appendChild(box);
}

async function requete() {
    if (httpRequest.readyState == 4) {
        value = JSON.parse(httpRequest.response);
    }
}