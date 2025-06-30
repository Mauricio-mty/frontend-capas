import apiClient from '@/services/api.config.js';

// Obtener todos los empleados
export const getAllEmployees = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get('/users/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al obtener empleados');
    }
};

// Editar empleado por ID
export const updateEmployeeById = async (id, employeeData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.patch(`/users/${id}`, employeeData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al actualizar empleado');
    }
};

// Eliminar empleado por ID
export const deleteEmployeeById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.delete(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al eliminar empleado');
    }
};

// Crear empleado
export const createEmployee = async (employeeData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.post('/users/', employeeData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error al crear empleado');
    }
};

// Servicios específicos para gestionarEmpleados 