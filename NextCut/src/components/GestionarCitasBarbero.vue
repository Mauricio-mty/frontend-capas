<script setup>
import { ref, computed } from 'vue';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const today = ref(new Date());

const citas = ref([
  { id: 1, hora: '10:50', servicio: 'Corte Clásico', cliente: 'Ester', estado: 'En sala', date: '26/06/25' }, // Using 'DD/MM/YY' for consistency
  { id: 2, hora: '9:50', servicio: 'Corte Clásico', cliente: 'Esteban', estado: 'Atendiendo', date: '26/06/25' },
  { id: 3, hora: '8:50', servicio: 'Corte Clásico', cliente: 'Esmeralda', estado: 'Terminado', date: '27/06/25' },
  { id: 4, hora: '11:00', servicio: 'Corte Caballero', cliente: 'Juan', estado: 'En sala', date: '25/06/25' },
  { id: 5, hora: '12:00', servicio: 'Afeitado', cliente: 'Pedro', estado: 'En sala', date: '26/06/25' },
]);

const formattedDate = computed(() => {
  const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
  return today.value.toLocaleDateString('es-ES', options);
});

const filteredCitas = computed(() => {
  return citas.value.filter(cita => cita.date === formattedDate.value);
});

const prevDay = () => {
  today.value = new Date(today.value.getTime() - 24 * 60 * 60 * 1000);
};

const nextDay = () => {
  today.value = new Date(today.value.getTime() + 24 * 60 * 60 * 1000);
};

const startCita = (id) => {
  const cita = citas.value.find(c => c.id === id);
  if (cita) {
    cita.estado = 'Atendiendo';
  }
};

const endCita = (id) => {
  const cita = citas.value.find(c => c.id === id);
  if (cita) {
    cita.estado = 'Terminado';
  }
};

const getStatusColor = (estado) => {
  switch (estado) {
    case 'En sala':
      return 'bg-blue-500';
    case 'Atendiendo':
      return 'bg-green-700';
    case 'Terminado':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
};
</script>

<template>
  <div id="app-container" class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 pb-12 max-w-4xl mx-auto mt-6 px-4 w-full">
      <section>
        <div class="flex items-center justify-center m-4">
          <h1 class="text-3xl font-bold text-nav-bg font-maven">Mis citas</h1>
        </div>
        <div class="flex items-center justify-center mb-10 space-x-6 text-lg font-semibold">
          <button @click="prevDay" aria-label="Día anterior" class="text-2xl font-bold">&lt;</button>
          <span>{{ formattedDate }}</span>
          <button @click="nextDay" aria-label="Día siguiente" class="text-2xl font-bold">&gt;</button>
        </div>

        <div v-if="filteredCitas.length > 0">
          <div v-for="cita in filteredCitas" :key="cita.id"
               class="border border-[#DDDDDD] shadow-xs rounded-md p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div class="flex flex-col items-start w-full sm:w-[70%] mb-4 sm:mb-0">
              <div class="flex items-center text-gray-600 text-sm font-semibold mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>{{ cita.hora }}</span>
              </div>
              <div class="text-gray-800 text-lg font-medium text-left">{{ cita.servicio }} - {{ cita.cliente }}</div>
            </div>

            <div class="flex flex-col items-end w-full sm:w-[30%]">
              <div class="flex flex-row items-center space-x-2 mb-2">
                <span :class="['w-3 h-3 rounded-full', getStatusColor(cita.estado)]"></span>
                <span class="text-gray-700">{{ cita.estado }}</span>
              </div>
              <button
                  v-if="cita.estado === 'En sala'"
                  @click="startCita(cita.id)"
              class="btn-secondary mb-2">
                Empezar
              </button>
              <button
                  v-else-if="cita.estado === 'Atendiendo'"
                  @click="endCita(cita.id)"
                  class="btn-primary"
              >
                Terminar
              </button>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 text-lg py-10">
          No hay citas programadas para esta fecha.
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
</style>
