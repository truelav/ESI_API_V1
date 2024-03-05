import Product from "../../models/Product/Product.Schema.js";
import { extractSubcategory, transformPrice } from "../../utils/product.utils.js";

export const updateProductService = (newProducts, row) => {

    const rowCategory = row.Category
    let numPrice = transformPrice(row.Price)
    const [category, subcategory] = extractSubcategory(rowCategory)

    const product = new Product({
        brand: row.Brand,
        model: row.Model,
        description: row.Description,
        category,
        subcategory,
        upc: row.UPC || 'No UPC Provided',
        price: numPrice || 1,
        quantity: row["Qty's"],
        isActive: true
    });

    newProducts.push(product);
}

export const bulkProductOperations = (newProducts) => {
    const bulkOps = newProducts.map((product) => ({
        updateOne: {
            filter: { model: product.model },
            update: {
                $set: {
                    brand: product.brand,
                    model: product.model,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    subcategory: product.subcategory,
                    quantity: product.quantity,
                    upc: product.upc,
                },
            },
            upsert: true, // Creates a new document if no match is found
        },
    }));

    return bulkOps
}