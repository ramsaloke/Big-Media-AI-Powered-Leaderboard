import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Media Leaderboard</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p>
                Media Leaderboard is dedicated to providing real-time insights into media performance
                and engagement metrics. We help businesses, PR firms, and readers understand which
                media outlets are truly leading conversations and driving impact.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Track</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Real-time views and engagement metrics</li>
                <li>Social media shares and interactions</li>
                <li>Article performance across major media outlets</li>
                <li>Category-specific rankings and trends</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
              <p>
                Our AI-powered platform automatically tracks and analyzes media performance
                across major outlets like Forbes, NYT, Bloomberg, and more. We provide
                transparent, real-time data to help you make informed decisions about
                media engagement and content strategy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">For Media Outlets</h2>
              <p>
                Media houses get free exposure and credibility rankings, helping them
                showcase their impact and reach to potential advertisers and readers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">For Businesses</h2>
              <p>
                Make data-driven decisions about media partnerships and PR strategies
                with our comprehensive analytics and real-time performance tracking.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About; 