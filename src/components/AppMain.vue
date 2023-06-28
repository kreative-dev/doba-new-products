<script setup>
import UploadPanel from './UploadPanel.vue';
import OptionsPanel from './OptionsPanel.vue';
import DownloadPanel from './DownloadPanel.vue';
import { processData } from '../helpers/DataHelper.js';
import { ref } from 'vue';

const currentPanel = ref('UploadPanel');

const panels = {
  UploadPanel,
  OptionsPanel,
  DownloadPanel,
};

const data = ref({
  filteredData: null,
  options: null,
  finalData: null,
});

function receiveData(filteredData) {
  data.value.filteredData = filteredData;
  data.value.finalData = processData(data.value);
  console.log(data.value.finalData);
  currentPanel.value = 'OptionsPanel';
}

function receiveOptions(options) {
  data.value.options = options;
  currentPanel.value = 'DownloadPanel';
}

function changePanel(newPanel) {
  currentPanel.value = newPanel;
}
</script>

<template>
  <div
    class="bg-slate-300 w-11/12 mx-auto flex flex-col items-center font-inter"
  >
    <h1 class="font-bold text-3xl mt-8 underline ">Doba New Products Tool</h1>
    <div class="mt-12 w-2/3">
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
