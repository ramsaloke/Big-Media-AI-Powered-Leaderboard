import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm">
            © 2024 Media Leaderboard. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/about" className="text-gray-600 hover:text-blue-600 text-sm">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 text-sm">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 