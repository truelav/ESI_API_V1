export const extractSubcategory = (categoryRow) => {
    let result = ["unknown", null]

    if(!categoryRow){
        return result
    } 

    if(categoryRow.includes("-")){
        const firstDashIndex = categoryRow.indexOf("-");
        let category = categoryRow.substring(0, firstDashIndex).trim()
        let subcategory = categoryRow.substring(firstDashIndex + 1).trim()
        result = [category, subcategory]
    } else {
        result[0] = categoryRow
    }
    return result
}

export const transformPrice = (price) => {
    if (price && typeof price === "string" && price[0] === "$") {
      return Number(price.slice(1));
    }
};

export const createCategorySubcategoryArray = (products) => {
    const categories = []

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

    return categories
}