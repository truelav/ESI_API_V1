import mongoose from "mongoose";
const { Schema } = mongoose;

const PresentationSchema = new Schema(
  {
    presentationName: String,
    name: {
      type: String,
    },
    brand: {
      type: String,
    },
    description: String,
    category: {
      type: String,
    },
    subcategory: String,
    quantity: {
      type: Number,
    },
    price: Number,
    images: [String],
    location: String,
  },
  { timestamps: true }
);

export default mongoose.model("Presentation", PresentationSchema);
