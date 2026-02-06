import mongoose from 'mongoose';

const userSessionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  sessions: [
    {
      startTime: { type: Date, required: true },
      endTime: { type: Date },
      active: { type: Boolean, default: true },
    }
  ]
});

const UserSession = mongoose.model('UserSession', userSessionSchema);

export default UserSession;