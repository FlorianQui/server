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

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://flox27:sfuG3QDDBX1flTZyViq0JnhDB4fOxZjVrjtSKALg0KeYyoX2lMCbK76aZs1jm8CdPmq2uUxwvKIEQawBw4e0gg%3D%3D@flox27.documents.azure.com:10255/?ssl=true';

var insertDocument = function(db, callback) {
db.collection('families').insertOne( {
        "id": "AndersenFamily",
        "lastName": "Andersen",
        "parents": [
            { "firstName": "Thomas" },
            { "firstName": "Mary Kay" }
        ],
        "children": [
            { "firstName": "John", "gender": "male", "grade": 7 }
        ],
        "pets": [
            { "givenName": "Fluffy" }
        ],
        "address": { "country": "USA", "state": "WA", "city": "Seattle" }
    }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the families collection.");
    callback();
});
};

var findFamilies = function(db, callback) {
var cursor =db.collection('families').find( );
cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
        console.dir(doc);
    } else {
        callback();
    }
});
};

var updateFamilies = function(db, callback) {
db.collection('families').updateOne(
    { "lastName" : "Andersen" },
    {
        $set: { "pets": [
            { "givenName": "Fluffy" },
            { "givenName": "Rocky"}
        ] },
        $currentDate: { "lastModified": true }
    }, function(err, results) {
    console.log(results);
    callback();
});
};

var removeFamilies = function(db, callback) {
db.collection('families').deleteMany(
    { "lastName": "Andersen" },
    function(err, results) {
        console.log(results);
        callback();
    }
);
};

MongoClient.connect(url, function(err, client) {
assert.equal(null, err);
var db = client.db('familiesdb');
insertDocument(db, function() {
    findFamilies(db, function() {
    updateFamilies(db, function() {
        removeFamilies(db, function() {
            client.close();
        });
    });
    });
});
});
