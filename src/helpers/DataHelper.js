const variantNames = [];
const variantsFound = [];
const mainVariants = [];

export function processData(data) {
  // finalData will be returned back to AppMain
  let finalData = { productData: [], variantData: [], mainVariants: [] };

  // Loop through filtered products
  data.filteredData.forEach((product) => {
    // Check if product is a variant, if true, add to variant data, otherwise, add to productData
    checkVariant(product, data.filteredData)
      ? finalData.variantData.push(product)
      : finalData.productData.push(product);
  });

  // Add variantsFound to productData list
  finalData.productData = finalData.productData.concat(variantsFound);

  // add main variants to finalData
  finalData.mainVariants = mainVariants;

  return finalData;
}

function checkVariant(product, filteredData) {
  // variant already found
  if (variantNames.includes(product.name)) {
    return true;
  }

  // check for a new variant, if found, add relevant data to variantName and variantsFound
  if (filteredData.filter((p) => p.name === product.name).length > 1) {
    // add to variantNames so it skips the duplicates
    variantNames.push(product.name);

    // add variant sku to main variants
    mainVariants.push(product.sku);

    // add empty data to temp variant
    let tempVariant = {};

    Object.keys(product).forEach((key) => (tempVariant[key] = ''));

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
