import apiClient from '../api.config.js';

export const logIn = async (formData) => {
    try {
        const response = await apiClient.post('/clients/login', formData);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userType", "client");
            window.dispatchEvent(new Event("storage"));
        }
        return { message: "Sesión iniciada" };
    } catch (error) {
        console.log(error.response);
        throw new Error(error.response?.data?.errors ? error.response.data.errors[0].message : error.response?.data?.error || 'Error en el login');
    }
}

export const registerProfile = async (formData) => {
    try {
        const response = await apiClient.post('/clients/signup', formData);
        return response.data.message;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.errors ? error.response.data.errors[0].message : error.response?.data?.error || 'Error en el registro');
    }
}

export const getAllClients = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get('/clients/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al obtener clientes');
    }
};

export const createClient = async (clientData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.post('/clients/', clientData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al crear cliente');
    }
};

export const updateClient = async (id, clientData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.patch(`/clients/${id}`, clientData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al actualizar cliente');
    }
};

export const deleteClient = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.delete(`/clients/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al eliminar cliente');
    }
};

