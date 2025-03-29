import express from 'express';
import MediaOutlets from '../models/MediaOutlets.js';

const router = express.Router();

// Search media outlets
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    console.log('Searching for:', q);

    // Use regex search directly
    const searchResults = await MediaOutlets.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } }
      ]
    }).select('name description category website metrics');

    console.log('Found results:', searchResults.length);
    res.json(searchResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error searching media outlets', error: error.message });
  }
});

// Get all media outlets
router.get('/', async (req, res) => {
  try {
    const mediaOutlets = await MediaOutlets.find();
    console.log('Total media outlets:', mediaOutlets.length);
    res.json(mediaOutlets);
  } catch (error) {
    console.error('Error fetching media outlets:', error);
    res.status(500).json({ message: 'Error fetching media outlets' });
  }
});

// Get media outlet by ID
router.get('/:id', async (req, res) => {
  try {
    const mediaOutlet = await MediaOutlets.findById(req.params.id);
    if (!mediaOutlet) {
      return res.status(404).json({ message: 'Media outlet not found' });
    }
    res.json(mediaOutlet);
  } catch (error) {
    console.error('Error fetching media outlet:', error);
    res.status(500).json({ message: 'Error fetching media outlet' });
  }
});

export default router; 