<script setup>
import { ref } from 'vue';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const citas = ref([
  { id: 1, fecha: '2024-06-25', hora: '10:00', servicio: 'Corte clásico' },
  { id: 2, fecha: '2024-06-28', hora: '15:30', servicio: 'Afeitado y facial' },
  { id: 3, fecha: '2024-07-01', hora: '09:00', servicio: 'Corte moderno' },
]);
</script>
<template>
  <div id="app-container" class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 pb-12">
      <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow">
        <h2 class="text-2xl font-bold mb-6 text-center">Mis citas</h2>
        <ul v-if="citas.length > 0" class="space-y-4">
          <li v-for="cita in citas" :key="cita.id" class="border rounded-lg p-4 flex flex-col gap-1">
            <span class="font-semibold">Servicio: <span class="font-normal">{{ cita.servicio }}</span></span>
            <span>Fecha: <span class="font-normal">{{ cita.fecha }}</span></span>
            <span>Hora: <span class="font-normal">{{ cita.hora }}</span></span>
          </li>
        </ul>
        <div v-else class="text-center text-gray-500">No tienes citas programadas.</div>
      </div>
    </main>
    <Footer />
  </div>
</template> 