<script setup>
const props = defineProps(['modelValue', 'inputID', 'min']);
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex space-x-10 justify-between w-96">
    <label :for="inputID"><slot>Label</slot></label>
    <input
      type="number"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :min="min"
      step="1"
      :id="inputID"
      class="w-16"
    />
  </div>
</template>
