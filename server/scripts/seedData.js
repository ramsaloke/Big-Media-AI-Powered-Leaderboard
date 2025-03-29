import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MediaOutlets from '../models/MediaOutlets.js';
import Category from '../models/Category.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    // Clear existing data
    await MediaOutlets.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const categories = [
      {
        name: 'Technology',
        description: 'Technology news and analysis',
        icon: '💻',
        color: '#3B82F6'
      },
      {
        name: 'Business',
        description: 'Business and financial news',
        icon: '💼',
        color: '#10B981'
      },
      {
        name: 'News',
        description: 'General news coverage',
        icon: '📰',
        color: '#EF4444'
      }
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log('Seeded categories');

    // Sample media outlets
    const mediaOutlets = [
      {
        name: 'TechCrunch',
        description: 'Breaking technology news, analysis, and insights from the tech industry.',
        category: 'Technology',
        website: 'https://techcrunch.com',
        socialMedia: {
          twitter: 'https://twitter.com/techcrunch',
          facebook: 'https://facebook.com/techcrunch',
          linkedin: 'https://linkedin.com/company/techcrunch'
        },
        metrics: {
          followers: 1500000,
          engagement: 85,
          reach: 5000000
        }
      },
      {
        name: 'Forbes',
        description: 'Global media company focusing on business, investing, technology, entrepreneurship, leadership, and lifestyle.',
        category: 'Business',
        website: 'https://forbes.com',
        socialMedia: {
          twitter: 'https://twitter.com/forbes',
          facebook: 'https://facebook.com/forbes',
          linkedin: 'https://linkedin.com/company/forbes'
        },
        metrics: {
          followers: 2000000,
          engagement: 90,
          reach: 8000000
        }
      },
      {
        name: 'Wired',
        description: 'Magazine and website covering technology, science, culture, and business.',
        category: 'Technology',
        website: 'https://wired.com',
        socialMedia: {
          twitter: 'https://twitter.com/wired',
          facebook: 'https://facebook.com/wired',
          linkedin: 'https://linkedin.com/company/wired'
        },
        metrics: {
          followers: 1200000,
          engagement: 88,
          reach: 4000000
        }
      }
    ];

    // Insert sample data
    await MediaOutlets.insertMany(mediaOutlets);
    console.log('Seeded media outlets data');

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData(); 