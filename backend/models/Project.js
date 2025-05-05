const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'Project URL is required'],
    trim: true
  },
  about: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'About'
  },
  tokenomics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tokenomics'
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  },
  roadmap: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roadmap'
  },
  investors: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investors'
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  category: {
    type: String,
    trim: true
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
ProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);