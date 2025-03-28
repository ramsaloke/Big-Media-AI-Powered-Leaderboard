import { useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import SearchBar from '../components/Leaderboard/SearchBar';
import MediaCard from '../components/Leaderboard/MediaCard';
import Loading from '../components/common/Loading';
import ErrorBoundary from '../components/common/ErrorBoundary';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    // TODO: Replace with actual API call
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResults = [
        {
          name: "Forbes",
          category: "Business",
          views: 1500000,
          shares: 25000,
          articles: [
            { title: `Article about ${query}`, views: 500000, shares: 8000 }
          ]
        }
      ];
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <ErrorBoundary>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Media</h1>
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} />
              {loading ? (
                <Loading />
              ) : (
                <div className="space-y-6">
                  {searchResults.map((media, index) => (
                    <MediaCard key={index} media={media} />
                  ))}
                  {searchResults.length === 0 && (
                    <p className="text-center text-gray-600">
                      No results found. Try a different search term.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default Search; 