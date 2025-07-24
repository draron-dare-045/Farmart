import React from 'react';

const FarmerDashboardPage = () => (
  <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
    <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-8">Dashboard Overview</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition">
      <h3 className="text-md font-medium text-purple-700">Total Sales</h3>
      <p className="text-4xl font-extrabold text-black mt-2">Ksh 0</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-yellow-100 hover:shadow-md transition">
      <h3 className="text-md font-medium text-yellow-500">Pending Orders</h3>
      <p className="text-4xl font-extrabold text-black mt-2">0</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition">
      <h3 className="text-md font-medium text-pink-500">Active Listings</h3>
      <p className="text-4xl font-extrabold text-black mt-2">0</p>
      </div>
    </div>

    <div className="mt-12 text-center text-sm text-gray-400">
      More analytics and recent activity coming soon...
    </div>
  </div>
);

export default FarmerDashboardPage;