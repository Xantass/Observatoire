// index.js

/**
 * Required External Modules
 */

const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
var jsdom = require('jsdom');
const cookieParser = require('cookie-parser');

/**
 * App Variables
 */

const app = express();
const port = "3000";
const router = (global.router = (express.Router()));
const login = require("./js/login.js");
const home = require("./js/home.js");
global.array_elem = ["oui", "yes"];

/**
 *  App Configuration
 */

app.use(cookieParser());
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
    res.clearCookie('id');
    res.render('login');
    console.log(res.statusCode);
});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});