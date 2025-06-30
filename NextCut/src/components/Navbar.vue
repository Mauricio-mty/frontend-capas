<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { logout as authLogout, isAuthenticated, isEmployee } from '@/services/auth.services.js';

const showDropdown = ref(false);
const router = useRouter();

// Estado reactivo para el token de autenticación
const isLoggedIn = ref(false);

// Computed property para verificar si el usuario está autenticado
const userIsAuthenticated = computed(() => {
  return isLoggedIn.value;
});

// Computed property para verificar si el usuario es empleado
const userIsEmployee = computed(() => {
  return isEmployee();
});

// Computed property para verificar si el usuario es cliente
const userIsClient = computed(() => {
  return localStorage.getItem('cliente') === 'true';
});

// Función para verificar el estado de autenticación
const checkAuthStatus = () => {
  isLoggedIn.value = isAuthenticated();
};

// Watcher para el estado de autenticación
watch(isLoggedIn, (newValue, oldValue) => {
  // El watcher está aquí para detectar cambios en el estado de autenticación
});

// Verificar estado inicial y escuchar cambios en localStorage
onMounted(() => {
  checkAuthStatus();
  
  // Escuchar cambios en localStorage (funciona para cambios desde otras pestañas y eventos personalizados)
  window.addEventListener('storage', checkAuthStatus);
});

// Limpiar event listeners al desmontar el componente
onUnmounted(() => {
  window.removeEventListener('storage', checkAuthStatus);
});

function goToPerfil() {
  router.push('/perfil');
  showDropdown.value = false;
}
function goToCitas() {
  router.push('/mis-citas');
  showDropdown.value = false;
}
function logout() {
  // Eliminar token del localStorage y limpiar estado de autenticación
  authLogout();
  
  // Forzar actualización del estado inmediatamente
  isLoggedIn.value = false;
  
  // Verificar el estado después de un pequeño delay para asegurar que se actualice
  setTimeout(() => {
    checkAuthStatus();
  }, 100);
  
  // Redirigir al login
  router.push('/login');
  showDropdown.value = false;
}
</script>

