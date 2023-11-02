<script setup>
import { saveAs } from "file-saver";
import * as Papa from "papaparse";
import PanelTemplate from "./PanelTemplate.vue";

const props = defineProps(["data"]);

const emit = defineEmits(["changePanel"]);

// Create and save the product download, including general products for variants
function saveData(isVariant) {
  // uses either product data or variant data
  let currentData = isVariant
    ? props.data.finalData.variantData
    : props.data.finalData.productData;

  // will be the final list that downloads
  let productDownload = [];

  currentData.forEach((product) => {
    let newProduct = {};

    // name/description - use name and description or productName depending on if it is a variant
    if (isVariant) {
      newProduct.productName = product.name;
    } else {
      newProduct.name = product.name;
      newProduct.description = product.description;
    }

    // value - add value if variants, check for the second variant option
    if (isVariant) {
      newProduct.value = product.optionOne + ": " + product.variantOne;
      newProduct.value +=
        product.optionTwo === ""
          ? ""
          : ";" + product.optionTwo + ": " + product.variantTwo;
    }

    // categories - only add categories if selected in options and is products
    if (props.data.options.categoriesToggle && !isVariant) {
      newProduct.categories = product.categories;
    }

    // enabled - only do automated enabling if selected in options, otherwise add using 1
    if (props.data.options.enabledToggle && product.quantity !== "") {
      newProduct.enabled =
        parseInt(product.quantity) > props.data.options.enabledValue ? 1 : 0;
    } else {
      newProduct.enabled = 1;
    }

    // showInResults - if variants, check if it is a first variant, if it's not a variant, just set to 1
    if (isVariant && props.data.finalData.firstVariants.includes(product.sku)) {
      newProduct.showInResults = 1;
    } else if (isVariant) {
      newProduct.showInResults = 0;
    } else if (!isVariant) {
      newProduct.showInResults = 1;
    }

    // price/cost - only do automated pricing if selected in options, otherwise add using cost, or blank if variant
    if (props.data.options.pricingToggle && product.cost !== "") {
      newProduct.price =
        parseFloat(product.cost) *
          (1.0 + parseFloat(props.data.options.pricingValue) / 100.0) +
        parseFloat(product.shippingCost);
    } else if (props.data.options.pricingToggle && product.cost === "") {
      newProduct.price = 0;
    } else {
      newProduct.price = product.cost;
    }

    // other options applies to both products and variants all of the time
    newProduct.msrp = product.msrp;
    newProduct.cost = product.cost;
    newProduct.shippingCost = product.shippingCost;
    newProduct.images = product.images;
    newProduct.sku = product.sku;
    newProduct.quantity = product.quantity;
    newProduct.shippingGroup = product.shippingGroup;
    newProduct.weight = product.weight;
    newProduct.length = product.length;
    newProduct.width = product.width;
    newProduct.height = product.height;

    productDownload.push(newProduct);
  });

  // Set up file with papaparse
  const productCSV = new Blob([Papa.unparse(productDownload)], {
    type: "text/csv",
  });

  let fileName = isVariant ? "doba-variants" : "doba-products";

  // Uses saveAs plugin to initiate save dialog
  saveAs(productCSV, fileName);
}

// Emits event to change the panel to the passes newPanel
function changePanel(newPanel) {
  emit("changePanel", newPanel);
}
</script>

<template>
  <PanelTemplate>
    <template v-slot:intro>
      <p>
        The files are ready to be downloaded below.
        <span v-if="!props.data.options.pricingToggle"
          >Since you did not use automated prices, you will have to open the
          files and add pricing.</span
        >
        The files can be imported without any other changes. First, import the
        products file with the Products Data Type. Then import the variants file
        with the Variants Data Type.
      </p>
    </template>
    <template v-slot:main>
      <div class="flex space-x-6">
        <!-- Triggers saveData using the Products -->
        <button @click="saveData(false)" class="btn-primary">
          Download Products File
        </button>
        <!-- Triggers saveData using the Variants -->
        <button @click="saveData(true)" class="btn-primary">
          Download Variants File
        </button>
      </div>
    </template>
    <template v-slot:buttons>
      <!-- Returns to the OptionsPanel -->
      <button @click="changePanel('OptionsPanel')" class="btn-primary">
        Back
      </button>
    </template>
  </PanelTemplate>
</template>
