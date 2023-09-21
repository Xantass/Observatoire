const mysql = require('mysql');
const util = require('util');
require('dotenv').config();

const databaseConfig = {
  host: process.env.HOST_AZURE,
  port: process.env.PORT_AZURE,
  user: process.env.USER_AZURE,
  password: process.env.PASSWORD_AZURE,
  database: process.env.DATABASE_AZURE
};

const connection = mysql.createConnection(databaseConfig);

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