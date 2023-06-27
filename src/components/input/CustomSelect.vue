<script setup>
defineProps(['selectOptions']);
defineEmits(['update:modelValue']);


</script>

<template>
  <label for="select"><slot>Label</slot></label>
  <select id="select" @change="$emit('update:modelValue', $event.target.value)">
    <option v-for="option in selectOptions">{{ option }}</option>
  </select>
</template>