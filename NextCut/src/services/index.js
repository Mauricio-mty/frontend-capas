// Configuración de la API
export { default as apiClient } from './api.config.js';

// Servicios de autenticación
export { 
    clientAuthService, 
    userAuthService, 
    logout, 
    isAuthenticated, 
    getUserType 
} from './auth.services.js';

// Servicios de sucursales
export { branchesService } from './branches.services.js';

// Servicios de servicios de barbería
export { servicesService } from './services.services.js';

// Servicios de horarios
export { schedulesService } from './schedules.services.js';

// Servicios de citas
export { appointmentsService } from './appointments.services.js';

// Servicio de clientes (mantener compatibilidad con código existente)
export { logIn, registerProfile } from './client.services.js'; 