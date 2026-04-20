import React from 'react';
import { FaPlus } from 'react-icons/fa';

const Product = () => {
     return (
          <div>
               <div className="">
                    <div className="">
                         <div className="flex px-5 py-10 items-center justify-between">
                              <h1 className='text-2xl text-green-500 font-bold'>Products</h1>
                              <div className="flex w-50 h-12 rounded-lg px-5 bg-green-500 items-center gap-5 text-white font-semibold text-lg">
                                   <FaPlus />
                                   <span>Add Product</span>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default Product;
