import StockOut from '../models/StockOutModel.js'


// insert
export const insertStockOut = async (req,res) => {
     try {
          const { product, category, qty_recieved, reason } = req.body;
          if ( !product || !category || !qty_recieved || !reason ) {
               res.json({ message: 'You Must fill all field', success: false })
               return;
          }
          const stockout = await StockOut.create({
            product,
            category,
            qty_recieved,
            reason,
          });
          return res.json({success:true,message:`${stockout.product} Product Remove successfully `})
     } catch (error) {
          res.json(error.message)
     }
}

// select 

export const selectStockOut = async (req, res) => {
     try {
          const listStockOut = await StockOut.find().sort({createdAt: -1});
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
          return res.json({success:true,message:`${deleteStockOut.product} Product Stock Out  Delete Successfully`})
     } catch (error) {
          res.json(error.message)
     }
}