import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../api/client';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const StatusBadge = ({ status }) => {
  const styles = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    PAID: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

const FarmerOrdersPage = () => {
    const { tokens } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState({});

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await apiClient.get('/api/orders/', tokens.access);
            setOrders(data);
        } catch {
            setError('Could not fetch orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [tokens.access]);

    const handleUpdateStatus = async (orderId, newStatus) => {
        const confirmMessage = newStatus === 'REJECTED'
            ? "Are you sure you want to reject this order? The stock will not be returned."
            : `Are you sure you want to ${newStatus.toLowerCase()} this order?`;
        
        if (!window.confirm(confirmMessage)) return;

        setActionLoading(prev => ({ ...prev, [orderId]: true }));
        try {
            await apiClient.patch(`/api/orders/${orderId}/`, { status: newStatus }, tokens.access);
            fetchOrders(); 
        } catch {
            alert(`Failed to update order status.`);
        } finally {
            setActionLoading(prev => ({ ...prev, [orderId]: false }));
        }
    };

    const newOrders = useMemo(() => 
        orders.filter(o => o.status === 'PENDING'), 
    [orders]);

    const processedOrders = useMemo(() => 
        orders.filter(o => o.status !== 'PENDING')
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    [orders]);

    if (loading) return <Spinner fullScreen />;
    if (error) return <div className="text-center text-red-600 p-8">{error}</div>;

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Customer Orders</h1>

            <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-md border-2 border-yellow-300">
                    <h2 className="p-6 text-lg font-semibold text-yellow-800 bg-yellow-50 rounded-t-lg">New Orders Requiring Confirmation</h2>
                    {newOrders.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {newOrders.map(order => (
                                    <tr key={order.id}>
                                        <td className="px-6 py-4"><div className="text-sm font-medium text-gray-900">ID: #{order.id}</div><div className="text-sm text-gray-500">Buyer: {order.buyer_username}</div></td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">Ksh {parseFloat(order.total_price).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-center">
                                            {actionLoading[order.id] ? <Spinner className="w-5 h-5 mx-auto" /> : (
                                                <div className="flex justify-center items-center space-x-2">
                                                    <Button onClick={() => handleUpdateStatus(order.id, 'CONFIRMED')} variant="success" size="sm">Confirm</Button>
                                                    <Button onClick={() => handleUpdateStatus(order.id, 'REJECTED')} variant="danger" size="sm">Reject</Button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-10 text-center text-gray-500"><p>No new orders to confirm.</p></div>
                    )}
                </div>

                <details className="bg-white rounded-xl shadow-sm border border-gray-200" open>
                    <summary className="p-6 cursor-pointer text-lg font-semibold text-gray-700">Order History</summary>
                    {processedOrders.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-gray-50">
                               <tr>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Details</th>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                   <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                               </tr>
                           </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {processedOrders.map(order => (
                                    <tr key={order.id}>
                                        <td className="px-6 py-4"><div className="text-sm font-medium text-gray-900">ID: #{order.id}</div><div className="text-sm text-gray-500">Buyer: {order.buyer_username}</div></td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">Ksh {parseFloat(order.total_price).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-center"><StatusBadge status={order.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : <div className="p-10 text-center text-gray-500"><p>No processed orders yet.</p></div>}
                </details>
            </div>
        </div>
    );
};

export default FarmerOrdersPage;
