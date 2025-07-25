import React from 'react';

const Spinner = ({ fullScreen = false, size = 'md' }) => {
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-16 w-16 border-4',
  };
  const style = fullScreen ? 'flex h-screen justify-center items-center' : 'inline-flex';
  return (
    <div className={style}>
      <div
        className={`animate-spin rounded-full border-t-4 border-b-4 border-green-600 ${sizes[size]}`}
      ></div>
    </div>
  );
};

export default Spinner;