<script setup>
defineProps(['selectOptions', 'label']);
defineEmits(['update:modelValue']);


</script>

<template>
  <label for="select">{{ label }}</label>
  <select id="select" @change="$emit('update:modelValue', $event.target.value)">
    <option v-for="option in selectOptions">{{ option }}</option>
  </select>
</template>