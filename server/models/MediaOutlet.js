import mongoose from 'mongoose';

const mediaOutletSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  website: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  performanceMetrics: {
    engagement: {
      type: Number,
      default: 0
    },
    reach: {
      type: Number,
      default: 0
    },
    influence: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for search functionality
mediaOutletSchema.index({ name: 'text', description: 'text' });

const MediaOutlet = mongoose.model('MediaOutlet', mediaOutletSchema);

export default MediaOutlet; 