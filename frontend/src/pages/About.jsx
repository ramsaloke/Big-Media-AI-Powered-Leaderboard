import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Media Leaderboard</h1>
            <p className="text-xl text-blue-100">
              Transforming media analytics with AI-powered insights
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              Media Leaderboard is an AI-powered platform that helps you track and analyze the performance of media outlets in real-time. Our platform provides comprehensive insights into social media engagement, reach, and growth metrics.
            </p>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                We aim to provide accurate, real-time data and insights to help media professionals, researchers, and enthusiasts understand the digital media landscape better.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To become the leading platform for media analytics, setting new standards in data accuracy and real-time insights.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Real-time Tracking",
                  description: "Monitor performance metrics as they happen",
                  icon: "📊"
                },
                {
                  title: "AI Analytics",
                  description: "Advanced algorithms for accurate insights",
                  icon: "🤖"
                },
                {
                  title: "Dashboard",
                  description: "Comprehensive metrics visualization",
                  icon: "📈"
                },
                {
                  title: "Category Analysis",
                  description: "Segment data by media categories",
                  icon: "🏷️"
                },
                {
                  title: "Historical Data",
                  description: "Compare performance over time",
                  icon: "📅"
                },
                {
                  title: "Custom Reports",
                  description: "Generate tailored analytics reports",
                  icon: "📄"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-colors duration-300">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Data Collection",
                  description: "We gather real-time data from various sources"
                },
                {
                  step: "2",
                  title: "Analysis",
                  description: "AI-powered analysis of performance metrics"
                },
                {
                  step: "3",
                  title: "Insights",
                  description: "Get actionable insights and rankings"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 