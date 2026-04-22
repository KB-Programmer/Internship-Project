import React, { useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast'

const Product = () => {
  const [productData,setProductData] =useState([])
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    unit: "",
    buying_price: "",
    selling_price: "",
    current_stock: "",
    reorder_level: "",
  });
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4001/api/product/addproduct', formData)
      if(!res){
        toast.error(res.data.message)
        return
      }
      setFormData({
            name: "",
    category: "",
    unit: "",
    buying_price: "",
    selling_price: "",
    current_stock: "",
    reorder_level: "",
      })
      setModal(false)
      return toast.success(res.data.message)
    } catch (error) {
      console.log(error)
    }
    console.log(formData)
  } 
const fetchData = async () => {
   try {
    const res= await axios.get('http://localhost:4001/api/product/selectall')
    if(!res){
      return toast.error("data Not Fetched")
    }
    return setProductData(res.data.products)
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
 fetchData();
},[handleSubmit])

  const handleDelete = async(id) => {
    try {
      const res = await axios.delete('http://localhost:4001/api/product/delete/' + id)
      if (!res.data.success) {
        toast.error(res.data.message)
        return
      }
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
    }
  }
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]:value})
  }


     return (
       <div>
         <div className="">
           <div className="flex flex-col gap-2 py-7">
             <div className="flex px-5  items-center justify-between">
               <h1 className="text-2xl text-green-500 font-bold">Products</h1>
               <div
                 className="flex w-50 h-12 rounded-lg px-5 bg-green-500 items-center gap-5 text-white font-semibold text-lg cursor-pointer"
                 onClick={() => {
                   setModal(true);
                 }}
               >
                 <FaPlus />
                 <span>Add Product</span>
               </div>
             </div>
             <div className="f">
               <form
                 action=""
                 className="flex items-center justify-between px-5"
               >
                 <div className="w-full">
                   <input
                     type="text"
                     className="w-full h-10 border-2 border-green-500"
                   />
                 </div>
                 <select name="" id="">
                   <option value="">All Category</option>
                 </select>
               </form>
             </div>
           </div>
           <div className="">
             <div className="">
                <table className="w-full h-12 overflow-hidden rounded-xl shadow-md shadow-gray-400 p-2">
                   <thead className="h-10 p-2 bg-white border-b-green-500 border border-t-0 border-r-0 border-l-0 cursor-pointer">
                     <tr className=" text-lg text-gray-400">
                       <th>#</th>
                       <th>Product Name</th>
                       <th>Category</th>
                       <th>Unit</th>
                       <th>Buying Price</th>
                       <th>Selling Price</th>
                       <th>Current Stock</th>
                       <th>Reoder Level</th>
                       <th>Action</th>
                     </tr>
                   </thead>
                   <tbody className="p-2 text-center bg-gray-100">
                     {productData.map((item, index) => (
                       <tr
                         key={index}
                         className="h-10 text-lg font-mono hover:bg-white hover:border-b-green-500 hover:border hover:border-t-0 hover:border-r-0 hover:border-l-0 cursor-pointer"
                       >
                         <td>{index + 1}</td>
                         <td>{item.name}</td>
                         <td>{item.category}</td>
                         <td>{item.unit}</td>
                         <td>{item.buying_price}</td>
                         <td>{item.selling_price}</td>
                         <td>{item.current_stock}</td>
                         <td>{item.reorder_level}</td>
                         <td><FaTimes /></td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
             </div>
           </div>
         </div>
         {modal && (
           <div
             className="fixed inset-0 flex justify-center bg-black/10"
             onClick={() => {
               setModal(false);
             }}
           >
             <div
               className="z-60 bg-white px-10 rounded-xl h-150 mt-10"
               onClick={(e) => {
                 e.stopPropagation();
               }}
             >
               <div className="flex justify-between items-center py-7">
                 <h2 className="text-2xl text-green-500 font-semibold">
                   Add New Product
                 </h2>
                 <FaTimes
                   onClick={() => {
                     setModal(false);
                   }}
                   className="w-7 p-1 h-7 bg-gray-200 text-md text-green-500 rounded-full"
                 />
               </div>
               <div className="w-full">
                 <form
                   action=""
                   className="w-full flex flex-col gap-5"
                   onSubmit={handleSubmit}
                 >
                   <div className="grid grid-cols-2 gap-4 w-full">
                     <div className="flex flex-col gap-2">
                       <label
                         htmlFor="name"
                         className="text-lg font-semibold text-gray-700"
                       >
                         Product Name
                       </label>
                       <input value={formData.name}
                         onChange={handleFormData}
                         className="border-2 border-green-500 rounded-md p-2 focus:outline-blue-400"
                         type="text"
                         name="name"
                         placeholder="Enter Product Name"
                       />
                     </div>
                     <div className="flex flex-col gap-2">
                       <label
                         htmlFor="category"
                         className="text-lg font-semibold text-gray-700"
                       >
                         Select Category
                       </label>
                       <select value={formData.category}
                         onChange={handleFormData}
                         name="category"
                         id=""
                         className="border-2 border-green-500 rounded-md p-2 focus:outline-blue-400"
                       >
                         <option value="">Select category</option>
                         <option value="Electonics">Electonics</option>
                         <option value="Stationary">Stationary</option>
                         <option value="Cleaning">Cleaning</option>
                         <option value="Food">Food</option>
                         <option value="Other">Other</option>
                       </select>
                     </div>
                     <div className="flex flex-col gap-2">
                       <label
                         htmlFor="unit"
                         className="text-lg font-semibold text-gray-700"
                       >
                         Select Untit
                       </label>
                       <select value={formData.unit}
                         onChange={handleFormData}
                         name="unit"
                         id=""
                         className="border-2 border-green-500 rounded-md p-2 focus:outline-blue-400"
                       >
                         <option value="">Select Unit</option>
                         <option value="Pieces">Pieces</option>
                         <option value="Kg">Kg</option>
                         <option value="Litres">Litres</option>
                         <option value="Box">Box</option>
                         <option value="Ream">Ream</option>
                         <option value="Dozen">Dozen</option>
                       </select>
                     </div>
                     <div className="flex flex-col gap-2">
                       <label
                         htmlFor="buying_price"
                         className="text-lg font-semibold text-gray-700"
                       >
                         Buying Price
                       </label>
                       <input value={formData.buying_price}
                         className="border-2 border-green-500 rounded-md p-2 focus:outline-blue-400"
                         onChange={handleFormData}
                         type="number"
                         name="buying_price"
                         placeholder="Enter Buying Price..."
                       />
                     </div>
                     <div className="flex flex-col gap-2">
                       <label
                         htmlFor="selling_price"
                         className="text-lg font-semibold text-gray-700"
                       >
                         Selling Price
                       </label>
                       <input value={formData.selling_price}
                         className="border-2 border-green-500 rounded-md p-2 focus:outline-blue-400"
                         onChange={handleFormData}
                         type="number"
                         name="selling_price"
                         placeholder="Enter Selling Price...."
                       />
                     </div>
                     <div className="flex flex-col gap-2">
                       <label
                         htmlFor="current_stock"
                         className="text-lg font-semibold text-gray-700"
                       >
                         Current Stock
                       </label>
                       <input value={formData.current_stock}
                         className="border-2 border-green-500 rounded-md p-2 focus:outline-blue-400"
                         onChange={handleFormData}
                         type="number"
                         name="current_stock"
                         placeholder="Enter Current Stock...."
                       />
                     </div>
                     <div className="flex flex-col gap-2">
                       <label
                         htmlFor="reorder_level"
                         className="text-lg font-semibold text-gray-700"
                       >
                         Reorder Qty
                       </label>
                       <input value={formData.reorder_level}
                         className="border-2 border-green-500 rounded-md p-2 focus:outline-blue-400"
                         onChange={handleFormData}
                         type="number"
                         name="reorder_level"
                         placeholder="Enter Reorder Qty"
                       />
                     </div>
                   </div>
                   <button
                     type="submit"
                     className="p-2 bg-green-500 rounded-md text-white text-lg font-semibold"
                   >
                     Create Product
                   </button>
                 </form>
               </div>
             </div>
           </div>
         )}
       </div>
     );
}

export default Product;
