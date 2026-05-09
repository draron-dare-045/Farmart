import React, { useState } from 'react';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';

const AnimalCard = ({ animal }) => {
  const { addToCart, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemInCart = items.find((item) => item.id === animal.id);
  const isOutOfStock = animal.quantity === 0;
  const canAddToCart =
    !isOutOfStock &&
    (!itemInCart || itemInCart.quantity < animal.quantity);

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    setIsAdding(true);
    setTimeout(() => {
      addToCart(animal);
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }, 300);
  };

  const imageUrl = animal.image
    ? animal.image
    : `https://placehold.co/600x400/0b1f16/22c55e?text=${encodeURIComponent(
        animal.name
      )}`;

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative cursor-pointer rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-[1.02] transition-all duration-500"
      >
        {/* IMAGE */}
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <img
            src={imageUrl}
            alt={animal.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-[4000ms]"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07120c] via-black/20 to-transparent" />

          {/* STOCK BADGE */}
          <div className="absolute top-3 left-3">
            {isOutOfStock ? (
              <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-red-300">
                Out of Stock
              </span>
            ) : (
              <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 border border-green-400/20 text-green-300">
                In Stock: {animal.quantity}
              </span>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 sm:p-5 text-white">
          <h3 className="text-lg font-bold">{animal.name}</h3>

          <p className="text-xs text-gray-400 mt-1">
            {animal.breed} • {animal.animal_type}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Farmer: <span className="text-green-300">{animal.farmer_username}</span>
          </p>

          <div className="flex items-center justify-between mt-4">
            <p className="text-green-400 font-black text-lg">
              Ksh {parseFloat(animal.price).toLocaleString()}
            </p>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              loading={isAdding}
              disabled={!canAddToCart || isAdding}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition
                ${
                  isAdded
                    ? 'bg-green-400 text-black'
                    : isOutOfStock
                    ? 'bg-white/10 text-gray-400'
                    : 'bg-green-500/10 border border-green-400/30 text-green-300 hover:bg-green-500/20'
                }`}
            >
              {isAdded ? '✓ Added' : isOutOfStock ? 'Sold Out' : 'Add'}
            </Button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl p-4">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0b1f16]/90 backdrop-blur-3xl text-white shadow-2xl overflow-hidden">

            {/* IMAGE */}
            <div className="h-64 relative">
              <img
                src={imageUrl}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07120c] to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-2">

              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black">{animal.name}</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-gray-400">
                {animal.breed} • {animal.animal_type}
              </p>

              <p className="text-sm text-green-300">
                Farmer: {animal.farmer_username}
              </p>

              <p className="text-green-400 font-black text-lg mt-2">
                Ksh {parseFloat(animal.price).toLocaleString()}
              </p>

              <p className="text-sm text-gray-300 mt-2">
                {animal.description || 'No description available'}
              </p>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-5">

                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10"
                >
                  Close
                </Button>

                <Button
                  onClick={handleAddToCart}
                  loading={isAdding}
                  disabled={!canAddToCart}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-400 to-lime-300 text-black font-black"
                >
                  {isAdded ? 'Added ✓' : 'Add to Cart'}
                </Button>

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimalCard;