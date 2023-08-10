const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const teacherRouter = require('./routes/Teacher_Routes');
const stageRouter = require('./routes/Stages_Routes');
const Student = require('./models/student');
const Group = require('./models/group');
const Degree = require('./models/degree');
const Attendance = require('./models/attendance');
const GroupAttendance = require('./models/groupAttendance');
// =============================================================================
// CONNECT TO MONGO DATABASE
// =============================================================================
const uri = 'mongodb+srv://adam:EPQfpcJi2hwnsCoW@cluster0.ujd6hhy.mongodb.net/Tolapy';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB database'))
    .catch((err) => console.error('Error connecting to MongoDB database:', err));
// =============================================================================
// // configure middleware
// =============================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/teacher", teacherRouter);
app.use("/stages", stageRouter);

//CREATE STUDENT API
app.get('/students', (req, res) => {
    Student.find()
        .then((students) => res.json(students))
        .catch((err) => res.status(500).json({ error: err }));
});

app.post('/students', (req, res) => {
    const student = new Student(req.body);
    student.save()
        .then((savedStudent) => res.json(savedStudent))
        .catch((err) => res.status(500).json({ error: err }));
});

app.put('/students/:id', (req, res) => {
    Student.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ message: 'Student updated successfully' }))
        .catch((err) => res.status(500).json({ error: err }));
});

app.delete('/students/:id', (req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Student deleted successfully' }))
        .catch((err) => res.status(500).json({ error: err }));
});

// =============================================================================
// // CREATE GROUP API
// =============================================================================
app.post('/groups', async (req, res) => {
    try {
        const stageId = req.body.stageIdOfGroup;
        const stage = await Stage.findById(stageId);

        if (!stage) {
            return res.status(404).json({ message: 'Stage not found' });
        }

        const newGroup = new Group(req.body);
        await newGroup.save();

        stage.totalGroupsOfStageNumber++;
        stage.totalGroupsOfStage.push(newGroup);
        await stage.save();

        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create group', error });
    }
});
// =============================================================================
// // GET ALL GROUPS
// =============================================================================
app.get('/groups', async (req, res) => {
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
app.get('/groups/:id', async (req, res) => {
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
app.put('/groups/:id', async (req, res) => {
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
app.delete('/groups/:id', async (req, res) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const stage = await Stage.findById(group.stageIdOfGroup);

        if (!stage) {
            return res.status(404).json({ message: 'Stage not found' });
        }

        stage.totalGroupsOfStageNumber--;
        stage.totalGroupsOfStage = stage.totalGroupsOfStage.filter(
            (groupId) => groupId !== group._id
        );
        await stage.save();

        res.json({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});
// =============================================================================
// // get the groups of a specific stage
// =============================================================================
app.get('/stages/:stageId/groups', async (req, res) => {
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
//CREATE DEGREE API
app.get('/degrees', (req, res) => {
    Degree.find()
        .then((degrees) => res.json(degrees))
        .catch((err) => res.status(500).json({ error: err }));
});

app.post('/degrees', (req, res) => {
    const degree = new Degree(req.body);
    degree.save()
        .then((savedDegree) => res.json(savedDegree))
        .catch((err) => res.status(500).json({ error: err }));
});

app.put('/degrees/:id', (req, res) => {
    Degree.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ message: 'Degree updated successfully' }))
        .catch((err) => res.status(500).json({ error: err }));
});

app.delete('/degrees/:id', (req, res) => {
    Degree.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Degree deleted successfully' }))
        .catch((err) => res.status(500).json({ error: err }));
});

//CREATE ATTENDANCE API
app.get('/attendances', (req, res) => {
    Attendance.find()
        .then((attendances) => res.json(attendances))
        .catch((err) => res.status(500).json({ error: err }));
});

app.post('/attendances', (req, res) => {
    const attendance = new Attendance(req.body);
    attendance.save()
        .then((savedAttendance) => res.json(savedAttendance))
        .catch((err) => res.status(500).json({ error: err }));
});

app.put('/attendances/:id', (req, res) => {
    Attendance.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ message: 'Attendance updated successfully' }))
        .catch((err) => res.status(500).json({ error: err }));
});

app.delete('/attendances/:id', (req, res) => {
    Attendance.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Attendance deleted successfully' }))
        .catch((err) => res.status(500).json({ error: err }));
});

//CREATE GROUP ATTENDANCE API
app.get('/group-attendances', (req, res) => {
    GroupAttendance.find()
        .then((groupAttendances) => res.json(groupAttendances))
        .catch((err) => res.status(500).json({ error: err }));
});

app.post('/group-attendances', (req, res) => {
    const groupAttendance = new GroupAttendance(req.body);
    groupAttendance.save()
        .then((savedGroupAttendance) => res.json(savedGroupAttendance))
        .catch((err) => res.status(500).json({ error: err }));
});

app.put('/group-attendances/:id', (req, res) => {
    GroupAttendance.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ message: 'Group attendance updated successfully' }))
        .catch((err) => res.status(500).json({ error: err }));
});

app.delete('/group-attendances/:id', (req, res) => {
    GroupAttendance.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Group attendance deleted successfully' }))
        .catch((err) => res.status(500).json({ error: err }));
});
app.listen(3001, () => {
    console.log('Express server listening on port 3001');
});
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    res.send('hello world')
})
module.exports = app;
