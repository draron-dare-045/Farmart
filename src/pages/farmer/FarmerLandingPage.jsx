import React from 'react';
import Button from '../../components/common/Button';

const FarmerLandingPage = ({ onNavigate }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybSUyMHN1bnNldHxlbnwwfHwwfHx8MA%3D%3D")',
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
            Welcome to <span className="text-green-600">Seller Central</span>
          </h1>
        </div>

        <p className="text-md sm:text-lg text-gray-700 mb-8">
          Manage your livestock, view and fulfill orders, and connect directly with your customers — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button
            onClick={() => onNavigate('/seller/dashboard')}
            className="px-6 py-3 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition duration-300 shadow"
          >
            Go to Dashboard
          </Button>
          <Button
            onClick={() => onNavigate('/seller/auth')}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300 shadow"
          >
            Login / Register
          </Button>
        </div>

        <p className="text-sm text-gray-600">
          Not a farmer?{' '}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="text-green-600 hover:underline font-medium"
          >
            Go to Buyer Site
          </a>
        </p>
      </div>
    </div>
  );
};

export default FarmerLandingPage;