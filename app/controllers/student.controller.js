const Student = require('../models/student.model.js');

// Create and Save a new Student
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Create a Student
    const datas = new Student({
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        dob: req.body.dob,
        gender: req.body.gender,
        phone: req.body.phone,
        teacherId: req.body.teacherId
    });
console.log(datas);

    //Save Student in the database
    datas.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Student."
        });
    });
};

// Retrieve and return all Student from the database.
exports.findAll = (req, res) => {
    Student.find({teacherId: req.body.teacherId})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Student data."
        });
    });
};

// Find a single Student with a studentId
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Student data not found with id " + req.params.studentId
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student data not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Student data with id " + req.params.studentId
        });
    });
};

// Update a Student identified by the studentId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Find note and update it with the request body
    Student.findByIdAndUpdate(req.params.studentId, {
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        dob: req.body.dob,
        gender: req.body.gender,
        phone: req.body.phone,
        teacherId: req.body.teacherId
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Student data not found with id " + req.params.studentId
            });
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student data not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error updating Student data with id " + req.params.studentId
        });
    });
};

// Delete a Student with the specified studentId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Student data not found with id " + req.params.studentId
            });
        }
        res.send({message: "Student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Student with id " + req.params.studentId
        });
    });
};