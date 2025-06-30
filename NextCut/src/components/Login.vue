<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { clientAuthService, userAuthService } from '@/services/auth.services.js';
import { showError, showSuccess } from '@/utils/errorHandler.js';
import { validateForm } from '@/utils/validations.js';
import { loginService } from '@/services/login/index.js';

// Variables reactivas para el formulario
const email = ref('');
const password = ref('');
const userType = ref('client'); // 'client' o 'user' (empleado)
const loading = ref(false);
const errors = ref({});

const router = useRouter();

// Reglas de validación
const validationRules = {
  email: { required: true, email: true },
  password: { required: true, password: true }
};

// Validar formulario
const validateFormData = () => {
  const formData = {
    email: email.value,
    password: password.value
  };

  const { isValid, errors: validationErrors } = validateForm(formData, validationRules);
  errors.value = validationErrors;
  return isValid;
};

// Limpiar error de un campo específico
const clearFieldError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};

// Función para manejar el inicio de sesión
const handleLogin = async () => {
  if (!validateFormData()) {
    showError('Por favor, corrige los errores en el formulario');
    return;
  }

  loading.value = true;

  try {
    const credentials = {
      email: email.value,
      password: password.value
    };

    await loginService.loginUniversal(credentials, userType.value);
    // Guardar campo 'cliente' en localStorage si es cliente
    if (userType.value === 'client') {
      localStorage.setItem('cliente', 'true');
    } else {
      localStorage.removeItem('cliente');
    }
    
    // Redirigir según el tipo de usuario
    if (userType.value === 'user') {
      // Empleado - ir al dashboard de empleados
      router.push('/employee-dashboard');
    } else {
      // Cliente - ir al home
      router.push('/home');
    }
  } catch (error) {
    // El error ya se maneja en el servicio
    console.error('Error en login:', error);
  } finally {
    loading.value = false;
  }
};

// Cambiar tipo de usuario
const switchUserType = (type) => {
  userType.value = type;
  errors.value = {};
  // Limpiar campos al cambiar tipo
  email.value = '';
  password.value = '';
};

// Ir al registro
const goToRegister = () => {
  router.push('/registro');
};
</script>

<template>
  <main class="flex-1 h-screen">
    <section class="login-background">
      <div class="min-h-screen flex items-center justify-center">
        <div class="bg-login rounded-lg p-8 w-96 text-center shadow-lg shadow-gray-950">
          <h2 class="text-2xl font-bold text-white mb-6">Bienvenido a Barbería</h2>
          
          <!-- Selector de tipo de usuario -->
          <div class="mb-6">
            <div class="flex bg-gray-700 rounded-lg p-1">
              <button
                @click="switchUserType('client')"
                :class="[
                  'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors',
                  userType === 'client' 
                    ? 'bg-yellow-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                ]"
              >
                Cliente
              </button>
              <button
                @click="switchUserType('user')"
                :class="[
                  'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors',
                  userType === 'user' 
                    ? 'bg-yellow-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                ]"
              >
                Empleado
              </button>
            </div>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4 text-left">
            <!-- Email -->
            <div>
              <label for="email" class="block text-white mb-1">Correo electrónico</label>
              <input
                id="email"
                type="email"
                v-model="email"
                @input="clearFieldError('email')"
                required
                class="w-full px-3 py-2 rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-[#232729] text-white"
                :class="{ 'border-red-500': errors.email }"
                placeholder="ejemplo@correo.com"
              />
              <span v-if="errors.email" class="text-red-400 text-sm">{{ errors.email }}</span>
            </div>

            <!-- Contraseña -->
            <div>
              <label for="password" class="block text-white mb-1">Contraseña</label>
              <input
                id="password"
                type="password"
                v-model="password"
                @input="clearFieldError('password')"
                required
                class="w-full px-3 py-2 rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-[#232729] text-white"
                :class="{ 'border-red-500': errors.password }"
                placeholder="••••••••"
              />
              <span v-if="errors.password" class="text-red-400 text-sm">{{ errors.password }}</span>
            </div>

            <!-- Botón de inicio de sesión -->
            <div class="flex items-center justify-center mt-8">
              <button
                type="submit"
                :disabled="loading"
                class="bg-yellow-600 hover:opacity-90 disabled:opacity-50 text-white font-medium font-roboto py-2 px-6 rounded-lg transition-all"
              >
                <span v-if="loading">Iniciando sesión...</span>
                <span v-else>Iniciar Sesión</span>
              </button>
            </div>
          </form>

          <!-- Enlaces adicionales -->
          <div class="mt-6 space-y-2">
            <p class="text-white text-sm">
              ¿No tienes una cuenta?
              <button 
                @click="goToRegister"
                class="text-yellow-500 hover:underline cursor-pointer"
              >
                Regístrate
              </button>
            </p>
            <p class="text-gray-400 text-xs">
              {{ userType === 'client' ? 'Accede como cliente para agendar citas' : 'Accede como empleado para gestionar el sistema' }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
.login-background {
  background-image: url('../assets/images/FondoLogin.png');
  min-height: 100vh;
  background-size: 195%;
  background-position: right;
  background-repeat: no-repeat;
}

.bg-login {
  background-color: var(--login);
}

.bg-input {
  background-color: var(--login-input);
}
</style>
