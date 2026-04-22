import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  unit: { type: String, required: true },
  buying_price: { type: Number, required: true },
  selling_price: { type: Number, required: true },
  current_stock: { type: Number, required: true },
  reorder_level: { type: Number, required: true,default:5,min:[0,'Reorder level must be not negative'] },
},{timestamps:true});

const Product = mongoose.model("product", ProductSchema)

export default Product;