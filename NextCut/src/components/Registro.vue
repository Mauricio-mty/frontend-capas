<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userAuthService } from '@/services/auth.services.js';
import { showError, showSuccess } from '@/utils/errorHandler.js';
import { validateForm } from '@/utils/validations.js';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

// Variables reactivas para el formulario
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const name = ref('');
const lastName = ref('');
const role = ref('RECEPCIONISTA'); // Valor por defecto
const loading = ref(false);
const errors = ref({});

const router = useRouter();

// Opciones de roles disponibles
const roleOptions = [
  { value: 'RECEPCIONISTA', label: 'Recepcionista' },
  { value: 'BARBER', label: 'Barbero' }
];

// Función para validar el formulario
const validateFormData = () => {
  const formData = {
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    name: name.value,
    lastName: lastName.value,
    role: role.value
  };

  const { isValid, errors: validationErrors } = validateForm(formData, {
    email: { required: true, email: true },
    password: { required: true, password: true },
    confirmPassword: { required: true, passwordMatch: 'password' },
    name: { required: true, name: true, minLength: 2 },
    lastName: { required: true, name: true, minLength: 2 },
    role: { required: true }
  });

  errors.value = validationErrors;
  return isValid;
};

// Función para manejar el registro de usuario
const handleRegister = async () => {
  if (!validateFormData()) {
    showError('Por favor, corrige los errores en el formulario');
    return;
  }

  loading.value = true;

  try {
    const userData = {
      email: email.value,
      password: password.value,
      name: name.value,
      lastName: lastName.value,
      Role: role.value
    };

    await userAuthService.register(userData);
    showSuccess('Usuario registrado exitosamente');
    router.push('/login'); // Navega a la página de login después de registrarse
  } catch (error) {
    showError(error.message);
  } finally {
    loading.value = false;
  }
};

// Función para cancelar el registro y volver al login
const handleCancel = () => {
  router.push('/login'); // Redirige a la página de login al cancelar
};

// Función para limpiar errores cuando el usuario empiece a escribir
const clearFieldError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};
</script>

<template>
  <div id="app-container" class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1">
      <section class="login-background">
        <div class="min-h-screen flex items-center justify-center">
          <div class="min-h-screen flex items-center justify-center">
            <div class="bg-login rounded-lg p-6 w-105 text-center shadow-lg shadow-gray-950">
              <h2 class="text-2xl font-bold text-white mb-6">Registro de Usuario</h2>
              <form @submit.prevent="handleRegister" class="space-y-4 text-left">
                <!-- Nombre -->
                <div>
                  <label for="name" class="block text-white mb-1">Nombre</label>
                  <input
                    id="name"
                    type="text"
                    v-model="name"
                    @input="clearFieldError('name')"
                    required
                    class="w-full px-3 py-2 rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-[#232729] text-white"
                    :class="{ 'border-red-500': errors.name }"
                  />
                  <span v-if="errors.name" class="text-red-400 text-sm">{{ errors.name }}</span>
                </div>

                <!-- Apellido -->
                <div>
                  <label for="lastName" class="block text-white mb-1">Apellido</label>
                  <input
                    id="lastName"
                    type="text"
                    v-model="lastName"
                    @input="clearFieldError('lastName')"
                    required
                    class="w-full px-3 py-2 rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-[#232729] text-white"
                    :class="{ 'border-red-500': errors.lastName }"
                  />
                  <span v-if="errors.lastName" class="text-red-400 text-sm">{{ errors.lastName }}</span>
                </div>

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
                  />
                  <span v-if="errors.email" class="text-red-400 text-sm">{{ errors.email }}</span>
                </div>

                <!-- Rol -->
                <div>
                  <label for="role" class="block text-white mb-1">Rol</label>
                  <select
                    id="role"
                    v-model="role"
                    @change="clearFieldError('role')"
                    required
                    class="w-full px-3 py-2 rounded-md bg-input text-white focus:outline-none focus:ring-2 focus:ring-[#232729]"
                    :class="{ 'border-red-500': errors.role }"
                  >
                    <option v-for="option in roleOptions" :key="option.value" :value="option.value" class="bg-black text-white">
                      {{ option.label }}
                    </option>
                  </select>
                  <span v-if="errors.role" class="text-red-400 text-sm">{{ errors.role }}</span>
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
                  />
                  <span v-if="errors.password" class="text-red-400 text-sm">{{ errors.password }}</span>
                </div>

                <!-- Confirmar Contraseña -->
                <div>
                  <label for="confirmPassword" class="block text-white mb-1">Confirmar Contraseña</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    v-model="confirmPassword"
                    @input="clearFieldError('confirmPassword')"
                    required
                    class="w-full px-3 py-2 rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-[#232729] text-white"
                    :class="{ 'border-red-500': errors.confirmPassword }"
                  />
                  <span v-if="errors.confirmPassword" class="text-red-400 text-sm">{{ errors.confirmPassword }}</span>
                </div>

                <!-- Botones -->
                <div class="flex flex-row items-end justify-end gap-3 mt-8">
                  <button
                    type="button"
                    @click="handleCancel"
                    :disabled="loading"
                    class="mt-2 bg-gray-600 hover:opacity-90 disabled:opacity-50 text-white font-medium font-roboto py-2 px-6 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    :disabled="loading"
                    class="bg-yellow-600 hover:opacity-90 disabled:opacity-50 text-white font-medium font-roboto py-2 px-6 rounded-lg"
                  >
                    <span v-if="loading">Registrando...</span>
                    <span v-else>Registrarse</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<style>
.login-background {
  background-image: url('../assets/images/FondoLogin.png');
  min-height: 100vh;
  background-size: 195%;
  background-position: right;
  background-repeat: no-repeat;
}

/* Estilos para el menú desplegable del select */
select option {
  background-color: var(--input-bg, #2d3748) !important;
  color: white !important;
}

/* Para Firefox */
select {
  background-color: var(--input-bg, #2d3748) !important;
  color: white !important;
}

/* Para Chrome/Safari */
select option:hover {
  background-color: var(--input-hover-bg, #4a5568) !important;
}

select option:checked {
  background-color: var(--input-focus-bg, #718096) !important;
}
</style>
