import { Server } from 'socket.io';
import MediaOutlets from '../models/MediaOutlets.js';
import Category from '../models/Category.js';

let io;

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5175',
      methods: ['GET', 'POST']
    }
  });

  // Handle connections
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join specific rooms for real-time updates
    socket.on('join-media-outlet', (mediaOutletId) => {
      socket.join(`media-outlet-${mediaOutletId}`);
      console.log(`Client ${socket.id} joined media outlet ${mediaOutletId}`);
    });

    socket.on('leave-media-outlet', (mediaOutletId) => {
      socket.leave(`media-outlet-${mediaOutletId}`);
      console.log(`Client ${socket.id} left media outlet ${mediaOutletId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

// Event emitters for different types of updates
export const emitPerformanceUpdate = (mediaOutletId, data) => {
  if (!io) return;
  
  io.to(`media-outlet-${mediaOutletId}`).emit('performance-update', data);
  io.emit('leaderboard-update', { mediaOutletId, ...data });
};

export const emitNewMediaOutlet = (mediaOutlet) => {
  if (!io) return;
  
  io.emit('new-media-outlet', mediaOutlet);
  io.to(`category-${mediaOutlet.category}`).emit('category-update', {
    category: mediaOutlet.category,
    mediaOutlet
  });
};

export const emitCategoryUpdate = (categoryId, update) => {
  if (io) {
    io.to(`category-${categoryId}`).emit('category-update', update);
  }
};

export const emitStatusUpdate = (mediaOutletId, status) => {
  if (!io) return;
  
  io.to(`media-outlet-${mediaOutletId}`).emit('status-update', status);
  io.emit('leaderboard-update', { mediaOutletId, status });
}; 