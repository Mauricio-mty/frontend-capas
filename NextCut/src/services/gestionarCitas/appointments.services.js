import apiClient from '../api.config.js';

export const appointmentsService = {
    // Obtener todas las citas
    getAllAppointments: async () => {
        try {
            const response = await apiClient.get('/appointments/');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener citas');
        }
    },

    // Obtener cita por ID
    getAppointmentById: async (id) => {
        try {
            const response = await apiClient.get(`/appointments/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener cita');
        }
    },

    // Obtener citas por fecha
    getAppointmentsByDate: async (date) => {
        try {
            const response = await apiClient.get('/appointments/get', {
                params: { date }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al obtener citas por fecha');
        }
    },

    // Crear nueva cita
    createAppointment: async (appointmentData) => {
        try {
            const response = await apiClient.post('/appointments/', appointmentData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al crear cita');
        }
    },

    // Cambiar estado de cita
    updateAppointmentStatus: async (id, status) => {
        try {
            const response = await apiClient.patch(`/appointments/status/${id}?status=${status}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al actualizar estado de cita');
        }
    },

    // Asignar barbero a cita
    assignBarberToAppointment: async (id, barberId) => {
        try {
            const response = await apiClient.patch(`/appointments/barber/${id}?barber=${barberId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Error al asignar barbero');
        }
    }
}; 