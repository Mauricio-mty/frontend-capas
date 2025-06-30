<script setup>
import { ref, computed, onMounted } from 'vue';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { appointmentsService } from '@/services/gestionarCitas/appointments.services.js';
import { getAllEmployees } from '@/services/gestionarEmpleados/index.js';

const today = ref(new Date());

const citas = ref([]);
const barberos = ref([]);
const asignandoBarberoId = ref(null);
const barberoSeleccionado = ref('');

onMounted(async () => {
  try {
    const todasLasCitas = await appointmentsService.getAllAppointments();
    citas.value = todasLasCitas.filter(cita => !cita.barberId || cita.barberId === '' || cita.barberId === null);
    // Obtener barberos
    const empleados = await getAllEmployees();
    barberos.value = empleados.filter(e => e.role === 'BARBER');
  } catch (error) {
    citas.value = [];
    barberos.value = [];
  }
});

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

const asignarBarbero = async (citaId) => {
  if (!barberoSeleccionado.value) {
    alert('Seleccione un barbero');
    return;
  }
  try {
    await appointmentsService.assignBarberToAppointment(citaId, barberoSeleccionado.value);
    // Refrescar citas tras asignar
    const todasLasCitas = await appointmentsService.getAllAppointments();
    citas.value = todasLasCitas.filter(cita => !cita.barberId || cita.barberId === '' || cita.barberId === null);
    asignandoBarberoId.value = null;
    barberoSeleccionado.value = '';
  } catch (error) {
    alert(error.message || 'Error al asignar barbero');
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

        <div v-if="citas.length > 0">
          <div v-for="cita in citas" :key="cita.id"
               class="border border-[#DDDDDD] shadow-xs rounded-md p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div class="flex flex-col items-start w-full sm:w-[70%] mb-4 sm:mb-0">
              <div class="flex items-center text-gray-600 text-sm font-semibold mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>{{ cita.start }}</span>
                <span class="ml-4 text-gray-500">{{ cita.date }}</span>
              </div>
              <div class="text-gray-800 text-lg font-medium text-left">{{ cita.service }} - {{ cita.client }}</div>
            </div>

            <div class="flex flex-col items-end w-full sm:w-[30%]">
              <div class="flex flex-row items-center space-x-2 mb-2">
                <span :class="['w-3 h-3 rounded-full', getStatusColor(cita.status)]"></span>
                <span class="text-gray-700">{{ cita.status }}</span>
              </div>
              <div v-if="asignandoBarberoId !== cita.id">
                <button class="btn-primary mb-2" @click="() => { asignandoBarberoId = cita.id; barberoSeleccionado = '' }">
                  Asignar barbero
                </button>
              </div>
              <div v-else class="flex flex-col gap-2 w-full">
                <select v-model="barberoSeleccionado" class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2">
                  <option value="" disabled>Seleccione un barbero</option>
                  <option v-for="barbero in barberos" :key="barbero.id" :value="barbero.id">
                    {{ barbero.name }} {{ barbero.lastName }}
                  </option>
                </select>
                <button class="btn-primary mt-2" @click="() => asignarBarbero(cita.id)">
                  Confirmar asignación
                </button>
                <button class="btn-secondary mt-1" @click="() => { asignandoBarberoId = null; barberoSeleccionado = '' }">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 text-lg py-10">
          No hay citas pendientes de asignar barbero.
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
</style>
