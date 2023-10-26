<script setup>
import UploadPanel from "./UploadPanel.vue";
import OptionsPanel from "./OptionsPanel.vue";
import DownloadPanel from "./DownloadPanel.vue";
import { processData } from "../helpers/DataHelper.js";
import { ref } from "vue";

// The currently shown panel
const currentPanel = ref("UploadPanel");

// The different possible panels are registered here
const panels = {
  UploadPanel,
  OptionsPanel,
  DownloadPanel,
};

// LOOK INTO DEPENDENCY INJECTION
// The data that will be passed to panels
const data = ref({
  filteredData: null,
  options: null,
  finalData: null,
});

// Triggered from UploadPanel after uploading file and clicking Next
function receiveData(filteredData) {
  // Adds the filteredData from UploadPanel to the main data object
  data.value.filteredData = filteredData;

  // Passes data to DataHelper.js, adds the finalData to the main data object
  data.value.finalData = processData(data.value);
  changePanel("OptionsPanel");
}

// Triggered from OptionsPanel after the options are chosen and clicking Next
function receiveOptions(options) {
  // Adds the received options to the option panel
  data.value.options = options;
  changePanel("DownloadPanel");
}

// Changes the panel to the passed string
function changePanel(newPanel) {
  currentPanel.value = newPanel;
}
</script>

<template>
  <div class="mx-auto flex w-11/12 flex-col items-center font-inter">
    <h1 class="mt-8 text-3xl font-bold underline">Doba New Products Tool</h1>
    <div class="mt-12 w-2/3">
      <!-- Main component that switches between the panels, receives panel events, and passes the data object -->
      <component
        :is="panels[currentPanel]"
        @change-panel="changePanel"
        @submit-file="receiveData"
        @submit-options="receiveOptions"
        :data="data"
      ></component>
    </div>
  </div>
</template>
