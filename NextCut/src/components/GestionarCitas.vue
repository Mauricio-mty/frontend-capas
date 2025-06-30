<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import HeaderTabla from "@/components/HeaderTabla.vue";
import Modal from "@/components/Modal.vue";
import { ref, computed, h, onMounted } from "vue";
import Tabla from "@/components/Tabla.vue";
import { appointmentsService } from '@/services/gestionarCitas/appointments.services.js';

const citas = ref([]);
const loadingCitas = ref(false);

onMounted(async () => {
  loadingCitas.value = true;
  try {
    citas.value = await appointmentsService.getAllAppointments();
  } catch (error) {
    alert(error.message || 'Error al cargar citas');
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

const newCita = ref({ servicio: '', cliente: '', empleado: '', hora_inicio: '', hora_final: '', estado: 'Activo', date: '' });
const editedCita = ref(null);
const citaToDeleteId = ref(null);

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
  { text: 'Servicio', class: 'w-[20%] text-left' },
  { text: 'Cliente', class: 'w-[20%] text-center' },
  { text: 'Empleado', class: 'w-[20%] text-center' },
  { text: 'Hora Inicio', class: 'w-[15%] text-center' },
  { text: 'Hora Final', class: 'w-[15%] text-center' },
  { text: 'Estado', class: 'w-[10%] text-center' },
  { text: '', class: 'w-[15%] text-center actions-column' },
];

const handleAddCita = () => {
  newCita.value = { servicio: '', cliente: '', empleado: '', hora_inicio: '', hora_final: '', estado: 'Activo', date: today.value.toISOString().split('T')[0] };
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
    newCita.value = { servicio: '', cliente: '', empleado: '', hora_inicio: '', hora_final: '', estado: 'Activo', date: '' };
  } else if (activeModal.value === 'edit') {
    editedCita.value = null;
  } else if (activeModal.value === 'delete') {
    citaToDeleteId.value = null;
  }
  activeModal.value = null;
};

const submitNewCita = () => {
  if (!newCita.value.servicio || !newCita.value.cliente || !newCita.value.empleado || !newCita.value.hora_inicio || !newCita.value.hora_final || !newCita.value.estado || !newCita.value.date) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  if (newCita.value.hora_final <= newCita.value.hora_inicio) {
    alert('La hora final debe ser mayor que la hora de inicio.');
    return;
  }
  const newId = citas.value.length > 0 ? Math.max(...citas.value.map(c => c.id)) + 1 : 1;
  citas.value.push({ ...newCita.value, id: newId });
  closeModal();
};

const submitEditedCita = () => {
  if (!editedCita.value.servicio || !editedCita.value.cliente || !editedCita.value.empleado || !editedCita.value.hora_inicio || !editedCita.value.hora_final || !editedCita.value.estado || !editedCita.value.date) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  const index = citas.value.findIndex(c => c.id === editedCita.value.id);
  if (index !== -1) {
    citas.value[index] = { ...editedCita.value };
  }
  closeModal();
};

const confirmDeleteCita = () => {
  if (citaToDeleteId.value !== null) {
    citas.value = citas.value.filter(c => c.id !== citaToDeleteId.value);
  }
  closeModal();
};

const renderCitaCeldas = (item, header) => {
  if (header.text === 'Servicio') {
    return h('span', item.servicio);
  } else if (header.text === 'Cliente') {
    return h('span', item.cliente);
  } else if (header.text === 'Empleado') {
    return h('span', item.empleado);
  } else if (header.text === 'Hora Inicio') {
    return h('span', item.hora_inicio);
  } else if (header.text === 'Hora Final') {
    return h('span', item.hora_final);
  } else if (header.text === 'Estado') {
    return h('span', item.estado);
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
                <div class="mb-6" v-for="field in ['servicio', 'cliente', 'empleado', 'hora_inicio', 'hora_final', 'estado']" :key="field">
                  <div class="relative">
                    <input
                        :id="'new-' + field"
                        v-model="newCita[field]"
                        :type="field === 'hora_inicio' || field === 'hora_final' ? 'time' : 'text'"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" "
                    />
                    <label
                        :for="'new-' + field"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      {{ field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ') }}
                    </label>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <input
                        id="new-date"
                        v-model="newCita.date"
                        type="date"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" "
                    />
                    <label
                        for="new-date"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Fecha
                    </label>
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
            <div class="mb-6" v-for="field in ['servicio', 'cliente', 'empleado', 'hora_inicio', 'hora_final', 'estado']" :key="field">
              <div class="relative">
                <input
                    :id="'edit-' + field"
                    v-model="editedCita[field]"
                    :type="field === 'hora_inicio' || field === 'hora_final' ? 'time' : 'text'"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" "
                />
                <label
                    :for="'edit-' + field"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  {{ field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ') }}
                </label>
              </div>
            </div>
            <div class="mb-6">
              <div class="relative">
                <input
                    id="edit-date"
                    v-model="editedCita.date"
                    type="date"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" "
                />
                <label
                    for="edit-date"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Fecha
                </label>
              </div>
            </div>
            <div class="flex justify-end pt-4 gap-2">
              <button type="button" @click="closeModal" class="btn-secondary"> Cancelar
              </button>
              <button type="submit" class="btn-primary">
                Guardar Cambios
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