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
  const styles = {
    PAID: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20',
    PENDING: 'bg-yellow-500/10 text-yellow-300 border-yellow-400/20',
    FAILED: 'bg-red-500/10 text-red-300 border-red-400/20',
  };

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${styles[status] || styles.PENDING}`}>
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
    const fetchData = async () => {
      try {
        const res = await apiClient.get('/api/dashboard/pro-stats/', tokens.access);
        setData(res);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tokens.access]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050b08] text-white">
        <Spinner className="w-10 h-10 text-emerald-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-4 p-4 sm:p-6 text-center text-red-300 bg-red-500/10 border border-red-400/20 rounded-xl">
        {error}
      </div>
    );
  }

  const chartData = {
    labels: data?.sales_over_time?.labels || [],
    datasets: [
      {
        label: 'Revenue (Ksh)',
        data: data?.sales_over_time?.data || [],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        borderRadius: 6,
        barThickness: 22,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#050b08] text-white px-4 sm:px-6 lg:px-10 py-6">
      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-4xl font-black text-center">
          Business <span className="text-emerald-400">Dashboard</span>
        </h1>
        <p className="text-center text-gray-500 text-sm mt-2">
          Overview of your farm performance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <p className="text-gray-400 text-sm">Total Revenue</p>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
            Ksh {data.total_revenue.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <p className="text-gray-400 text-sm">Total Sales</p>
          <h2 className="text-2xl sm:text-3xl font-black mt-2">
            {data.total_sales_count}
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <p className="text-gray-400 text-sm">Active Listings</p>
          <h2 className="text-2xl sm:text-3xl font-black text-lime-300 mt-2">
            {data.active_listings_count}
          </h2>
        </div>

      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 overflow-x-auto">
          <h3 className="text-gray-300 font-semibold mb-4">
            Revenue (Last 30 Days)
          </h3>

          <div className="min-w-[320px]">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { ticks: { color: '#9ca3af' } },
                  y: { ticks: { color: '#9ca3af' } },
                },
              }}
              height={300}
            />
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
          <h3 className="text-gray-300 font-semibold mb-4">
            Recent Sales
          </h3>

          <div className="space-y-3">

            {data.recent_sales.length > 0 ? (
              data.recent_sales.map((sale) => (
                <div
                  key={sale.order_id}
                  className="flex justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="min-w-0">
                    <p className="font-semibold truncate">
                      {sale.animal_name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {sale.buyer} • {sale.date}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-emerald-300 font-bold">
                      Ksh {sale.price.toLocaleString()}
                    </p>
                    <StatusBadge status={sale.status} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center mt-6">
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