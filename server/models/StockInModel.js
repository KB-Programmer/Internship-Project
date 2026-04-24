import mongoose from "mongoose";

const StockInSchema = mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId,ref:'product' },
    qty_recieved: { type: Number, required: true },
    supplier: { type: String, default:'' },
    note: { type: String, default:'' }
  },
  { timestamps: true },
);

const Stockin = mongoose.model("stockins", StockInSchema);

export default Stockin;
