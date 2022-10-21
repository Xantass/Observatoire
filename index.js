// index.js

/**
 * Required External Modules
 */

const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
var jsdom = require('jsdom');

/**
 * App Variables
 */

const app = express();
const port = "3000";
const router = (global.router = (express.Router()));
const login = require("./js/login.js");
const home = require("./js/home.js");
var JSDOM = jsdom.JSDOM;
global.doc = new JSDOM('home.html').window.document;

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
    res.render('login');
});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});