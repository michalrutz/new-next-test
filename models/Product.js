import mongoose from "mongoose";
const { String, Number } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    unique:true,
    required: [true, "name is required"],
    minlength: [3, "name is shorter than the minimum allowed length (3)"]
  },
  price: {
    type: Number,
    required: [true, "price is required"]
  },
  description: {
    type: String
  },
  mediaUrl: {
    type: String,
    required: true
  }
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
