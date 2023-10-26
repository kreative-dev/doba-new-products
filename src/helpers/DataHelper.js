const variantNames = [];
const variantsFound = [];
const firstVariants = [];

export function processData(data) {
  // finalData will be returned back to AppMain
  let finalData = { productData: [], variantData: [], firstVariants: [] };

  // Loop through filtered products
  data.filteredData.forEach((product) => {
    // Check if product is a variant, if true, add to variant data, otherwise, add to productData
    checkVariant(product, data.filteredData)
      ? finalData.variantData.push(product)
      : finalData.productData.push(product);
  });

  // Add variantsFound to productData list
  finalData.productData = finalData.productData.concat(variantsFound);

  // add first variants to finalData
  finalData.firstVariants = firstVariants;

  return finalData;
}

function checkVariant(product, filteredData) {
  // variant already found
  if (variantNames.includes(product.name)) {
    return true;
  }

  // check if name occurs more than once in the list, if so, adds data to variantNames, firstVariants, and variantsFound
  if (filteredData.filter((p) => p.name === product.name).length > 1) {
    // add to variantNames so it skips the duplicates
    variantNames.push(product.name);

    // add variant sku to firstVariants, so the showInResults option can be set
    firstVariants.push(product.sku);

    // add empty data to temp variant, so it matches on the final product spreadsheet
    let tempVariant = {};

    Object.keys(product).forEach((key) => (tempVariant[key] = ""));

    // Add variant data
    tempVariant.name = product.name;
    tempVariant.description = product.description;
    tempVariant.categories = product.categories;
    tempVariant.shippingGroup = product.shippingGroup;

    variantsFound.push(tempVariant);

    return true;
  }

  // not a variant at this point
  return false;
}
