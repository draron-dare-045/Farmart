// src/__tests__/App.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

// Mock the useAuth hook
jest.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    loading: false
  })
}));

describe('App Component', () => {
  test('renders buyer landing page by default', () => {
    render(
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/Welcome to/)).toBeInTheDocument();
  });

  test('shows buyer navbar when not on landing page', () => {
    // Mock window.location.pathname
    Object.defineProperty(window, 'location', {
      value: { pathname: '/shop' },
      writable: true
    });
    
    render(
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    );
    expect(screen.getByText('Farmart')).toBeInTheDocument();
  });
});