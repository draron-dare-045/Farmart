import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';

const BuyerNavbar = ({ onNavigate, onCartClick }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (e, path) => {
    e.preventDefault();
    onNavigate(path);
    setMenuOpen(false); // close menu on navigation
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#07120c]/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <a
          href="/shop"
          onClick={(e) => handleNav(e, '/shop')}
          className="flex items-center gap-2 font-black text-xl sm:text-2xl tracking-tight text-white"
        >
          <span className="text-green-400">Farm</span>
          <span>art</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3 text-sm">

          {isAuthenticated ? (
            <>
              <span className="text-gray-300 mr-2">
                Hi, <span className="text-green-300 font-semibold">{user.username}</span>
              </span>

              <button
                onClick={(e) => handleNav(e, '/my-orders')}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-green-500/20 transition"
              >
                Orders
              </button>

              <button
                onClick={(e) => handleNav(e, '/contact')}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-green-500/20 transition"
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
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-green-500/20 transition"
              >
                Login
              </button>

              <button
                onClick={(e) => handleNav(e, '/contact')}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-green-500/20 transition"
              >
                Contact
              </button>
            </>
          )}

          {/* Cart */}
          <button
            onClick={onCartClick}
            className="relative p-2 rounded-full bg-green-500/10 border border-green-400/20 hover:bg-green-500/20 transition"
          >
            🛒

            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-400 text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-[#07120c]/95 border-t border-white/10">

          {isAuthenticated && (
            <div className="text-gray-300 text-sm">
              Hi, <span className="text-green-300 font-semibold">{user.username}</span>
            </div>
          )}

          {isAuthenticated ? (
            <>
              <button
                onClick={(e) => handleNav(e, '/my-orders')}
                className="block w-full text-left px-3 py-2 rounded bg-white/5 text-white"
              >
                Orders
              </button>

              <button
                onClick={(e) => handleNav(e, '/contact')}
                className="block w-full text-left px-3 py-2 rounded bg-white/5 text-white"
              >
                Contact
              </button>

              <button
                onClick={() => {
                  logout();
                  onNavigate('/');
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded bg-red-500/10 text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => handleNav(e, '/auth')}
                className="block w-full text-left px-3 py-2 rounded bg-white/5 text-white"
              >
                Login
              </button>

              <button
                onClick={(e) => handleNav(e, '/contact')}
                className="block w-full text-left px-3 py-2 rounded bg-white/5 text-white"
              >
                Contact
              </button>
            </>
          )}

          <button
            onClick={() => {
              onCartClick();
              setMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded bg-green-500/10 text-green-300"
          >
            Cart
            {itemCount > 0 && (
              <span className="bg-green-400 text-black text-xs font-bold rounded-full px-2 py-0.5">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};

export default BuyerNavbar;