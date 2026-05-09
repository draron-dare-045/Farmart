import React, { useState } from 'react';

const FarmerSidebar = ({ onNavigate, currentPath }) => {
  const [open, setOpen] = useState(false);

  const handleNav = (e, path) => {
    e.preventDefault();
    onNavigate(path);
    setOpen(false); // close on mobile after navigation
  };

  const navItem = (path) =>
    `group flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
      currentPath === path
        ? 'bg-green-500/15 text-green-300 border border-green-400/30 shadow-md'
        : 'text-gray-300 hover:bg-white/5 hover:text-green-300'
    }`;

  const SidebarContent = () => (
    <>
      {/* LOGO */}
      <div className="py-6 px-5 border-b border-white/10 text-center">
        <div className="flex items-center justify-center gap-3">
          <img
            src="/images/image.jpg.jpg"
            alt="Farmart Logo"
            className="w-10 h-10 rounded-xl object-cover border border-green-400/30"
          />

          <div className="text-left">
            <h2 className="text-lg font-black tracking-tight">
              FARM<span className="text-green-400">ART</span>
            </h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
              Seller Panel
            </p>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        <a href="/seller/dashboard" onClick={(e) => handleNav(e, '/seller/dashboard')} className={navItem('/seller/dashboard')}>
          <span>📊</span> Dashboard
        </a>

        <a href="/seller/listings" onClick={(e) => handleNav(e, '/seller/listings')} className={navItem('/seller/listings')}>
          <span>🐄</span> Listings
        </a>

        <a href="/seller/orders" onClick={(e) => handleNav(e, '/seller/orders')} className={navItem('/seller/orders')}>
          <span>📦</span> Orders
        </a>

        <a href="/seller/contact" onClick={(e) => handleNav(e, '/seller/contact')} className={navItem('/seller/contact')}>
          <span>💬</span> Support
        </a>
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/10 text-xs text-gray-500">
        © {new Date().getFullYear()} Farmart
      </div>
    </>
  );

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between bg-[#07120c] text-white px-4 py-3 border-b border-white/10">
        <div className="font-bold">
          FARM<span className="text-green-400">ART</span>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-2xl"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 min-h-screen bg-[#07120c] text-white border-r border-white/10 flex-col">
        <SidebarContent />
      </aside>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          {/* sidebar */}
          <aside className="relative w-64 h-full bg-[#07120c] text-white border-r border-white/10 flex flex-col z-50">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
};

export default FarmerSidebar;