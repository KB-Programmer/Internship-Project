import React from 'react';

const Register = () => {
     return (
           <>
             <div className="w-full h-screen  flex flex-col items-center justify-center gap-2 md:flex-row">
               <div className="h-100 w-150 bg-[url('/bg.jpg')] bg-cover bg-center"></div>
                        <div className="w-100 flex flex-col gap-2 p-12">
                             <div className="flex items-center gap-2">
                                  <img src="logo.png" alt="logo" className='h-10 w-auto' />
                                  <h2 className='font-bold text-2xl'>INVENTORY</h2>
                             </div>
                             <div className="flex flex-col">
                                  <h2 className='font-bold text-xl'>Welcome 😊👋</h2>
                                  <p className='text-gray-500'>Manage your Stock Easy and Fast!</p>
                             </div>
                             <form className=' flex flex-col gap-2 '>
                                  <input type="text" className='rounded-md border-2 border-blue-300 px-7 py-2 focus:border-blue-700 outline-none'  placeholder='Enter your Username'/>
                                  <div className="relative flex items-center">
                                       <input  type={show?'text':'password'} className='w-full rounded-md border-2 border-blue-300 px-7 py-2 focus:border-blue-700 outline-none' placeholder='Enter your Password' />
                                       <span className='cursor-pointer absolute right-5 ' onClick={()=>setShow(!show)}>{ show?'🧐':'😆'  }</span>
                                  </div>
                                  <div className="flex justify-between">
                                       <div className="flex gap-2">
                                            <input type="checkbox" />
                                            <p>Remember me</p>
                                       </div>
                                       <Link className='underline text-blue-700' to="/forgot-password">Forgot My Password?</Link>
                                  </div>
                                  <button className='rounded-md px-7 py-2 bg-[#006EC4] text-white text-base font-bold'>Login Now</button>
                                  <Link className='underline text-blue-700' to='/register'>I don't have any account?</Link>
                             </form>
               </div>
             </div>
           </>
     );
}

export default Register;
