const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    fname: String,
    mname: String,
    lname: String,
    dob: Date,
    gender: Boolean,
    phone: Number,
    teacherId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('student_master', StudentSchema);