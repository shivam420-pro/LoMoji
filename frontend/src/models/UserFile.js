import mongoose from 'mongoose';

const userFileSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, default: [] }, // Stores strokes/shapes
  createdAt: { type: Date, default: Date.now },
});

const UserFile = mongoose.model('UserFile', userFileSchema);

export default UserFile;