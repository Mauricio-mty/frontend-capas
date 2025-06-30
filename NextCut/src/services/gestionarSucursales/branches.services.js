import apiClient from '../api.config.js';

export const branchesService = {
    // Obtener todas las sucursales
    getAllBranches: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await apiClient.get('/branches/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener sucursales');
        }
    },

    // Obtener sucursal por ID
    getBranchById: async (id) => {
        try {
            const response = await apiClient.get(`/branches/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener sucursal');
        }
    },

    // Crear nueva sucursal
    createBranch: async (branchData) => {
        try {
            const response = await apiClient.post('/branches/', branchData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al crear sucursal');
        }
    },

    // Actualizar sucursal
    updateBranch: async (id, branchData) => {
        try {
            const response = await apiClient.patch(`/branches/${id}`, branchData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al actualizar sucursal');
        }
    },

    // Eliminar sucursal
    deleteBranch: async (id) => {
        try {
            const response = await apiClient.delete(`/branches/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al eliminar sucursal');
        }
    }
}; 