import Stockin from '../models/StockInModel.js'


// insert
export const insertStock = async (req,res) => {
     try {
          const { product, category, qty_recieved, supplier } = req.body;
          if ( !product || !category || !qty_recieved || !supplier ) {
               res.json({ message: 'You Must fill all field', success: false })
               return;
          }
          const stockin = await Stockin.create({
            product,
            category,
            qty_recieved,
            supplier,
          });
          return res.json({success:true,message:`${stockin.product} Product Added successfully `})
     } catch (error) {
          res.json(error.message)
     }
}

// select 

export const selectStock = async (req, res) => {
     try {
          const listStock = await Stockin.find().sort({createdAt: -1});
          if (!listStock) {
               res.json({ success: true, message: 'No Product Found in Stock, Add Product' })
               return;
          }
          return res.json({success:true,stocks:listStock})
     } catch (error) {
          res.json(error.message)
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
          const { product, category, qty_recieved, supplier} = req.body;
          const editStock = await Stockin.findByIdAndUpdate(
            { _id: id },
            { product, category, qty_recieved, supplier }
          );
          if (!editStock) {
               return res.json({success:false,message:'Product in Stock Not Updated'})
          }
          return res.json({success:true,message:`${editStock.product} Product Stocked Update Successfully`})
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
          return res.json({success:true,message:`${deleteStock.product} Product Stock Delete Successfully`})
     } catch (error) {
          res.json(error.message)
     }
}