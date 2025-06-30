<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { isEmployee } from '@/services/auth.services.js';
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';

const router = useRouter();
const isEmployeeUser = ref(false);

onMounted(() => {
  isEmployeeUser.value = isEmployee();
  
  // Redirect if not employee
  if (!isEmployeeUser.value) {
    router.push('/login');
  }
});

const navigateTo = (route) => {
  router.push(route);
};

const dashboardItems = [
  {
    title: 'Gestionar Servicios',
    description: 'Administrar servicios de la barbería',
    route: '/gestionar-servicios',
    icon: 'scissors',
  },
  {
    title: 'Gestionar Sucursales',
    description: 'Administrar sucursales y ubicaciones',
    route: '/gestionar-sucursales',
    icon: 'building',
  },
  {
    title: 'Gestionar Citas',
    description: 'Administrar todas las citas',
    route: '/gestionar-citas',
    icon: 'calendar',
  },
  {
    title: 'Citas Recepción',
    description: 'Gestionar citas desde recepción',
    route: '/gestionar-citas-recepcionista',
    icon: 'clipboard',
  },
  {
    title: 'Gestionar Empleados',
    description: 'Administrar personal de la barbería',
    route: '/gestionar-empleados',
    icon: 'users',
  },
  {
    title: 'Gestionar Clientes',
    description: 'Administrar base de datos de clientes',
    route: '/gestionar-clientes',
    icon: 'user-group',
  }
];

const getIcon = (iconName) => {
  const icons = {
    scissors: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
    </svg>`,
    building: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>`,
    calendar: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2" stroke="currentColor" fill="none"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke-width="2" stroke="currentColor"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke-width="2" stroke="currentColor"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke-width="2" stroke="currentColor"/>
    </svg>`,
    clipboard: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>`,
    'user-group': `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>`
  };
  
  return icons[iconName] || icons['users'];
};
</script>

<template>
  <div v-if="isEmployeeUser" class="min-h-screen bg-gray-100 flex flex-col">
    <Navbar />
    <!-- Grid de accesos rápidos -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in dashboardItems"
          :key="item.route"
          @click="navigateTo(item.route)"
          class="bg-white text-gray-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 rounded-lg bg-yellow-100 text-yellow-600" v-html="getIcon(item.icon)"></div>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">{{ item.title }}</h3>
            <p class="text-gray-600 text-sm">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
/* Custom styles for better hover effects */
.grid > div:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style> 