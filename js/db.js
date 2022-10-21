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

const host = "observatoire.c0ye4oevn1yn.eu-west-3.rds.amazonaws.com";
const user = "admin";
const password = "2Avril2002";
const database = "Observatoire";
const port = "3306";

const connection = mysql.createConnection({
    port: port,
    host: host,
    user: user,
    password: password,
    database: database
});

const query = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
    if (err) {
      console.error(err);
    };
    console.log('Connected!');
});

module.exports = {connection, query};