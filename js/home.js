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
    res.render('home');
});

 /**
   * Server Activation
   */


 module.exports = router;