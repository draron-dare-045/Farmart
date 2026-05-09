import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#07120c]/95 text-white shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-red-400 text-2xl transition"
          >
            ×
          </button>
        </div>
        <div className="p-5">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;