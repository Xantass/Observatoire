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

connection.on('connect', function(err) {
    console.log("Connected");
});

connection.connect();