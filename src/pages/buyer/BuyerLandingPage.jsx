import React from 'react';
import Button from '../../components/common/Button';

const BuyerLandingPage = ({ onNavigate }) => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
        backgroundImage: `url("https://media.istockphoto.com/id/522961501/photo/picturesque-landscape-fenced-ranch-at-sunrise.jpg?s=612x612&w=0&k=20&c=Jn4ujmVfUNUCejnoE3QJ2n9tV6bhjiYtA706dtJemOY=")`,
      }}
    >
      <div className="bg-white/95 rounded-xl shadow-lg p-8 max-w-xl w-full text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <img
            src="/images/image.jpg.jpg"
            alt="Farmart Logo"
            className="w-10 h-10 rounded-full object-cover shadow"
          />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700">
            Welcome to <span className="text-green-600">Farmart</span>
          </h1>
        </div>

        <p className="text-md sm:text-lg text-gray-700 mb-8">
          Buy fresh and healthy livestock directly from trusted farmers across the region.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button
            onClick={() => onNavigate('/shop')}
            className="px-6 py-3 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition duration-300 shadow"
          >
            Start Shopping
          </Button>
          <Button
            onClick={() => onNavigate('/my-orders')}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300 shadow"
          >
            Login / Register
          </Button>
        </div>

        {/* ✅ New About Us button */}
        <div className="mt-2">
          <button
            onClick={() => onNavigate('/about')}
            className="text-green-700 hover:underline text-sm font-medium transition duration-200"
          >
            Learn more about us →
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-6">
          Are you a farmer?{' '}
          <a
            href="/seller"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/seller');
            }}
            className="text-green-600 hover:underline font-medium"
          >
            Go to Seller Central
          </a>
        </p>
      </div>
    </div>
  );
};

export default BuyerLandingPage;