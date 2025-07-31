import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import apiClient from '../api/client';
import { useAuth } from '../hooks/useAuth';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const { tokens } = useAuth();
    
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const triggerDataRefresh = useCallback(() => {
        setRefreshTrigger(prev => prev + 1);
    }, []);

    const addToCart = (animal) => {
        setItems(prevItems => {
            const itemInCart = prevItems.find(item => item.id === animal.id);
            if (itemInCart && itemInCart.quantity >= animal.quantity) {
                alert(`No more stock available for ${animal.name}.`);
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
        if (items.length === 0) {
            throw new Error("Your cart is empty. Please add items before checking out.");
        }
        if (!tokens?.access) {
            throw new Error("You must be logged in to place an order.");
        }

        const orderData = {
            items: items.map(item => ({
                animal: item.id,
                quantity: item.quantity,
            })),
        };

        try {
            const newOrder = await apiClient.post('/api/orders/', orderData, tokens.access);

            clearCart();
            triggerDataRefresh();

            return newOrder; 
        
        } catch (error) {
            const errorDetail = error.data ? JSON.stringify(error.data) : 'An unknown server error occurred.';
            console.error("Checkout failed:", errorDetail);
            throw new Error(`Failed to place order: ${errorDetail}`);
        }
    };

    const value = useMemo(() => ({
        items,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        itemCount: items.reduce((total, item) => total + item.quantity, 0),
        totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
        refreshTrigger,
        triggerDataRefresh,
    }), [items, tokens, refreshTrigger, triggerDataRefresh]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
