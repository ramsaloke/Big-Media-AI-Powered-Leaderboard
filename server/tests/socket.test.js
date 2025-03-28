import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

describe('WebSocket Tests', () => {
  let socket;

  beforeAll((done) => {
    socket = io(SOCKET_URL);
    socket.on('connect', done);
  });

  afterAll(() => {
    socket.close();
  });

  test('should connect to WebSocket server', () => {
    expect(socket.connected).toBe(true);
  });

  test('should join media outlet room', (done) => {
    const mediaOutletId = 'test-media-outlet-id';
    socket.emit('join-media-room', mediaOutletId);
    
    // Verify room membership
    socket.emit('get-room-members', mediaOutletId, (members) => {
      expect(members).toContain(socket.id);
      done();
    });
  });

  test('should receive performance update', (done) => {
    const mediaOutletId = 'test-media-outlet-id';
    const testData = {
      metrics: {
        reach: 1000,
        engagement: 0.8,
        influence: 0.9
      },
      ranking: {
        categoryRank: 1,
        overallRank: 5
      }
    };

    socket.on('performance-update', (data) => {
      expect(data.mediaOutletId).toBe(mediaOutletId);
      expect(data.data.metrics).toEqual(testData.metrics);
      expect(data.data.ranking).toEqual(testData.ranking);
      done();
    });

    // Simulate performance update
    socket.emit('performance-update', {
      mediaOutletId,
      data: testData
    });
  });

  test('should receive category update', (done) => {
    const categoryId = 'test-category-id';
    const testData = {
      name: 'Updated Category',
      description: 'Updated description'
    };

    socket.on('category-update', (data) => {
      expect(data.categoryId).toBe(categoryId);
      expect(data.data).toEqual(testData);
      done();
    });

    // Simulate category update
    socket.emit('category-update', {
      categoryId,
      data: testData
    });
  });

  test('should handle disconnection', (done) => {
    socket.on('disconnect', () => {
      expect(socket.connected).toBe(false);
      done();
    });

    socket.disconnect();
  });
}); 