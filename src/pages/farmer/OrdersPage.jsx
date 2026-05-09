import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../api/client';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const StatusBadge = ({ status }) => {
  const styles = {
    PENDING: 'bg-yellow-500/10 text-yellow-300 border border-yellow-400/20',
    CONFIRMED: 'bg-blue-500/10 text-blue-300 border border-blue-400/20',
    PAID: 'bg-green-500/10 text-green-300 border border-green-400/20',
    REJECTED: 'bg-red-500/10 text-red-300 border border-red-400/20',
  };

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status] || 'bg-white/5 text-gray-300 border border-white/10'}`}>
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
      setError('Could not load orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [tokens.access]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    if (!window.confirm(`Change status to ${newStatus}?`)) return;

    setActionLoading(prev => ({ ...prev, [orderId]: true }));

    try {
      await apiClient.patch(`/api/orders/${orderId}/`, { status: newStatus }, tokens.access);
      fetchOrders();
    } catch {
      alert('Failed to update order.');
    } finally {
      setActionLoading(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const newOrders = useMemo(
    () => orders.filter(o => o.status === 'PENDING'),
    [orders]
  );

  const processedOrders = useMemo(
    () =>
      orders
        .filter(o => o.status !== 'PENDING')
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    [orders]
  );

  if (loading) return <Spinner fullScreen />;

  return (
    <div className="min-h-screen bg-[#07120c] text-white p-4 sm:p-8">

      {/* HEADER */}
      <h1 className="text-2xl sm:text-3xl font-black mb-8">
        Orders <span className="text-green-400">Management</span>
      </h1>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-400/20 text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-8">

        {/* NEW ORDERS */}
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">

          <div className="p-4 sm:p-6 border-b border-white/10">
            <h2 className="font-bold text-yellow-300">
              New Orders (Pending Confirmation)
            </h2>
          </div>

          {newOrders.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              No new orders
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="text-gray-400 border-b border-white/10">
                  <tr>
                    <th className="text-left p-4">Order</th>
                    <th className="text-left p-4">Total</th>
                    <th className="text-center p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {newOrders.map(order => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition">

                      <td className="p-4">
                        <p className="font-semibold">#{order.id}</p>
                        <p className="text-xs text-gray-400">
                          Buyer: {order.buyer_username}
                        </p>
                      </td>

                      <td className="p-4 font-bold text-green-400">
                        Ksh {parseFloat(order.total_price).toLocaleString()}
                      </td>

                      <td className="p-4 text-center">

                        {actionLoading[order.id] ? (
                          <Spinner className="w-5 h-5 mx-auto" />
                        ) : (
                          <div className="flex justify-center gap-2">

                            <button
                              onClick={() => handleUpdateStatus(order.id, 'CONFIRMED')}
                              className="px-3 py-1 rounded-lg bg-green-500/10 border border-green-400/20 text-green-300 hover:bg-green-500/20"
                            >
                              Confirm
                            </button>

                            <button
                              onClick={() => handleUpdateStatus(order.id, 'REJECTED')}
                              className="px-3 py-1 rounded-lg bg-red-500/10 border border-red-400/20 text-red-300 hover:bg-red-500/20"
                            >
                              Reject
                            </button>

                          </div>
                        )}

                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}
        </div>

        {/* HISTORY */}
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">

          <div className="p-4 sm:p-6 border-b border-white/10">
            <h2 className="font-bold text-gray-300">Order History</h2>
          </div>

          {processedOrders.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              No processed orders yet
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <tbody>
                  {processedOrders.map(order => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition">

                      <td className="p-4">
                        <p className="font-semibold">#{order.id}</p>
                        <p className="text-xs text-gray-400">
                          Buyer: {order.buyer_username}
                        </p>
                      </td>

                      <td className="p-4 font-bold text-green-400">
                        Ksh {parseFloat(order.total_price).toLocaleString()}
                      </td>

                      <td className="p-4 text-center">
                        <StatusBadge status={order.status} />
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default FarmerOrdersPage;