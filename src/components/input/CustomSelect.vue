<script setup>
const props = defineProps(["selectOptions", "inputID"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex w-96 justify-between space-x-10">
    <label :for="inputID"><slot>Label</slot></label>
    <select
      :id="inputID"
      @change="$emit('update:modelValue', $event.target.value)"
      class="w-16 rounded-sm border border-gray-800"
    >
      <option v-for="option in selectOptions">{{ option }}</option>
    </select>
  </div>
</template>
