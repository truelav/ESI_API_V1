export const extractSubcategory = (rowCategory) => {
  let result = ['unknown', null];

  //   console.log(rowCategory);

  if (!rowCategory) {
    return result;
  }

  if (rowCategory.includes('-')) {
    const firstDashIndex = rowCategory.indexOf('-');
    let category = rowCategory.substring(0, firstDashIndex).trim();
    let subcategory = rowCategory.substring(firstDashIndex + 1).trim();
    result = [category, subcategory];
  } else {
    result[0] = rowCategory;
  }
  return result;
};

export const transformPrice = (price) => {
  if (price && typeof price === 'string' && price[0] === '$') {
    return Number(price.slice(1));
  }
};

export const createCategorySubcategoryArray = (products) => {
  const categories = [];

  products.forEach((product) => {
    const { category, subcategory } = product;

    // Check if category exists
    const existingCategory = categories.find((cat) => cat.name === category);
    if (existingCategory) {
      // Check if subcategory exists within the category
      if (!existingCategory.subcategories.includes(subcategory)) {
        existingCategory.subcategories.push(subcategory);
      }
    } else {
      // If category doesn't exist, create a new category object
      categories.push({ name: category, subcategories: [subcategory] });
    }
  });

  return categories;
};
