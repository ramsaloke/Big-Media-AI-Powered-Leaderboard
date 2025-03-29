import mongoose from 'mongoose';

const mediaOutletsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Technology', 'Business', 'News', 'Entertainment', 'Sports', 'Science', 'Health', 'Politics']
  },
  website: {
    type: String,
    required: true
  },
  socialMedia: {
    twitter: String,
    facebook: String,
    linkedin: String
  },
  metrics: {
    followers: Number,
    engagement: Number,
    reach: Number
  },
  performanceMetrics: {
    views: Number,
    shares: Number,
    comments: Number,
    lastUpdated: Date
  },
  contentMetrics: {
    articles: [{
      title: String,
      views: Number,
      shares: Number,
      publishedAt: Date
    }],
    totalArticles: Number,
    averageViews: Number,
    averageShares: Number
  },
  ranking: {
    overallScore: Number,
    categoryScore: Number,
    lastUpdated: Date
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create text indexes for search
mediaOutletsSchema.index({ name: 'text', description: 'text', category: 'text' });
mediaOutletsSchema.index({ 'ranking.overallScore': -1 });
mediaOutletsSchema.index({ 'ranking.categoryScore': -1 });

const MediaOutlets = mongoose.model('MediaOutlets', mediaOutletsSchema);

export default MediaOutlets; 