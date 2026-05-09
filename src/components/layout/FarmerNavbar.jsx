import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const FarmerNavbar = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-[#07120c]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-4 flex justify-between items-center text-white">

      {/* BRAND */}
      <h1 className="text-lg sm:text-xl font-black tracking-tight">
        FARM<span className="text-green-400">ART</span>
        <span className="ml-2 text-xs font-medium text-gray-400 hidden sm:inline">
          Farmer Panel
        </span>
      </h1>

      {/* USER + ACTIONS */}
      <div className="flex items-center gap-4 sm:gap-6">

        {/* USER INFO */}
        <div className="hidden sm:flex flex-col text-right leading-tight">
          <span className="text-xs text-gray-400">Welcome back</span>
          <span className="text-sm font-semibold text-green-300">
            {user?.username}
          </span>
        </div>

        {/* PROFILE DOT */}
        <div className="w-9 h-9 rounded-full bg-green-400/20 border border-green-400/30 flex items-center justify-center text-green-300 font-bold text-sm">
          {user?.username?.charAt(0)?.toUpperCase()}
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            logout();
            onNavigate('/seller');
          }}
          className="px-4 py-2 text-sm rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-400/30 hover:text-red-300 transition"
        >
          Logout
        </button>

      </div>
    </header>
  );
};

export default FarmerNavbar;