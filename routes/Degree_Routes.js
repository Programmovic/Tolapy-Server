const express = require('express');
const Degree = require('../models/degree');
const Student = require('../models/student');

const degreeRouter = express.Router();

// =============================================================================
// CREATE DEGREE API
// =============================================================================
degreeRouter.post('/', async (req, res) => {
    try {
        const newDegree = new Degree(req.body);
        await newDegree.save();
        res.status(201).json(newDegree);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create degree', error });
    }
});

// =============================================================================
// GET ALL DEGREES
// =============================================================================
degreeRouter.get('/', async (req, res) => {
    try {
        const degrees = await Degree.find();
        res.json(degrees);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve DEGREES', error });
    }
});

// =============================================================================
// GET SPECIFIC DEGREE
// =============================================================================
degreeRouter.get('/:id', async (req, res) => {
    try {
        const degree = await Degree.findById(req.params.id);

        if (!degree) {
            return res.status(404).json({ message: 'DEGREE not found' });
        }

        res.json(degree);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve DEGREE', error });
    }
});

// =============================================================================
// UPDATE SPECIFIC DEGREE
// =============================================================================
degreeRouter.put('/:id', async (req, res) => {
    try {
        const degree = await Degree.findById(req.params.id);

        if (!degree) {
            return res.status(404).json({ message: 'DEGREE not found' });
        }

        Object.assign(degree, req.body);
        await degree.save();

        res.json(degree);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update DEGREE', error });
    }
});

// =============================================================================
// DELETE SPECIFIC DEGREE
// =============================================================================
degreeRouter.delete('/:id', async (req, res) => {
    try {
        const degree = await Degree.findByIdAndDelete(req.params.id);

        if (!degree) {
            return res.status(404).json({ message: 'DEGREE not found' });
        }
        res.json({ message: 'DEGREE deleted successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});


module.exports = degreeRouter;