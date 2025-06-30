<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import HeaderTabla from "@/components/HeaderTabla.vue";
import Modal from "@/components/Modal.vue";
import { ref, computed, h, onMounted } from "vue";
import Tabla from "@/components/Tabla.vue";
import { branchesService } from '@/services/gestionarSucursales/branches.services.js';

const sucursales = ref([]);
const loading = ref(false);

onMounted(async () => {
  await cargarSucursales();
});

async function cargarSucursales() {
  loading.value = true;
  try {
    sucursales.value = await branchesService.getAllBranches();
  } catch (error) {
    alert(error.message || 'Error al cargar sucursales');
  } finally {
    loading.value = false;
  }
}

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

const newSucursal = ref({ name: '' });
const editedSucursal = ref(null);
const sucursalToDeleteId = ref(null);

const filteredSucursales = computed(() => {
  if (!searchQuery.value) {
    return sucursales.value;
  }
  const query = searchQuery.value.toLowerCase();
  return sucursales.value.filter(branch => {
    return branch.sucursal.toLowerCase().includes(query) ||
        branch.estado.toLowerCase() === query;
  });
});

const HeaderTablaSucursales = [
  // { text: 'ID', class: 'w-[20%] text-left' }, // Oculto, pero disponible internamente
  { text: 'Sucursal', class: 'w-[70%] text-left' },
  { text: 'Estado', class: 'w-[20%] text-center' },
  { text: '', class: 'w-[10%] text-center actions-column' },
];

const handleAddSucursal = () => {
  newSucursal.value = { name: '' };
  activeModal.value = 'add';
};

const handleEditSucursal = (sucursalToEdit) => {
  editedSucursal.value = { ...sucursalToEdit };
  activeModal.value = 'edit';
};

const handleDeleteSucursal = (idToDelete) => {
  sucursalToDeleteId.value = idToDelete;
  activeModal.value = 'delete';
};

const handleFiltro = () => {};

const closeModal = () => {
  if (activeModal.value === 'add') {
    newSucursal.value = { name: '' };
  } else if (activeModal.value === 'edit') {
    editedSucursal.value = null;
  } else if (activeModal.value === 'delete') {
    sucursalToDeleteId.value = null;
  }
  activeModal.value = null;
};

const submitNewSucursal = async () => {
  if (!newSucursal.value.name) {
    alert('Por favor, ingrese el nombre de la sucursal.');
    return;
  }
  try {
    await branchesService.createBranch({ name: newSucursal.value.name, status: 'ACTIVE' });
    await cargarSucursales();
    closeModal();
  } catch (error) {
    alert(error.message || 'Error al crear sucursal');
  }
};

const submitEditedSucursal = async () => {
  if (!editedSucursal.value.name) {
    alert('Por favor, ingrese el nombre de la sucursal.');
    return;
  }
  try {
    await branchesService.updateBranch(editedSucursal.value.id, editedSucursal.value);
    await cargarSucursales();
    closeModal();
  } catch (error) {
    alert(error.message || 'Error al actualizar sucursal');
  }
};

const confirmDeleteSucursal = async () => {
  if (sucursalToDeleteId.value !== null) {
    try {
      await branchesService.deleteBranch(sucursalToDeleteId.value);
      await cargarSucursales();
      closeModal();
    } catch (error) {
      alert(error.message || 'Error al eliminar sucursal');
    }
  } else {
    closeModal();
  }
};

const renderSurcursalesCeldas = (item, header) => {
  // if (header.text === 'ID') {
  //   return h('span', item.id);
  // }
  if (header.text === 'Sucursal') {
    return h('span', item.name);
  }
  else if (header.text === 'Estado') {
    return h('span', item.status);
  }
  else if (header.class.includes('actions-column')) {
    return h('div', { class: 'flex items-center justify-end gap-4' }, [
      h('button', {
        class: 'hover:opacity-75',
        onClick: () => handleEditSucursal(item)
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
        onClick: () => handleDeleteSucursal(item.id)
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
          <h1 class="text-3xl font-bold text-nav-bg font-maven">Sucursales</h1>
        </div>

        <HeaderTabla
            search-placeholder="Buscar sucursal"
            v-model="searchQuery"
            v-model:showAddModal="showAddModalComputed"
            add-modal-title="Agregar Nueva Sucursal"
            @add="handleAddSucursal"
            @filter="handleFiltro"
        >
          <template #add-modal="{ show, title, closeModal: closeModal }">
            <Modal :show="activeModal === 'add'" :title="title" @close="closeModal">
              <form @submit.prevent="submitNewSucursal">
                <div class="mb-6">
                  <div class="relative">
                    <input
                      type="text"
                      id="newSucursal"
                      v-model="newSucursal.name"
                      class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                      required
                      placeholder=" " />
                    <label
                      for="newSucursal"
                      class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Nombre de la sucursal
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

        <div v-if="!loading && sucursales.length === 0" class="text-center text-gray-500 py-12 text-lg font-semibold">
          Sin sucursales
        </div>
        <div v-else>
          <Tabla
              :headers="HeaderTablaSucursales"
              :items="filteredSucursales"
              :render-cell="renderSurcursalesCeldas"
          />
        </div>

        <Modal :show="activeModal === 'edit'" title="Editar Sucursal" @close="closeModal">
          <form v-if="editedSucursal" @submit.prevent="submitEditedSucursal">
            <div class="mb-6">
              <div class="relative">
                <input
                    type="text"
                    id="editSucursal"
                    v-model="editedSucursal.name"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editSucursal"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Nombre de la sucursal
                </label>
              </div>
            </div>
            <div class="mb-6">
              <div class="relative">
                <select
                  id="editStatus"
                  v-model="editedSucursal.status"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                  required
                >
                  <option value="ACTIVE">Activo</option>
                  <option value="INACTIVE">Inactivo</option>
                </select>
                <label
                  for="editStatus"
                  class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Estado
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

        <Modal :show="activeModal === 'delete'" title="Confirmar Eliminación" @close="closeModal"> <p class="text-center font-medium font-roboto mb-6">¿Estás seguro de que quieres eliminar esta sucursal?</p>
          <div class="flex justify-center pt-4 gap-2">
            <button type="button" @click="closeModal" class="btn-secondary">
              Cancelar
            </button>
            <button type="button" @click="confirmDeleteSucursal" class="btn-primary"> Eliminar
            </button>
          </div>
        </Modal>

      </section>
    </main>
    <Footer />
  </div>
</template>