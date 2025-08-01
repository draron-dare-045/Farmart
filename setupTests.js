// src/setupTests.js
import '@testing-library/jest-dom';

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  sendForm: jest.fn(() => Promise.resolve())
}));

// Mock Chart.js
jest.mock('chart.js', () => ({
  Chart: {
    register: jest.fn()
  },
  CategoryScale: {},
  LinearScale: {},
  BarElement: {},
  Title: {},
  Tooltip: {},
  Legend: {}
}));

// Mock recharts
jest.mock('recharts', () => ({
  Bar: () => <div data-testid="bar-chart" />,
  LineChart: () => <div data-testid="line-chart" />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />,
  Legend: () => <div />,
  ResponsiveContainer: ({ children }) => <div>{children}</div>
}));

// Mock window.location
delete window.location;
window.location = {
  pathname: '/',
  search: '',
  hash: '',
  state: null
};

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;