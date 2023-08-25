const express = require('express');
const attendanceRouter = express.Router();
const Attendance = require('../models/attendance');
const Group = require('../models/group');

// Make attendance for a student in a specific group
attendanceRouter.post('/groups/:groupId/attendance', async (req, res) => {
    const { groupId } = req.params;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        const attendance = new Attendance({
            isAttend: true,
            lesson_date: new Date(),
        });

        group.groupStudents.forEach((student) => {
            if (!student.attendance) {
                student.attendance = attendance._id;
            }
        });

        await attendance.save();
        await group.save();

        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark attendance' });
    }
});

module.exports = attendanceRouter;