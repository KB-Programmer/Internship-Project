import mongoose from "mongoose";

const StockInSchema = mongoose.Schema(
  {
    product: { type: String, required: true },
    category: { type: String, required: true, unique: true },
    qty_recieved: { type: Number, required: true },
    supplier: { type: Number, required: true }
  },
  { timestamps: true },
);

const Stockin = mongoose.model("stockins", StockInSchema);

export default Stockin;
