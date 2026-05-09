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
      <div className="relative min-h-screen flex items-center justify-center bg-[#07120c] text-white px-4">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2070&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07120c] via-[#07120c]/90 to-[#07120c]/40" />
        <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-green-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-lime-300/10 blur-[120px] rounded-full" />
        <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl">

          <img
            src="/images/image.jpg.jpg"
            alt="Farmart"
            className="hidden md:block h-full w-full object-cover"
          />

          <div className="p-6 sm:p-10 flex flex-col justify-center text-center md:text-left">

            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-green-500/10 border border-green-400/20 w-fit mx-auto md:mx-0">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[11px] text-green-300 tracking-widest">
                FARMART ACCESS
              </span>
            </div>

            <h2 className="mt-5 text-2xl sm:text-4xl font-black">
              Welcome to <span className="text-green-400">Farmart</span>
            </h2>

            <p className="mt-3 text-gray-300 text-sm sm:text-base">
              Buy livestock directly from verified farmers safely and easily.
            </p>

            <div className="mt-7 flex flex-col gap-3">

              <Button
                onClick={() => onNavigate('/auth')}
                className="w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-bold"
              >
                Login to Continue →
              </Button>

              <button
                onClick={() => onNavigate('/')}
                className="text-sm text-gray-400 hover:text-white"
              >
                Back to Home
              </button>

            </div>

          </div>
        </div>
      </div>
    );
  }

  if (loading) return <Spinner fullScreen />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07120c] text-white px-4">
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#07120c] text-white">

      <div className="text-center px-4 pt-12 sm:pt-16">

        <h2 className="text-3xl sm:text-5xl font-black">
          Explore <span className="text-green-400">Livestock</span>
        </h2>

        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Fresh • Verified • Direct from Farmers
        </p>

      </div>
      <div className="px-4 mt-8 flex justify-center">

        <div className="relative w-full max-w-xl">

          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search livestock..."
            className="w-full px-5 py-3 sm:py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur-xl"
          />

          <span className="absolute right-5 top-3.5 text-green-400">
            🔍
          </span>

        </div>

      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">

        {filteredAnimals.length === 0 ? (
          <div className="text-center text-gray-400 mt-16">
            No livestock found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-7">

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