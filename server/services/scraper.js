import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import MediaOutlets from '../models/MediaOutlets.js';

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
    this.baseUrl = process.env.SCRAPER_API_URL || 'http://localhost:3000';
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

  getWebsiteRules(website) {
    const domain = new URL(website).hostname;
    return this.websiteRules[domain] || this.websiteRules.default;
  }

  // Enhanced ranking algorithm
  calculateRanking(metrics, contentMetrics) {
    // Weight factors for different metrics
    const weights = {
      engagement: 0.3,
      reach: 0.2,
      influence: 0.2,
      articles: 0.15,
      views: 0.1,
      shares: 0.05
    };

    // Normalize metrics to a 0-100 scale
    const normalizedMetrics = {
      engagement: this.normalizeMetric(metrics.engagement, 0, 100),
      reach: this.normalizeMetric(metrics.reach, 0, 1000000),
      influence: this.normalizeMetric(metrics.influence, 0, 100),
      articles: this.normalizeMetric(contentMetrics.articles, 0, 1000),
      views: this.normalizeMetric(contentMetrics.views, 0, 100000),
      shares: this.normalizeMetric(contentMetrics.shares, 0, 10000)
    };

    // Calculate weighted score
    const score = Object.entries(weights).reduce((total, [metric, weight]) => {
      return total + (normalizedMetrics[metric] * weight);
    }, 0);

    // Calculate category rank based on engagement and influence
    const categoryScore = (normalizedMetrics.engagement * 0.6) + (normalizedMetrics.influence * 0.4);

    return {
      overallScore: score,
      categoryScore: categoryScore,
      metrics: normalizedMetrics
    };
  }

  normalizeMetric(value, min, max) {
    if (value <= min) return 0;
    if (value >= max) return 100;
    return ((value - min) / (max - min)) * 100;
  }

  // Update the scrapeMediaOutlet method to use the new ranking algorithm
  async scrapeMediaOutlet(website) {
    try {
      const page = await this.browser.newPage();
      await page.goto(website, { waitUntil: 'networkidle0' });
      
      const content = await page.content();
      const $ = cheerio.load(content);
      const rules = this.getWebsiteRules(website);

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

      // Calculate influence score based on engagement and reach
      metrics.influence = (metrics.engagement * 0.7) + (metrics.reach * 0.3);

      // Calculate ranking using the enhanced algorithm
      const ranking = this.calculateRanking(metrics, contentMetrics);

      await page.close();

      return {
        metrics,
        contentMetrics,
        ranking,
        lastScraped: new Date()
      };
    } catch (error) {
      console.error(`Error scraping ${website}:`, error);
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

  parseNumber(text) {
    if (!text) return 0;
    // Remove commas and any non-numeric characters except decimal point
    const cleanText = text.replace(/[^0-9.]/g, '');
    return parseFloat(cleanText) || 0;
  }

  // Method to update media outlet data
  async updateMediaOutletData(mediaOutletId) {
    try {
      const mediaOutlet = await MediaOutlets.findById(mediaOutletId);
      if (!mediaOutlet) {
        throw new Error('Media outlet not found');
      }

      const scrapedData = await this.scrapeMediaOutlet(mediaOutlet.website);

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
        overallScore: scrapedData.ranking.overallScore,
        categoryScore: scrapedData.ranking.categoryScore,
        lastUpdated: new Date()
      };

      await mediaOutlet.save();

      return mediaOutlet;
    } catch (error) {
      console.error('Error updating media outlet data:', error);
      throw error;
    }
  }

  async updateAllMediaOutlets() {
    try {
      const mediaOutlets = await MediaOutlets.find({});
      for (const outlet of mediaOutlets) {
        await this.updateMediaOutletData(outlet._id);
      }
      return { message: 'All media outlets updated successfully' };
    } catch (error) {
      console.error('Error updating all media outlets:', error);
      throw error;
    }
  }

  // Method to schedule regular updates
  async scheduleUpdates(interval = 24 * 60 * 60 * 1000) { // Default: 24 hours
    setInterval(async () => {
      try {
        const mediaOutlets = await MediaOutlets.find({});
        for (const outlet of mediaOutlets) {
          await this.updateMediaOutletData(outlet._id);
        }
      } catch (error) {
        console.error('Error in scheduled update:', error);
      }
    }, interval);
  }
}

export default new ScraperService(); 