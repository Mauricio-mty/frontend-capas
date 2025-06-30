<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import HeaderTabla from "@/components/HeaderTabla.vue";
import Modal from "@/components/Modal.vue";
import { ref, computed, h, onMounted } from "vue";
import Tabla from "@/components/Tabla.vue";
import { appointmentsService } from '@/services/gestionarCitas/appointments.services.js';
import { getAllEmployees } from '@/services/gestionarEmpleados/index.js';
import { branchesService } from '@/services/gestionarSucursales/branches.services.js';
import { servicesService } from '@/services/gestionarServicios/services.services.js';
import { getAllClients } from '@/services/gestionarClientes/client.services.js';

const citas = ref([]);
const loadingCitas = ref(false);
const barberos = ref([]);
const sucursales = ref([]);
const servicios = ref([]);
const clientes = ref([]);

onMounted(async () => {
  loadingCitas.value = true;
  try {
    // Obtener token
    const token = localStorage.getItem('token');
    // Obtener citas con token en headers
    const response = await appointmentsService.getAllAppointments(token);
    citas.value = response;
    // Obtener barberos
    const empleados = await getAllEmployees();
    barberos.value = empleados.filter(e => e.role === 'BARBER');
    // Obtener sucursales
    sucursales.value = await branchesService.getAllBranches();
    // Obtener servicios
    if (typeof servicesService !== 'undefined' && servicesService.getAllServices) {
      servicios.value = await servicesService.getAllServices();
    }
    // Obtener clientes
    if (typeof getAllClients !== 'undefined') {
      clientes.value = await getAllClients();
    }
  } catch (error) {
    alert(error.message || 'Error al cargar citas');
    barberos.value = [];
    sucursales.value = [];
    servicios.value = [];
    clientes.value = [];
  } finally {
    loadingCitas.value = false;
  }
});

const today = ref(new Date());
const searchQuery = ref('');
const activeModal = ref(null);

const showAddModalComputed = computed({
  get: () => activeModal.value === 'add',
  set: (newValue) => {
    if (!newValue) {
      closeModal();
    }
  }
});

const newCita = ref({ date: '', start: '', finish: '', service: '', client: '', branch: '' });
const editedCita = ref(null);
const citaToDeleteId = ref(null);

const statusOptions = ["LATE", "FINISHED", "ATTENDING", "ONGOING", "UPCOMING", "DIDNT_SHOW_UP"];

const prevDay = () => {
  today.value = new Date(today.value.getTime() - 24 * 60 * 60 * 1000);
};

const nextDay = () => {
  today.value = new Date(today.value.getTime() + 24 * 60 * 60 * 1000);
};
const formattedDate = computed(() => {
  const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
  return today.value.toLocaleDateString('es-ES', options);
});

const filteredCitas = computed(() => {
  const selectedDate = today.value.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
  const query = searchQuery.value.toLowerCase();

  return citas.value.filter(cita => {
    const matchesDate = cita.date === selectedDate;
    const matchesSearch = !query ||
        cita.servicio.toLowerCase().includes(query) ||
        cita.cliente.toLowerCase().includes(query) ||
        cita.empleado.toLowerCase().includes(query) ||
        cita.hora_inicio.toLowerCase().includes(query) ||
        cita.hora_final.toLowerCase().includes(query) ||
        cita.estado.toLowerCase().includes(query);

    return matchesDate && matchesSearch;
  });
});

const HeaderTablaCitas = [
  { text: 'Fecha', class: 'w-[12%] text-left' },
  { text: 'Hora Inicio', class: 'w-[10%] text-center' },
  { text: 'Hora Fin', class: 'w-[10%] text-center' },
  { text: 'Servicio', class: 'w-[15%] text-center' },
  { text: 'Cliente', class: 'w-[15%] text-center' },
  { text: 'Sucursal', class: 'w-[15%] text-center' },
  { text: 'Barbero', class: 'w-[13%] text-center' },
  { text: 'Estado', class: 'w-[10%] text-center' },
  { text: '', class: 'w-[10%] text-center actions-column' },
];

const handleAddCita = () => {
  newCita.value = { date: '', start: '', finish: '', service: '', client: '', branch: '' };
  activeModal.value = 'add';
};

