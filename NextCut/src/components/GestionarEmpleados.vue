<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import HeaderTabla from "@/components/HeaderTabla.vue";
import Modal from "@/components/Modal.vue";
import { ref, computed, h, onMounted } from "vue";
import Tabla from "@/components/Tabla.vue";
import { getAllEmployees, updateEmployeeById, deleteEmployeeById, createEmployee } from '@/services/gestionarEmpleados/index.js';

const empleados = ref([]);
const loadingEmpleados = ref(false);
const token = localStorage.getItem('token');

onMounted(async () => {
  loadingEmpleados.value = true;
  try {
    empleados.value = await getAllEmployees();
    console.log(token)
  } catch (error) {
    alert(error.message || 'Error al cargar empleados');
    console.log(token)
  } finally {
    loadingEmpleados.value = false;
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

const newEmpleado = ref({ id: '', email: '', name: '', lastName: '', role: '', status: '' });
const editedEmpleado = ref(null);
const empleadoToDeleteId = ref(null);

const filteredEmpleado = computed(() => {
  if (!searchQuery.value) {
    return empleados.value;
  }
  const query = searchQuery.value.toLowerCase();
  return empleados.value.filter(employees => {
    return employees.id.toLowerCase().includes(query) ||
      employees.email.toLowerCase().includes(query) ||
      employees.name.toLowerCase().includes(query) ||
      employees.lastName.toLowerCase().includes(query) ||
      employees.role.toLowerCase().includes(query) ||
      employees.status.toLowerCase().includes(query);
  });
});

const HeaderTablaEmpleados = [
  { text: 'ID', class: 'w-[20%] text-left' },
  { text: 'Email', class: 'w-[20%] text-center' },
  { text: 'Nombre', class: 'w-[15%] text-center' },
  { text: 'Apellido', class: 'w-[15%] text-center' },
  { text: 'Rol', class: 'w-[10%] text-center' },
  { text: 'Estado', class: 'w-[10%] text-center' },
  { text: '', class: 'w-[10%] text-center actions-column' },
];

const handleAddEmpleado = () => {
  newEmpleado.value = { id: '', email: '', name: '', lastName: '', role: '', status: '' };
  activeModal.value = 'add';
};

const handleEditEmpleado = (empleadoToEdit) => {
  editedEmpleado.value = { ...empleadoToEdit };
  activeModal.value = 'edit';
};

const handleDeleteEmpleado = (idToDelete) => {
  empleadoToDeleteId.value = idToDelete;
  activeModal.value = 'delete';
};

const handleFiltro = () => {};

const closeModal = () => {
  if (activeModal.value === 'add') {
    newEmpleado.value = { id: '', email: '', name: '', lastName: '', role: '', status: '' };
  } else if (activeModal.value === 'edit') {
    editedEmpleado.value = null;
  } else if (activeModal.value === 'delete') {
    empleadoToDeleteId.value = null;
  }
  activeModal.value = null;
};

const submitNewEmpleado = async () => {
  if (!newEmpleado.value.email || !newEmpleado.value.password || !newEmpleado.value.name || !newEmpleado.value.lastName || !newEmpleado.value.role) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  try {
    // Estructura de datos para el backend
    const empleadoPayload = {
      email: newEmpleado.value.email,
      password: newEmpleado.value.password,
      name: newEmpleado.value.name,
      lastName: newEmpleado.value.lastName,
      Role: newEmpleado.value.role
    };
    await createEmployee(empleadoPayload);
    empleados.value = await getAllEmployees();
    closeModal();
  } catch (error) {
    alert(error.message || 'Error al crear empleado');
  }
};

const submitEditedEmpleado = async () => {
  if (!editedEmpleado.value.email || !editedEmpleado.value.name || !editedEmpleado.value.lastName || !editedEmpleado.value.role) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  try {
    await updateEmployeeById(editedEmpleado.value.id, editedEmpleado.value);
    // Refrescar la lista de empleados
    empleados.value = await getAllEmployees();
    closeModal();
  } catch (error) {
    alert(error.message || 'Error al actualizar empleado');
  }
};

const confirmDeleteEmpleado = async () => {
  if (empleadoToDeleteId.value !== null) {
    try {
      await deleteEmployeeById(empleadoToDeleteId.value);
      // Refrescar la lista de empleados
      empleados.value = await getAllEmployees();
      closeModal();
    } catch (error) {
      alert(error.message || 'Error al eliminar empleado');
    }
  } else {
    closeModal();
  }
};

const renderEmpleadoCeldas = (item, header) => {
  if (header.text === 'ID') {
    return h('span', item.id);
  }
  else if (header.text === 'Email') {
    return h('span', item.email);
  }
  else if (header.text === 'Nombre') {
    return h('span', item.name);
  }
  else if (header.text === 'Apellido') {
    return h('span', item.lastName);
  }
  else if (header.text === 'Rol') {
    return h('span', item.role);
  }
  else if (header.text === 'Estado') {
    return h('span', item.status);
  }
  else if (header.class.includes('actions-column')) {
    return h('div', { class: 'flex items-center justify-end gap-4' }, [
      // Editar y Borrar botones
      h('button', {
        class: 'hover:opacity-75',
        onClick: () => handleEditEmpleado(item)
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
        onClick: () => handleDeleteEmpleado(item.id)
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
          <h1 class="text-3xl font-bold text-nav-bg font-maven">Empleados</h1>
        </div>

        <HeaderTabla
            search-placeholder="Buscar empleado"
            v-model="searchQuery"
            v-model:showAddModal="showAddModalComputed"
            add-modal-title="Agregar Nuevo Empleado"
            @add="handleAddEmpleado"
            @filter="handleFiltro"
        >
          <template #add-modal="{ show, title, closeModal: closeModal }">
            <Modal :show="activeModal === 'add'" :title="title" @close="closeModal">
              <form @submit.prevent="submitNewEmpleado">
                <div class="mb-6">
                <div class="relative">
                  <input
                      type="text"
                      id="newEmpleado"
                      v-model="newEmpleado.email"
                      class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                      required
                      placeholder=" " />
                  <label
                      for="newEmpleado"
                      class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Email
                  </label>
                </div>
              </div>
                <div class="mb-6">
                <div class="relative">
                  <input
                      type="password"
                      id="newEmpleado"
                      v-model="newEmpleado.password"
                      class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                      required
                      placeholder=" " />
                  <label
                      for="newEmpleado"
                      class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Contraseña
                  </label>
                </div>
              </div>
                <div class="mb-6">
                <div class="relative">
                  <input
                      type="text"
                      id="newEmpleado"
                      v-model="newEmpleado.name"
                      class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                      required
                      placeholder=" " />
                  <label
                      for="newEmpleado"
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
                      id="newEmpleado"
                      v-model="newEmpleado.lastName"
                      class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                      required
                      placeholder=" " />
                  <label
                      for="newEmpleado"
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
                      id="newEmpleado"
                      v-model="newEmpleado.role"
                      class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                      required
                      placeholder=" " />
                  <label
                      for="newEmpleado"
                      class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Rol
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
            :headers="HeaderTablaEmpleados"
            :items="filteredEmpleado"
            :render-cell="renderEmpleadoCeldas"
        />

        <Modal :show="activeModal === 'edit'" title="Editar Empleado" @close="closeModal">
          <form v-if="editedEmpleado" @submit.prevent="submitEditedEmpleado">
            <div class="mb-6">
              <div class="relative">
                <input
                    type="text"
                    id="editEmpleado"
                    v-model="editedEmpleado.email"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editEmpleado"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Email
                </label>
              </div>
            </div>

            <div class="mb-6">
              <div class="relative">
                <input
                    type="text"
                    id="editEmpleado"
                    v-model="editedEmpleado.name"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editEmpleado"
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
                    id="editEmpleado"
                    v-model="editedEmpleado.lastName"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editEmpleado"
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
                    id="editEmpleado"
                    v-model="editedEmpleado.role"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm appearance-none pr-8 pt-2"
                    required
                    placeholder=" " />
                <label
                    for="editEmpleado"
                    class="absolute text-medium text-gray-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white start-1 duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Rol
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
            <button type="button" @click="confirmDeleteEmpleado" class="btn-primary"> Eliminar
            </button>
          </div>
        </Modal>

      </section>
    </main>
    <Footer />
  </div>
</template>