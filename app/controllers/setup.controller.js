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
        res.status(200).json(setups);
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

exports.update = (req, res) => {
    // Validate Request
    if(empty(req.body)) {
        return res.status(400).send({
            message: "Setup content can not be empty"
        });
    }
    let newSetup = new Setup(req.body);
    newSetup._id = req.params.setupId;
    // Find setup and update it with the request body
    Setup.findByIdAndUpdate(req.params.setupId, newSetup)
    .then(setup => {
        if(!setup) {
            return res.status(404).send({
                message: "setup not found with id " + req.params.setupId
            });
        }
        res.send(setup);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Setup not found with id " + req.params.setupId
            });
        }
        console.log(err.kind);
        return res.status(500).send({
            message: "Error updating setup with id " + req.params.setupId
        });
    });
};

exports.delete = (req, res) => {
    Setup.findByIdAndRemove(req.params.setupId)
    .then(setup => {
        if(!setup) {
            return res.status(404).send({
                message: "Setup not found with id " + req.params.setupId
            });
        }
        res.send({message: "setup deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "setup not found with id " + req.params.setupId
            });
        }
        return res.status(500).send({
            message: "Could not delete setup with id " + req.params.setupId
        });
    });
};
