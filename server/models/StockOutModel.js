import mongoose from "mongoose";

const StockOutSchema = mongoose.Schema(
  {
    product: { type: String, required: true },
    category: { type: String, required: true, unique: true },
    qty_issued: { type: Number, required: true },
    reason: { type: String, default:'' }
  },
  { timestamps: true },
);

const StockOut = mongoose.model("stockouts", StockOutSchema);

export default StockOut;