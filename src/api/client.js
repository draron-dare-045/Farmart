const API_URL = "https://farmart-backend-k8f8.onrender.com"; // Your Django backend URL

const apiClient = {
    _request: async (method, endpoint, data = null, token = null) => {
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const config = { method, headers };
        if (data) config.body = JSON.stringify(data);

        try {
            const response = await fetch(`${API_URL}${endpoint}`, config);
            if (!response.ok) {
                const errorData = await response.json();
                const error = new Error('API request failed');
                error.data = errorData;
                throw error;
            }
            if (response.status === 204) return null;
            return response.json();
        } catch (error) {
            if (error instanceof TypeError) {
                 console.error(`Network Error: Could not connect to ${API_URL}${endpoint}.`);
                 throw new Error('Connection Error: Could not reach the server.');
            }
            console.error(`${method} ${endpoint} Error:`, error.data || error.message);
            throw error;
        }
    },

    // NEW method for handling file uploads (multipart/form-data)
    postWithFile: async (endpoint, formData, token = null) => {
        const headers = {}; // Browser will set Content-Type automatically for FormData
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const config = {
            method: 'POST',
            headers,
            body: formData,
        };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, config);
            if (!response.ok) {
                const errorData = await response.json();
                const error = new Error('File upload failed');
                error.data = errorData;
                throw error;
            }
            return response.json();
        } catch (error) {
             if (error instanceof TypeError) {
                 console.error(`Network Error: Could not connect to ${API_URL}${endpoint}.`);
                 throw new Error('Connection Error: Could not reach the server.');
            }
            console.error(`POST (file) ${endpoint} Error:`, error.data || error.message);
            throw error;
        }
    },

    get: (endpoint, token) => apiClient._request('GET', endpoint, null, token),
    post: (endpoint, data, token) => apiClient._request('POST', endpoint, data, token),
    patch: (endpoint, data, token) => apiClient._request('PATCH', endpoint, data, token),
    delete: (endpoint, token) => apiClient._request('DELETE', endpoint, null, token),
};

export default apiClient;
