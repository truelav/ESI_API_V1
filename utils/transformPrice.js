export const transformProductsForPresentation = (products) => {
  const groupedProducts = {};

  products.forEach((product) => {
      const { category } = product;
      if(!groupedProducts[category]){        
        groupedProducts[category] = [product];
      } else {
        groupedProducts[category].push(product);
      }
  });

  const transformedProducts = Object.entries(groupedProducts).map(
      ([category, products]) => ({
        category,
          products,
      })
  );

  return transformedProducts
}

export const transformProductsBy = (products, transformBy) => {
  const groupedProducts = {};

  products.forEach((product) => {
      const { transformBy } = product;
      if(!groupedProducts[transformBy]){        
        groupedProducts[transformBy] = [product];
      } else {
        groupedProducts[transformBy].push(product);
      }
  });

  const transformedProducts = Object.entries(groupedProducts).map(
      ([transformBy, products]) => ({
        transformBy,
          products,
      })
  );

  return transformedProducts
}


export const extractSubcategory = (category) => {
  
}