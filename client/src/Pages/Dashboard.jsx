import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { FaBox, FaBoxOpen, FaDollarSign } from 'react-icons/fa';
import { MdAddAlert, MdAddBox, MdAlarm, MdCheckBox, MdCrisisAlert, MdDangerous, MdGifBox, MdSdCardAlert } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats,setStats] =useState({})
  const [data, setData] = useState([]);

  const getProduct=async()=>{
    try {
      const res = await axios.get('http://localhost:4001/api/product/selectall')
      if (!res.data.success) {
        return alert(res.data.message)
      }
      setData(res.data.products)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getStats = async () => {
    try {
      const res = await axios.get('http://localhost:4001/api/product/stats');
      if (!res.data.success) {
        toast.error('Network Error');
        return;
      }
      return setStats(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  


  useEffect(() => {
    getStats();
    getProduct();
  },[])

    const categories = [...new Set(data.map((p) => p.category))];

    const report = categories.map((ca) => {
      const item = data.filter((p) => p.category === ca);
      const units = item.reduce((s, p) => s + p.current_stock, 0);
      const value = item.reduce(
        (s, p) => s + p.current_stock * p.buying_price,
        0,
      );
      return { ca, product: item.length, units, value };
    });

    const lowAlert = data.map((p) => p.current_stock <= p.reorder_level);
     return (
       <div className="">
         <div className="flex flex-col gap-4 px-2 py-2">
           <div className="">
             <h1 className="text-lg text-green-500 dark:text-white font-bold">
               Dashboard
             </h1>
           </div>
           <div className="bg-white dark:bg-black/95 px-10 py-6 rounded-2xl w-full grid md:grid-cols-3 lg:grid-cols-4 gap-9">
             <div className="p-5 flex gap-4 rounded-xl items-center w-70 h-20 border border-l-green-500 border-l-4 border-r-0 border-t-0 border-b-0 shadow-md shadow-olive-400 dark:shadow-gray-700/90">
               <FaBoxOpen className="text-2xl text-green-500 " />
               <div className="">
                 <h1 className="text-lg text-green-500 dark:text-green-500/70 font-semibold">
                   Total Product
                 </h1>
                 <p className="text-gray-400 text-lg font-semibold">
                   {stats.totalProducts}
                 </p>
               </div>
             </div>
             <div className="p-5 flex gap-4 rounded-xl items-center w-60 h-20 border border-l-orange-500 border-l-4 border-r-0 border-t-0 border-b-0 shadow-md shadow-olive-400 dark:shadow-gray-700/90">
               <FaBoxOpen className="text-2xl text-orange-500" />
               <div className="">
                 <h1 className="text-lg text-orange-500 dark:text-orange-500/70 font-semibold">
                   Total Unit
                 </h1>
                 <p className="text-gray-400 text-md font-semibold">
                   {stats.totalStock}
                 </p>
               </div>
             </div>
             <div className="p-5 flex gap-4 rounded-xl items-center w-60 h-20 border border-l-blue-500 border-l-4 border-r-0 border-t-0 border-b-0 shadow-md shadow-olive-400 dark:shadow-gray-700/90">
               <FaDollarSign className="text-2xl text-blue-500 dark:text-blue-500/70" />
               <div className="">
                 <h1 className="text-lg text-blue-500 dark:text-blue-500/70 font-semibold">
                   Stock Value
                 </h1>
                 <p className="text-gray-400 text-md font-semibold">
                   {stats.stockValue >= 1000
                     ? `${stats.stockValue / 1000}K`
                     : `${stats.stockValue}` || "-"}{" "}
                   FRW
                 </p>
               </div>
             </div>
             <div className="p-5 flex gap-4 rounded-xl items-center w-60 h-20 border border-l-red-500 border-l-4 border-r-0 border-t-0 border-b-0 shadow-md shadow-olive-400 dark:shadow-gray-700/90">
               <MdDangerous className="text-2xl text-red-500 dark:text-red-500/70" />
               <div className="">
                 <h1 className="text-lg text-red-500 dark:text-red-500/70 font-semibold">
                   Low Stock
                 </h1>
                 <p className="text-gray-400 text-md font-semibold">
                   {stats.lowStock}
                 </p>
               </div>
             </div>
           </div>
           <div className="">
             <div className="flex flex-col gap-2 rounded-lg bg-white dark:bg-black/95 p-4  ">
               <div className="py-2">
                 <h2 className="text-xl text-green-500 dark:text-white font-bold">
                   Report
                 </h2>
               </div>
               <div className="">
                 <table className="w-full h-50 overflow-hidden rounded-xl shadow-md shadow-gray-400 dark:shadow-gray-700/20  ">
                   <thead className="h-10 bg-white dark:bg-black/95 border-b-green-500 border border-t-0 border-r-0 border-l-0 cursor-pointer">
                     <tr className=" text-lg text-gray-400">
                       <th>Category</th>
                       <th>Product Price</th>
                       <th>Unity</th>
                       <th>Stock Value</th>
                     </tr>
                   </thead>
                   <tbody className="text-center bg-gray-100">
                     {report.map((item, index) => (
                       <tr
                         key={index}
                         className="text-md dark:text-white/70 font-mono dark:hover:bg-gray-500 hover:bg-white  dark:bg-black/95 hover:border-b-green-500 hover:border hover:border-t-0 hover:border-r-0 hover:border-l-0 cursor-pointer"
                       >
                         <td>{item?.ca}</td>
                         <td>{item?.product}</td>
                         <td>{item?.units}</td>
                         <td>{item?.value.toLocaleString()} FRW</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
           </div>
         </div>
       </div>
     );
}

export default Dashboard;
