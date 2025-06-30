<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import HeaderTabla from "@/components/HeaderTabla.vue";
import Modal from "@/components/Modal.vue";
import { ref, computed, h, onMounted } from "vue";
import Tabla from "@/components/Tabla.vue";
import { getAllClients, createClient, updateClient, deleteClient } from '@/services/gestionarClientes/client.services.js';

const allClientes = ref([]);
const loadingClientes = ref(false);

onMounted(async () => {
  loadingClientes.value = true;
  try {
    allClientes.value = await getAllClients();
  } catch (error) {
    alert(error.message || 'Error al cargar clientes');
  } finally {
    loadingClientes.value = false;
  }
});

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

const newCliente = ref({ name: '', lastName: '', phone: '', email: '' });
const editedCliente = ref(null);
const clienteToDeleteId = ref(null);


const filteredCliente = computed(() => {
  if (!searchQuery.value) {
    return allClientes.value;
  }
  const query = searchQuery.value.toLowerCase();
  return allClientes.value.filter(clients => {
    return clients.name.toLowerCase().includes(query) ||
      clients.lastName.toLowerCase().includes(query) ||
      clients.phone.toLowerCase().includes(query) ||
      clients.email.toLowerCase().includes(query);
  });
});

const HeaderTablaClientes = [
  // { text: 'ID', class: 'w-[20%] text-left' }, // Oculto, pero disponible internamente
  { text: 'Nombre', class: 'w-[20%] text-left' },
  { text: 'Apellido', class: 'w-[20%] text-center' },
  { text: 'Teléfono', class: 'w-[20%] text-center' },
  { text: 'Correo', class: 'w-[20%] text-center' },
  { text: 'Estado', class: 'w-[10%] text-center' },
  { text: '', class: 'w-[10%] text-center actions-column' },
];

const handleAddCliente = () => {
  newCliente.value = { name: '', lastName: '', phone: '', email: '' };
  activeModal.value = 'add';
};

const handleEditCliente = (clienteToEdit) => {
  editedCliente.value = { ...clienteToEdit };
  activeModal.value = 'edit';
};


const handleDeleteCliente = (idToDelete) => {
  clienteToDeleteId.value = idToDelete;
  activeModal.value = 'delete';
};

const handleFiltro = () => {
};

const closeModal = () => {
  if (activeModal.value === 'add') {
    newCliente.value = { name: '', lastName: '', phone: '', email: '' };
  } else if (activeModal.value === 'edit') {
    editedCliente.value = null;
  } else if (activeModal.value === 'delete') {
    clienteToDeleteId.value = null;
  }
  activeModal.value = null;
};

const submitNewCliente = async () => {
  if (!newCliente.value.name || !newCliente.value.lastName || !newCliente.value.phone || !newCliente.value.email) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  try {
    await createClient(newCliente.value);
    allClientes.value = await getAllClients();
    closeModal();
  } catch (error) {
    alert(error.message || 'Error al crear cliente');
  }
};

const submitEditedCliente = async () => {
  if (!editedCliente.value.name || !editedCliente.value.lastName || !editedCliente.value.phone || !editedCliente.value.email) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  try {
    await updateClient(editedCliente.value.Id, editedCliente.value);
    allClientes.value = await getAllClients();
    closeModal();
  } catch (error) {
    alert(error.message || 'Error al actualizar cliente');
  }
};

const confirmDeleteCliente = async () => {
  if (clienteToDeleteId.value !== null) {
    try {
      await deleteClient(clienteToDeleteId.value);
      allClientes.value = await getAllClients();
      closeModal();
    } catch (error) {
      alert(error.message || 'Error al eliminar cliente');
    }
  } else {
    closeModal();
  }
};


