<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

const form = ref({
  nombre: '',
  correo: '',
  telefono: '',
  motivo: 'Consulta',
  mensaje: '',
});
const enviado = ref(false);

function enviarContacto() {
  // Aquí iría la lógica real de envío
  enviado.value = true;
  setTimeout(() => {
    enviado.value = false;
    form.value = { nombre: '', correo: '', telefono: '', motivo: 'Consulta', mensaje: '' };
  }, 2500);
}
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1">
      <div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
        <h2 class="text-2xl font-bold mb-6 text-center">Contáctanos</h2>
        <p class="mb-6 text-center text-gray-600">¿Tienes dudas sobre nuestros servicios, citas o tratamientos? ¡Escríbenos y te responderemos pronto!</p>
        <form @submit.prevent="enviarContacto" class="flex flex-col gap-4">
          <input v-model="form.nombre" type="text" placeholder="Nombre" class="border rounded px-3 py-2" required />
          <input v-model="form.correo" type="email" placeholder="Correo electrónico" class="border rounded px-3 py-2" required />
          <input v-model="form.telefono" type="tel" placeholder="Teléfono" class="border rounded px-3 py-2" />
          <select v-model="form.motivo" class="border rounded px-3 py-2" required>
            <option value="Consulta">Consulta</option>
            <option value="Queja">Queja</option>
            <option value="Sugerencia">Sugerencia</option>
            <option value="Otro">Otro</option>
          </select>
          <textarea v-model="form.mensaje" placeholder="Escribe tu mensaje..." class="border rounded px-3 py-2 min-h-[90px]" required></textarea>
          <button type="submit" class="bg-yellow-600 hover:opacity-90 text-white font-medium font-roboto py-2 px-6 rounded-lg mt-2 transition">Enviar</button>
        </form>
        <div v-if="enviado" class="mt-4 text-green-600 text-center font-semibold">¡Mensaje enviado! Nos pondremos en contacto pronto.</div>
      </div>
    </main>
    <Footer />
  </div>
</template> 