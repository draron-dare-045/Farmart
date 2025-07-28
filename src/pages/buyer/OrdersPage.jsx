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

  const submitPayment = async () => {
    if (!phone.startsWith('254')) {
      setMpesaError('Phone number must start with 254.');
      return;
    }
    try {
      await apiClient.post('/api/make-payment/', { order_id: selOrder.id, phone_number: phone }, tokens.access);
      alert('Payment initiated! Check your phone.');
      setModalOpen(false);
    } catch {
      alert('Payment initiation failed.');
    }
  };

  if (loading) return <Spinner fullScreen />;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">My Orders</h1>
          <Button onClick={() => onNavigate('home')} variant="ghost">
            ← Back to Shop
          </Button>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
          {orders.length === 0 ? (
            <p className="text-gray-500 text-lg text-center">You have no orders yet.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center border-b last:border-b-0 pb-4"
              >
                <div>
                  <p className="text-gray-700"><strong>Order ID:</strong> #{order.id}</p>
                  <p className="text-gray-700"><strong>Status:</strong> <span className="font-semibold">{order.status}</span></p>
                  <p className="text-gray-700"><strong>Total:</strong> <span className="text-green-600 font-bold">Ksh {parseFloat(order.total_price).toLocaleString()}</span></p>
                </div>
                {order.status === 'CONFIRMED' && (
                  <Button onClick={() => handlePay(order)} variant="secondary">
                    Pay with M-Pesa
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {modalOpen && selOrder && (
        <Modal isOpen onClose={() => setModalOpen(false)} title={`Pay for Order #${selOrder.id}`}>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Total: <span className="font-bold text-green-700">Ksh {parseFloat(selOrder.total_price).toLocaleString()}</span>
            </p>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="2547XXXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            {mpesaError && <p className="text-sm text-red-600">{mpesaError}</p>}
            <Button onClick={submitPayment} className="w-full mt-2">
              Pay Now
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BuyerOrdersPage;