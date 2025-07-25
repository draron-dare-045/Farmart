import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';

const BuyerNavbar = ({ onNavigate, onCartClick }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();

  const handleNav = (e, path) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-green-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between text-white">
        <a
          href="/shop"
          onClick={(e) => handleNav(e, '/shop')}
          className="text-3xl font-extrabold text-white hover:text-emerald-300 transition duration-200"
        >
          <span className="text-emerald-400">Farm</span>art
        </a>
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search for livestock..."
            className="w-full px-4 py-2 border border-emerald-900 bg-green-800 text-white placeholder-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          />
        </div>
        <nav className="flex items-center gap-3 text-sm font-medium">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-emerald-100">
                Hello, <span className="font-semibold">{user.username}</span>
              </span>

              <a
                href="/my-orders"
                onClick={(e) => handleNav(e, '/my-orders')}
                className="px-3 py-1.5 rounded-md bg-emerald-900 hover:bg-emerald-800 transition"
              >
                Orders
              </a>

              <a
                href="/contact"
                onClick={(e) => handleNav(e, '/contact')}
                className="px-3 py-1.5 rounded-md bg-emerald-800 hover:bg-emerald-700 transition"
              >
                Contact
              </a>

              <button
                onClick={() => {
                  logout();
                  onNavigate('/');
                }}
                className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/auth"
                onClick={(e) => handleNav(e, '/auth')}
                className="px-4 py-2 rounded-md bg-emerald-900 hover:bg-emerald-800 transition"
              >
                Login / Register
              </a>

              <a
                href="/contact"
                onClick={(e) => handleNav(e, '/contact')}
                className="px-3 py-1.5 rounded-md bg-emerald-900 hover:bg-emerald-800 transition"
              >
                Contact
              </a>
            </>
          )}
          <button
            onClick={onCartClick}
            className="relative p-2 rounded-full bg-emerald-600 hover:bg-emerald-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default BuyerNavbar;
