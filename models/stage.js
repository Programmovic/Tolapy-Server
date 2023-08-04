const mongoose = require('mongoose');
const Student = require('./student');
const Group = require('./group');

const stageSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },
  subject: { type: String },
  teacherId: { type: String },
  totalStudentsOfStageNumber: { type: Number, default: 0 },
  totalStudentsOfApplyStageNumber: { type: Number, default: 0 },
  totalGroupsOfStageNumber: { type: Number, default: 0 },
  totalAttendanceGroups: { type: Number, default: 0 },
  stageRank: { type: Number, default: 0 },
  groupRank: { type: Number, default: 0 },
  groupAttendanceRank: { type: Number, default: 0 },
  stageStudentsRank: { type: Number, default: 10 },
  totalStudentsOfStage: { type: [Student.schema] },
  totalGroupsOfStage: { type: [Group.schema] },
}, { collection: 'Stages' });

const Stage = mongoose.model('Stage', stageSchema);

module.exports = Stage;