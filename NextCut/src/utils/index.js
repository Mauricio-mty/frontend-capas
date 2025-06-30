// Utilidades de manejo de errores
export { 
    extractErrorMessage, 
    handleNetworkError, 
    showError, 
    showSuccess, 
    handleError 
} from './errorHandler.js';

// Utilidades de validación
export { 
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validatePhone,
    validateName,
    validateRequired,
    validateMinLength,
    validateMaxLength,
    validatePrice,
    validateDuration,
    validateFutureDate,
    validateTime,
    validateForm,
    validationRules
} from './validations.js'; 