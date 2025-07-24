import React from 'react';

const FarmerOrdersPage = () => (
    <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Manage Orders</h1>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Order Management</h2>
            </div>

            <div className="border border-dashed border-gray-300 rounded-md p-10 text-center text-gray-400">
                <p className="text-lg font-medium">No orders yet</p>
                <p className="mt-2 text-sm">Incoming customer orders will appear here once they start purchasing your animals.</p>
            </div>
        </div>
    </div>
);

export default FarmerOrdersPage;