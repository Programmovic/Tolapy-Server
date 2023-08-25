const express = require('express');
const Group = require('../models/group');
const Message = require('../models/message');
const Student = require('../models/student');
const groupRouter = express.Router();

// =============================================================================
// // CREATE GROUP API
// =============================================================================
groupRouter.post('/', async (req, res) => {
    try {
        const newGroup = new Group(req.body);
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create group', error });
    }
});
// =============================================================================
// // GET ALL GROUPS
// =============================================================================
groupRouter.get('/', async (req, res) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve groups', error });
    }
});
// =============================================================================
// // GET SPECIFIC GROUP
// =============================================================================
groupRouter.get('/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.json(group);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve group', error });
    }
});
// =============================================================================
// // UPDATE SPECIFIC GROUP 
// =============================================================================
groupRouter.put('/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        Object.assign(group, req.body);
        await group.save();

        res.json(group);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update group', error });
    }
});
// =============================================================================
// // DELETE SPECIFIC GROUP
// =============================================================================
groupRouter.delete('/:id', async (req, res) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.json({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});
// =============================================================================
// // DELETE ALL GROUPS
// =============================================================================
groupRouter.delete('/', async (req, res) => {
    try {
        const group = await Group.deleteMany();

        res.json({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});
// =============================================================================
// // GET STUDENTS IN SPECIFIC GROUP
// =============================================================================
groupRouter.get('/:id/students', async (req, res) => {
    try {
        const students = await Student.find({ groupIdOfStudent: req.params.id });

        if (!students) {
            return res.status(404).json({ message: 'No Students are Here.' });
        }

        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve group', error });
    }
});
// =============================================================================
// // get the groups of a specific stage
// =============================================================================
groupRouter.get('/:groupID/messages', async (req, res) => {
    try {
        const groupID = req.params.groupID;
        const group = await Group.findById(groupID);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const messages = await Message.find({ groupIdOfMessage: groupID });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve messages', error });
    }
});

module.exports = groupRouter;