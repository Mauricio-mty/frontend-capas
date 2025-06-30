<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerProfile } from '@/services/gestionarClientes/client.services.js';
import { showError, showSuccess } from '@/utils/errorHandler.js';
import { validateForm } from '@/utils/validations.js';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const name = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const phone = ref('');
const loading = ref(false);
const errors = ref({});
const router = useRouter();

const validateFormData = () => {
  const formData = {
    name: name.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    phone: phone.value
  };

  const { isValid, errors: validationErrors } = validateForm(formData, {
    name: { required: true, name: true, minLength: 2 },
    lastName: { required: true, name: true, minLength: 2 },
    email: { required: true, email: true },
    password: { required: true, password: true },
    confirmPassword: { required: true, passwordMatch: 'password' },
    phone: { required: true }
  });

  errors.value = validationErrors;
  return isValid;
};

const handleRegister = async () => {
  if (!validateFormData()) {
    showError('Por favor, corrige los errores en el formulario');
    return;
  }
  loading.value = true;
  try {
    const clientData = {
      name: name.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      phone: phone.value
    };
    await registerProfile(clientData);
    showSuccess('Usuario registrado exitosamente');
    router.push('/login');
  } catch (error) {
    showError(error.message);
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  router.push('/login');
};

const clearFieldError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};
</script>

<template>
  <Navbar />
  <div class="flex flex-col min-h-screen justify-between bg-[#232729]">
    <div class="flex flex-col items-center justify-center flex-1">
      <div class="w-full max-w-md p-8 bg-[#181A1B] rounded-lg shadow-lg mt-8">
        <h2 class="text-2xl font-bold mb-6 text-white text-center">Registro de Cliente</h2>
        <form @submit.prevent="handleRegister" class="space-y-4 text-left">
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
          <div>
            <label for="phone" class="block text-white mb-1">Teléfono</label>
            <input
              id="phone"
              type="text"
              v-model="phone"
              @input="clearFieldError('phone')"
              required
              class="w-full px-3 py-2 rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-[#232729] text-white"
              :class="{ 'border-red-500': errors.phone }"
            />
            <span v-if="errors.phone" class="text-red-400 text-sm">{{ errors.phone }}</span>
          </div>
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
          <div class="flex flex-row items-end justify-end gap-3 mt-8">
            <button type="button" @click="handleCancel" class="btn-secondary">Cancelar</button>
            <button type="submit" :disabled="loading" class="btn-primary">Registrar</button>
          </div>
        </form>
      </div>
    </div>
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
