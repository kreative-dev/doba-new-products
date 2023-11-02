<script setup>
const props = defineProps(["modelValue", "inputID", "min"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="relative flex w-72 justify-between space-x-6">
    <label :for="inputID"><slot>Label</slot></label>
    <input
      type="number"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :min="min"
      step="1"
      :id="inputID"
      class="w-16 rounded-sm border border-gray-800"
    />
  </div>
</template>
