<script setup>
const props = defineProps(['selectOptions', 'inputID']);
const emit = defineEmits(['update:modelValue']);


</script>

<template>
  <div class="flex space-x-10 justify-between w-96">
  <label :for="inputID"><slot>Label</slot></label>
  <select :id="inputID" @change="$emit('update:modelValue', $event.target.value)" class="w-16 border border-gray-800 rounded-sm">
    <option v-for="option in selectOptions">{{ option }}</option>
  </select>
  </div>
</template>