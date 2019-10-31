const Teacher = require('../models/teacher.model.js');

// Create and Save a new teacher
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Teacher content can not be empty"
        });
    }

    // Create a Note
    const datas = new Teacher({
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        salary: req.body.salary,
        email: req.body.email,
        phone: req.body.phone,
        mainSubject: req.body.mainSubject
    });
console.log(datas);

    //Save Note in the database
    datas.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Teacher."
        });
    });
};

// Retrieve and return all teachers from the database.
exports.findAll = (req, res) => {
    Teacher.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving teacher data."
        });
    });
};

// Find a single teacher with a teacherId
exports.findOne = (req, res) => {
    Teacher.findById(req.params.teacherId)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Teacher data not found with id " + req.params.teacherId
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Teacher data not found with id " + req.params.teacherId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Teacher data with id " + req.params.teacherId
        });
    });
};

// Update a teacher identified by the teacherId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Teacher content can not be empty"
        });
    }

    // Find note and update it with the request body
    Teacher.findByIdAndUpdate(req.params.teacherId, {
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        salary: req.body.salary,
        email: req.body.email,
        phone: req.body.phone,
        mainSubject: req.body.mainSubject
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Teacher data not found with id " + req.params.teacherId
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Teacher data not found with id " + req.params.teacherId
            });                
        }
        return res.status(500).send({
            message: "Error updating Teacher data with id " + req.params.teacherId
        });
    });
};

// Delete a teacher with the specified teacherId in the request
exports.delete = (req, res) => {
    Teacher.findByIdAndRemove(req.params.teacherId)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Teacher data not found with id " + req.params.teacherId
            });
        }
        res.send({message: "Teacher deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Teacher not found with id " + req.params.teacherId
            });                
        }
        return res.status(500).send({
            message: "Could not delete teacher with id " + req.params.teacherId
        });
    });
};