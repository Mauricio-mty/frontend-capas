import { isAuthenticated, getUserType } from '../services/auth.services.js';

// Guardia para rutas que requieren autenticación
export const requireAuth = (to, from, next) => {
    if (isAuthenticated()) {
        next();
    } else {
        next('/login');
    }
};

// Guardia para rutas que requieren ser cliente
export const requireClient = (to, from, next) => {
    if (isAuthenticated() && getUserType() === 'client') {
        next();
    } else if (isAuthenticated() && getUserType() === 'user') {
        // Si es usuario (empleado/admin), redirigir al dashboard
        next('/dashboard');
    } else {
        next('/login');
    }
};

// Guardia para rutas que requieren ser usuario (empleado/admin)
export const requireUser = (to, from, next) => {
    if (isAuthenticated() && getUserType() === 'user') {
        next();
    } else if (isAuthenticated() && getUserType() === 'client') {
        // Si es cliente, redirigir al home
        next('/');
    } else {
        next('/login');
    }
};

// Guardia para rutas que requieren ser admin
export const requireAdmin = (to, from, next) => {
    if (isAuthenticated() && getUserType() === 'user') {
        // Aquí podrías agregar lógica adicional para verificar si es admin
        // Por ahora, cualquier usuario autenticado puede acceder
        next();
    } else if (isAuthenticated() && getUserType() === 'client') {
        next('/');
    } else {
        next('/login');
    }
};

// Guardia para rutas públicas (redirigir si ya está autenticado)
export const redirectIfAuthenticated = (to, from, next) => {
    if (isAuthenticated()) {
        const userType = getUserType();
        if (userType === 'client') {
            next('/');
        } else if (userType === 'user') {
            next('/dashboard');
        }
    } else {
        next();
    }
}; 