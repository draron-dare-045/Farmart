import React from 'react';
import Button from '../../components/common/Button';

const NotFoundPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050b08] via-[#0b1a14] to-black text-white px-4">
      
      <div className="text-center max-w-md w-full">

        {/* BIG 404 */}
        <h1 className="text-7xl sm:text-8xl font-black text-emerald-400 drop-shadow-lg">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        {/* DECORATION */}
        <div className="w-24 h-1 bg-emerald-400/40 mx-auto my-6 rounded-full" />

        {/* BUTTON */}
        <Button
          onClick={() => onNavigate('/')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-lime-300 text-black font-bold shadow-lg hover:scale-105 transition"
        >
          ← Back to Home
        </Button>

      </div>
    </div>
  );
};

export default NotFoundPage;