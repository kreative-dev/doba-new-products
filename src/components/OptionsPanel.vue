<script setup>
  import { ref } from 'vue';
  import CustomSelect from './input/CustomSelect.vue';
  import CustomNumberInput from './input/CustomNumberInput.vue';

  const options = ref({
    pricingToggle: "Yes",
    pricingValue: 25,
    enabledToggle: "Yes",
    enabledValue: 1
  })

  const toggleOptions = ref(['Yes', 'No'])
</script>

<template>
  <CustomSelect v-model="options.pricingToggle" :label="'Use Automated Pricing?'" :selectOptions="toggleOptions"></CustomSelect>
  <CustomNumberInput v-model="options.pricingValue" :label="'Percentage?'" :min="0"></CustomNumberInput>
  <CustomSelect v-model="options.enabledToggle" :label="'Use Automated Enabled?'" :selectOptions="toggleOptions"></CustomSelect>
  <CustomNumberInput v-model="options.enabledValue" :label="'Enabled Threshold?'" :min="0"></CustomNumberInput>
</template>