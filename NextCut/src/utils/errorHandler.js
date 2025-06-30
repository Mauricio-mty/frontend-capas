// Función para extraer mensaje de error de diferentes formatos de respuesta
export const extractErrorMessage = (error) => {
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        return error.response.data.errors[0].message;
    }
    
    if (error.response?.data?.error) {
        return error.response.data.error;
    }
    
    if (error.response?.data?.message) {
        return error.response.data.message;
    }
    
    if (error.message) {
        return error.message;
    }
    
    return 'Ha ocurrido un error inesperado';
};

// Función para manejar errores de red
export const handleNetworkError = (error) => {
    if (!error.response) {
        return 'Error de conexión. Verifica tu conexión a internet.';
    }
    
    const status = error.response.status;
    
    switch (status) {
        case 400:
            return 'Solicitud incorrecta. Verifica los datos enviados.';
        case 401:
            return 'No autorizado. Inicia sesión nuevamente.';
        case 403:
            return 'Acceso denegado. No tienes permisos para esta acción.';
        case 404:
            return 'Recurso no encontrado.';
        case 409:
            return 'Conflicto. El recurso ya existe.';
        case 422:
            return 'Datos inválidos. Verifica la información proporcionada.';
        case 500:
            return 'Error del servidor. Intenta nuevamente más tarde.';
        default:
            return `Error ${status}: ${error.response.statusText}`;
    }
};

// Función para mostrar notificaciones de error
export const showError = (message, duration = 5000) => {
    // Aquí puedes integrar con tu sistema de notificaciones preferido
    // Por ejemplo, usando toast notifications
    console.error('Error:', message);
    
    // Ejemplo básico con alert (puedes reemplazar con tu sistema de notificaciones)
    if (typeof window !== 'undefined') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease-out;
        `;
        
        // Agregar estilos de animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remover después del tiempo especificado
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
};

// Función para mostrar notificaciones de éxito
export const showSuccess = (message, duration = 3000) => {
    console.log('Success:', message);
    
    if (typeof window !== 'undefined') {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }
};

// Función para manejar errores de forma global
export const handleError = (error, showNotification = true) => {
    const message = extractErrorMessage(error);
    
    if (showNotification) {
        showError(message);
    }
    
    return message;
}; 