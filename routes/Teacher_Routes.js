import express from 'express';
const Teacher = require('./models/teacher');
const teacherRouter = express.Router();
// =============================================================================
// //REGISTER TEACHER API
// =============================================================================
teacherRouter.post('/register', async (req, res) => {
    const teacher = new Teacher(req.body);
    const existing_teacher = await Teacher.findOne({ username: teacher.username });
    if (existing_teacher) {
        return res.status(409).json({ error: 'Teacher already exists' });
    }
    teacher.save()
        .then((savedTeacher) => res.json(savedTeacher))
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});
// =============================================================================
// //LOGIN TEACHER API
// =============================================================================
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
teacherRouter.post('/login', async (req, res) => {
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

export default teacherRouter;