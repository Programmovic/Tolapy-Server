const express = require('express');
const Student = require('../models/student');
const Stage = require('../models/stage');
const studentRouter = express.Router();

// =============================================================================
// // CREATE STUDENT API
// =============================================================================
studentRouter.post('/', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create STUDENT', error });
    }
});
// =============================================================================
// // GET ALL STUDENT
// =============================================================================
studentRouter.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve STUDENTS', error });
    }
});
// =============================================================================
// // GET SPECIFIC STUDENT
// =============================================================================
studentRouter.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: 'STUDENT not found' });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve STUDENT', error });
    }
});
// =============================================================================
// // UPDATE SPECIFIC STUDENT 
// =============================================================================
studentRouter.put('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: 'STUDENT not found' });
        }

        Object.assign(group, req.body);
        await student.save();

        res.json(group);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update STUDENT', error });
    }
});
// =============================================================================
// // DELETE SPECIFIC STUDENT
// =============================================================================
studentRouter.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: 'STUDENT not found' });
        }

        res.json({ message: 'STUDENT deleted successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});
// =============================================================================
// // DELETE ALL GROUPS
// =============================================================================
studentRouter.delete('/', async (req, res) => {
    try {
        const student = await Student.deleteMany();

        res.json({ message: 'STUDENT deleted successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});


module.exports = studentRouter;