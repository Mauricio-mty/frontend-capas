import apiClient from '../api.config.js';

export const servicesService = {
    // Obtener todos los servicios
    getAllServices: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await apiClient.get('/services/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener servicios');
        }
    },

    // Obtener servicio por ID
    getServiceById: async (id) => {
        try {
            const response = await apiClient.get(`/services/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener servicio');
        }
    },

    // Crear nuevo servicio
    createService: async (serviceData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await apiClient.post('/services/', serviceData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al crear servicio');
        }
    },

    // Actualizar servicio
    updateService: async (id, serviceData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await apiClient.patch(`/services/${id}`, serviceData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al actualizar servicio');
        }
    },

    // Eliminar servicio
    deleteService: async (serviceId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await apiClient.delete(`/services/${serviceId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al eliminar servicio');
        }
    }
}; 