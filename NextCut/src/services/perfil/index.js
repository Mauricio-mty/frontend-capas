// Servicios específicos para perfil 
import apiClient from '@/services/api.config.js';

export const getPerfil = async () => {
  const token = localStorage.getItem('token');
  const response = await apiClient.get('/users/whoami', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}; 