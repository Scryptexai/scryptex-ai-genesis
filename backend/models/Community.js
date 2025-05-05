const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Metric name is required']
  },
  score: {
    type: Number,
    required: [true, 'Metric score is required'],
    min: 0,
    max: 100
  }
}, { _id: false });

const CommunitySchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  score: {
    type: Number,
    required: [true, 'Community score is required'],
    min: 0,
    max: 100
  },
  sentiment: {
    type: String,
    required: [true, 'Sentiment is required'],
    enum: ['Positive', 'Neutral', 'Negative']
  },
  riskAssessment: {
    type: String,
    required: [true, 'Risk assessment is required'],
    enum: ['Low', 'Medium', 'High']
  },
  metrics: {
    type: [MetricSchema],
    required: [true, 'Community metrics are required'],
    validate: {
      validator: function(arr) {
        // Ensure we have at least 3 metrics
        return arr.length >= 3;
      },
      message: 'At least 3 community metrics are required'
    }
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
CommunitySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Community', CommunitySchema);