/*
const { Connection, Request } = require("tedious");

const config = {
  authentication: {
    options: {
      userName: "SQL",
      password: "2Avril2002"
    },
    type: "default"
  },
  server: "stage-simonneau.database.windows.net",
  options: {
    database: "Stage Application",
    encrypt: true,
    packetSize: 16368
  }
};

const connection = new Connection(config);

module.exports = {connection};

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err)
    console.error(err.message);

  connection.close();
});

connection.connect();
*/

const mysql = require('mysql');
const util = require('util');

const host_azure = "i2bat.mysql.database.azure.com";
const user_azure = "I2bat";
const password_azure = "dz7@8#%PYP2b";
const database_azure = "observatoire";
const host_aws = "observatoire.c0ye4oevn1yn.eu-west-3.rds.amazonaws.com";
const user_aws = "admin";
const password_aws = "2Avril2002";
const database_aws = "Observatoire";
const port = "3306";

const connection = mysql.createConnection({
    port: port,
    host: host_azure,
    user: user_azure,
    password: password_azure,
    database: database_azure
});

const query = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
    if (err) {
      console.error(err);
    }
    else {
    console.log('Connected!');
    }
});

module.exports = {connection, query};