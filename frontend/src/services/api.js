const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

class ApiService {
    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    getHeaders() {
        const headers = { 'Content-Type': 'application/json' };
        const token = localStorage.getItem('auth_token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            headers: this.getHeaders(),
            ...options,
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                const error = await response.json().catch(() => ({ detail: 'Something went wrong' }));
                throw new Error(error.detail || `Request failed with status ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                throw new Error('Unable to connect to the server. Please try again later.');
            }
            throw error;
        }
    }

    // Journal endpoints
    async getEntries(skip = 0, limit = 100) {
        return this.request(`/journal/?skip=${skip}&limit=${limit}`);
    }

    async getEntry(id) {
        return this.request(`/journal/${id}`);
    }

    async createEntry(content, mood = null, tags = []) {
        return this.request('/journal/', {
            method: 'POST',
            body: JSON.stringify({ content, mood, tags }),
        });
    }

    async updateEntry(id, data) {
        return this.request(`/journal/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async deleteEntry(id) {
        return this.request(`/journal/${id}`, { method: 'DELETE' });
    }

    async analyzeEntry(id) {
        return this.request(`/journal/${id}/analyze`, { method: 'POST' });
    }
}

export const api = new ApiService();
export default api;
