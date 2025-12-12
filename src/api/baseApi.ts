import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

// Define response data type
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

const baseApi: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL as string,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor
baseApi.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
baseApi.interceptors.response.use(
    (response: AxiosResponse) => {
        const method = response.config.method?.toLowerCase() || '';
        let message = '';

        // Prefer server message
        if (response.data?.message) {
            message = response.data.message;
        } else {
            switch (method) {
                case 'post':
                    message = 'Operación exitosa.';
                    break;
                case 'put':
                case 'patch':
                    message = 'Actualización exitosa.';
                    break;
                case 'delete':
                    message = 'Eliminación exitosa.';
                    break;
            }
        }

        // Log success message for non-GET requests
        if (method !== 'get' && message) {
            console.log(`API SUCCESS: ${message}`);
        }

        return response;
    },
    (error) => Promise.reject(error)
);

export default baseApi;
