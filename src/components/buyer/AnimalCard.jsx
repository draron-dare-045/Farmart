import React, { useState } from 'react';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';

const AnimalCard = ({ animal }) => {
    const { addToCart, items } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const itemInCart = items.find(item => item.id === animal.id);
    const isOutOfStock = animal.quantity === 0;
    const canAddToCart = !isOutOfStock && (!itemInCart || itemInCart.quantity < animal.quantity);

    const handleAddToCart = () => {
        if (!canAddToCart) return;
        setIsAdding(true);
        setTimeout(() => {
            addToCart(animal);
            setIsAdding(false);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        }, 300);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div 
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={openModal}
            >
                <div className="relative">
                    <img 
                        className="h-48 w-full object-cover" 
                        src={animal.image || `https://placehold.co/600x400/e2f0e2/333?text=${animal.name.replace(' ', '+')}`} 
                        alt={animal.name} 
                    />
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg">
                            OUT OF STOCK
                        </div>
                    )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{animal.name}</h3>
                    <p className="text-sm text-gray-500">{animal.breed} {animal.animal_type}</p>
                    <p className="text-sm text-gray-600 mt-1">Sold by: {animal.farmer_username}</p>
                    <p className="text-sm text-gray-500 mt-1">Stock: {animal.quantity}</p>
                    <div className="mt-auto pt-4">
                        <p className="text-xl font-bold text-green-700">Ksh {parseFloat(animal.price).toLocaleString()}</p>
                        <Button 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart();
                            }} 
                            className="w-full mt-2"
                            loading={isAdding}
                            disabled={isAdding || isAdded || !canAddToCart}
                            variant={isAdded ? 'success' : 'primary'}
                        >
                            {isAdded ? '✓ Added!' : (isOutOfStock ? 'Out of Stock' : 'Add to Cart')}
                        </Button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-sky-200 bg-opacity-80 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-auto max-h-[90vh] overflow-y-auto border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">{animal.name}</h2>
                            <button 
                                className="text-gray-400 hover:text-gray-600 text-2xl transition-colors duration-150"
                                onClick={closeModal}
                            >
                                ×
                            </button>
                        </div>
                        <img 
                            className="h-64 w-full object-cover rounded-md mb-4 border border-gray-100" 
                            src={animal.image || `https://placehold.co/600x400/e2f0e2/333?text=${animal.name.replace(' ', '+')}`} 
                            alt={animal.name} 
                        />
                        <div className="space-y-3">
                            <p className="text-base text-gray-700"><span className="font-semibold">Breed:</span> {animal.breed}</p>
                            <p className="text-base text-gray-700"><span className="font-semibold">Type:</span> {animal.animal_type}</p>
                            <p className="text-base text-gray-700"><span className="font-semibold">Sold by:</span> {animal.farmer_username}</p>
                            <p className="text-base text-gray-700"><span className="font-semibold">Price:</span> Ksh {parseFloat(animal.price).toLocaleString()}</p>
                            <p className="text-base text-gray-700"><span className="font-semibold">Stock:</span> {animal.quantity}</p>
                            <p className="text-base text-gray-700">
                                <span className="font-semibold">Description:</span> {animal.description || 'No description available for this animal.'}
                            </p>
                            {animal.age && <p className="text-base text-gray-700"><span className="font-semibold">Age:</span> {animal.age}</p>}
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <Button 
                                onClick={closeModal}
                                className="px-4 py-2"
                                variant="secondary"
                            >
                                Close
                            </Button>
                            <Button 
                                onClick={handleAddToCart}
                                className="px-4 py-2"
                                loading={isAdding}
                                disabled={isAdding || isAdded || !canAddToCart}
                                variant={isAdded ? 'success' : 'primary'}
                            >
                                {isAdded ? '✓ Added!' : (isOutOfStock ? 'Out of Stock' : 'Add to Cart')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AnimalCard;