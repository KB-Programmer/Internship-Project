import StockOut from '../models/StockOutModel.js'
import Product from  '../models/ProductModel.js'


// insert
export const insertStockOut = async (req,res) => {
     console.log(req.body)
     try {
          const { productId, qty_issued, reason,note } = req.body;
          if ( !productId ||!qty_issued || !reason ) {
               res.json({ message: 'You Must fill all field', success: false })
               return;
          }
          const quantity = await Product.findById(productId);

          if (quantity.current_stock < qty_issued) {
               return res.json({success:false,message:'Not Enough Stock Available'})
          }
          const stockout = await StockOut.create({
            productId,
            qty_issued,
            reason,
            note
          });
          await Product.findByIdAndUpdate(productId,{
               $inc:{current_stock: -stockout.qty_issued}
          })
          return res.json({success:true,message:`${stockout.productId?.name} Product Remove successfully `})
     } catch (error) {
          res.json({ message:error.message })
     }
}

// select 

export const selectStockOut = async (req, res) => {
     try {
          const listStockOut = await StockOut.find().populate('productId').sort({createdAt: -1});
          if (!listStockOut) {
               res.json({ success: true, message: 'No Product Found in Stock, Remove Product' })
               return;
          }
          return res.json({success:true,stocks:listStockOut})
     } catch (error) {
          res.json(error.message)
     }
}

// select by id

export const selectOneStockOut = async(req, res) => {
try {
     const { id } = req.params;
     const oneStockOut = await StockOut.findById({ _id: id })
     if (!oneStockOut) {
          res.json({ success: false, message: 'Product not Found' })
          return;
     }
     return res.json({success:true,product:oneStockOut})
} catch (error) {
     res.json(error.message)
}
}

// update by id 

export const updateStockOut = async(req,res)=>{
     try {
          const { id } = req.params;
          const { product, category, qty_recieved, reason} = req.body;
          const editStockOut = await StockOut.findByIdAndUpdate(
            { _id: id },
            { product, category, qty_recieved, reason }
          );
          if (!editStockOut) {
               return res.json({success:false,message:'Product Out Stock Not Updated'})
          }
          return res.json({success:true,message:`${editStockOut.product} Product Stocked Out Update Successfully`})
     } catch (error) {
          res.json(error.message)
     }
}

// delete by id

export const deleteOneStockOut = async(req,res)=>{
     try {
          const {id} = req.params;
          const deleteStockOut = await StockOut.findByIdAndDelete({_id:id})
          if(!deleteStockOut){
               return res.json({success:false,message:'Product Stock Out Not deleted'})
          }
          await Product.findByIdAndUpdate(deleteStockOut.productId, {
               $inc:{current_stock: -deleteStockOut.qty_issued}
          })
          return res.json({success:true,message:`${deleteStockOut.productId?.name} Product Stock Out  Delete Successfully`})
     } catch (error) {
          res.json(error.message)
     }
}