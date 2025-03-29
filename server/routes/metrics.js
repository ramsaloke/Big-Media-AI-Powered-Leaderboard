import express from 'express';
import MediaOutlets from '../models/MediaOutlets.js';

const router = express.Router();

// Get overall metrics
router.get('/overall', async (req, res) => {
  try {
    console.log('Fetching overall metrics...');
    const metrics = await MediaOutlets.aggregate([
      {
        $group: {
          _id: null,
          totalFollowers: { $sum: { $ifNull: ['$metrics.followers', 0] } },
          avgEngagement: { $avg: { $ifNull: ['$metrics.engagement', 0] } },
          totalReach: { $sum: { $ifNull: ['$metrics.reach', 0] } },
          totalOutlets: { $sum: 1 }
        }
      }
    ]);

    const result = metrics[0] || {
      totalFollowers: 0,
      avgEngagement: 0,
      totalReach: 0,
      totalOutlets: 0
    };

    // Round the average engagement to 2 decimal places
    result.avgEngagement = Math.round(result.avgEngagement * 100) / 100;

    console.log('Overall Metrics:', result);
    res.json(result);
  } catch (error) {
    console.error('Error fetching overall metrics:', error);
    res.status(500).json({ 
      message: 'Error fetching overall metrics', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get metrics by category
router.get('/by-category', async (req, res) => {
  try {
    console.log('Fetching category metrics...');
    const metrics = await MediaOutlets.aggregate([
      {
        $group: {
          _id: '$category',
          totalFollowers: { $sum: { $ifNull: ['$metrics.followers', 0] } },
          avgEngagement: { $avg: { $ifNull: ['$metrics.engagement', 0] } },
          totalReach: { $sum: { $ifNull: ['$metrics.reach', 0] } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          category: '$_id',
          totalFollowers: 1,
          avgEngagement: { $round: ['$avgEngagement', 2] },
          totalReach: 1,
          count: 1,
          _id: 0
        }
      }
    ]);

    console.log('Category Metrics:', metrics);
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching category metrics:', error);
    res.status(500).json({ 
      message: 'Error fetching category metrics', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get top performing media outlets
router.get('/top-performers', async (req, res) => {
  try {
    console.log('Fetching top performers...');
    const topPerformers = await MediaOutlets.find()
      .sort({ 'metrics.engagement': -1 })
      .limit(5)
      .select('name category metrics')
      .lean();

    // Ensure metrics exist and have default values
    const processedPerformers = topPerformers.map(outlet => ({
      ...outlet,
      metrics: {
        followers: outlet.metrics?.followers || 0,
        engagement: outlet.metrics?.engagement || 0,
        reach: outlet.metrics?.reach || 0
      }
    }));

    console.log('Top Performers:', processedPerformers);
    res.json(processedPerformers);
  } catch (error) {
    console.error('Error fetching top performers:', error);
    res.status(500).json({ 
      message: 'Error fetching top performers', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router; 