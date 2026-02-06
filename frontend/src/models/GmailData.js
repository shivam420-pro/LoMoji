import mongoose from 'mongoose';

const gmailDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  emailId: { type: String, required: true },
  subject: { type: String },
  sender: { type: String },
  recipient: { type: String },
  body: { type: String },
  attachments: [{ type: String }],
  labels: [{ type: String }],
  threadId: { type: String },
  messageId: { type: String, unique: true },
  dateReceived: { type: Date },
  isRead: { type: Boolean, default: false },
  isStarred: { type: Boolean, default: false },
  gmailData: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

const GmailData = mongoose.model('GmailData', gmailDataSchema);

export default GmailData;