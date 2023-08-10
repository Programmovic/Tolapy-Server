const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  lessonDate: { type: String },
  sessionType: { type: String },
  isAttend: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;