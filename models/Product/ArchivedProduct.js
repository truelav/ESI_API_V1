import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
        },
        brand: {
            type: String,
        },
        model: {
            type: String,
        },
        description: {
            type: String,
        },
        category: {
            type: String,
        },
        subcategory: {
            type: String,
            default: "electronics",
        },
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
            default: 1,
        },
        images: {
            type: String,
            default: "/fallback_image.jpeg",
        },
        upc: {
            type: String,
            default: "000000000000"
        },
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
