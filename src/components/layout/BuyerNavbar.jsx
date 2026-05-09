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
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#07120c]/70 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a
          href="/shop"
          onClick={(e) => handleNav(e, '/shop')}
          className="flex items-center gap-2 font-black text-xl sm:text-2xl tracking-tight text-white"
        >
          <span className="text-green-400">Farm</span>
          <span>art</span>
        </a>
        <div className="hidden md:flex flex-1" />
        <nav className="flex items-center gap-2 sm:gap-3 text-sm">

          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-gray-300 mr-2">
                Hi, <span className="text-green-300 font-semibold">{user.username}</span>
              </span>

              <button
                onClick={(e) => handleNav(e, '/my-orders')}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-green-500/20 hover:border-green-400/30 transition"
              >
                Orders
              </button>

              <button
                onClick={(e) => handleNav(e, '/contact')}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-green-500/20 hover:border-green-400/30 transition"
              >
                Contact
              </button>

              <button
                onClick={() => {
                  logout();
                  onNavigate('/');
                }}
                className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-400/20 text-red-300 hover:bg-red-500/20 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => handleNav(e, '/auth')}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-green-500/20 hover:border-green-400/30 transition"
              >
                Login
              </button>

              <button
                onClick={(e) => handleNav(e, '/contact')}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-green-500/20 hover:border-green-400/30 transition"
              >
                Contact
              </button>
            </>
          )}
          <button
            onClick={onCartClick}
            className="relative ml-2 p-2 rounded-full bg-green-500/10 border border-green-400/20 hover:bg-green-500/20 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>

            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-400 text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
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