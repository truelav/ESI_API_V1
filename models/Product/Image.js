import mongoose from "mongoose";
const { Schema } = mongoose;

const ImageSchema = new Schema(
  {
    name: String,
    data: Buffer,
    contentType: String,
  },
  { timestamps: true }
);

export default mongoose.model("Image", ImageSchema);
