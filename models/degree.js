const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema({
  typeDegree: { type: String },
  degree: { type: String },
  dateDegree: { type: String },
  subjectType: { type: String },
  isSend: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

const Degree = mongoose.model('Degree', degreeSchema);

module.exports = Degree;