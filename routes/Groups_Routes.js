const express = require('express');
const Group = require('../models/group');
const Stage = require('../models/stage');
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


module.exports = groupRouter;