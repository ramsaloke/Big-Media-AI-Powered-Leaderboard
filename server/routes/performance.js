import express from 'express';
import MediaOutlet from '../models/MediaOutlet.js';
import HistoricalData from '../models/HistoricalData.js';
import Analytics from '../models/Analytics.js';
import { emitPerformanceUpdate } from '../services/socket.js';

const router = express.Router();

// Get performance metrics for a media outlet
router.get('/:mediaOutletId/metrics', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { mediaOutlet: req.params.mediaOutletId };

    // Add date range if provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const historicalData = await HistoricalData.find(query)
      .sort({ date: -1 })
      .limit(30); // Get last 30 days by default

    res.json(historicalData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get analytics data for a media outlet
router.get('/:mediaOutletId/analytics', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { mediaOutlet: req.params.mediaOutletId };

    // Add date range if provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const analytics = await Analytics.find(query)
      .sort({ date: -1 })
      .limit(30); // Get last 30 days by default

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update performance metrics for a media outlet
router.post('/:mediaOutletId/metrics', async (req, res) => {
  try {
    const mediaOutlet = await MediaOutlet.findById(req.params.mediaOutletId);
    if (!mediaOutlet) {
      return res.status(404).json({ message: 'Media outlet not found' });
    }

    // Update current metrics
    mediaOutlet.performanceMetrics = {
      ...mediaOutlet.performanceMetrics,
      ...req.body,
      lastUpdated: new Date()
    };

    await mediaOutlet.save();

    // Create historical data entry
    const historicalData = new HistoricalData({
      mediaOutlet: mediaOutlet._id,
      metrics: req.body,
      ranking: {
        categoryRank: req.body.categoryRank,
        overallRank: req.body.overallRank
      }
    });

    await historicalData.save();

    // Emit real-time update
    emitPerformanceUpdate(mediaOutlet._id, {
      metrics: req.body,
      ranking: historicalData.ranking,
      timestamp: new Date()
    });

    res.status(201).json(historicalData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update analytics data for a media outlet
router.post('/:mediaOutletId/analytics', async (req, res) => {
  try {
    const mediaOutlet = await MediaOutlet.findById(req.params.mediaOutletId);
    if (!mediaOutlet) {
      return res.status(404).json({ message: 'Media outlet not found' });
    }

    const analytics = new Analytics({
      mediaOutlet: mediaOutlet._id,
      ...req.body
    });

    await analytics.save();

    // Emit real-time update for analytics
    emitPerformanceUpdate(mediaOutlet._id, {
      analytics: req.body,
      timestamp: new Date()
    });

    res.status(201).json(analytics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get ranking data
router.get('/rankings', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query['ranking.categoryRank'] = { $exists: true };
    } else {
      query['ranking.overallRank'] = { $exists: true };
    }

    const rankings = await HistoricalData.find(query)
      .populate('mediaOutlet', 'name category')
      .sort(category ? { 'ranking.categoryRank': 1 } : { 'ranking.overallRank': 1 })
      .limit(100);

    res.json(rankings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 