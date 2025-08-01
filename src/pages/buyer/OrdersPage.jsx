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
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [fetchOrders]);

  const handlePay = (order) => {
    setSelectedOrder(order);
    setPhone(user?.phone_number || '254');
    setMpesaError('');
    setModalOpen(true);
  };

  const handleRemove = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    setDeleteLoading(prev => ({ ...prev, [orderId]: true }));
    try {
      await apiClient.delete(`/api/orders/${orderId}/`, tokens.access);
      fetchOrders();
      alert('Order cancelled successfully!');
    } catch {
      alert('Failed to cancel order.');
    } finally {
      setDeleteLoading(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const submitPayment = async () => {
    if (!phone.match(/^254\d{9}$/)) {
      setMpesaError('Phone number must be in the format 254XXXXXXXXX.');
      return;
    }
    setPayLoading(true);
    setMpesaError('');
    try {
      await apiClient.post('/api/make-payment/', { order_id: selectedOrder.id, phone_number: phone }, tokens.access);
      alert('Payment initiated! Please check your phone to complete the transaction.');
      setModalOpen(false);
      startPollingForOrderStatus(selectedOrder.id);
    } catch (err) {
      alert('Payment initiation failed. Please try again.');
    } finally {
      setPayLoading(false);
    }
  };
  
  const startPollingForOrderStatus = (orderId) => {
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    
    const startTime = Date.now();
    const pollDuration = 120000;
    const pollInterval = 5000;   

    pollingIntervalRef.current = setInterval(async () => {
      if (Date.now() - startTime > pollDuration) {
        clearInterval(pollingIntervalRef.current);
        alert("Payment confirmation is taking a while. Please refresh the page to see the updated status.");
        return;
      }
      try {
        const updatedOrder = await apiClient.get(`/api/orders/${orderId}/`, tokens.access);
        if (updatedOrder.status === 'PAID') {
          clearInterval(pollingIntervalRef.current);
          alert('Payment successful!');
          
          setOrders(prev => prev.map(o => o.id === orderId ? updatedOrder : o));
          triggerDataRefresh();
        }
      } catch (err) {
        console.error("Polling error:", err);
        clearInterval(pollingIntervalRef.current);
      }
    }, pollInterval);
  };

  if (loading) return <Spinner fullScreen />;
  if (error) return <div className="text-center text-red-600 p-8">{error}</div>;

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-green-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800">My Orders</h1>
          <Button onClick={() => onNavigate('/shop')} variant="ghost">← Back to Shop</Button>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-6">
          {orders.length === 0 ? (
            <p className="text-gray-600 text-lg text-center py-8">You have no orders yet.</p>
          ) : (
            orders.map(order => (
              <div key={order.id} className="flex flex-col sm:flex-row justify-between sm:items-start border-b last:border-none pb-4 gap-4">
                <div className="space-y-2 flex-grow">
                  <p className="font-bold"><span className="text-sm font-normal text-gray-500">Order ID:</span> #{order.id}</p>
                  <p className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Status:</span>
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'PENDING' ? 'bg-gray-100 text-gray-800' :
                      order.status === 'CONFIRMED' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </p>
                  <p><span className="text-sm font-semibold">Total:</span>{' '}<span className="font-bold text-green-800 bg-green-50 px-2 py-1 rounded">Ksh {parseFloat(order.total_price).toLocaleString()}</span></p>
                  
                  {order.status === 'PENDING' && (
                    <p className="text-xs text-gray-500 italic pt-1">Waiting for the farmer to confirm your order.</p>
                  )}
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center flex-shrink-0">
                  {order.status === 'PENDING' && <Button variant="secondary" disabled>Pay with M‑Pesa</Button>}
                  {order.status === 'CONFIRMED' && <Button onClick={() => handlePay(order)} className="bg-green-600 hover:bg-green-700 text-white">Pay with M‑Pesa</Button>}
                  {order.status === 'PAID' && <div className="text-right"><p className="text-sm font-semibold text-green-700">Payment Complete</p></div>}
                  {(order.status === 'PENDING' || order.status === 'CONFIRMED') && (
                    <Button onClick={() => handleRemove(order.id)} variant="danger" disabled={deleteLoading[order.id]}>
                      {deleteLoading[order.id] ? '...' : 'Cancel Order'}
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {modalOpen && selectedOrder && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Pay for Order #${selectedOrder.id}`}>
          <div className="p-4 space-y-4">
            <p className="text-lg text-gray-700">
              Total Amount:{' '}
              <span className="font-bold text-green-700">
                Ksh {parseFloat(selectedOrder.total_price).toLocaleString()}
              </span>
            </p>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">
                M-Pesa Phone Number
              </label>
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="2547XXXXXXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {mpesaError && <p className="text-sm text-red-600">{mpesaError}</p>}
            <Button
              onClick={submitPayment}
              className="w-full"
              disabled={payLoading}
              loading={payLoading}
            >
              {payLoading ? 'Sending STK Push...' : `Pay Ksh ${parseFloat(selectedOrder.total_price).toLocaleString()}`}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BuyerOrdersPage;
