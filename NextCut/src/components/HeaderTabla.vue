<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  // Placeholder del buscador
  searchPlaceholder: {
    type: String,
    default: 'Buscar...',
  },
  // Valor del input del buscador
  modelValue: {
    type: String,
    default: '',
  },
  // Visibilidad del modal "Agregar"
  showAddModal: {
    type: Boolean,
    default: false,
  },
  // Título del modal "Agregar"
  addModalTitle: {
    type: String,
    default: 'Add New Item',
  },
  // Nueva prop para controlar la visibilidad del botón "Agregar"
  showAddButton: {
    type: Boolean,
    default: true, // Por defecto, el botón es visible
  },
});

// Eventos
const emit = defineEmits(['add', 'update:modelValue', 'filter', 'update:showAddModal']);

// Funciones para manejar eventos
// Busca el input
const onInput = (event) => {
  emit('update:modelValue', event.target.value);
};

// Botón "Agregar" y el modal
const handleAddClick = () => {
  emit('add');
  emit('update:showAddModal', true);
};

//  Botón "Filtrar"
const handleFilterClick = () => {
  emit('filter');
};

// Cerrar el modal
const handleModalClose = () => {
  emit('update:showAddModal', false);
};
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <!-- El botón "Agregar" ahora es condicional -->
    <button v-if="showAddButton" class="btn-primary" @click="handleAddClick">
      Agregar
    </button>
    <!-- Si showAddButton es falso, para mantener el espaciado, podrías necesitar un div vacío o un spacer -->
    <div v-else class="w-auto"></div>

    <div class="flex items-center gap-2">
      <!--  Input de búsqueda -->
      <div class="relative flex items-center">
        <input
            type="text"
            :placeholder="searchPlaceholder"
            :value="modelValue"
            @input="onInput"
            class="w-64 sm:w-auto rounded-md border border-gray-300 shadow-sm py-2 pl-3 pr-10 text-sm"
        />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!--  Filtro -->
      <button class="hover:bg-gray-200 rounded-md py-2 px-3" @click="handleFilterClick">
        <svg class="h-5 w-5 color-[#0E1B24]" fill="#0E1B24" stroke="currentColor" viewBox="0 0 24 24" >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 15.5H14.5V13H9.5V15.5ZM0.75 0.5V3H23.25V0.5H0.75ZM4.5 9.25H19.5V6.75H4.5V9.25Z"></path>
        </svg>
      </button>
    </div>
  </div>

  <!--  Modal -->
  <slot name="add-modal" :show="showAddModal" :title="addModalTitle" :closeModal="handleModalClose"></slot>
</template>

<style scoped>
</style>
