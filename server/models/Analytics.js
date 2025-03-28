import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
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
  traffic: {
    uniqueVisitors: {
      type: Number,
      default: 0
    },
    pageViews: {
      type: Number,
      default: 0
    },
    bounceRate: {
      type: Number,
      default: 0
    },
    averageSessionDuration: {
      type: Number,
      default: 0
    }
  },
  socialMetrics: {
    followers: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    }
  },
  contentMetrics: {
    totalArticles: {
      type: Number,
      default: 0
    },
    averageWordCount: {
      type: Number,
      default: 0
    },
    topPerformingArticles: [{
      title: String,
      views: Number,
      shares: Number
    }]
  },
  audienceMetrics: {
    demographics: {
      age: {
        type: Map,
        of: Number
      },
      gender: {
        type: Map,
        of: Number
      },
      location: {
        type: Map,
        of: Number
      }
    },
    interests: [{
      type: String
    }]
  }
}, {
  timestamps: true
});

// Index for efficient querying
analyticsSchema.index({ mediaOutlet: 1, date: -1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics; 