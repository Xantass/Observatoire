var value;
var id_entreprise;
var entreprise;
var httpRequest;
var nothing;

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
    httpRequest.open('POST', '/entreprise/get_entreprise', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send();
    for (i = 0; i < value.length; i++) {
        create_box_entreprise(value[i]);
    }
}

function slide_entreprise() {
    var container = document.getElementById("navigation d'ajout d'entreprise");

    container.style.marginLeft = `${window.innerWidth - 440}px`;
}

function cancel_slide_entreprise() {
    var container = document.getElementById("navigation d'ajout d'entreprise");

    container.style.marginLeft = `${window.innerWidth}px`;
    container.childNodes[3].childNodes[1].childNodes[3].value = "";
}

function ajout_entreprise() {
    var nom = document.getElementById("nom").value;
    var adresse = document.getElementById("adresse").value;

    if (!httpRequest)
      console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete;
    httpRequest.open('POST', '/entreprise/add_entreprise', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`nom=${nom}&&adresse=${adresse}`);
    cancel_slide_entreprise();
}

function create_box_entreprise(values) {
    var container = document.getElementById("List Entreprise");
    var box = document.createElement('div');
    var text_nom = document.createElement('div');
    var text_adresse = document.createElement('div');
    var img = document.createElement('img');

    box.className = "Box Entreprise";
    box.id = values.ID;
    text_nom.className = "text entreprise";
    text_nom.textContent = values.NOM;
    text_adresse.className = "text adresse";
    text_adresse.textContent = values.ADRESSE;
    img.src = "/image/bouton-de-suppression-de-la-poubelle.png";
    img.id = "del";
    img.addEventListener('click', get_valid);

    box.appendChild(text_nom);
    box.appendChild(text_adresse);
    box.appendChild(img);
    container.appendChild(box);
}

function get_valid(e) {
    var container = document.getElementById("container validation");

    e.stopPropagation();
    id_entreprise = this.parentNode.id;
    entreprise = this.parentNode.childNodes[0].textContent;
    container.style.display = "flex";
}

function cancel_sup() {
    var update = document.getElementById("container validation");

    update.style.display = "none";
}

function delete_entreprise() {
    var container_bis = document.getElementById(id_entreprise);

    httpRequest = new XMLHttpRequest();
    if (!httpRequest)
            console.log("NO REQUEST");
    httpRequest.onreadystatechange = requete_nothing;
    httpRequest.open('POST', '/entreprise/delete_entreprise', false);
    httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpRequest.send(`id=${id_entreprise}&&nom=${entreprise}`);
    if (nothing[0] != undefined) {
        Swal.fire({icon: 'warning', title: 'Entreprise lies a un lot', showConfirmButton: false, timer: 1200});
    }
    else {
        Swal.fire({icon: 'error', title: 'Entreprise supprimer', showConfirmButton: false, timer: 1200});
        container_bis.remove();
    }
    cancel_sup();
}

async function requete() {
    if (httpRequest.readyState == 4) {
        value = JSON.parse(httpRequest.response);
    }
}

async function requete_nothing() {
    if (httpRequest.readyState == 4) {
        nothing = JSON.parse(httpRequest.response);
    }
}