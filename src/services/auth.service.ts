import baseApi from '@/api/baseApi';

const endPointUrl = '/api/auth';

export const loginFn = async (payload: { email: string; password: string }) => {
    const { data: { data } } = await baseApi.post(`${endPointUrl}/login`, payload);

    // Store the Sanctum token in localStorage
    if (data.access_token) {
        localStorage.setItem('token', data.access_token);
    }

    // Store user data in localStorage for easy access
    if (data.user) {
        localStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem('directorData', JSON.stringify(data.user)); // For compatibility with existing code
    }

    return data;
}

export const logoutFn = async () => {
    try {
        await baseApi.post(`${endPointUrl}/logout`);
    } catch (error) {
        // Even if the logout request fails, clear local storage
        console.error('Logout request failed:', error);
    } finally {
        // Clear only authentication-related data
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('directorData');
        localStorage.removeItem('isDirectorAuth');
    }
}

export const getUserData = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
}
