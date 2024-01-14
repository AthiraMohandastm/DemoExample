const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const ClassDetails = require('../models/class');




// Create the POST endpoint
/**
 * @swagger
 * /class/create-class:
 *   post:
 *     summary: create a new class 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Hello, Swagger!
 */
router.post('/create-class', async (req, res) => {
    try {
        const StudentClass = new ClassDetails(req.body);
        const createdClass = await StudentClass.save();
        res.status(201).json(createdClass);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating class' });
    }
});


/**
 * @swagger
 * /class/update-class/:id:
 *   put:
 *     summary: Update a class with the specified ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Hello, Swagger!
 */
router.put('/update-class/:id', async (req,rs) => {
    try{
        const classId = parseInt(req.params.id, 10);
        const updateData = req.body; 

        if(classId == undefined){
            rs.status(400).json({message : 'Please provide a valid class id'});
        }
      
        if(updateData == undefined){
            rs.status(400).json({message : 'Please provide a valid class details'});
        }  

        //find existing classs 
        const updatedClass = await ClassDetails.findOneAndUpdate({id: classId}, updateData, {
            new: true,
            runValidators: true, 
         });

         if (!updatedClass) {
            return rs.status(404).json({ error: 'Student not found.' });
          }
      
          rs.json(updatedClass); 
    }catch(err){
        console.error(err);
        rs.status(500).json({ message: 'Error updating class' });
    }
});


//3. Delete classs
/**
 * @swagger
 * /class/delete-class/:id:
 *   delete:
 *     summary: Delete a class with the specified ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Hello, Swagger!
 */
router.delete('/delete-class/:id', async (req,rs) => {
    try{
        const classId = req.params.id;
        console.log("class id to delete is "+classId);

        if(classId == undefined){
            rs.status(400).json({message : 'Please provide a valid class id'});
        }
   
        const deletedClass =  await ClassDetails.findOneAndDelete({id: classId}).exec();

        if (!deletedClass) {
            return rs.status(404).json({ error: 'class not found.' });
        }
  
        rs.status(200).json({message : 'class deleted successfully'});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error deleting class' });
    }

});

//4. List classs 

/**
 * @swagger
 * /class/list-class:
 *   get:
 *     summary: Returns all the class
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Hello, Swagger!
 */
router.get('/list-class',async (req,res) =>{

    try{
       let classList = ClassDetails.find({}, { __v: 0 }).select("id name email age").exec();
       res.status(200).json( await classList );
       console.log(classList);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error listing class' });
    }

});




module.exports = router;