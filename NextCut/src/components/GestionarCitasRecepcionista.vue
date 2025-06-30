<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import HeaderTabla from "@/components/HeaderTabla.vue";
import Modal from "@/components/Modal.vue";
import { ref, computed, h } from "vue";
import Tabla from "@/components/Tabla.vue";

const allCitasRep = ref([
  { id: 1, servicio: 'Corte pelo', cliente: 'Martin' , asignado:'Juan', HoraInicio: '9:00', HoraFin: '11:00', estado:'Activo', fecha: '2025-06-26' },
  { id: 2, servicio: 'Corte pelo', cliente: 'Esteban' , asignado:'Pedro', HoraInicio: '10:00', HoraFin: '12:00', estado:'Activo', fecha: '2025-06-26' },
  { id: 3, servicio: 'Corte pelo', cliente: 'Ester' , asignado:'Juan', HoraInicio: '11:00', HoraFin: '13:00', estado:'Activo', fecha: '2025-06-27' },
  { id: 4, servicio: 'Corte pelo', cliente: 'Esmeralda' , asignado:'Pedro', HoraInicio: '12:00', HoraFin: '14:00', estado:'Activo', fecha: '2025-06-27' },
  { id: 5, servicio: 'Corte pelo', cliente: 'Juan' , asignado:'Juan', HoraInicio: '13:00', HoraFin: '15:00', estado:'Activo', fecha: '2025-06-28' },
]);

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

const newCitaRep = ref({ servicio: '', cliente: '', asignado: '', HoraInicio: '', HoraFin: '', estado: '', fecha: '' });
const editedCitaRep = ref(null);


const filteredCitaRep = computed(() => {
  const selectedDate = today.value.toISOString().split('T')[0];
  const query = searchQuery.value.toLowerCase();

  return allCitasRep.value.filter(citaR => {
    const matchesDate = citaR.fecha === selectedDate;
    const matchesSearch = !query ||
        citaR.servicio.toLowerCase().includes(query) ||
        citaR.cliente.toLowerCase().includes(query) ||
        citaR.asignado.toLowerCase().includes(query) ||
        citaR.HoraInicio.toLowerCase().includes(query) ||
        citaR.HoraFin.toLowerCase().includes(query) ||
        citaR.estado.toLowerCase().includes(query);

    return matchesDate && matchesSearch;
  });
});

const HeaderTablaEmpleados = [
  { text: 'Servicio', class: 'w-[30%] text-left' },
  { text: 'Cliente', class: 'w-[30%] text-center' },
  { text: 'Asignado a', class: 'w-[30%] text-center' },
  { text: 'HoraInicio', class: 'w-[30%] text-center' },
  { text: 'HoraFin', class: 'w-[30%] text-center' },
  { text: 'Estado', class: 'w-[30%] text-center' },
  { text: '', class: 'w-[15%] text-center actions-column' },
];

const handleAddCitaRep = () => {
  newCitaRep.value = {servicio: '', cliente: '', asignado: '', HoraInicio: '', HoraFin: '', estado: '', fecha: today.value.toISOString().split('T')[0]}; // Pre-fill date
  activeModal.value = 'add';
};

const handleEditCitaRep = (citaToEdit) => {
  editedCitaRep.value = { ...citaToEdit };
  activeModal.value = 'edit';
};

const handleFiltro = () => {
};

const closeModal = () => {
  if (activeModal.value === 'add') {
    newCitaRep.value = { servicio: '', cliente: '', asignado: '', HoraInicio: '', HoraFin: '', estado: '', fecha: '' };
  } else if (activeModal.value === 'edit') {
    editedCitaRep.value = null;
  }
  activeModal.value = null;
};

const submitNewCitaRep = () => {
  if (!newCitaRep.value.servicio|| !newCitaRep.value.cliente || !newCitaRep.value.asignado || !newCitaRep.value.HoraInicio || !newCitaRep.value.HoraFin || !newCitaRep.value.fecha) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  const newId = allCitasRep.value.length > 0 ? Math.max(...allCitasRep.value.map(b => b.id)) + 1 : 1;
  allCitasRep.value.push({ ...newCitaRep.value, id: newId });
  closeModal();
};

const submitEditedCitaRep = () => {
  if (!editedCitaRep.value.servicio || !editedCitaRep.value.cliente || !editedCitaRep.value.asignado || !editedCitaRep.value.HoraInicio || !editedCitaRep.value.HoraFin|| !editedCitaRep.value.estado || !editedCitaRep.value.fecha) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  const index = allCitasRep.value.findIndex(b => b.id === editedCitaRep.value.id);
  if (index !== -1) {
    allCitasRep.value[index] = { ...editedCitaRep.value };
  }
  closeModal();
};
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

