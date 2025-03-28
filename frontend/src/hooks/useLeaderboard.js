import { useState, useEffect } from 'react';
import { getMediaOutlets, getCategories } from '../services/api';

const useLeaderboard = () => {
  const [mediaOutlets, setMediaOutlets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [outletsData, categoriesData] = await Promise.all([
          getMediaOutlets(),
          getCategories()
        ]);
        
        setMediaOutlets(outletsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching leaderboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    mediaOutlets,
    categories,
    loading,
    error,
    setMediaOutlets
  };
};

export default useLeaderboard; 