const handleEditCita = (citaToEdit) => {
  editedCita.value = { ...citaToEdit };
  activeModal.value = 'edit';
};

const handleDeleteCita = (idToDelete) => {
  citaToDeleteId.value = idToDelete;
  activeModal.value = 'delete';
};

const closeModal = () => {
  if (activeModal.value === 'add') {
    newCita.value = { date: '', start: '', finish: '', service: '', client: '', branch: '' };
  } else if (activeModal.value === 'edit') {
    editedCita.value = null;
  } else if (activeModal.value === 'delete') {
    citaToDeleteId.value = null;
  }
  activeModal.value = null;
};

const submitNewCita = async () => {
  if (!newCita.value.date || !newCita.value.start || !newCita.value.finish || !newCita.value.service || !newCita.value.client || !newCita.value.branch) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  if (newCita.value.finish <= newCita.value.start) {
    alert('La hora de fin debe ser mayor que la de inicio.');
    return;
  }
  const citaPayload = {
    date: newCita.value.date,
    start: newCita.value.start,
    finish: newCita.value.finish,
    service: newCita.value.service,
    client: newCita.value.client,
    branch: newCita.value.branch
  };
  try {
    await appointmentsService.createAppointment(citaPayload);
    citas.value = await appointmentsService.getAllAppointments();
    closeModal();
  } catch (error) {
    alert(error.message || 'Error al crear cita');
  }
};

const submitEditedCita = async () => {
  if (!editedCita.value.id || !editedCita.value.status) {
    alert('Por favor, seleccione un estado.');
    return;
  }
  try {
    await appointmentsService.updateAppointmentStatus(editedCita.value.id, editedCita.value.status);
    citas.value = await appointmentsService.getAllAppointments();
    closeModal();
  } catch (error) {
    alert(error.message || 'Error al actualizar el estado de la cita');
  }
};

const confirmDeleteCita = () => {
  if (citaToDeleteId.value !== null) {
    citas.value = citas.value.filter(c => c.id !== citaToDeleteId.value);
  }
  closeModal();
};

const renderCitaCeldas = (item, header) => {
  if (header.text === 'Fecha') {
    return h('span', item.date);
  } else if (header.text === 'Hora Inicio') {
    return h('span', item.start);
  } else if (header.text === 'Hora Fin') {
    return h('span', item.finish);
  } else if (header.text === 'Servicio') {
    return h('span', item.service);
  } else if (header.text === 'Cliente') {
    return h('span', item.client);
  } else if (header.text === 'Sucursal') {
    return h('span', item.branch);
  } else if (header.text === 'Barbero') {
    return h('span', item.barber);
  } else if (header.text === 'Estado') {
    return h('span', item.status);
  } else if (header.class.includes('actions-column')) {
    return h('div', { class: 'flex items-center justify-end gap-4' }, [
      h('button', {
        class: 'hover:opacity-75',
        onClick: () => handleEditCita(item)
      }, [
        h('svg', {
          width: '16', height: '16', viewBox: '0 0 18 18', fill: 'currentColor', xmlns: 'http://www.w3.org/2000/svg'
        }, [
          h('path', {
            d: 'M0 14.2501V18.0001H3.75L14.81 6.94006L11.06 3.19006L0 14.2501ZM17.71 4.04006C18.1 3.65006 18.1 3.02006 17.71 2.63006L15.37 0.290059C14.98 -0.0999414 14.35 -0.0999414 13.96 0.290059L12.13 2.12006L15.88 5.87006L17.71 4.04006Z',
            fill: 'inherit'
          })
        ])
      ]),
      h('button', {
        class: 'hover:opacity-75',
        onClick: () => handleDeleteCita(item.id)
      }, [
        h('svg', {
          width: '12', height: '16', viewBox: '0 0 14 18', fill: 'currentColor', xmlns: 'http://www.w3.org/2000/svg'
        }, [
          h('path', {
            d: 'M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z',
            fill: 'inherit'
          })
        ])
      ])
    ]);
  }
  return h('span', '');
};
</script>

