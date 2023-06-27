<script setup>
import * as Papa from 'papaparse';
import { ref } from 'vue';

const emit = defineEmits(["submitFile"]);

const error = ref("");

const filteredData = ref([]);
const fileName = ref("");

function processFile(event) {
  let file = event.target.files[0];

  if (file.type !== 'text/csv') {
    error.value = "File is not a CSV"
  } else {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results, file) {
        fileName.value = file.name;
        checkData(results.data)
      },
    });
  }
}

function checkData(data) {
  // Check if SPU NO is on sheet, if not, show error
  if (!Object.keys(data[0]).includes("SPU NO")) {
    error.value = "Not a Doba spreadsheet"
    return
  }

  // Filter out relevent data, and move into filteredData
  data.forEach(product => {
    let filteredProduct = {
      sku: product["Item No."],
      name: product["Product Name"].slice(0, 150),
      description: product["HTML Description"],
      categories: product["Category"].replaceAll(">>", " > "),      
      msrp: product["MSRP (US$)"],
      cost: product["Dropshipping Price (US$)"],
      shippingCost: product["Estimate Shipping Cost (US$)"] === "N/A" ? 0 : product["Estimate Shipping Cost (US$)"],
      quantity: product["Inventory Qty"],
      length: product["Packaging Size-Length"],
      width: product["Packaging Size-Width"],
      height: product["Packaging Size-Height"],
      weight: product["Packaging Weight"],
      shippingGroup: "Doba",
      optionOne: product["Variation Theme 1"].charAt(0).toUpperCase() + product["Variation Theme 1"].slice(1),
      variantOne: product["Variation Value 1"],
      optionTwo: product["Variation Theme 2"].charAt(0).toUpperCase() + product["Variation Theme 2"].slice(1),
      variantTwo: product["Variation Value 2"],
    }

    // Merge image columns together and add to filteredProduct
    let imageLinks = product["Product Images 1"];

    for (let i = 2; i <= 6; i++) {
      if(product["Product Images " + i] !== "") {
        imageLinks += ";" + product["Product Images " + i];
      }
    }

    filteredProduct.images = imageLinks;

    filteredData.value.push(filteredProduct);
  });
}

function submitFile() {
  emit('submitFile', filteredData);
}

</script>

<template>
  <div v-if="filteredData.length === 0">
    <input type="file" accept="text/csv" @change="processFile" />
    <p v-if="error">{{ error }}</p>
  </div>
  <div v-else>
    <p>{{ fileName }}</p>
    <button @click="submitFile">Next</button>
  </div>
</template>
