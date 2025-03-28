import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { initializeSocket } from './services/socket.js';
import connectToDB from './Database/db.js';
import mediaOutletsRoutes from './routes/mediaOutlets.js';
import categoriesRoutes from './routes/categories.js';
import performanceRoutes from './routes/performance.js';
import scraperRoutes from './routes/scraper.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Socket.io
initializeSocket(httpServer);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectToDB();

// Routes
app.use('/api/media-outlets', mediaOutletsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/scraper', scraperRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Media Leaderboard API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

// Use httpServer.listen instead of app.listen
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
