<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  renderCell: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="border border-[#CCCCCC] rounded-md divide-y divide-[#CCCCCC]">
    <!--  Sección Header -->
    <div class="flex bg-gray-50 px-4 py-3 font-bold text-nav-bg text-sm font-roboto">
      <div
          v-for="(header, hIndex) in headers"
          :key="`header-${hIndex}`"
          :class="header.class"
      >
        {{ header.text }}
      </div>
    </div>
    <!--  Sección Body -->
    <div
        v-for="(item, itemIndex) in items"
        :key="`item-${itemIndex}`"
        class="flex items-center px-4 py-3 text-sm text-black font-roboto"
    >
      <div
          v-for="(header, cellIndex) in headers"
          :key="`cell-${itemIndex}-${cellIndex}`"
          :class="header.class"
      >
        <component :is="renderCell(item, header)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-checkbox {
  accent-color: #0E1B24;
}
</style>