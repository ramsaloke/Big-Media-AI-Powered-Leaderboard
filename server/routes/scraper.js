import express from 'express';
import { scraperService } from '../services/scraper.js';
import MediaOutlet from '../models/MediaOutlet.js';

const router = express.Router();

// Initialize scraper
router.post('/initialize', async (req, res) => {
  try {
    await scraperService.initialize();
    res.json({ message: 'Scraper initialized successfully' });
  } catch (error) {
    console.error('Error initializing scraper:', error);
    res.status(500).json({ message: 'Failed to initialize scraper', error: error.message });
  }
});

// Scrape specific media outlet
router.post('/scrape/:mediaOutletId', async (req, res) => {
  try {
    const mediaOutlet = await scraperService.updateMediaOutletData(req.params.mediaOutletId);
    res.json(mediaOutlet);
  } catch (error) {
    console.error('Error scraping media outlet:', error);
    res.status(500).json({ message: 'Failed to scrape media outlet', error: error.message });
  }
});

// Scrape all media outlets
router.post('/scrape-all', async (req, res) => {
  try {
    const mediaOutlets = await MediaOutlet.find({});
    const results = [];

    for (const outlet of mediaOutlets) {
      try {
        const updatedOutlet = await scraperService.updateMediaOutletData(outlet._id);
        results.push(updatedOutlet);
      } catch (error) {
        console.error(`Error scraping ${outlet.name}:`, error);
        results.push({ outlet: outlet.name, error: error.message });
      }
    }

    res.json(results);
  } catch (error) {
    console.error('Error in bulk scraping:', error);
    res.status(500).json({ message: 'Failed to scrape all media outlets', error: error.message });
  }
});

// Start scheduled updates
router.post('/schedule-updates', async (req, res) => {
  try {
    const interval = req.body.interval || 24 * 60 * 60 * 1000; // Default: 24 hours
    await scraperService.scheduleUpdates(interval);
    res.json({ message: 'Scheduled updates started successfully' });
  } catch (error) {
    console.error('Error scheduling updates:', error);
    res.status(500).json({ message: 'Failed to schedule updates', error: error.message });
  }
});

// Stop scheduled updates
router.post('/stop-updates', async (req, res) => {
  try {
    await scraperService.close();
    res.json({ message: 'Scheduled updates stopped successfully' });
  } catch (error) {
    console.error('Error stopping updates:', error);
    res.status(500).json({ message: 'Failed to stop updates', error: error.message });
  }
});

export default router; 