import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const FarmerNavbar = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-green-100 text-green-900 shadow-sm border-b border-green-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-green-800">
        <span className="text-green-700">Farmer</span> Dashboard
      </h1>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">
          Welcome, <span className="font-semibold text-green-700">{user.username}</span>
        </span>
        <button
          onClick={() => {
            logout();
            onNavigate('/seller'); 
          }}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-md transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default FarmerNavbar;