import Product from "../models/ProductModel.js";

// insert
export const insertProduct = async (req, res) => {
     console.log(req.body)
     try {
          const {
            name,
            category,
            unit,
            buying_price,
            selling_price,
            current_stock, 
            reorder_level,
          } = req.body;
          if ( !name || !category || !unit || !buying_price || !selling_price || !reorder_level) {
               res.json({ message: 'You Must fill all field', success: false })
               return;
          }
          const product = await Product.create({
            name,
            category,
            unit,
            buying_price,
            selling_price,
            current_stock,
            reorder_level,
          });
          if (!product) {
              res.json({success:false,message:'Product Not Inserted'}) 
          }
          return res.json({success:true,message:`${product.name} Product created successfully `})
     } catch (error) {
          res.json({ message:error.message || 'Something Wrong' })
     }
}

// select 

export const selectProduct = async (req, res) => {
     try {
          const listProduct = await Product.find().sort({createdAt: -1});
          if (!listProduct) {
               res.json({ success: false, message: 'No Product Found, Insert Product' })
               return;
          }
          return res.json({success:true,products:listProduct})
     } catch (error) {
          res.json(error.message)
     }
}

// select by id

export const selectOneProduct = async(req, res) => {
try {
     const { id } = req.params;
     const oneProduct = await Product.findById({ _id: id })
     if (!oneProduct) {
          res.json({ success: false, message: 'Product not Found' })
          return;
     }
     return res.json({success:true,product:oneProduct})
} catch (error) {
     res.json(error.message)
}
}

// update by id 

export const updateProduct = async(req,res)=>{
     try {
          const { id } = req.params;
          const { name, category, unit, buying_price, selling_price, reorder_level } = req.body;
          const editProduct = await Product.findByIdAndUpdate({ _id: id }, { name, category, unit, buying_price, selling_price, reorder_level });
          if (!editProduct) {
               return res.json({success:false,message:'Product Not Updated'})
          }
          return res.json({success:true,message:`${editProduct.name} Product Update Successfully`})
     } catch (error) {
          res.json(error.message)
     }
}

// delete by id

export const deleteOneProduct = async(req,res)=>{
     try {
          const {id} = req.params;
          const deleteProduct = await Product.findByIdAndDelete({_id: id})
          if(!deleteProduct){
               return res.json({success:false,message:'Product Not deleted'})
          }
          return res.json({success:true,message:`${deleteProduct.name} Product Delete Successfully`})
     } catch (error) {
          res.json(error.message)
     }
}