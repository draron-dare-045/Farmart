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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between text-gray-800">
        <a
          href="/shop"
          onClick={(e) => handleNav(e, '/shop')}
          className="text-3xl font-bold tracking-tight text-gray-800 hover:text-green-600 transition duration-300"
        >
          <span className="text-green-600">Farm</span>art
        </a>
        <div className="flex-1 mx-4 sm:mx-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for livestock..."
              className="w-full px-4 py-2 bg-yellow-100 text-gray-800 placeholder-gray-500 rounded-full border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
        </div>
        <nav className="flex items-center gap-2 text-sm font-medium">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-gray-700 font-semibold">
                Hi, {user.username}
              </span>
              <a
                href="/my-orders"
                onClick={(e) => handleNav(e, '/my-orders')}
                className="px-3 py-1.5 rounded-full bg-green-600 hover:bg-green-500 text-white transition duration-200"
              >
                Orders
              </a>
              <a
                href="/contact"
                onClick={(e) => handleNav(e, '/contact')}
                className="px-3 py-1.5 rounded-full bg-green-600 hover:bg-green-500 text-white transition duration-200"
              >
                Contact
              </a>
              <button
                onClick={() => {
                  logout();
                  onNavigate('/');
                }}
                className="px-3 py-1.5 rounded-full bg-green-600 hover:bg-green-500 text-white transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/auth"
                onClick={(e) => handleNav(e, '/auth')}
                className="px-3 py-1.5 rounded-full bg-green-600 hover:bg-green-500 text-white transition duration-200"
              >
                Login
              </a>
              <a
                href="/contact"
                onClick={(e) => handleNav(e, '/contact')}
                className="px-3 py-1.5 rounded-full bg-green-600 hover:bg-green-500 text-white transition duration-200"
              >
                Contact
              </a>
            </>
          )}
          <button
            onClick={onCartClick}
            className="relative p-2 rounded-full bg-green-600 hover:bg-green-500 text-white transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
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