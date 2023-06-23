const variantNames = [];
const variantsFound = [];

export function processData(data) {

  // finalData will be returned back to AppMain
  let finalData = { productData: [], variantData: [] };

  // Loop through filtered products
  data.filteredData.forEach((product) => {
    // TODO! If automated pricing, add prices to product
    product.price = product.cost * 1.25;

    // TODO! If automated enabling, add enabled to product
    product.enabled = product.quantity > 0 ? 0 : 1;

    

    // Check if product is a variant, if true, add to variant data, otherwise, add to productData
    checkVariant(product, data.filteredData)
      ? finalData.variantData.push(product)
      : finalData.productData.push(product);
  });

  // Add variantsFound to productData list
  finalData.productData = finalData.productData.concat(variantsFound);

  console.log(finalData.productData);
}

function checkVariant(product, filteredData) {
  // variant already found
  if (variantNames.includes(product.name)) {
    return true;
  }

  // check for a new variant, if found, add relevant data to variantName and variantsFound
  if (filteredData.filter((p) => p.name === product.name).length > 1) {
    variantNames.push(product.name);

    // add empty data to temp variant
    let tempVariant = {};

    Object.keys(product).forEach((key) => tempVariant[key] = "");

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
