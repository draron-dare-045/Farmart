
import React, { useState, useEffect, createContext, useMemo } from 'react';
import apiClient from '../api/client';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        setUser(null);
        setTokens(null);
        localStorage.removeItem('farmart_tokens');
    };

    useEffect(() => {
        const bootstrapAuth = async () => {
            const storedTokensRaw = localStorage.getItem('farmart_tokens');
            if (storedTokensRaw) {
                try {
                    const storedTokens = JSON.parse(storedTokensRaw);
                    const userData = await apiClient.get('/api/users/me/', storedTokens.access);
                    setTokens(storedTokens);
                    setUser(userData);
                } catch (error) {
                    console.error("Token validation failed, logging out.");
                    logout();
                }
            }
            setLoading(false);
        };
        bootstrapAuth();
    }, []);

    const login = async (username, password) => {
        const tokenResponse = await apiClient.post('/api/auth/jwt/create/', { username, password });
        const userData = await apiClient.get('/api/users/me/', tokenResponse.access);
        localStorage.setItem('farmart_tokens', JSON.stringify(tokenResponse));
        setTokens(tokenResponse);
        setUser(userData);
        return userData.user_type;
    };

    const register = async (userData) => {
        await apiClient.post('/api/register/', userData);
    };

    const value = useMemo(() => ({
        user, tokens, isAuthenticated: !!user, loading, login, register, logout
    }), [user, tokens, loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};