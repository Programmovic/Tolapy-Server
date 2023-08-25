const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const teacherRouter = require('./routes/Teacher_Routes');
const stageRouter = require('./routes/Stages_Routes');
const groupRouter = require('./routes/Groups_Routes');
const studentRouter = require('./routes/Student_Routes');
const degreeRouter = require('./routes/Degree_Routes');
const messageRouter = require('./routes/Message_Routes');
const Student = require('./models/student');
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
// Routes
app.use("/teacher", teacherRouter);
app.use("/stages", stageRouter);
app.use("/groups", groupRouter);
app.use("/student", studentRouter);
app.use("/degree", degreeRouter);
app.use("/message", messageRouter);



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
