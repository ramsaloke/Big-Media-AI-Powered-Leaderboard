import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-50">
        <Layout>
          <ErrorBoundary>
            <div className="w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          </ErrorBoundary>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
