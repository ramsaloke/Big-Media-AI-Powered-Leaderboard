import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000'; // Update with your backend URL

class SocketService {
  constructor() {
    this.socket = null;
    this.mediaUpdateCallbacks = new Set();
  }

  connect() {
    this.socket = io(SOCKET_URL);

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    this.socket.on('mediaUpdate', (data) => {
      this.mediaUpdateCallbacks.forEach(callback => callback(data));
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Subscribe to media updates
  subscribeToMediaUpdates(callback) {
    this.mediaUpdateCallbacks.add(callback);
  }

  // Unsubscribe from media updates
  unsubscribeFromMediaUpdates(callback) {
    this.mediaUpdateCallbacks.delete(callback);
  }
}

export const socketService = new SocketService(); 