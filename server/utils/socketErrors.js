// Custom error class for socket errors
export class SocketError extends Error {
  constructor(message, code = 'SOCKET_ERROR', details = null) {
    super(message);
    this.name = 'SocketError';
    this.code = code;
    this.details = details;
  }
}

// Error types
export const ErrorTypes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  ROOM_ERROR: 'ROOM_ERROR',
  DATA_ERROR: 'DATA_ERROR',
  SERVER_ERROR: 'SERVER_ERROR'
};

// Error messages
export const ErrorMessages = {
  INVALID_DATA: 'Invalid data provided',
  ROOM_NOT_FOUND: 'Room not found',
  UNAUTHORIZED: 'Unauthorized access',
  SERVER_ERROR: 'Internal server error',
  INVALID_FORMAT: 'Invalid data format'
};

// Error handler function
export const handleSocketError = (socket, error) => {
  console.error(`Socket error for client ${socket.id}:`, error);
  
  const errorResponse = {
    message: error.message || ErrorMessages.SERVER_ERROR,
    code: error.code || ErrorTypes.SERVER_ERROR,
    details: error.details
  };

  socket.emit('error', errorResponse);
};

// Validation helper
export const validateSocketData = (data, requiredFields) => {
  const missingFields = requiredFields.filter(field => !data[field]);
  if (missingFields.length > 0) {
    throw new SocketError(
      `Missing required fields: ${missingFields.join(', ')}`,
      ErrorTypes.VALIDATION_ERROR,
      { missingFields }
    );
  }
  return true;
}; 