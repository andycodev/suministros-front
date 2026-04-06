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
    timeout: 30000,
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
        const { success, message } = response.data;

        // --- MANEJO DE ÉXITO (VERDE) ---
        // Si el servidor confirma éxito y NO es un GET, mostramos notificación verde.
        if (success && message && method !== 'get') {
            showNotification(message, 'alert-success');
        }
        // Caso especial: El servidor no envía success pero es una operación exitosa.
        else if (method !== 'get' && message) {
            showNotification(message, 'alert-success');
        }

        return response;
    },
    (error) => {
        // 1. Handle timeout errors (ROJO)
        if (error.code === 'ECONNABORTED') {
            showNotification('La base de datos tardó demasiado en responder.', 'alert-error');
            return Promise.reject(error);
        }

        // 2. Handle API response errors
        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;

            // --- AMARILLO: VALIDACIONES (422) ---
            // Aquí capturamos el mensaje que configuramos en Laravel (firstError)
            if (status === 422) {
                showNotification(data.message || 'Verifica los datos ingresados.', 'alert-warning');
                return Promise.reject(error);
            }

            // --- ROJO: ERRORES CRÍTICOS O DE SISTEMA ---
            if (status === 401) {
                showNotification('Sesión expirada. Inicia sesión nuevamente.', 'alert-error');
            }
            else if (status === 403) {
                showNotification(data.message || 'No tienes permisos para esto.', 'alert-error');
            }
            else if (status >= 500) {
                // Error de servidor (500, 503, etc.) siempre Rojo
                showNotification(data.message || 'Error interno del servidor.', 'alert-error');
            }
            else if (data?.message) {
                // Cualquier otro error con mensaje (400, 404, etc.)
                showNotification(data.message, 'alert-error');
            }
        }
        // 3. Handle network errors (ROJO)
        else if (error.request) {
            showNotification('Error de conexión. Verifica tu internet.', 'alert-error');
        }
        // 4. Otros errores inesperados (ROJO)
        else {
            showNotification('Ocurrió un error inesperado.', 'alert-error');
        }

        return Promise.reject(error);
    }
);

export default baseApi;