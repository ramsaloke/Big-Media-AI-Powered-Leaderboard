import mongoose from 'mongoose';

const historicalDataSchema = new mongoose.Schema({
  mediaOutlet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MediaOutlet',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  metrics: {
    engagement: {
      type: Number,
      required: true
    },
    reach: {
      type: Number,
      required: true
    },
    influence: {
      type: Number,
      required: true
    },
    socialShares: {
      type: Number,
      default: 0
    },
    articleCount: {
      type: Number,
      default: 0
    },
    averageReadTime: {
      type: Number,
      default: 0
    }
  },
  ranking: {
    categoryRank: {
      type: Number,
      required: true
    },
    overallRank: {
      type: Number,
      required: true
    }
  }
}, {
  timestamps: true
});

// Index for efficient querying
historicalDataSchema.index({ mediaOutlet: 1, date: -1 });

const HistoricalData = mongoose.model('HistoricalData', historicalDataSchema);

export default HistoricalData; 