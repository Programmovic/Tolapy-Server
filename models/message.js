const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  messageId: { type: String },
  messageContent: { type: String },
  teacherIdOfMessage: { type: String },
  groupIdOfMessage: { type: String },
  stageIdOfMessage: { type: String },
}, { collection: 'Messages' });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;