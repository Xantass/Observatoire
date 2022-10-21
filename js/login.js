/**
 * Required External Modules
 */

const express = require('express');
const bodyParser = require ("body-parser");
const connection = require("./db.js").connection;

/**
  * App Variables
  */

const app = express();
const router = global.router;

/**
  *  App Configuration
  */

 app.use(bodyParser.json());

/**
  * Routes Definitions
  */

router.post('/login', (req, res) => {
        const sql = "SELECT * FROM user WHERE identifiant=? AND password=?";
        const values = [req.body.username, req.body.password];
        connection.query(sql, values, (err, result) => {
                if (err) {
                        console.error(err);
                        res.status(500).send("internal serveur error");
                        return;
                }
                else {
                        if (result[0] == undefined) {
                                res.redirect('/');
                        }
                        else {
                                res.status(200);
                                res.redirect(`http://localhost:3000/home${result[0].id}`);
                        }
                }
        });
});

/**
  * Server Activation
  */



module.exports = router;