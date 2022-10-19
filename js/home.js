/**
 * Required External Modules
 */

 const express = require('express');
 const path = require("path");

 /**
   * App Variables
   */

 const app = express();
 const router = global.router;

 /**
   *  App Configuration
   */

 /**
   * Routes Definitions
   */

router.get("/home", (req, res) => {
    if (id_check == -1) {
        res.redirect('http://localhost:3000');
    }
    else {
        const id_user = id_check;
        id_check = -1;
        console.log("HOMMMME !!!!!!!");
        console.log(id_user);
        res.render('home');
    }
});

 /**
   * Server Activation
   */



 module.exports = router;