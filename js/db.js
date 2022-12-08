const mysql = require('mysql');
const util = require('util');

const host_azure = "i2bat.mysql.database.azure.com";
const user_azure = "I2bat";
const password_azure = "dz7@8#%PYP2b";
const database_azure = "observatoire";
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