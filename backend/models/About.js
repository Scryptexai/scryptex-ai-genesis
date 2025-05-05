const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  },
  category: {
    type: String,
    required: [true, 'Project category is required']
  },
  keyFeatures: [{
    type: String,
    required: [true, 'Key features are required']
  }],
  launchDate: {
    type: String,
    required: [true, 'Launch date is required']
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
    min: 1,
    max: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Update the 'updatedAt' field on save
AboutSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('About', AboutSchema);