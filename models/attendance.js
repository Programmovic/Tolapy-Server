const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  lessonDate: { type: String },
  sessionType: { type: String },
  isAttend: { type: Boolean, default: false },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;