// index.js

/**
 * Required External Modules
 */

const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const base64url = require('base64url');
const crypto = require('crypto');

/**
 * App Variables
 */

const app = express();
const port = "3000";
const router = (global.router = (express.Router()));
const login = require("./js/login.js");
const home = require("./js/home.js");
const operation = require("./js/operation.js");
const indice = require("./js/indice_bt.js");
const query = require('./js/db.js').query;

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
app.use('/indice_bt', indice);
app.use('/home/rename', home);
app.use('/home/duplicate', home);
app.use('/home/delete', home);
app.use('/home/direction', home);
app.use('/home/:operation', operation);
app.use(router);
app.use(session({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true,
}));

/**
 * Routes Definitions
 */

app.get("/", async (req, res) => {
    var sql = "DELETE FROM session WHERE TOKEN = ?";

    await query(sql, req.session.id);
    res.status("200");
    res.render('login');
});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});