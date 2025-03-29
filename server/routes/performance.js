import express from 'express';
import MediaOutlets from '../models/MediaOutlets.js';
import { emitPerformanceUpdate } from '../services/socket.js';

const router = express.Router();

// Get performance metrics for a media outlet
router.get('/:mediaOutletId/metrics', async (req, res) => {
  try {
    const query = { mediaOutlet: req.params.mediaOutletId };
    const metrics = await MediaOutlets.find(query)
      .select('performanceMetrics contentMetrics ranking')
      .sort({ 'performanceMetrics.lastUpdated': -1 });

    res.json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ message: 'Error fetching metrics' });
  }
});

// Get analytics for a media outlet
router.get('/:mediaOutletId/analytics', async (req, res) => {
  try {
    const query = { mediaOutlet: req.params.mediaOutletId };
    const analytics = await MediaOutlets.find(query)
      .select('contentMetrics performanceMetrics')
      .sort({ 'contentMetrics.articles.publishedAt': -1 });

    res.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
});

// Update performance metrics for a media outlet
router.post('/:mediaOutletId/metrics', async (req, res) => {
  try {
    const mediaOutlet = await MediaOutlets.findById(req.params.mediaOutletId);
    if (!mediaOutlet) {
      return res.status(404).json({ message: 'Media outlet not found' });
    }

    mediaOutlet.performanceMetrics = {
      ...mediaOutlet.performanceMetrics,
      ...req.body,
      lastUpdated: new Date()
    };

    await mediaOutlet.save();

    // Emit update through socket
    emitPerformanceUpdate(mediaOutlet._id, {
      performanceMetrics: mediaOutlet.performanceMetrics,
      ranking: mediaOutlet.ranking
    });

    res.json(mediaOutlet);
  } catch (error) {
    console.error('Error updating metrics:', error);
    res.status(500).json({ message: 'Error updating metrics' });
  }
});

// Update analytics for a media outlet
router.post('/:mediaOutletId/analytics', async (req, res) => {
  try {
    const mediaOutlet = await MediaOutlets.findById(req.params.mediaOutletId);
    if (!mediaOutlet) {
      return res.status(404).json({ message: 'Media outlet not found' });
    }

    mediaOutlet.contentMetrics = {
      ...mediaOutlet.contentMetrics,
      ...req.body
    };

    await mediaOutlet.save();
    res.json(mediaOutlet);
  } catch (error) {
    console.error('Error updating analytics:', error);
    res.status(500).json({ message: 'Error updating analytics' });
  }
});

export default router; 