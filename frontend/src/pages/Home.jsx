import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Track Media Performance in Real-Time
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              AI-powered analytics platform for comprehensive media outlet insights and rankings
            </p>
            <div className="space-x-4">
              <Link
                to="/search"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
              >
                Start Searching
              </Link>
              <Link
                to="/dashboard"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Media Leaderboard?</h2>
            <p className="text-xl text-gray-600">Comprehensive analytics for media professionals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Real-Time Analytics",
                description: "Get instant insights into media performance metrics",
                icon: "⚡"
              },
              {
                title: "AI-Powered Insights",
                description: "Advanced algorithms for accurate predictions and trends",
                icon: "🤖"
              },
              {
                title: "Comprehensive Data",
                description: "Track followers, engagement, reach, and more",
                icon: "📊"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { number: "1000+", label: "Media Outlets" },
              { number: "50M+", label: "Data Points" },
              { number: "99.9%", label: "Accuracy" },
              { number: "24/7", label: "Real-Time Updates" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of media professionals using our platform
          </p>
          <Link
            to="/search"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
          >
            Start Free Trial
          </Link>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-xl text-gray-600">Explore media outlets by category</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { name: "Technology", icon: "💻" },
              { name: "Business", icon: "💼" },
              { name: "Entertainment", icon: "🎬" },
              { name: "Sports", icon: "⚽" }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="text-lg font-semibold text-gray-900">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 