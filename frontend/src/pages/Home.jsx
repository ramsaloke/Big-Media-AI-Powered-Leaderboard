import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Leaderboard from '../components/Leaderboard/Leaderboard';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Leaderboard />
      </main>
      <Footer />
    </div>
  );
};

export default Home; 