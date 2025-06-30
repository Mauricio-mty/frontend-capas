import apiClient from '../api.config.js';

export const schedulesService = {
    // Crear horario
    createSchedule: async (scheduleData) => {
        try {
            const response = await apiClient.post('/schedules/', scheduleData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al crear horario');
        }
    },

    // Eliminar horario
    deleteSchedule: async (scheduleData) => {
        try {
            const response = await apiClient.delete('/schedules/', { data: scheduleData });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al eliminar horario');
        }
    },

    // Obtener horarios por sucursal
    getSchedulesByBranch: async (branch) => {
        try {
            const response = await apiClient.get(`/schedules/get/${branch}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener horarios');
        }
    }
}; 