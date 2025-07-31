import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../api/client';
import Spinner from '../../components/common/Spinner';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatusBadge = ({ status }) => {
  return (
    <span className="px-3 py-1.5 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-300 shadow-sm hover:shadow-md transition-all duration-200">
      {status}
    </span>
  );
};

const FarmerDashboardPage = () => {
  const { tokens } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await apiClient.get('/api/dashboard/pro-stats/', tokens.access);
        setData(response);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [tokens.access]);

  const salesChartData = {
    labels: data?.sales_over_time.labels || [],
    datasets: [
      {
        label: 'Daily Revenue (Ksh)',
        data: data?.sales_over_time.data || [],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(22, 163, 74, 1)',
        borderWidth: 2,
        barThickness: 40,
        borderRadius: 4,
      },
    ],
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="w-12 h-12 text-green-600" />
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg shadow-md">
        {error}
      </div>
    );

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-200 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-green-700 to-green-400 bg-clip-text text-transparent drop-shadow-md">
        Your Business Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-md font-medium text-blue-600">Total Revenue</h3>
          <p className="text-4xl font-bold text-black mt-3">
            Ksh {data.total_revenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-md font-medium text-purple-600">Total Sales</h3>
          <p className="text-4xl font-bold text-black mt-3">{data.total_sales_count}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-md font-medium text-orange-600">Active Listings</h3>
          <p className="text-4xl font-bold text-black mt-3">{data.active_listings_count}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-green-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Revenue (Last 30 Days)
          </h2>
          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: {
                  display: true,
                  text: 'Daily Revenue Trend',
                  font: { size: 18 },
                  color: '#1F2937',
                },
              },
              scales: {
                x: { title: { display: true, text: 'Date', color: '#4B5563' } },
                y: {
                  title: { display: true, text: 'Revenue (Ksh)', color: '#4B5563' },
                  beginAtZero: true,
                },
              },
              animation: { duration: 1000, easing: 'easeOutQuart' },
            }}
            data={salesChartData}
          />
        </div>

        <div className="xl:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-green-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Recent Sales Activity
          </h2>
          <div className="space-y-5">
            {data.recent_sales.length > 0 ? (
              data.recent_sales.map((item) => (
                <div
                  key={item.order_id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800 text-lg">{item.animal_name}</p>
                    <p className="text-sm text-gray-500">
                      Sold to {item.buyer} on {item.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800 text-lg">
                      Ksh {item.price.toLocaleString()}
                    </p>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center pt-10">
                No recent sales to display.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboardPage;
