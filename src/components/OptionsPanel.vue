<script setup>
  import { ref } from 'vue';
  import CustomSelect from './input/CustomSelect.vue';
  import CustomNumberInput from './input/CustomNumberInput.vue';

  const emit = defineEmits(['changePanel', 'submitOptions'])

  const options = ref({
    pricingToggle: "Yes",
    pricingValue: 25,
    enabledToggle: "Yes",
    enabledValue: 1,
    categoriesToggle: "Yes",
  })

  const toggleOptions = ref(['Yes', 'No'])

  function changePanel(newPanel) {
    emit('changePanel', newPanel);
  }

  function submitOptions(newPanel) {
    emit('submitOptions', options);
  }
</script>

<template>
  <div>
  <CustomSelect v-model="options.pricingToggle" :selectOptions="toggleOptions">Use Automated Pricing?</CustomSelect>
  <CustomNumberInput v-model="options.pricingValue" :min="0">Percentage?</CustomNumberInput>
  <CustomSelect v-model="options.enabledToggle" :selectOptions="toggleOptions">Use Automated Enabled?</CustomSelect>
  <CustomNumberInput v-model="options.enabledValue" :min="0">Enabled Threshold?</CustomNumberInput>
  <CustomSelect v-model="categoriesToggle" :selectOptions="toggleOptions">Use Doba Categories?</CustomSelect>
  </div>
  <button @click="changePanel('UploadPanel')">Back</button>
  <button @click="submitOptions">Next</button>
</template>