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
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const getImage = (item) =>
    item.image ||
    `https://placehold.co/200x200/0b1f16/ffffff?text=${encodeURIComponent(item.name)}`;

  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* CART PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col bg-[#07120c]/95 text-white border-l border-white/10 backdrop-blur-2xl">

          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
            <h2 className="text-lg font-bold">
              Cart <span className="text-green-400">({itemCount})</span>
            </h2>

            <button
              onClick={onClose}
              className="text-white/70 hover:text-red-400 text-2xl transition"
            >
              ×
            </button>
          </div>

          {/* ITEMS */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

            {items.length === 0 ? (
              <div className="text-center text-gray-400 mt-20">
                Your cart is empty
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-2xl bg-white/5 border border-white/10"
                >

                  {/* IMAGE */}
                  <img
                    src={getImage(item)}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-white/10"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <p className="font-semibold text-white">{item.name}</p>

                    <p className="text-xs text-gray-400">
                      Qty: {item.quantity}
                    </p>

                    <p className="text-xs text-gray-400">
                      Ksh {parseFloat(item.price).toLocaleString()}
                    </p>
                  </div>

                  {/* PRICE + REMOVE */}
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-sm">
                      Ksh {(item.price * item.quantity).toLocaleString()}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-300 border border-red-400/20 hover:bg-red-500/20 transition"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))
            )}

          </div>

          {/* FOOTER */}
          <div className="p-4 border-t border-white/10 bg-black/30 backdrop-blur-xl">

            <div className="flex justify-between mb-4">
              <span className="text-gray-300">Subtotal</span>
              <span className="font-bold text-green-400">
                Ksh {totalPrice.toLocaleString()}
              </span>
            </div>

            {error && (
              <p className="text-red-400 text-sm mb-2">{error}</p>
            )}

            <Button
              onClick={handleCheckout}
              disabled={items.length === 0 || loading}
              loading={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-bold hover:scale-[1.02] transition"
            >
              Proceed to Checkout →
            </Button>

          </div>

        </div>
      </div>
    </>
  );
};

export default Cart;