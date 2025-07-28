import React from 'react';

const Modal = ({ isOpen = true, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-600 hover:text-gray-800 text-2xl">
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Modal;