<script setup>
  import UploadPanel from './UploadPanel.vue';
  import { processData } from "../helpers/DataHelper.js";
  import { ref } from 'vue';

  const currentPanel = ref('UploadPanel');

  const panels = {
    UploadPanel
  }

  const data = ref({
    filteredData: null,
    options: null,
    finalData: null,
  })

  function receiveData(filteredData) {
    data.value.filteredData = filteredData;
    finalData = processData(data.value);
  }
</script>

<template>

  <component :is="panels[currentPanel]" @submit="receiveData" :data="data"></component>
  
</template>