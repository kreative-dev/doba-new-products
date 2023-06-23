const variantNames = [];
const variantsFound = [];

export function processData(data) {
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

  console.log(finalData.productData);
  //console.log(finalData.variantData);
}

function checkVariant(product, filteredData) {
  // variant already found
  if (variantNames.includes(product.name)) {
    return true;
  }

  // check for a new variant, if found, add relevant data to variantName and variantsFound
  if (filteredData.filter((p) => p.name === product.name).count > 1) {
    variantNames.push(product.name);
    variantsFound.push({
      name: product.name,
      description: product.description,
      categories: product.categories,
      shippingGroup: product.shippingGroup,
    });
    return true;
  }

  // not a variant at this point
  return false;
}
