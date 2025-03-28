import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

// Create socket connection
const socket = io(SOCKET_URL);

// Connection event handlers
socket.on('connect', () => {
  console.log('Connected to WebSocket server');
  
  // Test joining a media outlet room
  const mediaOutletId = 'test-media-outlet-id';
  socket.emit('join-media-room', mediaOutletId);
  console.log(`Joined room for media outlet: ${mediaOutletId}`);
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

// Test event handlers
socket.on('performance-update', (data) => {
  console.log('Received performance update:', data);
});

socket.on('new-media-outlet', (data) => {
  console.log('Received new media outlet:', data);
});

socket.on('category-update', (data) => {
  console.log('Received category update:', data);
});

socket.on('status-update', (data) => {
  console.log('Received status update:', data);
});

socket.on('leaderboard-update', (data) => {
  console.log('Received leaderboard update:', data);
});

// Test sending updates
setTimeout(() => {
  // Test performance update
  socket.emit('performance-update', {
    mediaOutletId: 'test-media-outlet-id',
    data: {
      metrics: {
        reach: 1000,
        engagement: 0.8,
        influence: 0.9
      },
      ranking: {
        categoryRank: 1,
        overallRank: 5
      }
    }
  });

  // Test category update
  socket.emit('category-update', {
    categoryId: 'test-category-id',
    data: {
      name: 'Updated Category',
      description: 'Updated description'
    }
  });

  // Test new media outlet
  socket.emit('new-media-outlet', {
    mediaOutletId: 'new-media-outlet-id',
    data: {
      name: 'New Media Outlet',
      category: 'News'
    }
  });

  // Test status update
  socket.emit('status-update', {
    mediaOutletId: 'test-media-outlet-id',
    data: {
      status: 'active',
      lastUpdated: new Date()
    }
  });

  // Test leaderboard update
  socket.emit('leaderboard-update', {
    data: {
      rankings: [
        { mediaOutletId: 'outlet-1', rank: 1 },
        { mediaOutletId: 'outlet-2', rank: 2 }
      ]
    }
  });
}, 2000);

// Cleanup after 5 seconds
setTimeout(() => {
  console.log('Closing connection...');
  socket.close();
}, 5000); 