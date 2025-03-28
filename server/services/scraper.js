import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import MediaOutlet from '../models/MediaOutlet.js';

class ScraperService {
  constructor() {
    this.browser = null;
    this.websiteRules = {
      'techcrunch.com': {
        followers: '.social-followers-count',
        engagement: '.engagement-rate',
        reach: '.reach-count',
        articles: '.article-count',
        views: '.views-count',
        shares: '.shares-count'
      },
      'forbes.com': {
        followers: '.social-followers',
        engagement: '.engagement-metrics',
        reach: '.reach-metrics',
        articles: '.article-metrics',
        views: '.view-metrics',
        shares: '.share-metrics'
      },
      'wired.com': {
        followers: '.social-stats',
        engagement: '.engagement-stats',
        reach: '.reach-stats',
        articles: '.article-stats',
        views: '.view-stats',
        shares: '.share-stats'
      }
    };
  }

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  getWebsiteRules(url) {
    const domain = new URL(url).hostname;
    return this.websiteRules[domain] || this.websiteRules.default;
  }

  async scrapeMediaOutlet(url) {
    try {
      const page = await this.browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });
      
      const content = await page.content();
      const $ = cheerio.load(content);
      const rules = this.getWebsiteRules(url);

      // Extract social media metrics
      const metrics = {
        followers: this.extractFollowers($, rules),
        engagement: this.extractEngagement($, rules),
        reach: this.extractReach($, rules)
      };

      // Extract content metrics
      const contentMetrics = {
        articles: this.extractArticleCount($, rules),
        views: this.extractViews($, rules),
        shares: this.extractShares($, rules)
      };

      // Extract ranking data
      const ranking = {
        categoryRank: this.extractCategoryRank($, rules),
        overallRank: this.extractOverallRank($, rules)
      };

      await page.close();

      return {
        metrics,
        contentMetrics,
        ranking,
        lastScraped: new Date()
      };
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
      throw error;
    }
  }

  // Helper methods for extracting specific data
  extractFollowers($, rules) {
    const selector = rules.followers;
    const text = $(selector).text();
    return this.parseNumber(text);
  }

  extractEngagement($, rules) {
    const selector = rules.engagement;
    const text = $(selector).text();
    return this.parseNumber(text);
  }

  extractReach($, rules) {
    const selector = rules.reach;
    const text = $(selector).text();
    return this.parseNumber(text);
  }

  extractArticleCount($, rules) {
    const selector = rules.articles;
    const text = $(selector).text();
    return this.parseNumber(text);
  }

  extractViews($, rules) {
    const selector = rules.views;
    const text = $(selector).text();
    return this.parseNumber(text);
  }

  extractShares($, rules) {
    const selector = rules.shares;
    const text = $(selector).text();
    return this.parseNumber(text);
  }

  extractCategoryRank($, rules) {
    const selector = rules.categoryRank;
    const text = $(selector).text();
    return this.parseNumber(text);
  }

  extractOverallRank($, rules) {
    const selector = rules.overallRank;
    const text = $(selector).text();
    return this.parseNumber(text);
  }

  parseNumber(text) {
    if (!text) return 0;
    // Remove commas and any non-numeric characters except decimal point
    const cleanText = text.replace(/[^0-9.]/g, '');
    return parseFloat(cleanText) || 0;
  }

  // Method to update media outlet data
  async updateMediaOutletData(mediaOutletId) {
    try {
      const mediaOutlet = await MediaOutlet.findById(mediaOutletId);
      if (!mediaOutlet) {
        throw new Error('Media outlet not found');
      }

      const scrapedData = await this.scrapeMediaOutlet(mediaOutlet.url);

      // Update media outlet with scraped data
      mediaOutlet.performanceMetrics = {
        ...mediaOutlet.performanceMetrics,
        ...scrapedData.metrics,
        lastUpdated: new Date()
      };

      mediaOutlet.contentMetrics = {
        ...mediaOutlet.contentMetrics,
        ...scrapedData.contentMetrics,
        lastUpdated: new Date()
      };

      mediaOutlet.ranking = {
        ...mediaOutlet.ranking,
        ...scrapedData.ranking,
        lastUpdated: new Date()
      };

      await mediaOutlet.save();

      return mediaOutlet;
    } catch (error) {
      console.error('Error updating media outlet data:', error);
      throw error;
    }
  }

  // Method to schedule regular updates
  async scheduleUpdates(interval = 24 * 60 * 60 * 1000) { // Default: 24 hours
    setInterval(async () => {
      try {
        const mediaOutlets = await MediaOutlet.find({});
        for (const outlet of mediaOutlets) {
          await this.updateMediaOutletData(outlet._id);
        }
      } catch (error) {
        console.error('Error in scheduled update:', error);
      }
    }, interval);
  }
}

export const scraperService = new ScraperService(); 