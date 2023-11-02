<script setup>
import * as Papa from "papaparse";
import { ref } from "vue";

import PanelTemplate from "./PanelTemplate.vue";

const emit = defineEmits(["submitFile"]);

// Error message that can show when uploading the file
const error = ref("");

// Array of product objects, filled in checkData, only includes the relevant columns from the original spreadsheet
const filteredData = ref([]);

// Added when uploading the file, just used to show the file name as confirmation
const fileName = ref("");

// Triggered on the change event on the upload input
function processFile(event) {
  let file = event.target.files[0];

  // Displays an error when the file is not a csv
  if (file.type !== "text/csv") {
    error.value = "File is not a CSV";
  } else {
    // Uses papaparse to parse the csv, once done, the data is passed to checkData
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results, file) {
        fileName.value = file.name;
        checkData(results.data);
      },
    });
  }
}

function checkData(data) {
  // Check if SPU NO is on sheet, if not, show error
  if (!Object.keys(data[0]).includes("SPU NO")) {
    error.value = "Not a Doba spreadsheet";
    return;
  }

  // Filter out relevent data, and move into filteredData
  data.forEach((product) => {
    let filteredProduct = {
      sku: product["Item No."],
      name: product["Product Name"].slice(0, 150), // Only takes first 150 characters
      description: product["HTML Description"], // HTML Description instead of Description to preserve formatting
      categories: product["Category"].replaceAll(">>", " > "),
      msrp: product["MSRP (US$)"],
      cost: product["Dropshipping Price (US$)"],
      shippingCost:
        product["Estimate Shipping Cost (US$)"] === "N/A" // Occasionally shippingCost is "N/A", if so, sets it as 0
          ? 0
          : product["Estimate Shipping Cost (US$)"],
      quantity: product["Inventory Qty"],
      length: product["Packaging Size-Length"],
      width: product["Packaging Size-Width"],
      height: product["Packaging Size-Height"],
      weight: product["Packaging Weight"],
      shippingGroup: "Doba",
      optionOne:
        product["Variation Theme 1"].charAt(0).toUpperCase() + // Capitalizes the first letter in the Option name
        product["Variation Theme 1"].slice(1),
      variantOne: product["Variation Value 1"],
      optionTwo:
        product["Variation Theme 2"].charAt(0).toUpperCase() + // Capitalizes the first letter in the Option name
        product["Variation Theme 2"].slice(1),
      variantTwo: product["Variation Value 2"],
    };

    // Merge image columns together and add to filteredProduct
    let imageLinks = product["Product Images 1"];

    // Cycles through the possible Product Images columns, and adds them to imageLinks, separated by a semicolon
    for (let i = 2; i <= 6; i++) {
      if (product["Product Images " + i] !== "") {
        imageLinks += ";" + product["Product Images " + i];
      }
    }

    filteredProduct.images = imageLinks;

    // Each product gets added to filteredData
    filteredData.value.push(filteredProduct);
  });
}

// Sets filtered data back to an empty array, essentially resetting the page
function resetFile() {
  filteredData.value = [];
  error.value = "";
  fileName = "";
}

// Emits submitFile event too AppMain, passes filteredData to be used in the rest of the app
function submitFile() {
  emit("submitFile", filteredData);
}
</script>

<template>
  <PanelTemplate>
    <template v-slot:intro>
      <p>
        Test. This tool can be used to format a Doba Product Feed spreadsheet
        for Warhead. In most cases, the formatted spreadsheet can be then
        imported directly into Warhead. For a video on how to use this tool,
        <a href="/">click here</a>.
      </p>
      <p>
        The first step is to upload a Doba spreadsheet file, which can be
        download from the Doba Inventory List. Make sure to select the Product
        Feeds File file type, and the Products List(.csv) format when
        downloading from Doba.
      </p>
    </template>
    <template v-slot:main>
      <!-- Only shows when filteredData is empty, which means the file has not been uploaded or there was an error -->
      <div v-if="filteredData.length === 0">
        <!-- The actual input is hidden, shows as a button instead using the label -->
        <label for="file-upload" class="btn-primary">Upload Doba File</label>
        <input
          id="file-upload"
          type="file"
          accept="text/csv"
          @change="processFile"
          class="hidden"
        />
        <!-- Shows when an error is added is processFile or checkFile -->
        <p v-if="error" class="mt-4 rounded-md border bg-red-400/75 px-4 py-1">
          {{ error }}
        </p>
      </div>
      <!-- Shows when filtered data has any data, meaning the file is processed -->
      <div v-else>
        <!-- File name is set in processFile, just for confirmation of the correct file -->
        <p
          class="w-fit rounded-md border border-slate-800/75 bg-slate-200 px-4 py-1"
        >
          {{ fileName }}
        </p>
      </div>
    </template>

    <!-- The navigation buttons only show once the filteredData is filled, meaning the file is processed -->
    <template v-slot:buttons v-if="filteredData.length > 0">
      <!-- -->
      <button @click="resetFile" class="btn-primary">Change File</button>
      <button @click="submitFile" class="btn-primary">Next</button>
    </template>
  </PanelTemplate>
</template>
