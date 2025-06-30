<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import HeaderTabla from "@/components/HeaderTabla.vue";
import { ref, computed, h, onMounted } from "vue";
import { useRouter } from 'vue-router';
import Tabla from "@/components/Tabla.vue";
import { servicesService } from '@/services/gestionarServicios/services.services.js';

const router = useRouter();

const allServicios = ref([]);
const loadingServicios = ref(false);

onMounted(async () => {
  loadingServicios.value = true;
  try {
    // Valores quemados temporalmente
    allServicios.value = [
      { id: '1', name: 'Corte de Cabello', duration: 30, price: 100, selected: false },
      { id: '2', name: 'Barba', duration: 20, price: 80, selected: false },
      { id: '3', name: 'Coloración', duration: 60, price: 200, selected: false }
    ];
    // Descomenta la siguiente línea para volver a la carga real:
    // allServicios.value = await servicesService.getAllServices();
  } catch (error) {
    alert(error.message || 'Error al cargar servicios');
  } finally {
    loadingServicios.value = false;
  }
});

const searchQuery = ref('');

const filteredServicios = computed(() => {
  if (!searchQuery.value) {
    return allServicios.value;
  }
  const query = searchQuery.value.toLowerCase();
  return allServicios.value.filter(servicio => {
    return servicio.name.toLowerCase().includes(query) ||
      String(servicio.duration).toLowerCase().includes(query) ||
      String(servicio.price).toLowerCase().includes(query);
  });
});

const HeaderTablaServicios = [
  { text: 'Nombre', class: 'flex-grow text-left' },
  { text: 'Duración', class: 'w-[15%] text-center' },
  { text: 'Precio', class: 'w-[15%] text-center' },
  { text: '', class: 'w-[10%] text-center actions-column' },
];

const handleFiltro = () => {
  console.log('Filtro aplicado');
};

const selectedServicios = computed(() => allServicios.value.filter(s => s.selected));

const handleNext = () => {
  console.log('Servicios seleccionados antes de navegar:', selectedServicios.value);
  router.push({
    name: 'SeleccionarHorario',
    params: {
      selectedServices: JSON.stringify(selectedServicios.value)
    }
  });
};

const renderServiciosCeldas = (item, header) => {
  if (header.class.includes('actions-column')) {
    return h('div', { class: 'flex items-center justify-center' }, [
      h('input', {
        type: 'checkbox',
        class: 'h-4 w-4 rounded text-nav-bg custom-checkbox',
        checked: item.selected,
        onChange: (event) => {
          item.selected = event.target.checked;
          console.log(`Servicio "${item.name}" seleccionado: ${item.selected}`);
        }
      })
    ]);
  }
  switch (header.text) {
    case 'Nombre':
      return h('span', item.name);
    case 'Duración':
      return h('span', item.duration);
    case 'Precio':
      return h('span', item.price);
    default:
      return '';
  }
};
</script>

<template>
  <div id="app-container">
    <Navbar />
    <main class="flex-1 pb-12">
      <section class=" max-w-7xl mx-auto mt-6">
        <div class="flex items-center justify-center mb-6">
          <h1 class="text-3xl font-bold text-nav-bg font-maven">Agendar Cita</h1>
        </div>

        <HeaderTabla
            search-placeholder="Buscar cita"
            v-model="searchQuery"
            @filter="handleFiltro"
            :show-add-button="false"
        >
        </HeaderTabla>

        <Tabla
            :headers="HeaderTablaServicios"
            :items="filteredServicios"
            :render-cell="renderServiciosCeldas"
        />
        <div class="flex justify-end mt-8 mb-4 pr-4">
          <button class="btn-primary" @click="handleNext">
            Siguiente
          </button>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<style>
.custom-checkbox {
  accent-color: #0E1B24;
}
</style>
