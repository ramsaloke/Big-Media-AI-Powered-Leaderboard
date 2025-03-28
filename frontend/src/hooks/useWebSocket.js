import { useEffect, useCallback } from 'react';
import { subscribeToUpdates, unsubscribeFromUpdates, initializeSocket } from '../services/socket';

const useWebSocket = (onUpdate) => {
  const handleUpdate = useCallback((data) => {
    if (onUpdate) {
      onUpdate(data);
    }
  }, [onUpdate]);

  useEffect(() => {
    // Initialize socket connection
    initializeSocket();

    // Subscribe to updates
    subscribeToUpdates(handleUpdate);

    // Cleanup on unmount
    return () => {
      unsubscribeFromUpdates(handleUpdate);
    };
  }, [handleUpdate]);
};

export default useWebSocket; 