const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema({
  typeDegree: { type: String },
  degree: { type: String },
  dateDegree: { type: String },
  subjectType: { type: String },
  isSend: { type: Boolean, default: false },
});

const Degree = mongoose.model('Degree', degreeSchema);

module.exports = Degree;