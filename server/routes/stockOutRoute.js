import express from 'express'
import {
  selectOneStockOut,
  updateStockOut,
  insertStockOut,
  selectStockOut,
  deleteOneStockOut
} from "../controllers/StockOutController.js";

const stockOutRouter = express.Router()

stockOutRouter.post('/addproduct',insertStockOut)
stockOutRouter.get("/selectall", selectStockOut);
stockOutRouter.get("/selectone", selectOneStockOut);
stockOutRouter.put("/update", updateStockOut);
stockOutRouter.delete("/delete/:id", deleteOneStockOut);

export default stockOutRouter;