<template>
  <nav class="text-white px-6 py-1 flex justify-between items-center shadow"
       style="background-color: var(--nav-bg);">
    <!-- Logo -->
    <div class="font-poppins text-2xl tracking-wider font-extrabold" >
      <h1> NextCut </h1>
    </div>
    <div class="w-full px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-end">
        <ul class="flex flex-row gap-6 items-center">
            <li v-if="!userIsEmployee" class="relative">
              <router-link to="/home" class="text-sm font-roboto px-3 py-2 font-medium block hover:text-nav-text-hover">
                INICIO
              </router-link>
            </li>
            <!-- Dashboard para empleados -->
            <li v-if="userIsAuthenticated && userIsEmployee" class="relative">
              <router-link to="/employee-dashboard" class="text-sm font-roboto px-3 py-2 font-medium block hover:text-nav-text-hover">
                DASHBOARD
              </router-link>
            </li>
            <!-- Links solo para clientes -->
            <li v-if="userIsAuthenticated && userIsClient" class="relative">
              <router-link to="/agendar-cita" class="text-sm font-roboto px-3 py-2 font-medium block hover:text-nav-text-hover">
                AGENDAR CITA
              </router-link>
            </li>
            <li v-if="userIsAuthenticated && userIsClient" class="relative">
              <router-link to="/citas" class="text-sm font-roboto px-3 py-2 font-medium block hover:text-nav-text-hover">
                CITAS
              </router-link>
            </li>
            <!-- Links para empleados -->
            <li v-if="userIsAuthenticated && userIsEmployee" class="relative">
              <router-link to="/gestionar-servicios" class="text-sm font-roboto px-3 py-2 font-medium block hover:text-nav-text-hover">
                SERVICIOS
              </router-link>
            </li>
            <li v-if="userIsAuthenticated && userIsEmployee" class="relative">
              <router-link to="/gestionar-sucursales" class="text-sm font-roboto px-3 py-2 font-medium block hover:text-nav-text-hover">
                SUCURSALES
              </router-link>
            </li>
            <li v-if="userIsAuthenticated && userIsEmployee" class="relative">
              <router-link to="/gestionar-citas" class="text-sm font-roboto px-3 py-2 font-medium block hover:text-nav-text-hover">
                GESTIONAR CITAS
              </router-link>
            </li>
            <li v-if="userIsAuthenticated && userIsEmployee" class="relative">
              <router-link to="/gestionar-citas-recepcionista" class="text-sm font-roboto px-3 py-2 font-medium block hover:text-nav-text-hover">
                CITAS RECEPCIÓN
              </router-link>
            </li>
            <li v-if="userIsAuthenticated && userIsEmployee" class="relative">
              <router-link to="/gestionar-citas-barbero" class="text-sm font-roboto px-3 py-2 font-medium block hover:text-nav-text-hover">
                CITAS BARBERO
              </router-link>
            </li>
            <li v-if="userIsAuthenticated && userIsEmployee" class="relative">
              <router-link to="/gestionar-empleados" class="text-sm font-roboto px-3 py-2 font-medium block hover:text-nav-text-hover">
                EMPLEADOS
              </router-link>
            </li>
            <li v-if="userIsAuthenticated && userIsEmployee" class="relative">
              <router-link to="/gestionar-clientes" class="text-sm font-roboto px-3 py-2 font-medium block hover:text-nav-text-hover">
                CLIENTES
              </router-link>
            </li>
            <li v-if="!userIsEmployee" class="relative">
              <router-link to="/contacto" class="text-sm font-roboto px-3 py-2 font-medium block hover:text-nav-text-hover">
                CONTACTO
              </router-link>
            </li>
            <li v-if="!userIsAuthenticated" class="relative">
              <router-link to="/login" class="text-sm font-roboto px-3 py-2 font-medium block hover:text-nav-text-hover">
                LOGIN
              </router-link>
            </li>
            <li v-if="userIsAuthenticated" class="px-6 py-2 relative group h-7 w-7 flex items-center justify-center"
                @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
              <!-- Ícono normal -->
              <img
                  src="../assets/images/userIcon.png"
                  alt="user"
                  class="absolute top-0 left-0 h-7 w-7 object-contain group-hover:hidden"
                  v-show="!showDropdown"
              />
              <!-- Ícono para hover -->
              <img
                  src="../assets/images/userIcon-hover.png"
                  alt="user-hover"
                  class="absolute top-0 left-0 h-7 w-7 object-contain hidden group-hover:block"
                  v-show="showDropdown"
              />
              <!-- Dropdown -->
              <transition name="fade-slide">
                <div v-show="showDropdown"
                     class="dropdown-menu absolute left-1/2 -translate-x-1/2 top-[120%] w-60 max-w-[90vw] sm:w-60 sm:max-w-xs bg-white text-black rounded-xl shadow-2xl z-50 flex flex-col items-center py-4 border border-gray-200"
                     @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
                  <button @click="goToPerfil" class="dropdown-item flex items-center gap-3">
                    <span class="icon-user"><svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z' /><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' /></svg></span>
                    Editar perfil
                  </button>
                  <!-- Opción solo para clientes -->
                  <button v-if="userIsClient" @click="goToCitas" class="dropdown-item flex items-center gap-3">
                    <span class="icon-calendar"><svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><rect x='3' y='8' width='18' height='13' rx='2' stroke-width='2' stroke='currentColor' fill='none'/><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 2v4M8 2v4M3 10h18' /></svg></span>
                    Mis citas
                  </button>
                  <button @click="logout" class="dropdown-item flex items-center gap-3">
                    <span class="icon-logout"><svg xmlns='http://www.w3.org/2000/svg' class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1' /></svg></span>
                    Cerrar sesión
                  </button>
                </div>
              </transition>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.group:hover .group-hover\:hidden {
  display: none;
}
.group:hover .group-hover\:block {
  display: block;
}
.dropdown-menu {
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
  min-width: 180px;
  max-width: 90vw;
  width: 240px;
  padding: 1rem 0.25rem;
  border-radius: 1rem;
  animation: dropdownAppear 0.22s cubic-bezier(.4,0,.2,1);
  left: 50%;
  transform: translateX(-50%);
}
@media (max-width: 640px) {
  .dropdown-menu {
    min-width: 0;
    width: 95vw;
    max-width: 98vw;
    padding: 0.75rem 0.1rem;
    border-radius: 0.9rem;
  }
  .dropdown-item {
    font-size: 0.98rem;
    padding: 0.7rem 0.8rem;
  }
}
.dropdown-item {
  width: 90%;
  text-align: left;
  padding: 0.75rem 1.25rem;
  margin: 0.25rem 0;
  border-radius: 0.7rem;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  background: none;
  transition: background 0.18s, color 0.18s;
  cursor: pointer;
}
.dropdown-item:hover {
  background: #f3f4f6;
  color: #0E1B24;
}
@keyframes dropdownAppear {
  0% { opacity: 0; transform: translateY(-10px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.18s, transform 0.18s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>


