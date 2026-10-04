import axios from 'axios';

// Pointing to your Django Backend
const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true, // CRITICAL: Allows HttpOnly cookies for security
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ProductService = {
    getAll: (filters = {}) => {
        const params = new URLSearchParams(filters);
        return API.get(`/products/?${params.toString()}`);
    },
    getOne: (id) => API.get(`/products/${id}/`),
};

export const AuthService = {
    login: (credentials) => API.post('/auth/login/', credentials),
    logout: () => API.post('/auth/logout/'),
};

export const AdminService = {
    getVaultData: () => API.get('/admin/vault/'),
};

export const UserService = {
    getAddresses: () => API.get('/addresses/'),
    addAddress: (data) => API.post('/addresses/', data),
};