import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';
import apiClient from '../../api/client';
import Spinner from '../../components/common/Spinner';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';

const BuyerOrdersPage = ({ onNavigate }) => {
  const { user, tokens } = useAuth();
  const { triggerDataRefresh } = useCart();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [mpesaError, setMpesaError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [payLoading, setPayLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});

  const pollingIntervalRef = useRef(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.get('/api/orders/', tokens.access);
      setOrders(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (err) {
      setError(err.message || 'Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  }, [tokens.access]);

  useEffect(() => {
    fetchOrders();
    return () => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    };
  }, [fetchOrders]);

  const handlePay = (order) => {
    setSelectedOrder(order);
    setPhone(user?.phone_number || '254');
    setMpesaError('');
    setModalOpen(true);
  };

  const handleRemove = async (orderId) => {
    if (!window.confirm('Cancel this order?')) return;

    setDeleteLoading((p) => ({ ...p, [orderId]: true }));
    try {
      await apiClient.delete(`/api/orders/${orderId}/`, tokens.access);
      fetchOrders();
    } finally {
      setDeleteLoading((p) => ({ ...p, [orderId]: false }));
    }
  };

  const submitPayment = async () => {
    if (!phone.match(/^254\d{9}$/)) {
      setMpesaError('Enter valid number (254XXXXXXXXX)');
      return;
    }

    setPayLoading(true);
    try {
      await apiClient.post(
        '/api/make-payment/',
        { order_id: selectedOrder.id, phone_number: phone },
        tokens.access
      );

      setModalOpen(false);
      startPollingForOrderStatus(selectedOrder.id);
    } finally {
      setPayLoading(false);
    }
  };

  const startPollingForOrderStatus = (orderId) => {
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);

    const startTime = Date.now();

    pollingIntervalRef.current = setInterval(async () => {
      if (Date.now() - startTime > 120000) {
        clearInterval(pollingIntervalRef.current);
        return;
      }

      try {
        const updated = await apiClient.get(`/api/orders/${orderId}/`, tokens.access);

        if (updated.status === 'PAID') {
          clearInterval(pollingIntervalRef.current);
          setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? updated : o))
          );
          triggerDataRefresh();
        }
      } catch {
        clearInterval(pollingIntervalRef.current);
      }
    }, 5000);
  };

  if (loading) return <Spinner fullScreen />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07120c] text-white">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#07120c] text-white overflow-hidden">
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-green-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-lime-300/10 blur-[120px] rounded-full" />
      <div className="text-center pt-14 px-4">
        <h1 className="text-3xl sm:text-5xl font-black">
          My <span className="text-green-400">Orders</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Track purchases & complete payments
        </p>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => onNavigate('/shop')}
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Back to Marketplace
        </button>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">

        {orders.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            No orders yet
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between gap-4"
            >
              <div>
                <p className="font-bold">Order #{order.id}</p>

                <p className="text-sm mt-1">
                  Status:{' '}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'PAID'
                        ? 'bg-green-500/20 text-green-300'
                        : order.status === 'CONFIRMED'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-gray-500/20 text-gray-300'
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                <p className="mt-2 text-green-400 font-black">
                  Ksh {parseFloat(order.total_price).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2 items-center">

                {order.status === 'CONFIRMED' && (
                  <Button
                    onClick={() => handlePay(order)}
                    className="bg-gradient-to-r from-green-400 to-lime-300 text-black font-bold px-4 py-2 rounded-xl"
                  >
                    Pay
                  </Button>
                )}

                {(order.status === 'PENDING' ||
                  order.status === 'CONFIRMED') && (
                  <button
                    onClick={() => handleRemove(order.id)}
                    disabled={deleteLoading[order.id]}
                    className="px-4 py-2 rounded-xl border border-red-400/20 text-red-300 hover:bg-red-500/10"
                  >
                    Cancel
                  </button>
                )}

              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && selectedOrder && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="M-Pesa Payment"
        >
          <div className="space-y-4">

            <p className="text-green-400 font-bold">
              Ksh {parseFloat(selectedOrder.total_price).toLocaleString()}
            </p>

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="2547XXXXXXXX"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
            />

            {mpesaError && (
              <p className="text-red-400 text-sm">{mpesaError}</p>
            )}

            <Button
              onClick={submitPayment}
              loading={payLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-black"
            >
              Pay Now
            </Button>

          </div>
        </Modal>
      )}
    </div>
  );
};

export default BuyerOrdersPage;