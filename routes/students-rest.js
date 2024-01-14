const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
const Student = require('../models/students');
const Class = require('../models/class');


// Create the POST endpoint
/**
 * @swagger
 * /students/create-student:
 *   post:
 *     summary: create a new student 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Hello, Swagger!
 */
router.post('/create-student', async (req, res) => {
    try {


        const { classInfo, ...studentData } = req.body;
        console.log(classInfo)
        const existingClass = await Class.findById(classInfo);
        if (!existingClass) {
             return res.status(404).json({ error: 'Class not found.' });
        }
        const student = new Student({ ...studentData, classInfo: existingClass._id });
        const savedStudent = await student.save();
        res.status(201).json(savedStudent);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating student' });
    }
});


/**
 * @swagger
 * /students/update-student/:id :
 *   put:
 *     summary: update an existing student with ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Hello, Swagger!
 */
router.put('/update-student/:id', async (req,rs) => {
    try{
        const studentId = req.params.id

        const { classInfo, ...updatedData } = req.body;

        console.log(req.body)
       
        if(studentId == undefined){
            rs.status(400).json({message : 'Please provide a valid student id'});
        }
      
        if(updatedData == undefined){
            rs.status(400).json({message : 'Please provide a valid student details'});
        }  

        console.log(classInfo)
       // if(classInfo != undefined){
            const existingClass = await Class.findById(classInfo);
            if (!existingClass) {
              return res.status(404).json({ error: 'Class not found.' });
            }
       // }

        const updatedStudent = await Student.findByIdAndUpdate(studentId,
            { ...updatedData, classInfo: existingClass },
            { new: true, runValidators: true }
          );


         if (!updatedStudent) {
            return rs.status(404).json({ error: 'Student not found.' });
          }
      
          rs.json(updatedStudent); 
    }catch(err){
        console.error(err);
        rs.status(500).json({ message: 'Error updating student' });
    }
});


//3. Delete students
/**
 * @swagger
 * /students/delete-student/:id :
 *   delete:
 *     summary: delete an existing student with ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Hello, Swagger!
 */
router.delete('/delete-student/:id', async (req,rs) => {
    try{
        const studentId = req.params.id;
        console.log("student id to delete is "+studentId);

        if(studentId == undefined){
            rs.status(400).json({message : 'Please provide a valid student id'});
        }
   
        const deletedStudent =  await Student.findByIdAndDelete(studentId).exec();

        if (!deletedStudent) {
            return rs.status(404).json({ error: 'Student not found.' });
        }
  
        rs.status(200).json({message : 'Student deleted successfully'});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error deleting student' });
    }

});

//4. List students 
/**
 * @swagger
 * /students/list-students :
 *   get:
 *     summary: list all students
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Hello, Swagger!
 */
router.get('/list-students',async (req,res) =>{

    try{
        // let studentsList = Student.find({}, { __v: 0 ,_id : 0 }).select("id name email age classId").exec();

        let studentsList = await Student.find({}, { __v: 0 }).populate({
            path: 'classInfo',
            model: 'student_class',
            select: '_id standard division', 
            options: { path: 'class' },
        });

        res.status(200).json( await studentsList );
       console.log(studentsList);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error listing student' });
    }

});

module.exports = router;