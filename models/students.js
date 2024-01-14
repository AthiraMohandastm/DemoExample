const mongoose = require('mongoose');


// Define the student model
const studentSchema = new mongoose.Schema({
    
    name: String,
    email: String,
    age: Number,
    classInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student_class',
    },
});

//Add student model as a schema to mongo db 
module.exports = mongoose.model('student', studentSchema);