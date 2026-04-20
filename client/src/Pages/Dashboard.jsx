import React, { useState } from 'react';
import { FaBox, FaBoxOpen, FaDollarSign } from 'react-icons/fa';
import { MdAddAlert, MdAddBox, MdAlarm, MdCheckBox, MdCrisisAlert, MdDangerous, MdGifBox, MdSdCardAlert } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([
    {
      item: "Shoes",
      qty: "12",
      Amount: "50,000frw",
    },
    {
      item: "Shoes",
      qty: "12",
      Amount: "50,000frw",
    },
    {
      item: "Shoes",
      qty: "12",
      Amount: "50,000frw",
    },
    {
      item: "Shoes",
      qty: "12",
      Amount: "50,000frw",
    },
  ]);
     return (
       <div className="">
         <div className="flex flex-col gap-4 px-2 py-4">
           <div className="">
             <h1 className="text-2xl text-green-500 font-bold">Dashboard</h1>
           </div>
           <div className="bg-white px-10 py-6 rounded-2xl w-full grid md:grid-cols-2 lg:grid-cols-3 gap-9">
             <div className="p-5 flex gap-4 rounded-xl items-center w-90 h-20 border border-l-green-500 border-l-4 border-r-0 border-t-0 border-b-0 shadow-md shadow-olive-400">
               <FaBoxOpen className="text-3xl text-green-500" />
               <div className="">
                 <h1 className="text-xl text-green-500 font-semibold">
                   Total Product
                 </h1>
                 <p className="text-gray-400 text-lg font-semibold">50</p>
               </div>
             </div>
             <div className="p-5 flex gap-4 rounded-xl items-center w-90 h-20 border border-l-blue-500 border-l-4 border-r-0 border-t-0 border-b-0 shadow-md shadow-olive-400">
               <FaDollarSign className="text-3xl text-blue-500" />
               <div className="">
                 <h1 className="text-xl text-blue-500 font-semibold">
                   Stock Value
                 </h1>
                 <p className="text-gray-400 text-lg font-semibold">
                   500,000 FRW
                 </p>
               </div>
             </div>
             <div className="p-5 flex gap-4 rounded-xl items-center w-90 h-20 border border-l-red-500 border-l-4 border-r-0 border-t-0 border-b-0 shadow-md shadow-olive-400">
               <MdDangerous className="text-3xl text-red-500" />
               <div className="">
                 <h1 className="text-xl text-red-500 font-semibold">
                   Low Stock
                 </h1>
                 <p className="text-gray-400 text-lg font-semibold">4</p>
               </div>
             </div>
           </div>
           <div className="">
             <div className="flex flex-col gap-2 rounded-lg bg-white p-4  ">
               <div className="py-2">
                 <h2 className="text-2xl text-green-500 font-bold">Report</h2>
               </div>
               <div className="">
                 <table className="w-full h-50 overflow-hidden rounded-xl shadow-md shadow-gray-400">
                   <thead className="h-10 bg-white border-b-green-500 border border-t-0 border-r-0 border-l-0 cursor-pointer">
                     <tr className=" text-lg text-gray-400">
                       <th>Category</th>
                       <th>Product Price</th>
                       <th>Unity</th>
                       <th>Stock Value</th>
                     </tr>
                   </thead>
                   <tbody className="text-center bg-gray-100">
                     {data.map((item, index) => (
                       <tr
                         key={index}
                         className="text-lg font-mono hover:bg-white hover:border-b-green-500 hover:border hover:border-t-0 hover:border-r-0 hover:border-l-0 cursor-pointer"
                       >
                         <td>{index + 1}</td>
                         <td>{item.item}</td>
                         <td>{item.qty}</td>
                         <td>{item.Amount}</td>
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
