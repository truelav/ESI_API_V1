import mongoose from "mongoose";
const { Schema } = mongoose;


const JWTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    refreshToken: {
        type: String,
        required: true
    }
})

export default mongoose.model("JWToken", JWTokenSchema);
