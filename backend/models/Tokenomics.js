const mongoose = require('mongoose');

const DistributionSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, 'Distribution label is required']
  },
  value: {
    type: Number,
    required: [true, 'Distribution value is required'],
    min: 0,
    max: 100
  }
}, { _id: false });

const TokenomicsSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  symbol: {
    type: String,
    required: [true, 'Token symbol is required'],
    trim: true
  },
  totalSupply: {
    type: String,
    required: [true, 'Total supply is required']
  },
  useCase: {
    type: String,
    required: [true, 'Token use case is required']
  },
  distribution: {
    type: [DistributionSchema],
    required: [true, 'Token distribution is required'],
    validate: {
      validator: function(arr) {
        // Validate distribution total should be 100%
        const total = arr.reduce((sum, item) => sum + item.value, 0);
        return Math.round(total) === 100; // Allow for small rounding errors
      },
      message: 'Distribution percentages must add up to 100%'
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
TokenomicsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Tokenomics', TokenomicsSchema);