<script setup>
  defineProps(['modelValue', 'label', 'min']);
  defineEmits(['update:modelValue']);
</script>

<template>
  <label for="input">{{ label }}</label>
  <input type="number" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :min="min" step="1" id="input">
</template>