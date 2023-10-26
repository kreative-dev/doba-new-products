<script setup>
import { ref } from "vue";
import CustomSelect from "./input/CustomSelect.vue";
import CustomNumberInput from "./input/CustomNumberInput.vue";
import CustomToggle from "./input/CustomToggle.vue";
import PanelTemplate from "./PanelTemplate.vue";

const emit = defineEmits(["changePanel", "submitOptions"]);

const options = ref({
  pricingToggle: true,
  pricingValue: 25,
  enabledToggle: "Yes",
  enabledValue: 0,
  categoriesToggle: "Yes",
});

const toggleOptions = ref(["Yes", "No"]);

function changePanel(newPanel) {
  emit("changePanel", newPanel);
}

function submitOptions(newPanel) {
  emit("submitOptions", options);
}
</script>

<template>
  <PanelTemplate>
    <template v-slot:main>
      <CustomToggle
        v-model="options.pricingToggle"
        inputId="pricingToggle"
        class="left-32 place-self-start"
        >Use Automated Pricing</CustomToggle
      >
      <CustomNumberInput
        v-if="options.pricingToggle === true"
        v-model="options.pricingValue"
        :min="0"
        inputID="pricingValue"
        >Percentage?</CustomNumberInput
      >
      <CustomSelect
        v-model="options.enabledToggle"
        :selectOptions="toggleOptions"
        >Use Automated Enabled?</CustomSelect
      >
      <CustomNumberInput
        v-if="options.enabledToggle === 'Yes'"
        v-model="options.enabledValue"
        :min="0"
        inputID="enabledValue"
        >Enabled Threshold?</CustomNumberInput
      >
      <CustomSelect
        v-model="options.categoriesToggle"
        :selectOptions="toggleOptions"
        >Use Doba Categories?</CustomSelect
      >
    </template>
    <template v-slot:buttons>
      <button @click="changePanel('UploadPanel')" class="btn-primary">
        Back
      </button>
      <button @click="submitOptions" class="btn-primary">Next</button>
    </template>
  </PanelTemplate>
</template>
