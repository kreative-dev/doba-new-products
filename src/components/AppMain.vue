<script setup>
  import UploadPanel from './UploadPanel.vue';
  import OptionsPanel from './OptionsPanel.vue';
  import DownloadPanel from './DownloadPanel.vue';
  import { processData } from "../helpers/DataHelper.js";
  import { ref } from 'vue';

  const currentPanel = ref('OptionsPanel');

  const panels = {
    UploadPanel,
    OptionsPanel,
    DownloadPanel
  }

  const data = ref({
    filteredData: null,
    options: null,
    finalData: null,
  })

  function receiveData(filteredData) {
    data.value.filteredData = filteredData;
    data.value.finalData = processData(data.value);
    console.log(data.value.finalData);
    currentPanel.value = 'DownloadPanel';
  }
</script>

<template>

  <component :is="panels[currentPanel]" @submit-file="receiveData" :data="data"></component>
  
</template>