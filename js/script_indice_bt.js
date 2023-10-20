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
        date.push(value[i].BT_DATE)
    for (i = 0; i < value.length; i++)
        indiceNb.push(value[i].BT_INDICE)
    date.reverse()
    indiceNb.reverse()
    graphique()
    calInit("calendarMain2", "Calendrier", "champ_date2", "jsCalendar", "day", "selectedDay");
}

function graphique() {
    var annees = [];
    var mois = [];
    date.forEach(function(dates) {
        var dateObj = new Date(dates + "-01"); // Ajoutez "-01" pour assurer que la date est le 1er jour du mois
        var annee = dateObj.getFullYear(); // Obtenez l'année
        var moisEnLettres = dateObj.toLocaleString('fr-FR', { month: 'long' }); // Obtenez le mois en toute lettre
        annees.push(annee);
        mois.push(moisEnLettres);
    });
    // Récupérez le conteneur du graphique
    var graphContainer = document.getElementById("Box container Indice");

    // Initialisez le graphique ECharts
    var myChart = echarts.init(graphContainer);

    // Configurez les options du graphique
    var endMAx = annees.length - 1;
    console.log(endMAx)
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
            },
            {
                type: "inside", // Type de contrôle de zoom à l'intérieur du graphique
                xAxisIndex: 0, // Index de l'axe des x à zoomer (0 par défaut pour le premier axe des x)
                start: 0, // Position de départ du zoom en pourcentage
                end: 100, // Position de fin du zoom en pourcentage
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
    myChart.on('dataZoom', function(params) {
        // Récupérez les nouvelles limites du slider
        var start = myChart.getOption().dataZoom[0].start;
        var end = myChart.getOption().dataZoom[0].end;

        start = Math.floor(start);
        end = Math.ceil(end);

        var finIndice = Math.floor((end / 100) * annees.length);
        var debutIndice = Math.floor((start / 100) * annees.length);
        if (finIndice > annees.length) {
            finIndice = annees.length;
        }
        // Calculer la moyenne des valeurs dans la plage du slider
        var somme = 0;
        var count = 0;
        for (var i = debutIndice; i < finIndice; i++) {
            somme += parseFloat(indiceNb[i]);
            count++;
        }

        var anneeSelectionnees = annees.slice(debutIndice, finIndice + 1); // +1 car end est exclusif
        var moisSelectionnees = mois.slice(debutIndice, finIndice + 1); // +1 car end est exclusif
        var valeursSelectionnees = indiceNb.slice(debutIndice, finIndice + 1);

        var moyenne = valeursSelectionnees[valeursSelectionnees.length - 1] / valeursSelectionnees[0];
        moyenne = moyenne.toFixed(3);
        // Affichez les dates et les valeurs sélectionnées dans un tableau HTML
        var tableau = "<table><tr><th>Année</th><th>Mois</th><th>Valeur</th></tr>";
        for (var i = 0; i < anneeSelectionnees.length; i++) {
            tableau += "<tr><td>" + anneeSelectionnees[i] + "</td><td>" + moisSelectionnees[i] + "</td><td>" + valeursSelectionnees[i] + "</td></tr>";
        }
        tableau += "</table>";

        // Affichez le tableau dans un élément HTML
        var tableauElement = document.getElementById('tableau-selection');
        tableauElement.innerHTML = tableau;

        tableau = "<table><tr><th>Année</th><th>Mois</th><th>Valeur</th></tr>";
        tableau += "<tr><td>" + anneeSelectionnees[0] + "</td><td>" + moisSelectionnees[0] + "</td><td>" + valeursSelectionnees[0] + "</td></tr>";
        tableau += "<tr><td>" + anneeSelectionnees[anneeSelectionnees.length - 1] + "</td><td>" + moisSelectionnees[moisSelectionnees.length - 1] + "</td><td>" + valeursSelectionnees[valeursSelectionnees.length - 1] + "</td></tr>";
        tableau += "</table>";
        tableauElement = document.getElementById('tableau-actualise');
        tableauElement.innerHTML = tableau;
        myChart.setOption({
            graphic: [{
                type: 'text',
                left: 'center',
                top: 20,
                style: {
                    text: 'Bt actualiser : ' + moyenne,
                    textAlign: 'center',
                    fill: '#000',
                    fontSize: 14
                }
            }]
        });
    });
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

function jsSimpleDatePickr(id) {
    var me = this;
    me.dateDisp = new Date();
    me.dateSel = new Date();
    me.dayOrder = '1234560';
    me.dayName = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    me.id = id;
    me.funcDateClic = me.classTable = me.classTd = me.classSelection = '';
    me.setDate = function(dateStr){
        if(!dateStr) return 0;
        var dateArr = dateStr.split('/');
        if(isNaN(dateArr[0])) return 0;
        today = new Date();
        if(isNaN(dateArr[1])) dateArr[1] = today.getMonth();
        else dateArr[1] = parseInt(dateArr[1], 10)-1;
        if(isNaN(dateArr[2])) dateArr[2] = today.getFullYear();
        else if(parseInt(dateArr[2], 10)<100) dateArr[2] = parseInt(dateArr[2], 10)+2000;
        me.dateSel = new Date(dateArr[2], dateArr[1], dateArr[0]);
        me.dateDisp = new Date(dateArr[2], dateArr[1], dateArr[0]);
    }
    me.setMonth = function(val){
        var v = parseInt(val, 10);
        if(val.charAt(0)=='+' || val.charAt(0)=='-') v = me.dateDisp.getMonth()+v;
        me.dateDisp.setMonth(v);
    }
    me.setYear = function(val){
        var v = parseInt(val, 10);
        if(val.charAt(0)=='+' || val.charAt(0)=='-') v = me.dateDisp.getFullYear()+v;
        me.dateDisp.setFullYear(v);
    }
    me.show = function(){
        var nb = today = 0;
        var month = me.dateDisp.getMonth();
        var year = me.dateDisp.getFullYear();
        if(month==me.dateSel.getMonth() && year==me.dateSel.getFullYear()) today = me.dateSel.getDate();
        var h = '<table class="'+me.classTable+'"><tr>';
        for(var i=0; i<7; i++){
            h += '<th>'+me.dayName[me.dayOrder[i]]+'</th>';
        }
        h += '</tr><tr>';
        var d = new Date(year, month, 1);
        for(nb=0; nb<me.dayOrder.indexOf(d.getDay()); nb++){
            h += '<td> </td>';
        }
        d.setMonth(month+1, 0);
        for(i=1; i<=d.getDate(); i++){
            nb++;
            if(nb>7){
                nb = 1;
                h += '</tr><tr>';
            }
            h += '<td class="'+(i==today ? me.classSelection:me.classTd)+'"><a href="#"'+(me.funcDateClic!='' ? ' onclick="'+me.funcDateClic+'(\''+i+'/'+(month+1)+'/'+year+'\', \''+me.id+'\');return false;"':'')+'>'+i+'</a></td>';
        }
        for(i=nb; i<7; i++){
            h += '<td> </td>';
        }
        h += '</tr></table>';
        document.getElementById(me.id).innerHTML = h
    }
}

function calInit(divId, btName, fieldId, classTable, classDay, classSel) {
	calDiv = document.getElementById(divId);
	dateEl = document.getElementById(fieldId);
	// vÃ©rifie l'existance de divId et fieldId
	if(calDiv==undefined || dateEl==undefined) return 0;
	var h = "";
	// si btName est dÃ©finit, un bouton est crÃ©er. En cliquant sur ce bouton le calendrier est affichÃ© / masquÃ©
	// si btName n'est pas dÃ©finit, on attache la fonction calToogle au champ de texte qui contiendra la date
	if(btName=="") dateEl.addEventListener('click', function(){	calToogleFromField(fieldId); }, false);
	else h = '<input type="button" value="'+btName+'" onclick="calToogle('+jsSDPId+');" />';
	// crÃ©er un bloc div qui contient des boutons de navigation, le titre et le bloc dans lequel sera affichÃ© le calendrier
	h += '<div id="calendarWrap'+jsSDPId+'" class="calendarWrap"><ul><li><input type="button" value="&lsaquo;" onclick="calMonthNav('+jsSDPId+', \'-1\');" /></li><li id="calendarTitle'+jsSDPId+'" class="calendarTitle"></li><li><input type="button" value="&rsaquo;" onclick="calMonthNav('+jsSDPId+', \'+1\');" /></li></ul><div id="calendar'+jsSDPId+'"></div></div><div class="spacer"></div>';
	// ajoute le code HTML
	calDiv.innerHTML = h;
	// initialise l'objet jsSimpleDatePickr
	obj = new jsSimpleDatePickr('calendar'+jsSDPId);
	obj.funcDateClic = 'calClick';
	obj.classTable = classTable;
	obj.classTd = classDay;
	obj.classSelection = classSel;
	// sauvegarde l'objet, le champ de texte rattachÃ© et l'id envoyÃ© Ã  jsSimpleDatePickr
	jsSDPObj[jsSDPId] = [obj, fieldId, 'calendar'+jsSDPId];
	jsSDPId++;
	return 1;
}
//
// affiche / masque le calendrier
//
function calToogle(id){
	if(jsSDPObj[id] == undefined) return 0;
	var el = document.getElementById('calendarWrap'+id);
	field = document.getElementById(jsSDPObj[id][1]);
	if(el.style.display=="block"){
		el.style.display = "none";
	}else{
		jsSDPObj[id][0].setDate(String(field.value));
		jsSDPObj[id][0].show('calendar');
		calShowTitle(id);
		el.style.display = "block";
	}
}
//
// affiche / masque le calendrier (clic depuis un champ de texte)
//
function calToogleFromField(fieldId){
	for(var i = 0; i<jsSDPObj.length; i++){
		if(jsSDPObj[i][1]==fieldId){
			calToogle(i);
			break;
		}
	}
}
//
// navigation par mois
//
function calMonthNav(id, val){
	if(jsSDPObj[id] == undefined) return 0;
	jsSDPObj[id][0].setMonth(val);
	jsSDPObj[id][0].show();
	calShowTitle(id);
}
//
// navigation par annÃ©e
//
function calYearNav(id, val){
	if(jsSDPObj[id] == undefined) return 0;
	jsSDPObj[id][0].setYear(val);
	jsSDPObj[id][0].show();
	calShowTitle(id);
}
//
// callback : gÃ¨re une clic sur une date
//
function calClick(dateStr, id){
	// cherche l'objet
	for(var i = 0; i<jsSDPObj.length; i++){
		if(jsSDPObj[i][2]==id){
			id = i;
			break;
		}
	}
	if(jsSDPObj[id] == undefined) return 0;
	var dateArr = dateStr.split('/');
	if(parseInt(dateArr[0], 10)<10) dateArr[0] = '0'+dateArr[0];
	if(parseInt(dateArr[1], 10)<10) dateArr[1] = '0'+dateArr[1];
	field = document.getElementById(jsSDPObj[id][1]);
	field.value = dateArr[2]+'-'+dateArr[1];
	document.getElementById('calendarWrap'+id).style.display = "none";
}
//
// affiche le titre
//
function calShowTitle(id){
	if(jsSDPObj[id] == undefined) return 0;
	document.getElementById('calendarTitle'+id).innerHTML = ' '+jsSDPMonthName[jsSDPObj[id][0].dateDisp.getMonth()]+' '+jsSDPObj[id][0].dateDisp.getFullYear()+' ';
}
//
// crÃ©e l'objet jsSimpleDatePickr
var jsSDPObj = Array();
var jsSDPId = 0;
var jsSDPMonthName = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'];