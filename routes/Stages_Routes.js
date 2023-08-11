const express = require('express');
const Stage = require('../models/stage');
const Group = require('../models/group');
const getNextStageId = require('../utils/getNextStageId');
const stageRouter = express.Router();
// =============================================================================
// Reset IDs of stages to sequential values
// =============================================================================
stageRouter.post('/reset-ids', async (req, res) => {
    try {
        const stages = await Stage.find().sort({ id: 1 }); // Retrieve all stages sorted by ID in ascending order
        let nextId = 1;

        // Convert existing IDs to integer and set them to 0
        for (const stage of stages) {
            stage.id = 0;
            await stage.save();
        }

        // Update the ID of each stage sequentially
        for (const stage of stages) {
            stage.id = nextId;
            await stage.save();
            nextId++;
        }

        res.json({ message: 'Stage IDs reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================================
// // Create a new stage
// =============================================================================
stageRouter.post('/', async (req, res) => {
    try {
        const stage_data = req.body;
        const stage = new Stage(stage_data);
        stage.id = await getNextStageId(); // Get the next ID for the stage
        await stage.save();
        res.status(201).json(stage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// =============================================================================
// // Get all stages
// =============================================================================
stageRouter.get('/', async (req, res) => {
    try {
        const stages = await Stage.find();
        res.json(stages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// =============================================================================
// // Get a single stage by ID
// =============================================================================
stageRouter.get('/:id', async (req, res) => {
    try {
        const stage = await Stage.findOne({ _id: req.params.id });
        if (!stage) {
            return res.status(404).json({ message: 'Stage not found' });
        }
        res.json(stage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// =============================================================================
// // Update a stage by ID
// =============================================================================
stageRouter.put('/:id', async (req, res) => {
    try {
        const new_data = req.body;
        const stage = await Stage.findOneAndUpdate({ _id: req.params.id }, new_data, { new: true });
        if (!stage) {
            return res.status(404).json({ message: 'Stage not found' });
        }
        res.json(stage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// =============================================================================
// // Delete a stage by ID
// =============================================================================
stageRouter.delete('/:id', async (req, res) => {
    try {
        const stage = await Stage.findOneAndDelete({ _id: req.params.id });
        if (!stage) {
            return res.status(404).json({ message: 'Stage not found' });
        }
        res.json({ message: 'Stage deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================================
// // get the groups of a specific stage
// =============================================================================
stageRouter.get('/:stageId/groups', async (req, res) => {
    try {
        const stageId = req.params.stageId;
        const stage = await Stage.findById(stageId);

        if (!stage) {
            return res.status(404).json({ message: 'Stage not found' });
        }

        const groups = await Group.find({ stageIdOfGroup: stageId });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve groups', error });
    }
});
// =============================================================================
// // DELETE ALL STAGES
// =============================================================================
stageRouter.delete('/', async (req, res) => {
    try {
        const group = await Stage.deleteMany();

        res.json({ message: 'Stage deleted successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});



module.exports = stageRouter;