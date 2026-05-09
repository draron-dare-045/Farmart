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
  const color =
    status === 'PAID'
      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20'
      : status === 'PENDING'
      ? 'bg-yellow-500/10 text-yellow-300 border-yellow-400/20'
      : 'bg-red-500/10 text-red-300 border-red-400/20';

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${color}`}>
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#050b08] text-white">
        <Spinner className="w-12 h-12 text-emerald-400" />
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center text-red-300 bg-red-500/10 border border-red-400/20 rounded-xl m-6">
        {error}
      </div>
    );

  const salesChartData = {
    labels: data?.sales_over_time.labels || [],
    datasets: [
      {
        label: 'Revenue (Ksh)',
        data: data?.sales_over_time.data || [],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(52, 211, 153, 1)',
        borderWidth: 2,
        borderRadius: 6,
        barThickness: 32,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#050b08] text-white p-4 sm:p-6 md:p-8">

      {/* BACK GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-lime-300/10 blur-[120px] rounded-full" />

      {/* TITLE */}
      <h1 className="relative text-center text-3xl sm:text-4xl font-black mb-10">
        Your <span className="text-emerald-400">Business Overview</span>
      </h1>

      {/* CARDS */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-6 rounded-2xl">
          <h3 className="text-sm text-gray-400">Total Revenue</h3>
          <p className="text-3xl font-black mt-2 text-emerald-400">
            Ksh {data.total_revenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-6 rounded-2xl">
          <h3 className="text-sm text-gray-400">Total Sales</h3>
          <p className="text-3xl font-black mt-2 text-white">
            {data.total_sales_count}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-6 rounded-2xl">
          <h3 className="text-sm text-gray-400">Active Listings</h3>
          <p className="text-3xl font-black mt-2 text-lime-300">
            {data.active_listings_count}
          </p>
        </div>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* CHART */}
        <div className="xl:col-span-2 bg-white/5 border border-white/10 backdrop-blur-2xl p-6 rounded-2xl">
          <h2 className="text-lg font-bold mb-6 text-gray-300">
            Revenue (Last 30 Days)
          </h2>

          <Bar
            data={salesChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                x: {
                  ticks: { color: '#9ca3af' },
                  grid: { color: 'rgba(255,255,255,0.05)' },
                },
                y: {
                  ticks: { color: '#9ca3af' },
                  grid: { color: 'rgba(255,255,255,0.05)' },
                },
              },
            }}
          />
        </div>

        {/* RECENT SALES */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-6 rounded-2xl">

          <h2 className="text-lg font-bold mb-6 text-gray-300">
            Recent Sales
          </h2>

          <div className="space-y-4">

            {data.recent_sales.length > 0 ? (
              data.recent_sales.map((item) => (
                <div
                  key={item.order_id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between"
                >
                  <div>
                    <p className="font-semibold">{item.animal_name}</p>
                    <p className="text-xs text-gray-400">
                      {item.buyer} • {item.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-emerald-300 font-bold">
                      Ksh {item.price.toLocaleString()}
                    </p>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center mt-10">
                No recent sales
              </p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default FarmerDashboardPage;