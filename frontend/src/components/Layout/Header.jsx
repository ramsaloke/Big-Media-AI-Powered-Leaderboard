import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">Media Leaderboard</Link>
          </div>
          <nav className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <Link to="/search" className="text-gray-600 hover:text-gray-900">Search</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 