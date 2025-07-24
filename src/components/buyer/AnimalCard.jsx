import React, { useState } from 'react';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';

const AnimalCard = ({ animal }) => {
    const { addToCart, items } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

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
    
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
            <div className="relative">
                <img className="h-48 w-full object-cover" src={animal.image || `https://placehold.co/600x400/e2f0e2/333?text=${animal.name.replace(' ', '+')}`} alt={animal.name} />
                {isOutOfStock && <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg">OUT OF STOCK</div>}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{animal.name}</h3>
                <p className="text-sm text-gray-500">{animal.breed} {animal.animal_type}</p>
                <p className="text-sm text-gray-600 mt-1">Sold by: {animal.farmer_username}</p>
                 <p className="text-sm text-gray-500 mt-1">Stock: {animal.quantity}</p>
                <div className="mt-auto pt-4">
                    <p className="text-xl font-bold text-green-700">Ksh {parseFloat(animal.price).toLocaleString()}</p>
                    <Button 
                        onClick={handleAddToCart} 
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
    );
};

export default AnimalCard;