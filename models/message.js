const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  messageContent: { type: String },
  groupIdOfMessage: { type: String },
  created_at: { type: Date, default: Date.now }
}, { collection: 'Messages' });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;