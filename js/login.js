/**
 * Required External Modules
 */

const express = require('express');
const bodyParser = require ("body-parser");
const connection = require("./db.js").connection;
const crypto = require('crypto');
const express_session = require('express-session');
const base64url = require('base64url');
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
        var hash = crypto.createHash('sha256').update(req.body.password + req.body.username).digest('hex');
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

 function creation_jeton(nom_utilisateur) {
        var token = base64url(crypto.randomBytes(20)).replace('-', '_');
        var sql = 'INSERT INTO session(nom_utilisateur, token) VALUES(?, ?)';
        var inserts = [nom_utilisateur, token];
        requete_sql = sql.preparer(mysql, requete_sql, inserts);
        sql.requete(mysql, sql, requete_sql, function() {
            socket.emit('redirection', '/token/'+token);
        });
}


module.exports = router;