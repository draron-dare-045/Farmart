import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../api/client';
import Spinner from '../../components/common/Spinner';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';

const BuyerOrdersPage = ({ onNavigate }) => {
  const { user, tokens } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('254');
  const [mpesaError, setMpesaError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selOrder, setSelOrder] = useState(null);
  const [payLoading, setPayLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});

  useEffect(() => {
    apiClient.get('/api/orders/', tokens.access)
      .then(data => setOrders(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [tokens]);

  const handlePay = (order) => {
    setSelOrder(order);
    setPhone(user?.phone_number || '254');
    setMpesaError('');
    setModalOpen(true);
  };

  const handleRemove = async (orderId) => {
    setDeleteLoading(prev => ({ ...prev, [orderId]: true }));
    try {
      await apiClient.delete(`/api/orders/${orderId}/`, tokens.access);
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Order removed successfully!');
    } catch {
      alert('Failed to remove order.');
    } finally {
      setDeleteLoading(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const submitPayment = async () => {
    if (!phone.startsWith('254')) {
      setMpesaError('Phone number must start with 254.');
      return;
    }
    setPayLoading(true);
    try {
      await apiClient.post('/api/make-payment/', {
        order_id: selOrder.id,
        phone_number: phone
      }, tokens.access);
      alert('Payment initiated! Check your phone.');
      setModalOpen(false);
    } catch {
      alert('Payment initiation failed.');
    } finally {
      setPayLoading(false);
    }
  };

  if (loading) return <Spinner fullScreen />;
  if (error) return <div className="text-center text-red-600 p-8">{error}</div>;

  return (
    <div className="p-8 min-h-screen bg-green-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">My Orders</h1>
          <Button
            onClick={() => onNavigate('/shop')}
            variant="ghost"
            className="text-green-700 hover:text-green-900"
          >
            ← Back to Shop
          </Button>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
          {orders.length === 0 ? (
            <p className="text-gray-600 text-lg text-center">
              You have no orders yet.
            </p>
          ) : (
            orders.map(order => (
              <div
                key={order.id}
                className="flex justify-between items-center border-b last:border-none pb-4"
              >
                <div className="space-y-1">
                  <p className="text-gray-900 font-bold">
                    <span className="text-sm">Order ID:</span> #{order.id}
                  </p>
                  <p className="text-gray-800">
                    <span className="text-sm font-semibold">Status:</span>{' '}
                    <span className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'CONFIRMED'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'PAID'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </p>
                  <p className="text-gray-800">
                    <span className="text-sm font-semibold">Total:</span>{' '}
                    <span className="font-bold text-green-800 bg-green-50 px-2 py-1 rounded">
                      Ksh {parseFloat(order.total_price).toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {order.status === 'CONFIRMED' && (
                    <>
                      <Button
                        onClick={() => handlePay(order)}
                        variant="secondary"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                        disabled={payLoading || deleteLoading[order.id]}
                      >
                        {payLoading ? (
                          <span className="inline-block w-4 h-4 animate-spin border-2 border-t-transparent border-white rounded-full mr-2" />
                        ) : null}
                        {payLoading ? 'Processing...' : 'Pay with M‑Pesa'}
                      </Button>
                      <Button
                        onClick={() => handleRemove(order.id)}
                        variant="secondary"
                        className="bg-red-500 hover:bg-red-600 text-white"
                        disabled={payLoading || deleteLoading[order.id]}
                      >
                        {deleteLoading[order.id] ? (
                          <span className="inline-block w-4 h-4 animate-spin border-2 border-t-transparent border-white rounded-full mr-2" />
                        ) : null}
                        {deleteLoading[order.id] ? 'Removing...' : 'Remove'}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {modalOpen && selOrder && (
        <Modal isOpen onClose={() => setModalOpen(false)} title={`Pay for Order #${selOrder.id}`}>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Total:{' '}
              <span className="font-bold text-green-700">
                Ksh {parseFloat(selOrder.total_price).toLocaleString()}
              </span>
            </p>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="2547XXXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            {mpesaError && <p className="text-sm text-red-600">{mpesaError}</p>}
            <Button
              onClick={submitPayment}
              className="w-full bg-green-700 hover:bg-green-800 text-white rounded-md"
              disabled={payLoading}
            >
              {payLoading ? (
                <span className="inline-block w-4 h-4 animate-spin border-2 border-t-transparent border-white rounded-full mr-2" />
              ) : null}
              {payLoading ? 'Sending...' : 'Pay Now'}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BuyerOrdersPage;