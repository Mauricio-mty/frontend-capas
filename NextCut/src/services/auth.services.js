import apiClient from './api.config.js';

// Servicios de autenticación para clientes
export const clientAuthService = {
    // Login de cliente
    login: async (credentials) => {
        try {
            // Formato específico para clientes
            const clientCredentials = {
                Email: credentials.email,
                Pass: credentials.password
            };
            const response = await apiClient.post('/clients/login', clientCredentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token.trim());
                localStorage.setItem('userType', 'client');
                window.dispatchEvent(new Event('storage'));
            }
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error en el login');
        }
    },

    // Registro de cliente
    signup: async (userData) => {
        try {
            const response = await apiClient.post('/clients/signup', userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error en el registro');
        }
    },

    // Obtener información del cliente autenticado
    getProfile: async () => {
        try {
            const response = await apiClient.get('/clients/whoami');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener perfil');
        }
    },

    // Actualizar perfil de cliente
    updateProfile: async (userData) => {
        try {
            const response = await apiClient.patch('/clients/', userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al actualizar perfil');
        }
    },

    // Eliminar cuenta de cliente
    deleteAccount: async () => {
        try {
            const response = await apiClient.delete('/clients/');
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            localStorage.removeItem('empleado');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al eliminar cuenta');
        }
    }
};

// Servicios de autenticación para usuarios (empleados/admin)
export const userAuthService = {
    // Login de usuario con formato específico
    login: async (credentials) => {
        try {
            // Formato específico para empleados
            const employeeCredentials = {
                Email: credentials.email,
                Pass: credentials.password
            };
            
            const response = await apiClient.post('/users/login', employeeCredentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token.trim());
                localStorage.setItem('userType', 'user');
                localStorage.setItem('empleado', 'true');
                window.dispatchEvent(new Event('storage'));
            }
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error en el login');
        }
    },

    // Crear primer usuario (admin)
    createFirstUser: async (userData) => {
        try {
            const response = await apiClient.post('/users/first', userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al crear usuario');
        }
    },

    // Registrar nuevo usuario
    register: async (userData) => {
        try {
            const response = await apiClient.post('/users/', userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al registrar usuario');
        }
    },

    // Obtener información del usuario autenticado
    getProfile: async () => {
        try {
            const response = await apiClient.get('/users/whoami');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener perfil');
        }
    },

    // Obtener todos los usuarios
    getAllUsers: async () => {
        try {
            const response = await apiClient.get('/users/');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener usuarios');
        }
    },

    // Actualizar perfil de usuario
    updateProfile: async (userData) => {
        try {
            const response = await apiClient.patch('/users/', userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al actualizar perfil');
        }
    },

    // Actualizar usuario por ID
    updateUserById: async (userId, userData) => {
        try {
            const response = await apiClient.patch(`/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al actualizar usuario');
        }
    },

    // Eliminar usuario por ID
    deleteUser: async (userId) => {
        try {
            const response = await apiClient.delete(`/users/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al eliminar usuario');
        }
    }
};

// Función para cerrar sesión
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('empleado');
    localStorage.removeItem('cliente');
    window.dispatchEvent(new Event('storage'));
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

// Función para obtener el tipo de usuario
export const getUserType = () => {
    return localStorage.getItem('userType');
};

// Función para verificar si el usuario es empleado
export const isEmployee = () => {
    return localStorage.getItem('empleado') === 'true';
}; 