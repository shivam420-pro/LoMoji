import mongoose from 'mongoose';

const CanvasElementSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true }, // 'rectangle', 'circle', 'text', 'emoji'
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  rotation: { type: Number, default: 0 },
  opacity: { type: Number, default: 1 },
  fill: { type: String, default: '#000000' },
  stroke: { type: String, default: '#000000' },
  strokeWidth: { type: Number, default: 0 },
  // Text-specific properties
  text: { type: String },
  fontSize: { type: Number },
  fontFamily: { type: String },
  // Emoji-specific properties
  emoji: { type: String },
  // Layer properties
  visible: { type: Boolean, default: true },
  locked: { type: Boolean, default: false },
  name: { type: String },
  // Animation keyframes
  keyframes: [{
    frame: { type: Number },
    property: { type: String },
    value: mongoose.Schema.Types.Mixed
  }]
}, { _id: false });

const CanvasProjectSchema = new mongoose.Schema({
  // User identification
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },

  // Project details
  projectName: { type: String, required: true },
  projectId: { type: String, required: true, unique: true },

  // Canvas settings
  canvasWidth: { type: Number, default: 800 },
  canvasHeight: { type: Number, default: 600 },
  backgroundColor: { type: String, default: '#ffffff' },

  // All canvas elements
  elements: [CanvasElementSchema],

  // Animation settings
  duration: { type: Number, default: 10 }, // in seconds
  fps: { type: Number, default: 30 },
  currentFrame: { type: Number, default: 0 },
  loop: { type: Boolean, default: false },
  autoKey: { type: Boolean, default: false },

  // Metadata
  thumbnail: { type: String }, // Base64 or URL to thumbnail image
  lastModified: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

// Update lastModified on save
CanvasProjectSchema.pre('save', function(next) {
  this.lastModified = new Date();
  next();
});

// Create compound index for faster queries
CanvasProjectSchema.index({ userId: 1, projectId: 1 });
CanvasProjectSchema.index({ email: 1, lastModified: -1 });

const CanvasProject = mongoose.model('CanvasProject', CanvasProjectSchema);

export default CanvasProject;
