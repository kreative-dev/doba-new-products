<script setup>
import * as Papa from 'papaparse';

function processFile(event) {
  let file = event.target.files[0];

  if (file.type !== 'text/csv') {
    console.log('Wrong file type');
  } else {
    Papa.parse(file, {
      header: true,
      complete: function (results, file) {
        console.log(results.data);
      },
    });
  }
}
</script>

<template>
  <input type="file" accept="text/csv" @change="processFile" />
</template>
