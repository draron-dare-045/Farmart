import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../api/client';
import AnimalCard from '../../components/buyer/AnimalCard';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const BuyerHomePage = ({ onNavigate }) => {
  const { isAuthenticated, tokens } = useAuth();
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      apiClient
        .get('/api/animals/', tokens.access)
        .then((data) => {
          setAnimals(data);
          setFilteredAnimals(data);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, tokens]);

  useEffect(() => {
    const filtered = animals.filter((animal) =>
      [animal.name, animal.breed, animal.animal_type]
        .filter(Boolean)
        .some((field) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    setFilteredAnimals(filtered);
  }, [searchQuery, animals]);

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
              Welcome to <span className="text-green-600">Farm</span>art!
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
    <section className="min-h-screen bg-sky-200 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
          Featured Livestock
        </h2>
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search livestock..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white text-gray-800 placeholder-gray-500 rounded-full border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
        </div>
        {filteredAnimals.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-20">
            No animals match your search. Please try again!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BuyerHomePage;                       