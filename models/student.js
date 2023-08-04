const mongoose = require('mongoose');
const Degree = require('./degree');
const Attendance = require('./attendance');

const studentSchema = new mongoose.Schema({
  studentId: { type: String },
  studentCompleteId: { type: String },
  startStudentCode: { type: String },
  teacherId: { type: String },
  studentDataBaseID: { type: String },
  studentName: { type: String },
  studentEmail: { type: String },
  studentImageUrl: { type: String, default: '' },
  studentPhoneNumber: { type: String, default: '' },
  studentParentPhoneNumber: { type: String, default: '' },
  studentAddress: { type: String, default: '' },
  totalCompleteQuiz: { type: Number },
  totalCompleteHw: { type: Number },
  totalCompleteExam: { type: Number },
  totalCompleteApplyQuiz: { type: Number },
  totalCompleteApplyHw: { type: Number },
  totalCompleteApplyExam: { type: Number },
  totalAttendanceLessons: { type: Number },
  groupIdOfStudent: { type: String },
  groupNameOfStudent: { type: String },
  studentStartDate: { type: String },
  stageIdOfStudent: { type: String },
  stageNameOfStudent: { type: String },
  groupStartCodeOfStudent: { type: String },
  studentDegrees: { type: [Degree.schema] },
  studentAttendances: { type: [Attendance.schema] },
  studentSubjects: { type: [mongoose.Schema.Types.Mixed] },
  isSend: { type: Boolean, default: true },
}, { collection: 'Students' });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;