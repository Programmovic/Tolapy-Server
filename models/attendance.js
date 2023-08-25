const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentID: { type: String },
  sessionType: { type: String },
  isAttend: { type: Boolean, default: false },
  lesson_date: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;