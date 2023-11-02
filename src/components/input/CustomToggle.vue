<script setup>
const props = defineProps(["inputID", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <label class="after:content relative inline-flex cursor-pointer items-center">
    <label :for="inputId" class="flex cursor-pointer select-none items-center">
      <div class="relative">
        <input
          type="checkbox"
          :id="inputId"
          :checked="modelValue"
          class="peer sr-only"
          @change="$emit('update:modelValue', $event.target.checked)"
        />
        <div
          class="block h-5 w-10 rounded-full border border-gray-400 bg-gray-200 transition-colors peer-checked:border-gray-600 peer-checked:bg-gray-400"
        ></div>
        <div
          class="dot absolute left-1 top-1 h-3 w-3 rounded-full bg-gray-400 transition-all peer-checked:translate-x-5 peer-checked:bg-slate-600"
        ></div>
      </div>
    </label>
    <span class="relative left-2"><slot>Label</slot></span>
  </label>
</template>
