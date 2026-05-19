import Product from "../models/ProductModel.js";

// get summary

export const getStats = async (req, res) => {
     try {
          const products= await Product.find();
          const totalProducts = await Product.countDocuments();
          const totalStock = products.reduce((t,p)=>(t+p.current_stock),0)
          const stockValue = products.reduce((t,p)=>(t+p.current_stock*p.buying_price),0);
          const lowStock = products.filter((p) => p.current_stock <= p.reorder_level).length;
          const expectedTotalIncome = products.reduce((t,p)=>(t+p.current_stock*p.selling_price),0);
          const totalProfit = expectedTotalIncome - stockValue ;

          return res.json({success:true, products,stockValue,totalProducts,totalStock,lowStock})
     } catch (error) {
          res.json({success:false,message:error.message})
     }
}

// insert
export const insertProduct = async (req, res) => {
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
               res.json({success:false, message: 'You Must fill all field', success: false })
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
          res.json({ success:false,message:error.message || 'Something Wrong' })
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
          const { name, category, unit, buying_price, selling_price,current_stock, reorder_level } = req.body;
          const editProduct = await Product.findByIdAndUpdate({ _id: id }, { name, category, unit, buying_price, selling_price, current_stock, reorder_level });
          if (!editProduct) {
               return res.json({success:false,message:'Product Not Updated'})
          }
          return res.json({success:true,message:`${editProduct.name} Product Update Successfully`})
     } catch (error) {
          res.json({ success:false,message:error.message })
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