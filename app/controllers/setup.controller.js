let Setup = require('../models/setup.model.js');
let empty = require('is-empty');

exports.create = (req, res) => {
    // Validate request
    if(empty(req.body)) {
        return res.status(400).send({
            message: "Setup content can not be empty"
        });
    }

    // Create a setup
    let setup = new Setup(req.body);

    // Save setup in the database
    setup.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the setup."
        });
    });
};

exports.findAll = (req, res) => {
    Setup.find()
    .then(setups => {
        res.send(setups);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving setup."
        });
    });
};

exports.findOne = (req, res) => {
    Setup.findById(req.params.setupId)
    .then(setup => {
        if(!setup) {
            return res.status(404).send({
                message: "Setup not found with id " + req.params.setupId
            });
        }
        res.send(setup);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Setup not found with id " + req.params.setupId
            });
        }
        return res.status(500).send({
            message: "Error retrieving setup with id " + req.params.setupId
        });
    });
};
