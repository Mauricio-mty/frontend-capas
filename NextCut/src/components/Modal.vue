<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Modal Title',
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<template>
    <div v-if="show" class="fixed inset-0 bg-[rgba(0,0,0,.6)] flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 class="text-2xl font-bold text-nav-bg font-maven mb-6 text-center">{{ title }}</h2>

        <div class="modal-body">
          <slot></slot>
        </div>

      </div>
    </div>
</template>

<style scoped>
</style>