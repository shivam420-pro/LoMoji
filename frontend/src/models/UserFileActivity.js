import mongoose from 'mongoose';

const userFileActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserFileActivity = mongoose.model('UserFileActivity', userFileActivitySchema);

export default UserFileActivity;