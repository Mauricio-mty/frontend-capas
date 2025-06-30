// Validación de email
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validación de contraseña (mínimo 6 caracteres)
export const validatePassword = (password) => {
    return password && password.length >= 6;
};

// Validación de contraseñas que coinciden
export const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};

// Validación de teléfono (formato básico)
export const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Validación de nombre (solo letras y espacios)
export const validateName = (name) => {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return nameRegex.test(name) && name.trim().length >= 2;
};

// Validación de campos requeridos
export const validateRequired = (value) => {
    return value !== null && value !== undefined && value.toString().trim() !== '';
};

// Validación de longitud mínima
export const validateMinLength = (value, minLength) => {
    return value && value.toString().length >= minLength;
};

// Validación de longitud máxima
export const validateMaxLength = (value, maxLength) => {
    return value && value.toString().length <= maxLength;
};

// Validación de precio (número positivo)
export const validatePrice = (price) => {
    const numPrice = parseFloat(price);
    return !isNaN(numPrice) && numPrice > 0;
};

// Validación de duración (número positivo)
export const validateDuration = (duration) => {
    const numDuration = parseInt(duration);
    return !isNaN(numDuration) && numDuration > 0;
};

// Validación de fecha (fecha futura)
export const validateFutureDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
};

// Validación de hora (formato HH:MM)
export const validateTime = (time) => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
};

// Función para validar formulario completo
export const validateForm = (formData, validationRules) => {
    const errors = {};

    Object.keys(validationRules).forEach(field => {
        const value = formData[field];
        const rules = validationRules[field];

        // Validar campo requerido
        if (rules.required && !validateRequired(value)) {
            errors[field] = `${field} es requerido`;
            return;
        }

        // Si el campo no es requerido y está vacío, saltar otras validaciones
        if (!validateRequired(value)) {
            return;
        }

        // Validar email
        if (rules.email && !validateEmail(value)) {
            errors[field] = 'Email inválido';
            return;
        }

        // Validar contraseña
        if (rules.password && !validatePassword(value)) {
            errors[field] = 'La contraseña debe tener al menos 6 caracteres';
            return;
        }

        // Validar coincidencia de contraseñas
        if (rules.passwordMatch && !validatePasswordMatch(value, formData[rules.passwordMatch])) {
            errors[field] = 'Las contraseñas no coinciden';
            return;
        }

        // Validar teléfono
        if (rules.phone && !validatePhone(value)) {
            errors[field] = 'Teléfono inválido';
            return;
        }

        // Validar nombre
        if (rules.name && !validateName(value)) {
            errors[field] = 'Nombre inválido (solo letras y espacios)';
            return;
        }

        // Validar longitud mínima
        if (rules.minLength && !validateMinLength(value, rules.minLength)) {
            errors[field] = `Mínimo ${rules.minLength} caracteres`;
            return;
        }

        // Validar longitud máxima
        if (rules.maxLength && !validateMaxLength(value, rules.maxLength)) {
            errors[field] = `Máximo ${rules.maxLength} caracteres`;
            return;
        }

        // Validar precio
        if (rules.price && !validatePrice(value)) {
            errors[field] = 'Precio inválido';
            return;
        }

        // Validar duración
        if (rules.duration && !validateDuration(value)) {
            errors[field] = 'Duración inválida';
            return;
        }

        // Validar fecha futura
        if (rules.futureDate && !validateFutureDate(value)) {
            errors[field] = 'La fecha debe ser futura';
            return;
        }

        // Validar hora
        if (rules.time && !validateTime(value)) {
            errors[field] = 'Hora inválida';
            return;
        }

        // Validación personalizada
        if (rules.custom && typeof rules.custom === 'function') {
            const customError = rules.custom(value, formData);
            if (customError) {
                errors[field] = customError;
            }
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Ejemplos de reglas de validación comunes
export const validationRules = {
    // Reglas para login
    login: {
        email: { required: true, email: true },
        password: { required: true, password: true }
    },

    // Reglas para registro de cliente
    clientRegistration: {
        name: { required: true, name: true, minLength: 2 },
        email: { required: true, email: true },
        phone: { required: true, phone: true },
        password: { required: true, password: true },
        confirmPassword: { required: true, passwordMatch: 'password' }
    },

    // Reglas para registro de usuario
    userRegistration: {
        name: { required: true, name: true, minLength: 2 },
        email: { required: true, email: true },
        phone: { required: true, phone: true },
        password: { required: true, password: true },
        confirmPassword: { required: true, passwordMatch: 'password' }
    },

    // Reglas para servicio
    service: {
        name: { required: true, minLength: 2, maxLength: 100 },
        price: { required: true, price: true },
        duration: { required: true, duration: true }
    },

    // Reglas para sucursal
    branch: {
        name: { required: true, minLength: 2, maxLength: 100 },
        address: { required: true, minLength: 10 },
        phone: { required: true, phone: true }
    },

    // Reglas para cita
    appointment: {
        date: { required: true, futureDate: true },
        time: { required: true, time: true },
        serviceId: { required: true },
        branchId: { required: true }
    }
}; 