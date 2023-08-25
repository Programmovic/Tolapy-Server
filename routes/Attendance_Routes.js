const express = require('express');
const attendanceRouter = express.Router();
const Attendance = require('../models/attendance');

// Create a new attendance
attendanceRouter.post('/', async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create attendance' });
    }
});

// Get all attendance records
attendanceRouter.get('/', async (req, res) => {
    try {
        const attendance = await Attendance.find();
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve attendance' });
    }
});

// Get a specific attendance record by ID
attendanceRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const attendance = await Attendance.findById(id);
        if (!attendance) {
            return res.status(404).json({ error: 'Attendance not found' });
        }
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve attendance' });
    }
});

// Update a specific attendance record
attendanceRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const attendance = await Attendance.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!attendance) {
            return res.status(404).json({ error: 'Attendance not found' });
        }
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update attendance' });
    }
});

// Delete a specific attendance record
attendanceRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const attendance = await Attendance.findByIdAndDelete(id);
        if (!attendance) {
            return res.status(404).json({ error: 'Attendance not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete attendance' });
    }
});
// Get specific attendance records by date
attendanceRouter.get('/:studentID/:date', async (req, res) => {
    const { studentID, date } = req.params;
    try {
        const attendance = await Attendance.findOne({
            studentID: studentID,
            lesson_date: new Date(date),
        });

        if (!attendance) {
            return res.status(404).json({ error: 'Attendance not found' });
        }

        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve attendance' });
    }
});
module.exports = attendanceRouter;