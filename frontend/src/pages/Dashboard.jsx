import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";
import { socketService } from "../services/socket";
import { apiService } from "../services/api";
import Loading from "../components/common/Loading";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalFollowers: 0,
    avgEngagement: 0,
    totalReach: 0,
    totalOutlets: 0,
  });

  const [historicalData, setHistoricalData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("24h");

  useEffect(() => {
    fetchMetrics();
    setupSocketListeners();
    return () => {
      socketService.unsubscribeFromMediaUpdates();
    };
  }, [timeRange]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch data from the API
      const data = await apiService.getMetrics(timeRange);
      console.log('Fetched metrics:', data);
      
      // Set current metrics with default values if data is missing
      if (data?.current) {
        setMetrics({
          totalFollowers: data.current.totalFollowers || 0,
          avgEngagement: data.current.avgEngagement || 0,
          totalReach: data.current.totalReach || 0,
          totalOutlets: data.current.totalOutlets || 0
        });
      } else {
        setMetrics({
          totalFollowers: 0,
          avgEngagement: 0,
          totalReach: 0,
          totalOutlets: 0
        });
      }
      
      // Set historical data with validation
      if (Array.isArray(data?.historical)) {
        setHistoricalData(data.historical);
      } else {
        setHistoricalData([]);
      }
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setError('Failed to fetch metrics data. Please try again later.');
      // Set default states on error
      setMetrics({
        totalFollowers: 0,
        avgEngagement: 0,
        totalReach: 0,
        totalOutlets: 0
      });
      setHistoricalData([]);
    } finally {
      setLoading(false);
    }
  };

  const setupSocketListeners = () => {
    socketService.subscribeToMediaUpdates((data) => {
      if (data) {
        setMetrics(prev => ({
          ...prev,
          ...data
        }));
      }
    });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Performance Metrics By Category",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const chartData = {
    labels: historicalData.map(item => item.category),
    datasets: [
      {
        label: "Followers",
        data: historicalData.map(item => item.totalFollowers),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.4,
      },
      {
        label: "Engagement",
        data: historicalData.map(item => item.avgEngagement),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
        tension: 0.4,
      },
      {
        label: "Reach",
        data: historicalData.map(item => item.totalReach),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        tension: 0.4,
      },
    ],
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchMetrics}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="mt-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Followers</h3>
          <p className="text-3xl font-bold text-blue-600">{metrics.totalFollowers.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700">Average Engagement</h3>
          <p className="text-3xl font-bold text-green-600">{metrics.avgEngagement.toFixed(2)}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Reach</h3>
          <p className="text-3xl font-bold text-purple-600">{metrics.totalReach.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Outlets</h3>
          <p className="text-3xl font-bold text-orange-600">{metrics.totalOutlets}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Historical Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reach</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historicalData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.totalFollowers.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.avgEngagement.toFixed(2)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.totalReach.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="h-[400px]">
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 