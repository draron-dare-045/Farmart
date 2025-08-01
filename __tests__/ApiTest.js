// src/__tests__/api/client.test.js
import '@testing-library/jest-dom';
import apiClient from '../../api/client';

// Mock fetch
global.fetch = jest.fn();

describe('API Client', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('makes GET request successfully', async () => {
    const mockResponse = { data: 'test' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await apiClient.get('/test');
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      'https://farmart-backend-k8f8.onrender.com/test',
      expect.objectContaining({
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
    );
  });

  test('handles API errors', async () => {
    const mockError = { error: 'Not found' };
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => mockError,
    });

    await expect(apiClient.get('/test')).rejects.toThrow('API request failed');
  });

  test('includes authorization header when token provided', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await apiClient.get('/test', 'token123');
    expect(fetch).toHaveBeenCalledWith(
      'https://farmart-backend-k8f8.onrender.com/test',
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token123'
        }
      })
    );
  });
});