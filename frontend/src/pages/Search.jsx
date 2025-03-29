import React, { useState } from 'react';
import { apiService } from '../services/api';
import MediaCard from '../components/Leaderboard/MediaCard';
import Loading from '../components/common/Loading';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'relevance',
    timeRange: 'all'
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const results = await apiService.searchMediaOutlets(searchQuery);
      setResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to fetch search results. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Search Media Outlets</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-4">
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, category, or keyword..."
                  className="w-full px-6 py-4 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md transition-all duration-300 pr-12"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search Results */}
          <div className="space-y-6">
            {loading ? (
              <Loading />
            ) : error ? (
              <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
                {error}
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Enter a search term to find media outlets
                </p>
              </div>
            ) : (
              results.map((result) => (
                <MediaCard key={result.id} media={result} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search; 