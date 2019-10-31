const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema({
    name: String,
    dob: Date,
    gender: Boolean,
    salary: Number,
    email: String,
    phone: Number,
    mainSubject: String
}, {
    timestamps: true
});

module.exports = mongoose.model('teacher_master', TeacherSchema);