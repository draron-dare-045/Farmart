// src/__tests__/components/common/Button.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../../../components/common/Button';

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-green-600');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('applies variant styles correctly', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByText('Delete')).toHaveClass('bg-red-600');
  });
});

// src/__tests__/components/common/Modal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../../../components/common/Modal';

describe('Modal Component', () => {
  test('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByText('×'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

// src/__tests__/components/common/Spinner.test.js
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from '../../../components/common/Spinner';

describe('Spinner Component', () => {
  test('renders with default size', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.h-16')).toBeInTheDocument();
  });

  test('renders with small size', () => {
    const { container } = render(<Spinner size="sm" />);
    expect(container.querySelector('.h-5')).toBeInTheDocument();
  });

  test('renders fullscreen variant', () => {
    const { container } = render(<Spinner fullScreen />);
    expect(container.querySelector('.h-screen')).toBeInTheDocument();
  });
});

// src/__tests__/components/buyer/AnimalCard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimalCard from '../../../components/buyer/AnimalCard';
import { CartProvider } from '../../../context/CartContext';

const mockAnimal = {
  id: 1,
  name: 'Bessie',
  breed: 'Holstein',
  animal_type: 'COW',
  price: 50000,
  quantity: 2,
  farmer_username: 'john_farmer',
  description: 'Healthy dairy cow'
};

const AnimalCardWithContext = ({ animal }) => (
  <CartProvider>
    <AnimalCard animal={animal} />
  </CartProvider>
);

describe('AnimalCard Component', () => {
  test('renders animal information correctly', () => {
    render(<AnimalCardWithContext animal={mockAnimal} />);
    expect(screen.getByText('Bessie')).toBeInTheDocument();
    expect(screen.getByText('Holstein COW')).toBeInTheDocument();
    expect(screen.getByText('Ksh 50,000')).toBeInTheDocument();
    expect(screen.getByText('Stock: 2')).toBeInTheDocument();
  });

  test('opens modal when card is clicked', () => {
    render(<AnimalCardWithContext animal={mockAnimal} />);
    fireEvent.click(screen.getByText('Bessie'));
    expect(screen.getByText('Healthy dairy cow')).toBeInTheDocument();
  });

  test('shows out of stock state', () => {
    const outOfStockAnimal = { ...mockAnimal, quantity: 0 };
    render(<AnimalCardWithContext animal={outOfStockAnimal} />);
    expect(screen.getByText('OUT OF STOCK')).toBeInTheDocument();
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });
});