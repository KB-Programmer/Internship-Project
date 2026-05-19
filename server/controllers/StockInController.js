import Stockin from '../models/StockInModel.js'
import Product from '../models/ProductModel.js'


// insert
export const insertStock = async (req,res) => {
     try {
          const { productId, qty_recieved, supplier,note } = req.body;
          if ( !productId || !qty_recieved ) {
               res.json({ message: 'You Must fill all required field', success: false })
               return;
          }
          const stockin = await Stockin.create({
            productId,
            qty_recieved,
            supplier,
            note,
          });
          await Product.findByIdAndUpdate(productId,{
               $inc:{current_stock:qty_recieved}
          })
          return res.json({success:true,message:`${stockin.productId} Product Added successfully `})
     } catch (error) {
          res.json({success:false,message:error.message})
     }
}

// select 

export const selectStock = async (req, res) => {
     try {
          const listStock = await Stockin.find().populate('productId').sort({createdAt: -1});
          if (!listStock) {
               res.json({ success: true, message: 'No Product Found in Stock, Add Product' })
               return;
          }
          return res.json({success:true,stocks:listStock})
     } catch (error) {
          res.json({message:error.message})
     }
}

// select by id

export const selectOneStock = async(req, res) => {
try {
     const { id } = req.params;
     const oneStock = await Stockin.findById({ _id: id })
     if (!oneStock) {
          res.json({ success: false, message: 'Product not Found' })
          return;
     }
     return res.json({success:true,product:oneStock})
} catch (error) {
     res.json(error.message)
}
}

// update by id 

export const updateStock = async(req,res)=>{
     try {
          const { id } = req.params;
          const { productId, qty_recieved, supplier, note } = req.body;
          const editStock = await Stockin.findByIdAndUpdate(
            { _id: id },
            { productId, qty_recieved, supplier, note },
          );
          if (!editStock) {
               return res.json({success:false,message:'Product in Stock Not Updated'})
          }
          return res.json({success:true,message:`${editStock.productId} Product Stocked Update Successfully`})
     } catch (error) {
          res.json(error.message)
     }
}

// delete by id

export const deleteOneStock = async(req,res)=>{
     try {
          const {id} = req.params;
          const deleteStock = await Stockin.findByIdAndDelete({_id:id})
          if(!deleteStock){
               return res.json({success:false,message:'Product Stock Not deleted'})
          }
          await Product.findByIdAndUpdate(deleteStock.productId,{
               $inc:{current_stock: -deleteStock.qty_recieved}
          })
          return res.json({success:true,message:`${deleteStock.productId?.name} Product Stock Delete Successfully`})
     } catch (error) {
          res.json(error.message)
     }
}