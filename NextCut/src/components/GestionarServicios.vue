<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import HeaderTabla from "@/components/HeaderTabla.vue";
import Modal from "@/components/Modal.vue";
import { ref, computed, h, onMounted } from "vue";
import Tabla from "@/components/Tabla.vue";
import { servicesService } from '@/services/gestionarServicios/services.services.js';

const allServicios = ref([]);
const loadingServicios = ref(false);

onMounted(async () => {
  loadingServicios.value = true;
  try {
    allServicios.value = await servicesService.getAllServices();
  } catch (error) {
    alert(error.message || 'Error al cargar servicios');
  } finally {
    loadingServicios.value = false;
  }
});

// Estado del modal activo
const activeModal = ref(null);

// Variable para la búsqueda
const searchQuery = ref('');

// Computed para mostrar el modal de agregar
const showAddModalComputed = computed({
  get: () => activeModal.value === 'add',
  set: (newValue) => {
  if (!newValue) {
    closeModal();
   }
  }
});

// Estados para los datos de los formularios de los modales
const newServicio = ref({ name: '', duration: '', price: '' });
const editedServicio = ref(null);
const servicioToDeleteId = ref(null);

// Filtrar búqueda
const filteredServicios = computed(() => {
  if (!searchQuery.value) {
    return allServicios.value;
  }

  const query = searchQuery.value.toLowerCase();
  return allServicios.value.filter(service => {
    const cleanCost = service.price.replace(/[$,\s]/g, '').toLowerCase();
    return service.name.toLowerCase().includes(query) ||
        service.duration.toLowerCase().includes(query) ||
        cleanCost.includes(query);
});
});

// Header para la tabla
const HeaderTablaServicios = [
  { text: 'ID', class: 'w-[25%] text-left' },
  { text: 'Nombre', class: 'w-[25%] text-left' },
  { text: 'Duración', class: 'w-[15%] text-center' },
  { text: 'Precio', class: 'w-[15%] text-center' },
  { text: '', class: 'w-[20%] text-center actions-column' },
];

// Funciones para manejar el estado
const handleAddServicio = () => {
  newServicio.value = { name: '', duration: '', price: '' };
  activeModal.value = 'add';
};

const handleEditServicio = (servicioToEdit) => {
  editedServicio.value = { ...servicioToEdit };
  activeModal.value = 'edit';
};

const handleDeleteServicio = (idToDelete) => {
  servicioToDeleteId.value = idToDelete;
  activeModal.value = 'delete';
};

  const handleFiltro = () => {
};

// Cerrar el modal
const closeModal = () => {
  if (activeModal.value === 'add') {
    newServicio.value = { name: '', duration: '', price: '' };
} else if (activeModal.value === 'edit') {
    editedServicio.value = null;
} else if (activeModal.value === 'delete') {
    servicioToDeleteId.value = null;
}
  activeModal.value = null;
};

// Enviar datos
const submitNewServicio = async () => {
  if (!newServicio.value.name || newServicio.value.duration === '' || newServicio.value.price === '') {
    alert('Por favor, llene todos los campos.');
    return;
  }
  if (isNaN(newServicio.value.duration) || isNaN(newServicio.value.price)) {
    alert('Duración y precio deben ser números.');
    return;
  }
  // Convertir a número explícitamente
  const servicioData = {
    name: newServicio.value.name,
    duration: Number(newServicio.value.duration),
    price: Number(newServicio.value.price)
  };
  try {
    await servicesService.createService(servicioData);
    allServicios.value = await servicesService.getAllServices();
    closeModal();
  } catch (error) {
    alert(error.message || 'Error al crear servicio');
  }
};

const submitEditedServicio = async () => {
  if (!editedServicio.value.name || editedServicio.value.duration === '' || editedServicio.value.price === '') {
    alert('Por favor, llene todos los campos.');
    return;
  }
  if (isNaN(editedServicio.value.duration) || isNaN(editedServicio.value.price)) {
    alert('Duración y precio deben ser números.');
    return;
  }
  // Convertir a número explícitamente
  const servicioData = {
    ...editedServicio.value,
    duration: Number(editedServicio.value.duration),
    price: Number(editedServicio.value.price)
  };
  try {
    await servicesService.updateService(editedServicio.value.id, servicioData);
    allServicios.value = await servicesService.getAllServices();
    closeModal();
  } catch (error) {
    alert(error.message || 'Error al actualizar servicio');
  }
};

