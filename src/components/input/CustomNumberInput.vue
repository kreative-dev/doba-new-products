<script setup>
  defineProps(['modelValue', 'min']);
  defineEmits(['update:modelValue']);
</script>

<template>
  <label for="input"><slot>Label</slot></label>
  <input type="number" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :min="min" step="1" id="input">
</template>