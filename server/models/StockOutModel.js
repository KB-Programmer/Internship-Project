import mongoose from "mongoose";

const StockOutSchema = mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    qty_issued: { type: Number, required: true },
    reason: { type: String, default:'' },
    note: { type: String, default:'' },
  },
  { timestamps: true },
);

const StockOut = mongoose.model("stockouts", StockOutSchema);

export default StockOut;