const confirmDeleteServicio = async () => {
  if (servicioToDeleteId.value !== null) {
    try {
      await servicesService.deleteService(servicioToDeleteId.value);
      allServicios.value = await servicesService.getAllServices();
      closeModal();
    } catch (error) {
      alert(error.message || 'Error al eliminar servicio');
    }
  } else {
    closeModal();
  }
};

// Renderizar celdas de la tabla
const renderServiciosCeldas = (item, header) => {
  if (header.text === 'ID') {
    return h('span', item.id);
  }
  if (header.text === 'Nombre') {
    return h('span', item.name);
  }
  else if (header.text === 'Duración') {
    return h('span', item.duration);
  }
  else if (header.text === 'Precio') {
    return h('span', item.price);
  }
  else if (header.class.includes('actions-column')) {
    return h('div', { class: 'flex items-center justify-end gap-4' }, [
      h('button', {
        class: 'hover:opacity-75',
        onClick: () => handleEditServicio(item)
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
        onClick: () => handleDeleteServicio(item.id)
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
        <div class="flex items-center justify-center mb-6">
          <h1 class="text-3xl font-bold text-nav-bg font-maven">Servicios</h1>
        </div>

        <HeaderTabla
            search-placeholder="Buscar servicio"
            v-model="searchQuery"
            v-model:showAddModal="showAddModalComputed"
            add-modal-title="Agregar Nuevo Servicio"
            @add="handleAddServicio"
            @filter="handleFiltro"
        >
          <template #add-modal="{ title }">
            <Modal :show="activeModal === 'add'" :title="title" @close="closeModal">
              <form @submit.prevent="submitNewServicio">
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="text"
                        id="newServicio"
                        v-model="newServicio.name"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" " />
                    <label
                        for="newServicio"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Nombre
                    </label>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="number"
                        id="newServicioDuration"
                        v-model.number="newServicio.duration"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        min="1"
                        placeholder=" " />
                    <label
                        for="newServicioDuration"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Duración (minutos)
                    </label>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="number"
                        id="newServicioPrice"
                        v-model.number="newServicio.price"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        min="0"
                        step="0.01"
                        placeholder=" " />
                    <label
                        for="newServicioPrice"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Precio
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
            :headers="HeaderTablaServicios"
            :items="filteredServicios"
            :render-cell="renderServiciosCeldas"
        />

        <Modal :show="activeModal === 'edit'" title="Editar Servicio" @close="closeModal">
          <form v-if="editedServicio" @submit.prevent="submitEditedServicio">
            <div class="mb-6">
              <div class="relative">
                <input
                    type="text"
                    id="editServicio"
                    v-model="editedServicio.name"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editServicio"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Nombre
                </label>
              </div>
            </div>

            <div class="mb-6">
              <div class="relative">
                <input
                    type="number"
                    id="editServicioDuration"
                    v-model.number="editedServicio.duration"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    min="1"
                    placeholder=" " />
                <label
                    for="editServicioDuration"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Duración (minutos)
                </label>
              </div>
            </div>
            <div class="mb-6">
              <div class="relative">
                <input
                    type="number"
                    id="editServicioPrice"
                    v-model.number="editedServicio.price"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    min="0"
                    step="0.01"
                    placeholder=" " />
                <label
                    for="editServicioPrice"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Precio
                </label>
              </div>
            </div>
            <div class="flex justify-end pt-4 gap-2">
              <button type="button" @click="closeModal" class="btn-secondary">
                Cancelar
              </button>
              <button type="submit" class="btn-primary">
                Guardar Cambios
              </button>
            </div>
          </form>
        </Modal>

        <Modal :show="activeModal === 'delete'" title="Confirmar Eliminación" @close="closeModal">
          <p class="text-center font-medium font-roboto mb-6">¿Estás seguro de que quieres eliminar este servicio?</p>
          <div class="flex justify-center pt-4 gap-2">
            <button type="button" @click="closeModal" class="btn-secondary">
              Cancelar
            </button>
            <button type="button" @click="confirmDeleteServicio" class="btn-primary">
              Eliminar
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