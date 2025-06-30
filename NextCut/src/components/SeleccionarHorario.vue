<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { ref, onMounted, defineProps, watch } from "vue";
import { useRouter } from 'vue-router';
import { getAllEmployees } from '@/services/gestionarEmpleados/index.js';

const router = useRouter();

const props = defineProps({
  selectedServices: {
    type: String,
    default: '[]'
  }
});

const services = ref([]);
const showModal = ref(false);
const selectedAppointment = ref({
  service: null,
  barber: '',
  date: '',
  time: '',
  horaInicio: '',
  horaFin: ''
});

// Array para almacenar las citas agendadas
const agendadasCitas = ref([]);
const barberos = ref([]);

onMounted(async () => {
  if (props.selectedServices && props.selectedServices !== '[]') {
    try {
      const parsedServices = JSON.parse(props.selectedServices);
      services.value = parsedServices.map(s => ({
        nombre: s.nombre || s.name || 'Servicio',
        duracion: s.duracion || s.duration || 30,
        costo: s.costo || s.price || 100,
        horaInicio: s.horaInicio || '09:00',
        horaFin: s.horaFin || '09:30',
        id: s.id || undefined
      }));
    } catch (e) {
      console.error("Error al parsear selectedServices prop:", e);
      services.value = [];
    }
  } else {
    services.value = [];
  }
  // Obtener barberos
  try {
    const empleados = await getAllEmployees();
    barberos.value = empleados.filter(e => e.role === 'BARBER');
  } catch (e) {
    barberos.value = [];
  }
});

const openModal = (serviceItem) => {
  selectedAppointment.value = {
    service: serviceItem,
    barber: '',
    date: new Date().toISOString().split('T')[0],
    horaInicio: '',
    horaFin: '',
    time: ''
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedAppointment.value = { service: null, barber: '', date: '', time: '', horaInicio: '', horaFin: '' };
};

//Confirma la cita y la añade a la lista de citas agendadas
const confirmarCita = () => {
  if (!selectedAppointment.value.barber) {
    alert("Por favor, seleccione un barbero.");
    return;
  }

  // Construye el objeto de la cita completa con toda la información necesaria
  const nuevaCita = {
    id: agendadasCitas.value.length + 1,
    hora: selectedAppointment.value.service.horaInicio,
    servicio: selectedAppointment.value.service.nombre,
    date: selectedAppointment.value.date,
    barber: selectedAppointment.value.barber,
    duracion: selectedAppointment.value.service.duracion,
    costo: selectedAppointment.value.service.costo
  };

  agendadasCitas.value.push(nuevaCita);
  closeModal();
};

const onSiguiente = () => {
  router.push({
    name: 'MisCitasCliente',
    query: { bookedAppointmentsJson: JSON.stringify(agendadasCitas.value) }
  });
};

function calcularHoraFin(horaInicio, duracionMinutos) {
  if (!horaInicio) return '';
  const [h, m] = horaInicio.split(':').map(Number);
  const start = new Date(0, 0, 0, h, m);
  const end = new Date(start.getTime() + duracionMinutos * 60000);
  const hh = String(end.getHours()).padStart(2, '0');
  const mm = String(end.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

watch(() => selectedAppointment.value.horaInicio, (newVal) => {
  if (selectedAppointment.value.service && newVal) {
    selectedAppointment.value.horaFin = calcularHoraFin(newVal, selectedAppointment.value.service.duracion);
    selectedAppointment.value.time = `${newVal} - ${selectedAppointment.value.horaFin}`;
  } else {
    selectedAppointment.value.horaFin = '';
    selectedAppointment.value.time = '';
  }
});
</script>

<template>
  <div id="app-container" class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 pb-12">
      <section class="max-w-7xl mx-auto mt-6 mb-8 px-4">
        <div class="flex items-center justify-center mb-6">
          <h1 class="text-3xl font-bold text-nav-bg font-maven">Agenda tu cita</h1>
        </div>

        <div class="border border-[#CCCCCC] rounded-md divide-y divide-[#CCCCCC]">
          <div class="flex bg-gray-50 px-4 py-3 font-bold text-nav-bg text-sm font-roboto">
            <div class="w-[49%] text-left">Servicio</div>
            <div class="w-[10%] text-center">Duración</div>
            <div class="w-[10%] text-center">Hora Inicio</div>
            <div class="w-[10%] text-center">Hora Fin</div>
            <div class="w-[10%] text-center">Costo</div>
            <div class="w-[13%] text-center"></div>
          </div>

          <div
              v-for="(service, index) in services"
              :key="index"
              class="flex items-center px-4 py-3 text-sm text-black font-roboto"
          >
            <div class="w-[49%] text-left">{{ service.nombre }}</div>
            <div class="w-[10%] text-center">{{ service.duracion }}</div>
            <div class="w-[10%] text-center">{{ service.horaInicio || 'N/A' }}</div>
            <div class="w-[10%] text-center">{{ service.horaFin || 'N/A' }}</div>
            <div class="w-[10%] text-center">{{ service.costo }}</div>
            <div class="w-[13%] text-center flex justify-end items-center">
              <button @click="openModal(service)"
                      class="btn-primary">
                Seleccionar <br> horario
              </button>
            </div>
          </div>
          <div v-if="services.length === 0" class="px-4 py-3 text-sm text-gray-500 text-center">
            No hay servicios seleccionados para agendar.
          </div>
        </div>
        <div class="flex justify-end mt-8 mb-4 pr-4">
          <button class="btn-primary" @click="onSiguiente">
            Siguiente
          </button>
        </div>
      </section>
    </main>
    <Footer />

    <div v-if="showModal" class="fixed inset-0 bg-[rgba(0,0,0,.6)] flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-nav-bg font-maven mb-6 text-center">Detalles de la cita</h2>
        <h3 class="text-lg font-semibold text-gray-800 mb-4 text-center">{{ selectedAppointment.service?.nombre }}</h3>

        <div class="mb-4">
          <div class="relative">
            <label for="barber"
                   class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1">Barbero</label>
            <select id="barber" v-model="selectedAppointment.barber"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2 mb-9 focus:ring-blue-500 focus:border-blue-500">
              <option value="" disabled class="text-gray-500">Seleccione un barbero</option>
              <option v-for="barbero in barberos" :key="barbero.id" :value="barbero.id">
                {{ barbero.name }} {{ barbero.lastName }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <div class="relative">
            <input type="date" id="date" v-model="selectedAppointment.date"
                   class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm mb-9">
            <label for="date"
                   class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1">Fecha</label>
          </div>
        </div>

        <div class="mb-4">
          <div class="relative">
            <input type="time" id="horaInicio" v-model="selectedAppointment.horaInicio"
                   class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm mb-4">
            <label for="horaInicio"
                   class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1">Hora de inicio</label>
            <input type="text" id="horaFin" v-model="selectedAppointment.horaFin" readonly
                   class="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed sm:text-sm mb-9 mt-2">
            <label for="horaFin"
                   class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1">Hora de fin</label>
          </div>
        </div>

        <div class="flex justify-end pt-4 space-x-3">
          <button @click="closeModal"
                  class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition duration-150 ease-in-out">
            Cancelar
          </button>
          <button @click="confirmarCita"
                  class="btn-primary">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
