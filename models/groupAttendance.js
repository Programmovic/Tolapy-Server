const mongoose = require('mongoose');

const groupAttendanceSchema = new mongoose.Schema({
  groupAttendanceId: { type: String },
  teacherIdOfGroupAttendance: { type: String },
  stageIdOfGroupAttendance: { type: String },
  groupDay: { type: String },
  groupAttendanceDate: { type: String },
  groupAttendanceTitle: { type: String },
  groupAttendanceType: { type: String },
  stagNameOfGroupAttendance: { type: String },
  totalAttendanceStudentsNumber: { type: Number },
  totalAbsentStudentsNumber: { type: Number },
  totalAttendanceApplyStudentsNumber: { type: Number },
  totalAbsentApplyStudentsNumber: { type: Number },
  attendanceRank: { type: Number },
}, { collection: 'Dates Of Attendances of Groups' });

const GroupAttendance = mongoose.model('GroupAttendance', groupAttendanceSchema);

module.exports = GroupAttendance;