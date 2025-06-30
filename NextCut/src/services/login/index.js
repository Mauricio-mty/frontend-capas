// Servicios específicos para login
import { clientAuthService, userAuthService } from '../auth.services.js';
import { showError, showSuccess } from '@/utils/errorHandler.js';

export const loginService = {
  // Login de cliente
  async loginClient(credentials) {
    try {
      const result = await clientAuthService.login(credentials);
      showSuccess('Sesión iniciada exitosamente');
      return result;
    } catch (error) {
      showError(error.message);
      throw error;
    }
  },

  // Login de empleado
  async loginEmployee(credentials) {
    try {
      const result = await userAuthService.login(credentials);
      showSuccess('Sesión iniciada exitosamente');
      return result;
    } catch (error) {
      showError(error.response?.data?.error || error.message || 'Error al iniciar sesión');
      throw error;
    }
  },

  // Login universal (detecta tipo automáticamente)
  async loginUniversal(credentials, userType) {
    try {
      let result;
      
      if (userType === 'client') {
        result = await this.loginClient(credentials);
      } else {
        result = await this.loginEmployee(credentials);
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Validar credenciales antes de enviar
  validateCredentials(email, password) {
    const errors = {};
    
    if (!email || !email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Email inválido';
    }
    
    if (!password || !password.trim()) {
      errors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}; 