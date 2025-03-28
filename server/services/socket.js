import { Server } from 'socket.io';
import MediaOutlet from '../models/MediaOutlet.js';
import Category from '../models/Category.js';

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  // Handle connections
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join specific rooms for real-time updates
    socket.on('join-media-outlet', (mediaOutletId) => {
      socket.join(`media-outlet-${mediaOutletId}`);
    });

    socket.on('join-category', (categoryId) => {
      socket.join(`category-${categoryId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

// Event emitters for different types of updates
export const emitPerformanceUpdate = (mediaOutletId, data) => {
  if (io) {
    io.to(`media-outlet-${mediaOutletId}`).emit('performance-update', data);
    io.emit('leaderboard-update', { mediaOutletId, ...data });
  }
};

export const emitNewMediaOutlet = (mediaOutlet) => {
  if (io) {
    io.emit('new-media-outlet', mediaOutlet);
    io.to(`category-${mediaOutlet.category}`).emit('category-update', {
      type: 'new-outlet',
      mediaOutlet
    });
  }
};

export const emitCategoryUpdate = (categoryId, update) => {
  if (io) {
    io.to(`category-${categoryId}`).emit('category-update', update);
  }
};

export const emitStatusUpdate = (mediaOutletId, status) => {
  if (io) {
    io.to(`media-outlet-${mediaOutletId}`).emit('status-update', status);
    io.emit('leaderboard-update', { mediaOutletId, status });
  }
}; 