
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../api/client';
import AnimalCard from '../../components/buyer/AnimalCard';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const BuyerHomePage = ({ onNavigate }) => {
  const { isAuthenticated, tokens } = useAuth();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      apiClient
        .get('/api/animals/', tokens.access)
        .then((data) => setAnimals(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, tokens]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 px-4">
        <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-green-100">
          
          <div className="hidden md:block md:w-1/2">
            <img
              src="/images/image.jpg.jpg" 
              alt="Farmart Visual"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h11M9 21V3m12 6h-3m0 0V3m0 3v3"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Welcome to <span className="text-green-600">Farmart</span>!
            </h2>
            <p className="text-gray-600 mb-6 text-center text-base leading-relaxed">
              To explore, search, and buy livestock, please log in to your account.
            </p>

            <Button onClick={() => onNavigate('/auth')} variant="primary">
              Login to Shop
            </Button>

            <button
              onClick={() => onNavigate('/')}
              className="mt-4 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-200"
            >
              Back to Main Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <Spinner fullScreen />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh] px-4">
        <div className="bg-white shadow-md p-8 rounded-xl">
          <p className="text-red-600 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
          Featured Livestock
        </h2>

        {animals.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-20">
            No animals available at the moment. Please check back later!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BuyerHomePage;