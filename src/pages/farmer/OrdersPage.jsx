import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../api/client';
import Spinner from '../../components/common/Spinner';

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
      await apiClient.patch(
        `/api/orders/${orderId}/`,
        { status: newStatus },
        tokens.access
      );
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07120c] text-white">
        <Spinner className="w-10 h-10 text-green-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07120c] text-white px-4 sm:px-6 py-6">

      {/* HEADER */}
      <h1 className="text-2xl sm:text-3xl font-black mb-6">
        Orders <span className="text-green-400">Management</span>
      </h1>

      {error && (
        <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-400/20 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* NEW ORDERS */}
      <section className="mb-8 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

        <div className="p-4 border-b border-white/10">
          <h2 className="text-yellow-300 font-semibold">
            New Orders (Pending)
          </h2>
        </div>

        {newOrders.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No new orders
          </div>
        ) : (
          <div className="p-4 space-y-4">

            {newOrders.map(order => (
              <div
                key={order.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3"
              >

                {/* TOP INFO */}
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-xs text-gray-400">
                      {order.buyer_username}
                    </p>
                  </div>

                  <p className="text-green-400 font-bold">
                    Ksh {parseFloat(order.total_price).toLocaleString()}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2">

                  {actionLoading[order.id] ? (
                    <Spinner className="w-5 h-5" />
                  ) : (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'CONFIRMED')}
                        className="flex-1 py-2 text-sm rounded-lg bg-green-500/10 border border-green-400/20 text-green-300"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(order.id, 'REJECTED')}
                        className="flex-1 py-2 text-sm rounded-lg bg-red-500/10 border border-red-400/20 text-red-300"
                      >
                        Reject
                      </button>
                    </>
                  )}

                </div>

              </div>
            ))}

          </div>
        )}
      </section>

      {/* HISTORY */}
      <section className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

        <div className="p-4 border-b border-white/10">
          <h2 className="text-gray-300 font-semibold">Order History</h2>
        </div>

        {processedOrders.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No processed orders yet
          </div>
        ) : (
          <div className="p-4 space-y-4">

            {processedOrders.map(order => (
              <div
                key={order.id}
                className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center"
              >

                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-xs text-gray-400">
                    {order.buyer_username}
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <p className="text-green-400 font-bold">
                    Ksh {parseFloat(order.total_price).toLocaleString()}
                  </p>
                  <StatusBadge status={order.status} />
                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
};

export default FarmerOrdersPage;