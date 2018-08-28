const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var env = require('dotenv').load();

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://flox27:sfuG3QDDBX1flTZyViq0JnhDB4fOxZjVrjtSKALg0KeYyoX2lMCbK76aZs1jm8CdPmq2uUxwvKIEQawBw4e0gg%3D%3D@flox27.documents.azure.com:10255/?ssl=true", function (err, client) {
  client.close();
});

var port = process.env.PORT || 1337;

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.send("test ok");
});

require('./app/routes/setup.routes.js')(app);

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 3000");
});
