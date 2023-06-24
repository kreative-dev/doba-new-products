<script setup>
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';

const props = defineProps(['data']);

function saveProducts() {
  // TODO - Add prices and enabled to products if selected in options
  props.data.finalData.productData.forEach((product) => {
    if (product.cost !== '') {
      product.price = parseFloat(product.cost) * 1.25 + parseFloat(product.shippingCost);
    } else {
      product.price = 0;
    }

    if (product.quantity !== '') {
      product.enabled = parseInt(product.quantity) > 0 ? 1 : 0;
    } else {
      product.enabled = 1;
    }
  });

  // Set up file with papaparse
  const productCSV = new Blob(
    [Papa.unparse(props.data.finalData.productData)],
    {
      type: 'text/csv',
    }
  );

  saveAs(productCSV, 'doba-products');
}

function saveVariants() {
  // TODO - Add prices, enabled if selected in options, add values
  props.data.finalData.variantData.forEach((variant) => {
    if (variant.cost != '') {
      variant.price = parseFloat(variant.cost) * 1.25 + parseFloat(variant.shippingCost);
    } else {
      variant.price = 0;
    }

    if (variant.quantity !== '') {
      variant.enabled = parseInt(variant.quantity) > 0 ? 1 : 0;
    } else {
      variant.enabled = 1;
    }

    // Replace name with productName
    variant.productName = variant.name;
    delete variant.name;

    // Add values
    variant.value = variant.optionOne + ': ' + variant.variantOne;
    variant.value +=
      variant.optionTwo === ''
        ? ''
        : ';' + variant.optionTwo + ': ' + variant.variantTwo;
  });

  // Set up file with papaparse
  const variantCSV = new Blob(
    [Papa.unparse(props.data.finalData.variantData)],
    {
      type: 'text/csv',
    }
  );

  saveAs(variantCSV, 'doba-variants');
}
</script>

<template>
  <button @click="saveProducts">Save Products File</button>
  <button @click="saveVariants">Save Variants File</button>
</template>
