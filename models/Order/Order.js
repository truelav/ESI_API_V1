import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user: {
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        userEmail: String,
    },
    orderSummary: {
        totalAmount: {
            type: Number,
            required: true,
        },
        totalProducts: {
            type: Number,
            required: true,
        },
    },
    products: [
        {
            product: Object,
            cartQuantity: {
                type: Number,
                required: true,
            },
        },
    ]}, 
    { timestamps: true }
)

export default mongoose.model("Order", OrderSchema);