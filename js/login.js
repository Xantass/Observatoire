/**
 * Required External Modules
 */

const express = require('express');
const bodyParser = require ("body-parser");
const crypto = require('crypto');
const query = require('./db.js').query;

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

router.post('/login', async (req, res) => {
        var sql = "SELECT * FROM user WHERE identifiant=? AND encrypt=?";
        var hash = crypto.createHash('sha256').update(req.body.password + "salt").digest('hex');
        var values = [req.body.username, hash];
        var result;

        result = await query(sql, values);
        if (result[0] == undefined) {
                res.redirect('/');
                return;
        }
        sql = "INSERT INTO session (TOKEN, UTILISATEUR) VALUES (?, ?)"
        values = [req.cookies['connect.sid'].substring(2, 34), req.body.username];
        result = await query(sql, values);
        res.redirect('/home');
});

/**
  * Server Activation
  */

module.exports = router;