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
  enabledToggle: true,
  enabledValue: 0,
  categoriesToggle: true,
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
        class="left-80 place-self-start"
        >Use Automated Pricing</CustomToggle
      >
      <CustomNumberInput
        v-if="options.pricingToggle"
        v-model="options.pricingValue"
        :min="0"
        inputID="pricingValue"
        class="left-96 place-self-start"
        >Markup Percentage?</CustomNumberInput
      >

      <CustomToggle
        v-model="options.enabledToggle"
        inputId="enabledToggle"
        class="left-80 place-self-start"
        >Use Automated Enabled</CustomToggle
      >

      <CustomNumberInput
        v-if="options.enabledToggle"
        v-model="options.enabledValue"
        :min="0"
        inputID="enabledValue"
        class="left-96 place-self-start"
        >Enabled Threshold?</CustomNumberInput
      >

      <CustomToggle
        v-model="options.categoriesToggle"
        inputId="categoriesToggle"
        class="left-80 place-self-start"
        >Use Doba Categories</CustomToggle
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
