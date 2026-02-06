import mongoose from 'mongoose';

// This model uses a separate connection for user activity data
const userActivitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  activity: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }, // true if session is active, false if closed
});

// Export both schema and a function to create model with specific connection
export { userActivitySchema };

export const createUserActivityModel = (connection) => {
  return connection.model('UserActivity', userActivitySchema);
};

export default mongoose.model('UserActivity', userActivitySchema);