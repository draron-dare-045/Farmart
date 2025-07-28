
import React, { createContext, useState, useContext, useMemo } from 'react';
import apiClient from '../api/client';
import { useAuth } from '../hooks/useAuth';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const { tokens } = useAuth();

    const addToCart = (animal) => {
        setItems(prevItems => {
            const itemInCart = prevItems.find(item => item.id === animal.id);
            if (itemInCart && itemInCart.quantity >= animal.quantity) {
                alert(`No more stock available for ${animal.name}. You already have the maximum quantity in your cart.`);
                return prevItems; 
            }

            if (itemInCart) {
                return prevItems.map(item => 
                    item.id === animal.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...animal, quantity: 1 }];
        });
    };

    const removeFromCart = (animalId) => {
        setItems(prevItems => prevItems.filter(item => item.id !== animalId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const checkout = async () => {
        if (items.length === 0) throw new Error("Your cart is empty.");
        if (!tokens?.access) throw new Error("You must be logged in to checkout.");

        const orderItems = items.map(item => ({
            animal: item.id,
            quantity: item.quantity,
        }));

        const order = await apiClient.post('/api/orders/', { items: orderItems }, tokens.access);
        clearCart();
        return order;
    };

    const value = useMemo(() => ({
        items,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        itemCount: items.reduce((total, item) => total + item.quantity, 0),
        totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
    }), [items, tokens]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