const renderEmpleadoCeldas = (item, header) => {
  if (header.text === 'Sucursal') {
    return h('span', item.sucursal);
  }
  else if (header.text === 'Servicio') {
    return h('span', item.servicio);
  } else if (header.text === 'Cliente') {
    return h('span', item.cliente);
  } else if (header.text === 'Asignado a') {
    return h('span', item.asignado);
  } else if (header.text === 'HoraInicio') {
    return h('span', item.HoraInicio);
  } else if (header.text === 'HoraFin') {
    return h('span', item.HoraFin);
  } else if (header.text === 'Estado') {
    return h('span', item.estado);
  }
  else if (header.class.includes('actions-column')) {
    return h('div', { class: 'flex items-center justify-end gap-4' }, [
      // Editar y Borrar botones
      h('button', {
        class: 'hover:opacity-75',
        onClick: () => handleEditCitaRep(item)
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
    ]);
  }
  return h('span', '');
};
</script>

<template>
  <div id="app-container">
    <Navbar />
    <section class="flex-1">
      <main class="flex-1 pb-12 max-w-4xl mx-auto mt-6 px-4 w-full">
        <div class="flex items-center justify-center m-4">
          <h1 class="text-3xl font-bold text-nav-bg font-maven">Citas</h1>
        </div>
        <div class="flex items-center justify-center mb-10 space-x-6 text-lg font-semibold">
          <button @click="prevDay" aria-label="Día anterior" class="text-2xl font-bold">&lt;</button>
          <span>{{ formattedDate }}</span>
          <button @click="nextDay" aria-label="Día siguiente" class="text-2xl font-bold">&gt;</button>
        </div>

        <HeaderTabla
            search-placeholder="Buscar empleado"
            v-model="searchQuery"
            v-model:showAddModal="showAddModalComputed"
            add-modal-title="Agregar Nueva Cita"
            @add="handleAddCitaRep"
            @filter="handleFiltro"
        >
          <template #add-modal="{ show, title, closeModal: closeModal }">
            <Modal :show="activeModal === 'add'" :title="title" @close="closeModal">
              <form @submit.prevent="submitNewCitaRep">
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="text"
                        id="newCitaRep-servicio"
                        v-model="newCitaRep.servicio"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" " />
                    <label
                        for="newCitaRep-servicio"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Servicio
                    </label>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="text"
                        id="newCitaRep-cliente"
                        v-model="newCitaRep.cliente"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" " />
                    <label
                        for="newCitaRep-cliente"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Cliente
                    </label>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="text"
                        id="newCitaRep-asignado"
                        v-model="newCitaRep.asignado"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" " />
                    <label
                        for="newCitaRep-asignado"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Asignado a
                    </label>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="text"
                        id="newCitaRep-horainicio"
                        v-model="newCitaRep.HoraInicio"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" " />
                    <label
                        for="newCitaRep-horainicio"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Hora Inicio
                    </label>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="text"
                        id="newCitaRep-horafin"
                        v-model="newCitaRep.HoraFin"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" " />
                    <label
                        for="newCitaRep-horafin"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Hora Fin
                    </label>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="text"
                        id="newCitaRep-estado"
                        v-model="newCitaRep.estado"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" " />
                    <label
                        for="newCitaRep-estado"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Estado
                    </label>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="date"
                        id="newCitaRep-fecha"
                        v-model="newCitaRep.fecha"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" " />
                    <label
                        for="newCitaRep-fecha"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Fecha
                    </label>
                  </div>
                  <div class="flex justify-end pt-4 gap-2">
                    <button type="button" @click="closeModal" class="btn-secondary">
                      Cancelar
                    </button>
                    <button type="submit" class="btn-primary">
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </Modal>
          </template>
        </HeaderTabla>

        <Tabla
            :headers="HeaderTablaEmpleados"
            :items="filteredCitaRep"
            :render-cell="renderEmpleadoCeldas"
        />

        <Modal :show="activeModal === 'edit'" title="Editar Cita" @close="closeModal">
          <form v-if="editedCitaRep" @submit.prevent="submitEditedCitaRep">
            <div class="mb-6">
              <div class="relative">
                <input
                    type="text"
                    id="editCitaRep-servicio"
                    v-model="editedCitaRep.servicio"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editCitaRep-servicio"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Servicio
                </label>
              </div>
            </div>

            <div class="mb-6">
              <div class="relative">
                <input
                    type="text"
                    id="editCitaRep-cliente"
                    v-model="editedCitaRep.cliente"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editCitaRep-cliente"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Cliente
                </label>
              </div>
            </div>
            <div class="mb-6">
              <div class="relative">
                <input
                    type="text"
                    id="editCitaRep-asignado"
                    v-model="editedCitaRep.asignado"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editCitaRep-asignado"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Asignado a
                </label>
              </div>
            </div>
            <div class="mb-6">
              <div class="relative">
                <input
                    type="text"
                    id="editCitaRep-horainicio"
                    v-model="editedCitaRep.HoraInicio"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editCitaRep-horainicio"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Hora Inicio
                </label>
              </div>
            </div>
            <div class="mb-6">
              <div class="relative">
                <input
                    type="text"
                    id="editCitaRep-horafin"
                    v-model="editedCitaRep.HoraFin"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editCitaRep-horafin"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Hora Fin
                </label>
              </div>
            </div>
            <div class="mb-6">
              <div class="relative">
                <input
                    type="text"
                    id="editCitaRep-estado"
                    v-model="editedCitaRep.estado"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editCitaRep-estado"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Estado
                </label>
              </div>
            </div>
            <div class="mb-6">
              <div class="relative">
                <input
                    type="date"
                    id="editCitaRep-fecha"
                    v-model="editedCitaRep.fecha"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editCitaRep-fecha"
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
      </main>
    </section>
    <Footer />
  </div>
</template>

<style>

</style>

