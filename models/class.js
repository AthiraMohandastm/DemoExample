const mongoose = require('mongoose');


// Define the class model
const studentClassSchema = new mongoose.Schema({
    standard: String,
    division: String,
});

//Add student model as a schema to mongo db 
module.exports = mongoose.model('student_class', studentClassSchema);