import React from 'react';

const Spinner = ({ fullScreen = false, size = 'md' }) => {
  const sizes = {
    sm: 'h-5 w-5',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  };

  return (
    <div
      className={
        fullScreen
          ? 'fixed inset-0 flex items-center justify-center bg-[#07120c]/90 backdrop-blur-sm z-50'
          : 'inline-flex items-center justify-center'
      }
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-green-400/20 blur-xl animate-pulse" />
        <div
          className={`rounded-full border-2 border-white/10 border-t-green-400 animate-spin ${sizes[size]}`}
        />

      </div>
    </div>
  );
};

export default Spinner;