<script setup>
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';

const props = defineProps(['data']);

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

    // use name and description or productName depending on if it is a variant
    if (isVariant) {
      newProduct.productName = product.name;
    } else {
      newProduct.name = product.name;
      newProduct.description = product.description;
    }

    // add value if variants
    if (isVariant) {
      newProduct.value = product.optionOne + ': ' + product.variantOne;
      newProduct.value +=
        product.optionTwo === ''
          ? ''
          : ';' + product.optionTwo + ': ' + product.variantTwo;
    }

    // only add categories if selected in options and is products
    if (props.data.options.categoriesToggle == 'Yes' && !isVariant) {
      newProduct.categories = product.categories;
    }

    // only do automated enabling if selected in options, otherwise add using 1
    if (props.data.options.enabledToggle == 'Yes' && product.quantity !== '') {
      newProduct.enabled =
        parseInt(product.quantity) > props.data.options.enabledValue ? 1 : 0;
    } else {
      newProduct.enabled = 1;
    }

    // if variants, check if it is a main variant, if it's not a variant, just set to 1
    if (isVariant && props.data.finalData.mainVariants.includes(product.sku)) {
      newProduct.showInResults = 1;
    } else if (isVariant) {
      newProduct.showInResults = 0;
    } else if (!isVariant) {
      newProduct.showInResults = 1;
    }

    // only do automated pricing if selected in options, otherwise add using cost, or blank if variant
    if (props.data.options.pricingToggle == 'Yes' && product.cost !== '') {
      newProduct.price =
        parseFloat(product.cost) * (1.0 + parseFloat(props.data.options.pricingValue)/100.0) +
        parseFloat(product.shippingCost);
    } else if (props.data.options.pricingToggle == 'Yes' && product.cost === '') {
      newProduct.price = 0;
    } else {
      newProduct.price = product.cost;
    }

    // applies to both products and variants
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
    type: 'text/csv',
  });

  let fileName = isVariant ? 'doba-variants' : 'doba-products';

  saveAs(productCSV, fileName);
}

// function saveProducts() {
//   // TODO - Add prices and enabled to products if selected in options
//   props.data.finalData.productData.forEach((product) => {
//     if (product.cost !== '') {
//       product.price =
//         parseFloat(product.cost) * 1.25 + parseFloat(product.shippingCost);
//     } else {
//       product.price = 0;
//     }

//     if (product.quantity !== '') {
//       product.enabled = parseInt(product.quantity) > 0 ? 1 : 0;
//     } else {
//       product.enabled = 1;
//     }
//   });

//   // Set up file with papaparse
//   const productCSV = new Blob(
//     [Papa.unparse(props.data.finalData.productData)],
//     {
//       type: 'text/csv',
//     }
//   );

//   saveAs(productCSV, 'doba-products');
// }

// function saveVariants() {
//   // TODO - Add prices, enabled if selected in options, add values
//   props.data.finalData.variantData.forEach((variant) => {
//     if (variant.cost != '') {
//       variant.price =
//         parseFloat(variant.cost) * 1.25 + parseFloat(variant.shippingCost);
//     } else {
//       variant.price = 0;
//     }

//     if (variant.quantity !== '') {
//       variant.enabled = parseInt(variant.quantity) > 0 ? 1 : 0;
//     } else {
//       variant.enabled = 1;
//     }

//     // Replace name with productName
//     variant.productName = variant.name;
//     delete variant.name;

//     // Add values
//     variant.value = variant.optionOne + ': ' + variant.variantOne;
//     variant.value +=
//       variant.optionTwo === ''
//         ? ''
//         : ';' + variant.optionTwo + ': ' + variant.variantTwo;
//   });

//   // Set up file with papaparse
//   const variantCSV = new Blob(
//     [Papa.unparse(props.data.finalData.variantData)],
//     {
//       type: 'text/csv',
//     }
//   );

//   saveAs(variantCSV, 'doba-variants');
// }
</script>

<template>
  <button @click="saveData(false)">Save Products File</button>
  <button @click="saveData(true)">Save Variants File</button>
</template>
