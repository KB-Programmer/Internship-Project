import express from 'express'
import {
  selectOneStock,
  updateStock,
  insertStock,
  selectStock,
  deleteOneStock
} from "../controllers/StockInController.js";

const stockInRouter = express.Router()

stockInRouter.post('/addproduct',insertStock)
stockInRouter.get("/selectall", selectStock);
stockInRouter.get("/selectone", selectOneStock);
stockInRouter.put("/update", updateStock);
stockInRouter.delete("/delete/:id", deleteOneStock);

export default stockInRouter;