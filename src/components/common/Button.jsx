import React from 'react';
import Spinner from './Spinner';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, loading = false, className = '' }) => {
  const base = 'font-semibold py-2 px-4 rounded-lg shadow-md flex justify-center items-center transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed';
  const styles = {
    primary: 'bg-green-600 text-white hover:bg-green-700',
    secondary: 'bg-green-200 text-gray-800 hover:bg-green-300',
    success: 'bg-green-700 text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  };
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  )
};

export default Button;