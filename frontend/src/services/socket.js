import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000'; // Update with your backend URL

class SocketService {
  constructor() {
    this.socket = null;
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
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Subscribe to media updates
  subscribeToMediaUpdates(callback) {
    if (this.socket) {
      this.socket.on('mediaUpdate', callback);
    }
  }

  // Unsubscribe from media updates
  unsubscribeFromMediaUpdates() {
    if (this.socket) {
      this.socket.off('mediaUpdate');
    }
  }
}

export default new SocketService(); 