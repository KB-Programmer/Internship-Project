import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
     return (
          <div className='flex gap-2 flex-col justify-center items-center w-full h-screen'>
               <h1 className='text-5xl font-bold text-green-500'>404 Page Not Found</h1>
               <p className='text-xl underline text-blue-500 font-bold'><Link to='/'>Click Here to Back to Dashboard</Link></p>
          </div> 
     );
}

export default NotFound;
