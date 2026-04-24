import express from 'express'
import { insertProduct,selectProduct,selectOneProduct,updateProduct,deleteOneProduct,getStats } from '../controllers/ProductController.js'

const productRouter = express.Router()

productRouter.post('/addproduct',insertProduct)
productRouter.post('/stats',getStats)
productRouter.get("/selectall", selectProduct);
productRouter.get("/selectone/:id", selectOneProduct);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/delete/:id", deleteOneProduct);

export default productRouter;