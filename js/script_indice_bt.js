var value;
var date = [];
var indiceNb = [];

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
    for (i = 0; i < value.length; i++)
        date.push(value[i].BT_PARUTION)
    for (i = 0; i < value.length; i++)
        indiceNb.push(value[i].BT_INDICE)
    date.reverse()
    indiceNb.reverse()
    // // Récupérer le contexte du canvas
    // var ctx = document.getElementById('btChart').getContext('2d');

    // // Données factices pour l'exemple
    // var dates = ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01'];
    // var indiceBt = [10, 15, 8, 12, 18];
    
    // // Générer des couleurs aléatoires pour chaque barre
    // function randomColor() {
    //     var letters = '0123456789ABCDEF';
    //     var color = '#';
    //     for (var i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // }

    // var annotationX = 2.5; // Index de la date que vous souhaitez mettre en surbrillance (0-indexed)
    // var annotationY = 12; // Valeur de l'indice Bt

    // // Générer un tableau d'arrière-plans avec des couleurs aléatoires pour chaque barre
    // var backgroundColors = indiceNb.map(function() {
    //     return randomColor();
    // });
    
    // // Créer le graphique
    // var btChart = new Chart(ctx, {
    //     type: 'line', // Utiliser le type 'bar' pour un graphique en barres
    //     data: {
    //         labels: date,
    //         datasets: [{
    //             label: 'Indice Bt (Ligne)',
    //             data: indiceNb,
    //             borderColor: 'rgba(255, 99, 132, 1)', // Couleur de la ligne
    //             backgroundColor: 'rgba(255, 99, 132, 0.2)', // Couleur de fond de la zone sous la ligne
    //             borderWidth: 2,
    //             type: 'line' // Utiliser le type 'line' pour ce jeu de données
    //         }]
    //     },
    //     options: {
    //         responsive: true, // Permet au graphique de s'adapter à la taille de son conteneur
    //         scales: {
    //             y: {
    //                 beginAtZero: true, // Commencer l'axe des Y à zéro
    //                 title: {
    //                     display: true,
    //                     text: 'Indice Bt'
    //                 }
    //             },
    //             x: {
    //                 barPercentage: 0.9 // Ajuster la largeur des barres en pourcentage (60% dans cet exemple)
    //             }
    //         },
    //         plugins: {
    //             zoom: {
    //               zoom: {
    //                 wheel: {
    //                   enabled: true,
    //                 },
    //                 pinch: {
    //                   enabled: true
    //                 },
    //                 mode: 'xy',
    //               }
    //             }
    //         },
    //         annotation: {
    //             drawTime: 'afterDatasetsDraw',
    //             annotations: [{
    //                 type: 'line',
    //                 mode: 'vertical',
    //                 scaleID: 'x',
    //                 value: annotationX,
    //                 borderColor: 'red',
    //                 borderWidth: 2,
    //                 label: {
    //                     enabled: true,
    //                     content: 'Date sélectionnée'
    //                 },
    //                 onMousemove: function(event) {
    //                     if (this.dragging) {
    //                         const xPos = this.chart.scales.x.getValueForPixel(event.x);
    //                         annotationX += xPos - this.dragStartX;
    //                         this.options.value = annotationX;
    //                         this.dragStartX = xPos;
    //                         this.chart.update(0);
    //                     }
    //                 },
    //                 onDragStart: function(event) {
    //                     this.dragging = true;
    //                     this.dragStartX = this.chart.scales.x.getValueForPixel(event.x);
    //                 },
    //                 onDragEnd: function(event) {
    //                     this.dragging = false;
    //                 }
    //             }]
    //         }
    //     }
    // });

    // Données de l'indice Bt et du temps (à remplacer par vos propres données)
    var temps = ["2023-01-01", "2023-02-01", "2023-03-01", "2023-04-01", "2023-05-01"];
    var indiceBt = [100, 110, 120, 130, 140];

    // Récupérez le conteneur du graphique
    var graphContainer = document.getElementById("container Indice");

    // Initialisez le graphique ECharts
    var myChart = echarts.init(graphContainer);

    // Configurez les options du graphique
    var options = {
        title: {
            text: "Évolution de l'indice Bt en fonction du temps"
        },
        xAxis: {
            type: "category",
            data: date
        },
        yAxis: {
            type: "value",
            name: "Indice Bt"
        },
        series: [
            {
            data: indiceNb,
            type: "line"
            }
        ],
        // Ajoutez la propriété 'dataZoom' pour activer le zoom sur l'axe des x
        dataZoom: [
            {
                type: "slider", // Type de contrôle de zoom (slider)
                start: 0, // Position de départ du zoom en pourcentage
                end: 100, // Position de fin du zoom en pourcentage
                onZoomEnd: function(params) {
                    // Récupérez les nouvelles limites du slider
                    var start = params.batch[0].start;
                    var end = params.batch[0].end;
            
                    // Calculer la moyenne des valeurs dans la plage du slider
                    var somme = 0;
                    var count = 0;
                    for (var i = Math.floor(start); i < Math.ceil(end); i++) {
                      somme += indiceNb[i];
                      count++;
                    }
                    var moyenne = somme / count;
            
                    console.log("Moyenne des valeurs dans la plage du slider : " + moyenne);
                }
            },
            {
                type: "inside", // Type de contrôle de zoom à l'intérieur du graphique
                xAxisIndex: 0, // Index de l'axe des x à zoomer (0 par défaut pour le premier axe des x)
                start: 0, // Position de départ du zoom en pourcentage
                end: 100 // Position de fin du zoom en pourcentage
            }
        ],
        tooltip: {
            trigger: "axis", // Affiche le tooltip lorsque vous survolez un point sur l'axe des x
            formatter: "{b}: {c}", // Le texte à afficher dans le tooltip. {b} représente le nom de l'axe des x, {c} représente la valeur du point.
            axisPointer: {
              type: "cross" // Type de pointeur à afficher (cross affiche des lignes horizontales et verticales sur le point survolé)
            }
        },
    };

    // Appliquez les options au graphique
    myChart.setOption(options);
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
    var img = document.createElement('img');

    box.className = "Box Indice";
    text_indice.className = "text indice";
    text_indice.textContent = values.BT_INDICE;
    text_date.className = "text date";
    text_date.textContent = values.BT_PARUTION;
    img.src = "/image/bouton-de-suppression-de-la-poubelle.png";
    img.id = "del";

    box.appendChild(text_indice);
    box.appendChild(text_date);
    container.appendChild(box);
}

async function requete() {
    if (httpRequest.readyState == 4) {
        value = JSON.parse(httpRequest.response);
    }
}