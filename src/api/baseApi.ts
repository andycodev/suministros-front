import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { showNotification } from '../events/notificationEvents';

// Define response data type
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

const baseApi: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL as string,
    timeout: 30000, // 30 seconds para evitar timeout, por defecto es 10000
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
        let notificationType: 'alert-success' | 'alert-error' | 'alert-warning' | 'alert-info' = 'alert-info';

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

        // Determine notification type based on data.success
        if (response.data?.success !== undefined) {
            notificationType = response.data.success ? 'alert-success' : 'alert-error';
        } else if (method !== 'get' && message) {
            notificationType = 'alert-success';
        }

        // Show notification for non-GET requests or when there's a message
        if ((method !== 'get' || response.data?.message) && message) {
            showNotification(message, notificationType);
        }

        return response;
    },
    // (error) => Promise.reject(error) // Comentado para evitar error de timeout, descomentar si se desea que el timeout sea manejado por axios
    (error) => {
        // Handle timeout errors
        if (error.code === 'ECONNABORTED') {
            showNotification('La base de datos tardó demasiado en responder. Intenta nuevamente.', 'alert-error');
            return Promise.reject(error);
        }

        // Handle API response errors
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            // Validation errors (422)
            if (status === 422 && data.message) {
                showNotification(data.message, 'alert-error');
                return Promise.reject(error);
            }

            // Other server errors with custom message
            if (data?.message) {
                const isServerError = status >= 500;
                showNotification(data.message, isServerError ? 'alert-warning' : 'alert-error');
                return Promise.reject(error);
            }

            // Generic HTTP errors
            let errorMessage = '';
            let errorType: 'alert-error' | 'alert-warning' = 'alert-error';

            switch (status) {
                case 400:
                    errorMessage = 'Solicitud incorrecta.';
                    break;
                case 401:
                    errorMessage = 'No autorizado. Inicia sesión nuevamente.';
                    break;
                case 403:
                    errorMessage = 'Acceso denegado.';
                    break;
                case 404:
                    errorMessage = 'Recurso no encontrado.';
                    break;
                case 500:
                    errorMessage = 'Error del servidor.';
                    errorType = 'alert-warning';
                    break;
                default:
                    errorMessage = `Error ${status}: ${error.response.statusText}`;
                    errorType = status >= 500 ? 'alert-warning' : 'alert-error';
            }
            showNotification(errorMessage, errorType);
        }
        // Handle network errors
        else if (error.request) {
            showNotification('Error de conexión. Verifica tu internet.', 'alert-error');
        }
        // Handle other errors
        else {
            showNotification('Ocurrió un error inesperado.', 'alert-error');
        }

        return Promise.reject(error);
    }
);

export default baseApi;
