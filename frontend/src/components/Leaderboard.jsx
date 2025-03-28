import { useState, useEffect } from 'react';
import MediaCard from './MediaCard';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';

const Leaderboard = () => {
  const [mediaOutlets, setMediaOutlets] = useState([]);
  const [filteredOutlets, setFilteredOutlets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchData = async () => {
      try {
        // Simulated data for now
        const mockData = [
          {
            name: "Forbes",
            category: "Business",
            views: 1500000,
            shares: 25000,
            articles: [
              { title: "Top Tech Companies 2024", views: 500000, shares: 8000 },
              { title: "Billionaire Rankings", views: 300000, shares: 5000 }
            ]
          },
          // Add more mock data as needed
        ];
        
        setMediaOutlets(mockData);
        setFilteredOutlets(mockData);
        setCategories(['Business', 'Technology', 'Politics', 'Entertainment']);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...mediaOutlets];

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(outlet => outlet.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(outlet =>
        outlet.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOutlets(filtered);
  }, [selectedCategory, searchQuery, mediaOutlets]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Media Leaderboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <div>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOutlets.map((outlet, index) => (
          <MediaCard key={index} media={outlet} />
        ))}
      </div>
    </div>
  );
};

export default Leaderboard; 