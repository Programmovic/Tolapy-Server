const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Stage = require('./models/stage');
const Teacher = require('./models/teacher');
const Student = require('./models/student');
const Group = require('./models/group');
const Degree = require('./models/degree');
const Attendance = require('./models/attendance');
const GroupAttendance = require('./models/groupAttendance');

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
// =============================================================================
// //REGISTER TEACHER API
// =============================================================================
app.post('/register', (req, res) => {
    const teacher = new Teacher(req.body);
    teacher.save()
        .then((savedTeacher) => res.json(savedTeacher))
        .catch((err) => res.status(500).json({ error: err }));
});

// =============================================================================
// //LOGIN TEACHER API
// =============================================================================
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const teacher = await Teacher.findOne({ username });

        if (!teacher) {
            return res.status(401).json({ error: 'Teacher not found' });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        const token = jwt.sign({ teacherId: teacher.id }, 'secret_key');

        res.json({ teacher, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});
// =============================================================================
// // Create a new stage
// =============================================================================
app.post('/stages', async (req, res) => {
    try {
        const { title, teacherId, subject, totalStudentsOfStage, totalGroupsOfStage } = req.body;
        const stage = new Stage({ title, subject, teacherId, totalStudentsOfStage, totalGroupsOfStage });
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
app.get('/stages', async (req, res) => {
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
app.get('/stages/:id', async (req, res) => {
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
app.put('/stages/:id', async (req, res) => {
    try {
        const { title, teacherId, subject, groupRank, totalStudentsOfStage, totalGroupsOfStage } = req.body;
        const stage = await Stage.findOneAndUpdate({ _id: req.params.id }, { title, subject, teacherId, groupRank, totalStudentsOfStage, totalGroupsOfStage }, { new: true });
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
app.delete('/stages/:id', async (req, res) => {
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
// // Get all stages of a specific teacher
// =============================================================================
app.get('/teachers/:teacherId/stages', async (req, res) => {
    try {
        const teacherId = req.params.teacherId; // Get the teacher ID from the URL parameter
        const stages = await Stage.find({ teacherId }); // Find all stages with the specified teacher ID
        res.json(stages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// =============================================================================
// // Helper function to get the next ID for a stage
// =============================================================================
async function getNextStageId() {
    const lastStage = await Stage.findOne().sort({ id: -1 });
    if (!lastStage) {
        return 1;
    }
    return lastStage.id + 1;
}
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

//CREATE GROUP API
app.get('/groups', (req, res) => {
    Group.find()
        .then((groups) => res.json(groups))
        .catch((err) => res.status(500).json({ error: err }));
});

app.post('/groups', (req, res) => {
    const group = new Group(req.body);
    group.save()
        .then((savedGroup) => res.json(savedGroup))
        .catch((err) => res.status(500).json({ error: err }));
});

app.put('/groups/:id', (req, res) => {
    Group.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ message: 'Group updated successfully' }))
        .catch((err) => res.status(500).json({ error: err }));
});

app.delete('/groups/:id', (req, res) => {
    Group.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Group deleted successfully' }))
        .catch((err) => res.status(500).json({ error: err }));
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