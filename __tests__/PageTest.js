// src/__tests__/components/buyer/Cart.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '../../../components/buyer/Cart';
import { CartProvider } from '../../../context/CartContext';

const CartWithContext = ({ isOpen, onClose, onNavigate }) => (
  <CartProvider>
    <Cart isOpen={isOpen} onClose={onClose} onNavigate={onNavigate} />
  </CartProvider>
);

describe('Cart Component', () => {
  test('shows empty cart message when no items', () => {
    render(<CartWithContext isOpen={true} onClose={jest.fn()} onNavigate={jest.fn()} />);
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('renders cart title with item count', () => {
    render(<CartWithContext isOpen={true} onClose={jest.fn()} onNavigate={jest.fn()} />);
    expect(screen.getByText(/Shopping Cart/)).toBeInTheDocument();
  });

  test('is hidden when isOpen is false', () => {
    const { container } = render(<CartWithContext isOpen={false} onClose={jest.fn()} onNavigate={jest.fn()} />);
    expect(container.firstChild).toHaveClass('translate-x-full');
  });
});

// src/__tests__/components/layout/BuyerNavbar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BuyerNavbar from '../../../components/layout/BuyerNavbar';
import { CartProvider } from '../../../context/CartContext';

// Mock useAuth hook
jest.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    user: { username: 'testuser' },
    logout: jest.fn()
  })
}));

const BuyerNavbarWithContext = (props) => (
  <CartProvider>
    <BuyerNavbar {...props} />
  </CartProvider>
);

describe('BuyerNavbar', () => {
  test('renders brand name', () => {
    render(<BuyerNavbarWithContext onNavigate={jest.fn()} onCartClick={jest.fn()} />);
    expect(screen.getByText(/Farmart/)).toBeInTheDocument();
  });

  test('shows user greeting when authenticated', () => {
    render(<BuyerNavbarWithContext onNavigate={jest.fn()} onCartClick={jest.fn()} />);
    expect(screen.getByText('Hi, testuser')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('calls onCartClick when cart button is clicked', () => {
    const mockCartClick = jest.fn();
    render(<BuyerNavbarWithContext onNavigate={jest.fn()} onCartClick={mockCartClick} />);
    
    const cartButton = screen.getByRole('button');
    fireEvent.click(cartButton);
    expect(mockCartClick).toHaveBeenCalledTimes(1);
  });
});

// src/__tests__/pages/buyer/BuyerLandingPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BuyerLandingPage from '../../../pages/buyer/BuyerLandingPage';

describe('BuyerLandingPage', () => {
  test('renders welcome message', () => {
    render(<BuyerLandingPage onNavigate={jest.fn()} />);
    expect(screen.getByText(/Welcome to.*Farmart/)).toBeInTheDocument();
  });

  test('navigates to shop when Start Shopping is clicked', () => {
    const mockNavigate = jest.fn();
    render(<BuyerLandingPage onNavigate={mockNavigate} />);
    fireEvent.click(screen.getByText('Start Shopping'));
    expect(mockNavigate).toHaveBeenCalledWith('/shop');
  });

  test('navigates to seller portal when link is clicked', () => {
    const mockNavigate = jest.fn();
    render(<BuyerLandingPage onNavigate={mockNavigate} />);
    fireEvent.click(screen.getByText('Go to Seller Central'));
    expect(mockNavigate).toHaveBeenCalledWith('/seller');
  });
});

// src/__tests__/pages/buyer/AuthPage.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BuyerAuthPage from '../../../pages/buyer/AuthPage';

// Mock useAuth hook
jest.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
    register: jest.fn()
  })
}));

describe('BuyerAuthPage', () => {
  test('renders login form by default', () => {
    render(<BuyerAuthPage onNavigate={jest.fn()} />);
    expect(screen.getByText('Buyer Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('switches to register form', () => {
    render(<BuyerAuthPage onNavigate={jest.fn()} />);
    fireEvent.click(screen.getByText('Register'));
    expect(screen.getByText('Create Buyer Account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  test('validates password confirmation', async () => {
    render(<BuyerAuthPage onNavigate={jest.fn()} />);
    fireEvent.click(screen.getByText('Register'));
    
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password456' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
    
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
    });
  });
});

// src/__tests__/pages/farmer/FarmerLandingPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FarmerLandingPage from '../../../pages/farmer/FarmerLandingPage';

describe('FarmerLandingPage', () => {
  test('renders seller central welcome message', () => {
    render(<FarmerLandingPage onNavigate={jest.fn()} />);
    expect(screen.getByText(/Welcome to.*Seller Central/)).toBeInTheDocument();
  });

  test('navigates to dashboard when button is clicked', () => {
    const mockNavigate = jest.fn();
    render(<FarmerLandingPage onNavigate={mockNavigate} />);
    fireEvent.click(screen.getByText('Go to Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('/seller/dashboard');
  });

  test('provides link to buyer site', () => {
    const mockNavigate = jest.fn();
    render(<FarmerLandingPage onNavigate={mockNavigate} />);
    fireEvent.click(screen.getByText('Go to Buyer Site'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});

// src/__tests__/pages/farmer/FarmerLandingPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FarmerLandingPage from '../../../pages/farmer/FarmerLandingPage';

describe('FarmerLandingPage', () => {
  test('renders seller central welcome message', () => {
    render(<FarmerLandingPage onNavigate={jest.fn()} />);
    expect(screen.getByText(/Welcome to.*Seller Central/)).toBeInTheDocument();
  });

  test('navigates to dashboard when button is clicked', () => {
    const mockNavigate = jest.fn();
    render(<FarmerLandingPage onNavigate={mockNavigate} />);
    fireEvent.click(screen.getByText('Go to Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('/seller/dashboard');
  });

  test('provides link to buyer site', () => {
    const mockNavigate = jest.fn();
    render(<FarmerLandingPage onNavigate={mockNavigate} />);
    fireEvent.click(screen.getByText('Go to Buyer Site'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});

// src/__tests__/pages/shared/About.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from '../../../pages/shared/About';

describe('About Page', () => {
  test('renders about content', () => {
    render(<About onNavigate={jest.fn()} />);
    expect(screen.getByText('About Farmart')).toBeInTheDocument();
    expect(screen.getByText(/digital livestock marketplace/)).toBeInTheDocument();
  });

  test('renders team members', () => {
    render(<About onNavigate={jest.fn()} />);
    expect(screen.getByText('Elvis Kariuki')).toBeInTheDocument();
    expect(screen.getByText('Aron Onkware')).toBeInTheDocument();
    expect(screen.getByText('Dwayne Njenga')).toBeInTheDocument();
  });

  test('navigates back when back button is clicked', () => {
    const mockNavigate = jest.fn();
    render(<About onNavigate={mockNavigate} />);
    fireEvent.click(screen.getByText('Back to Home'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});