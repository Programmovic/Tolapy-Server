const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  messageId: { type: String },
  messageContent: { type: String },
  teacherIdOfMessage: { type: String },
  groupIdOfMessage: { type: String },
  stageIdOfMessage: { type: String },
  created_at: { type: Date, default: Date.now }
}, { collection: 'Messages' });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;