const renderClienteCeldas = (item, header) => {
  // if (header.text === 'ID') {
  //   return h('span', item.Id);
  // }
  if (header.text === 'Nombre') {
    return h('span', item.name);
  }
  else if (header.text === 'Apellido') {
    return h('span', item.lastName);
  }
  else if (header.text === 'Teléfono') {
    return h('span', item.phone);
  }
  else if (header.text === 'Correo') {
    return h('span', item.email);
  }
  else if (header.text === 'Estado') {
    return h('span', item.status);
  }
  else if (header.class.includes('actions-column')) {
    return h('div', { class: 'flex items-center justify-end gap-4' }, [
      h('button', {
        class: 'hover:opacity-75',
        onClick: () => handleEditCliente(item)
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
        class: 'opacity-50 cursor-not-allowed',
        attrs: { disabled: true },
        // onClick eliminado para deshabilitar
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
          <h1 class="text-3xl font-bold text-nav-bg font-maven">Clientes</h1>
        </div>

        <HeaderTabla
            search-placeholder="Buscar cliente"
            v-model="searchQuery"
            v-model:showAddModal="showAddModalComputed"
            add-modal-title="Agregar Nuevo Cliente"
            @add="handleAddCliente"
            @filter="handleFiltro"
        >
          <template #add-modal="{ show, title, closeModal: closeModal }">
            <Modal :show="activeModal === 'add'" :title="title" @close="closeModal">
              <form @submit.prevent="submitNewCliente">
              <div @submit.prevent="submitNewCliente">
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="text"
                        id="newCliente"
                        v-model="newCliente.name"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" " />
                    <label
                        for="newCliente"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Nombre
                    </label>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="text"
                        id="newCliente"
                        v-model="newCliente.lastName"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" " />
                    <label
                        for="newCliente"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Apellido
                    </label>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="text"
                        id="newCliente"
                        v-model="newCliente.phone"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" " />
                    <label
                        for="newCliente"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Teléfono
                    </label>
                  </div>
                </div>
                <div class="mb-6">
                  <div class="relative">
                    <input
                        type="text"
                        id="newCliente"
                        v-model="newCliente.email"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                        required
                        placeholder=" " />
                    <label
                        for="newCliente"
                        class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Correo
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
                </div>
              </form>
            </Modal>
          </template>
        </HeaderTabla>

        <div v-if="!loadingClientes && allClientes.length === 0" class="text-center text-gray-500 py-12 text-lg font-semibold">
          Sin clientes
        </div>

        <Tabla
            v-if="allClientes.length > 0"
            :headers="HeaderTablaClientes"
            :items="filteredCliente"
            :render-cell="renderClienteCeldas"
        />

        <Modal :show="activeModal === 'edit'" title="Editar Empleado" @close="closeModal">
          <form v-if="editedCliente" @submit.prevent="submitEditedCliente">
            <div class="mb-6">
              <div class="relative">
                <input
                    type="text"
                    id="editCliente"
                    v-model="editedCliente.name"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editCliente"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Nombre
                </label>
              </div>
            </div>

            <div class="mb-6">
              <div class="relative">
                <input
                    type="text"
                    id="editCliente"
                    v-model="editedCliente.lastName"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editCliente"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Apellido
                </label>
              </div>
            </div>
              <div class="mb-6">
                <div class="relative">
                  <input
                      type="text"
                      id="editCliente"
                      v-model="editedCliente.phone"
                      class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                      required
                      placeholder=" " />
                  <label
                      for="editCliente"
                      class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Teléfono
                  </label>
                </div>
              </div>
              <div class="mb-6">
                <div class="relative">
                  <input
                      type="text"
                      id="editCliente"
                      v-model="editedCliente.email"
                      class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                      required
                      placeholder=" " />
                  <label
                      for="editCliente"
                      class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Correo
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

        <Modal :show="activeModal === 'delete'" title="Confirmar Eliminación" @close="closeModal"> <p class="text-center font-medium font-roboto mb-6">¿Estás seguro de que quieres eliminar esta sucursal?</p>
          <div class="flex justify-center pt-4 gap-2">
            <button type="button" @click="closeModal" class="btn-secondary">
              Cancelar
            </button>
            <button type="button" @click="confirmDeleteCliente" class="btn-primary"> Eliminar
            </button>
          </div>
        </Modal>

      </section>
    </main>
    <Footer />
  </div>
</template>