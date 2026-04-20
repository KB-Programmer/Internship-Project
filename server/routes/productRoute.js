import express from 'express'
import { insertProduct,selectProduct,selectOneProduct,updateProduct,deleteOneProduct } from '../controllers/ProductController.js'

const productRouter = express.Router()

productRouter.post('/addproduct',insertProduct)
productRouter.get("/selectall", selectProduct);
productRouter.get("/selectone", selectOneProduct);
productRouter.put("/update", updateProduct);
productRouter.delete("/delete", deleteOneProduct);

export default productRouter;