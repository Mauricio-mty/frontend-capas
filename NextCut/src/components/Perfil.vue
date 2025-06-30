<script setup>
import { ref, onMounted } from 'vue';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import apiClient from '@/services/api.config.js';
import { getPerfil } from '@/services/perfil/index.js';

const usuario = ref({
  id: '',
  email: '',
  name: '',
  lastName: '',
  role: '',
  status: ''
});

const passwordForm = ref({
  actual: '',
  nueva: '',
  confirmar: '',
});

onMounted(async () => {
  try {
    usuario.value = await getPerfil();
  } catch (error) {
    alert('No se pudo cargar el perfil');
  }
});

function cambiarPassword() {
  // Aquí iría la lógica real
  alert('Contraseña cambiada (simulado)');
  passwordForm.value = { actual: '', nueva: '', confirmar: '' };
}
</script>
<template>
  <div id="app-container" class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 pb-12">
      <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow">
        <h2 class="text-2xl font-bold mb-6 text-center">Perfil de Usuario</h2>
        <div class="mb-8">
          <div class="mb-2"><span class="font-semibold">Nombre:</span> {{ usuario.name }} {{ usuario.lastName }}</div>
          <div class="mb-2"><span class="font-semibold">Correo:</span> {{ usuario.email }}</div>
          <div class="mb-2"><span class="font-semibold">Rol:</span> {{ usuario.role }}</div>
          <div class="mb-2"><span class="font-semibold">Estado:</span> {{ usuario.status }}</div>
        </div>
        <h3 class="text-lg font-semibold mb-2">Cambiar contraseña</h3>
        <form @submit.prevent="cambiarPassword" class="flex flex-col gap-3">
          <input v-model="passwordForm.actual" type="password" placeholder="Contraseña actual" class="border rounded px-3 py-2" required />
          <input v-model="passwordForm.nueva" type="password" placeholder="Nueva contraseña" class="border rounded px-3 py-2" required />
          <input v-model="passwordForm.confirmar" type="password" placeholder="Confirmar nueva contraseña" class="border rounded px-3 py-2" required />
          <button type="submit" class="bg-yellow-600 text-white rounded py-2 mt-2 hover:bg-yellow-700 transition">Guardar</button>
        </form>
      </div>
    </main>
    <Footer />
  </div>
</template> 