// index.js

/**
 * Required External Modules
 */

const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');

/**
 * App Variables
 */

const app = express();
const port = "3000";
const router = (global.router = (express.Router()));
const login = require("./js/login.js");
const home = require("./js/home.js");
global.id_check = -1;

/**
 *  App Configuration
 */

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, ".")));
app.use('/login', login);
app.use('/home', home);
app.use(router);

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
    console.log("LOGIN !!!!");
    id_check = -1;
    res.render('login');
});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

function slide_right_dashboard () {
    var dashboard = document.getElementById("shadow Dashboard");
    dashboard.style.transform = "translateX(+0px)";
    var main = document.getElementById("main box");
    main.style.marginLeft = "275px";
}

function slide_left_dashboard() {
    var dashboard = document.getElementById("shadow Dashboard")
    dashboard.style.transform = "translateX(-203px)";
    var main = document.getElementById("main box");
    main.style.marginLeft = "72px";
}