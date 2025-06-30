<script setup>
import { ref, computed, onMounted, watch, defineProps } from 'vue';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const props = defineProps({
  bookedAppointmentsJson: {
    type: String,
    default: '[]'
  }
});

const today = ref(new Date());
const citas = ref([]);

const loadAppointments = () => {
  try {
    const parsedAppointments = JSON.parse(props.bookedAppointmentsJson);

    citas.value = parsedAppointments.map(app => ({
      id: app.id || Math.random().toString(36).substring(2, 11),
      hora: app.hora || 'N/A',
      servicio: app.servicio || 'Servicio Desconocido',
      cliente: app.cliente || 'Cliente',
      estado: app.estado || 'En sala',
      date: app.date || new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' }),
      barber: app.barber || 'Barbero por asignar'
    }));
  } catch (e) {
    citas.value = []; // Vuelve a un array vacío en caso de error
  }
}


onMounted(() => {
  loadAppointments();
});

// Observar cambios en la prop 'bookedAppointmentsJson' y recargar las citas
watch(() => props.bookedAppointmentsJson, () => {
  loadAppointments();
}, { immediate: true }); // 'immediate: true' asegura que se ejecute también en la carga inicial

const formattedDate = computed(() => {
  const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
  return today.value.toLocaleDateString('es-ES', options);
});

// Propiedad computada para filtrar citas por la fecha actual
const filteredCitas = computed(() => {
  return citas.value.filter(cita => cita.date === formattedDate.value);
});

</script>

<template>
  <div id="app-container" class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 pb-12 max-w-4xl mx-auto mt-6 px-4 w-full">
      <section>
        <div class="flex items-center justify-center mb-4">
          <h1 class="text-3xl font-bold text-nav-bg font-maven">Mis citas</h1>
        </div>

        <div v-if="filteredCitas.length > 0">
          <div v-for="cita in filteredCitas" :key="cita.id"
               class="border border-[#DDDDDD] shadow-xs rounded-md p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div class="flex flex-col items-start w-full">
              <div class="flex items-center text-gray-600 text-sm font-semibold mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>{{ cita.hora }}</span>
              </div>
              <div class="text-gray-800 text-lg font-medium text-left">{{ cita.servicio }} - {{ cita.cliente }}</div>
              <div class="text-gray-600 text-sm mt-1">Barbero: {{ cita.barber }}</div>
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
