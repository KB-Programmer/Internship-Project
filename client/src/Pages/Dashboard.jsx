import React from 'react';
import { FaBox, FaBoxOpen, FaDollarSign } from 'react-icons/fa';
import { MdAddAlert, MdAddBox, MdAlarm, MdCheckBox, MdCrisisAlert, MdDangerous, MdGifBox, MdSdCardAlert } from 'react-icons/md';

const Dashboard = () => {
     return (
       <div className="">
         <div className="flex flex-col gap-4 px-2 py-4">
           <div className="">
             <h1 className="text-2xl text-green-500 font-bold">Dashboard</h1>
           </div>
           <div className="bg-white px-10 py-6 rounded-2xl w-full grid md:grid-cols-2 lg:grid-cols-3">
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
                 <p className="text-gray-400 text-lg font-semibold">500,000 FRW</p>
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
         </div>
       </div>
     );
}

export default Dashboard;
