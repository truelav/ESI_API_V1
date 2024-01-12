import mongoose from "mongoose";
const { Schema } = mongoose;

const RoleSchema = new Schema({
  name: String,
});

export default mongoose.model("Role", RoleSchema);
