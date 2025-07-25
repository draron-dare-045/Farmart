import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

const Cart = ({ isOpen, onClose, onNavigate }) => {
  const { items, removeFromCart, checkout, totalPrice, itemCount } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      await checkout();
      alert('Order placed successfully!');
      onClose();
      onNavigate('/my-orders'); 
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl border-l border-green-200 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b border-green-100 bg-green-800 text-white">
        <h2 className="text-lg font-semibold">Shopping Cart ({itemCount})</h2>
        <button
          onClick={onClose}
          className="text-2xl font-bold text-white hover:text-red-300 transition"
        >
          &times;
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between mb-4 pb-3 border-b border-gray-200"
            >
              <div>
                <p className="font-semibold text-green-800">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity} @ Ksh{' '}
                  {parseFloat(item.price).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-bold text-green-700 mb-1">
                  Ksh {(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs font-medium px-3 py-1 bg-red-100 text-red-600 border border-red-300 rounded-md hover:bg-red-200 hover:text-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t border-green-100 bg-green-50">
        <div className="flex justify-between items-center mb-4">
          <span className="text-md font-semibold text-green-800">Subtotal:</span>
          <span className="text-lg font-bold text-green-900">
            Ksh {totalPrice.toLocaleString()}
          </span>
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <Button
          onClick={handleCheckout}
          disabled={items.length === 0 || loading}
          loading={loading}
          className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
