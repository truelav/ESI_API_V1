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
                default: 1
            },
        },
    ]}, 
    { timestamps: true }
)

export default mongoose.model("Order", OrderSchema);