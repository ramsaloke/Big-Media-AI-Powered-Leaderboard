import { scraperService } from '../services/scraper.js';
import MediaOutlet from '../models/MediaOutlet.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testScraper() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    // Initialize scraper
    await scraperService.initialize();
    console.log('Scraper initialized');

    // Create a test media outlet
    const testOutlet = new MediaOutlet({
      name: 'TechCrunch',
      description: 'Technology news and analysis',
      category: 'Technology',
      url: 'https://techcrunch.com',
      performanceMetrics: {
        followers: 0,
        engagement: 0,
        reach: 0,
        lastUpdated: new Date()
      },
      contentMetrics: {
        articles: 0,
        views: 0,
        shares: 0,
        lastUpdated: new Date()
      },
      ranking: {
        categoryRank: 0,
        overallRank: 0,
        lastUpdated: new Date()
      }
    });

    await testOutlet.save();
    console.log('Test media outlet created:', testOutlet._id);

    // Test scraping
    console.log('Starting scraping test...');
    const scrapedData = await scraperService.scrapeMediaOutlet(testOutlet.url);
    console.log('Scraped data:', scrapedData);

    // Test updating media outlet
    console.log('Testing media outlet update...');
    const updatedOutlet = await scraperService.updateMediaOutletData(testOutlet._id);
    console.log('Updated media outlet:', updatedOutlet);

    // Test scheduled updates
    console.log('Testing scheduled updates...');
    await scraperService.scheduleUpdates(5 * 60 * 1000); // 5 minutes interval
    console.log('Scheduled updates started');

    // Wait for 10 seconds to see if updates are working
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Cleanup
    await scraperService.close();
    await mongoose.connection.close();
    console.log('Test completed successfully');

  } catch (error) {
    console.error('Test failed:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

testScraper(); 