<template>
  <div id="app-container">
    <Navbar />
    <main class="flex-1 pb-12">
      <section class=" max-w-7xl mx-auto mt-6">
        <div class="flex items-center justify-center m-4">
          <h1 class="text-3xl font-bold text-nav-bg font-maven">Citas</h1>
        </div>
        <div class="flex items-center justify-center mb-10 space-x-6 text-lg font-semibold">
          <button @click="prevDay" aria-label="Día anterior" class="text-2xl font-bold">&lt;</button>
          <span>{{ formattedDate }}</span>
          <button @click="nextDay" aria-label="Día siguiente" class="text-2xl font-bold">&gt;</button>
        </div>

        <HeaderTabla
            search-placeholder="Buscar cita"
            v-model="searchQuery"
            v-model:showAddModal="showAddModalComputed"
            add-modal-title="Agregar Nueva Cita"
            @add="handleAddCita"
        >
          <template #add-modal="{ show, title, closeModal: closeModal }">
            <Modal :show="activeModal === 'add'" :title="title" @close="closeModal">
              <form @submit.prevent="submitNewCita">
                <div class="mb-6">
                  <div class="relative">
                    <select v-model="newCita.branch" required class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2">
                      <option value="" disabled>Seleccione una sucursal</option>
                      <option v-for="sucursal in sucursales" :key="sucursal.id" :value="sucursal.id">
                        {{ sucursal.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <select v-model="newCita.service" required class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2">
                      <option value="" disabled>Seleccione un servicio</option>
                      <option v-for="servicio in servicios" :key="servicio.id" :value="servicio.id">
                        {{ servicio.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <select v-model="newCita.client" required class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2">
                      <option value="" disabled>Seleccione un cliente</option>
                      <option v-for="cliente in clientes" :key="cliente.Id || cliente.id" :value="cliente.Id || cliente.id">
                        {{ cliente.name }} {{ cliente.lastName }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative flex gap-2">
                    <div class="flex-1">
                      <label for="hora-inicio" class="block text-sm font-medium text-gray-700 mb-1">Hora de inicio</label>
                      <input id="hora-inicio" type="time" v-model="newCita.start" required class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2" />
                    </div>
                    <div class="flex-1">
                      <label for="hora-fin" class="block text-sm font-medium text-gray-700 mb-1">Hora de fin</label>
                      <input id="hora-fin" type="time" v-model="newCita.finish" required class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2" />
                    </div>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <input type="date" v-model="newCita.date" required class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2" />
                  </div>
                </div>
                <div class="flex justify-end pt-4 gap-2">
                  <button type="button" @click="closeModal" class="btn-secondary">
                    Cancelar
                  </button>
                  <button type="submit" class="btn-primary">
                    Guardar
                  </button>
                </div>
              </form>
            </Modal>
          </template>
        </HeaderTabla>

        <Tabla
            :headers="HeaderTablaCitas"
            :items="filteredCitas"
            :render-cell="renderCitaCeldas"
        />

        <Modal :show="activeModal === 'edit'" title="Editar Cita" @close="closeModal">
          <form v-if="editedCita" @submit.prevent="submitEditedCita">
            <div class="mb-6">
              <div class="relative">
                <label for="edit-status" class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select id="edit-status" v-model="editedCita.status" required class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2">
                  <option value="" disabled>Seleccione un estado</option>
                  <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
                </select>
              </div>
            </div>
            <div class="flex justify-end pt-4 gap-2">
              <button type="button" @click="closeModal" class="btn-secondary"> Cancelar
              </button>
              <button type="submit" class="btn-primary"> Guardar Cambios
              </button>
            </div>
          </form>
        </Modal>

        <Modal :show="activeModal === 'delete'" title="Confirmar Eliminación" @close="closeModal">
          <p class="text-center font-medium font-roboto mb-6">¿Estás seguro de que quieres eliminar esta cita?</p>
          <div class="flex justify-center pt-4 gap-2">
            <button type="button" @click="closeModal" class="btn-secondary">
              Cancelar
            </button>
            <button type="button" @click="confirmDeleteCita" class="btn-primary"> Eliminar
            </button>
          </div>
        </Modal>

      </section>
    </main>
    <Footer />
  </div>
</template>

<style>
</style>