const express = require ("express");
const app = express();
const port = 3000;
const connexion = require("./db.js").config;
const path = require("path");
const router = (global.router = (express.Router()));

app.use(router);
app.use(express.static( "." ));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});