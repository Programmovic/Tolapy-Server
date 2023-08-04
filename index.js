const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
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
  
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  });
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