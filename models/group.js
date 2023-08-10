const mongoose = require('mongoose');
const Message = require('./message');
const Student = require('./student');

const groupSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },
  place: { type: String },
  stageIdOfGroup: { type: String },
  groupStartStudentCode: { type: String },
  teacherId: { type: String },
  groupTotalStudents: { type: Number },
  groupTotalMathsStudents: { type: Number },
  groupTotalApplyStudents: { type: Number },
  groupMaxQuizzes: { type: Number },
  groupMaxHw: { type: Number },
  groupMaxExams: { type: Number },
  groupMaxApplyQuizzes: { type: Number },
  groupMaxApplyHw: { type: Number },
  groupMaxApplyExams: { type: Number },
  groupsMessages: { type: [Message.schema] },
  groupRank: { type: Number, default: 0 },
  groupStudents: { type: [Student.schema] },
  created_at: { type: Date, default: Date.now }
}, { collection: 'Groups' });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;