<script setup>
  import { ref } from 'vue';
  import CustomSelect from './input/CustomSelect.vue';
  import CustomNumberInput from './input/CustomNumberInput.vue';
  import PanelTemplate from './PanelTemplate.vue';

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
  <PanelTemplate>
    <template v-slot:main>
      <CustomSelect v-model="options.pricingToggle" :selectOptions="toggleOptions">Use Automated Pricing?</CustomSelect>
      <CustomNumberInput v-if="options.pricingToggle === 'Yes'" v-model="options.pricingValue" :min="0" inputID="pricingValue">Percentage?</CustomNumberInput>
      <CustomSelect v-model="options.enabledToggle" :selectOptions="toggleOptions">Use Automated Enabled?</CustomSelect>
      <CustomNumberInput v-if="options.enabledToggle === 'Yes'" v-model="options.enabledValue" :min="0" inputID="enabledValue">Enabled Threshold?</CustomNumberInput>
      <CustomSelect v-model="categoriesToggle" :selectOptions="toggleOptions">Use Doba Categories?</CustomSelect>
    </template>
    <template v-slot:buttons>
  <button @click="changePanel('UploadPanel')" class="btn-primary">Back</button>
  <button @click="submitOptions" class="btn-primary">Next</button>
  </template>
  </PanelTemplate>
</template>