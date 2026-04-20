import React,{useState} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdAppRegistration } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Register = () => {
  const nav = useNavigate();
  const [show, setShow] = useState(false)
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password:''
  })
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setData({...data,[name]:value})
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirm_password) {
      toast.error("Your password not the same");
    } else if (
      data.username === "" ||
      data.email === "" ||
      data.password === "" ||
      data.confirm_password === ""
    ) {
      toast.error('You must fill all field')
    } else {
      axios.post('http://localhost:4001/api/register', data).then((res) => {
        toast.success(`${res.data.Message}`)
        nav('/login')
      }).catch(err=>console.log(err))
    }
  }
     return (
       <>
         <div className="w-full h-screen  flex flex-col items-center justify-center gap-2 md:flex-row">
           <div className="h-150 w-150 bg-[url('/bg-r.jpg')] bg-cover bg-center"></div>
           <div className="w-100 flex flex-col gap-2 p-12">
             <div className="flex items-center gap-2">
               <img src="logo.png" alt="logo" className="h-10 w-auto" />
               <h2 className="font-bold text-2xl"><b className='text-[#006EC4]'>  Register</b>  INVENTORY</h2>
             </div>
             <div className="flex flex-col gap-2">
               <h2 className="font-bold text-xl">Welcome! 😊👋</h2>
               <p className="flex items-center gap-2 text-gray-500">
                 <MdAppRegistration className='text-4xl'/>
                 Register to Manage your Stock Easy and Fast!
               </p>
             </div>
             <form className=" flex flex-col gap-2 " onSubmit={handleFormSubmit}>
               <input name='username' onChange={handleFormData}
                 type="text"
                 className="rounded-md border-2 border-blue-300 px-7 py-2 focus:border-blue-700 outline-none"
                 placeholder="Enter your Username"
               />
               <input name='email' onChange={handleFormData}
                 type="email"
                 className="rounded-md border-2 border-blue-300 px-7 py-2 focus:border-blue-700 outline-none"
                 placeholder="Enter your Email"
               />
               <div className="relative flex items-center">
                 <input name='password' onChange={handleFormData}
                   type={show ? "text" : "password"}
                   className="w-full rounded-md border-2 border-blue-300 px-7 py-2 focus:border-blue-700 outline-none"
                   placeholder="Enter your Password"
                 />
                 <span
                   className="cursor-pointer absolute right-5 "
                   onClick={() => setShow(!show)}
                 >
                   {show ? <FaEyeSlash/> : <FaEye/>}
                 </span>
               </div>
               <div className="relative flex items-center">
                 <input name='confirm_password' onChange={handleFormData}
                   type={show ? "text" : "password"}
                   className="w-full rounded-md border-2 border-blue-300 px-7 py-2 focus:border-blue-700 outline-none"
                   placeholder="Confirm your Password"
                 />
                 <span
                   className="cursor-pointer absolute right-5 "
                   onClick={() => setShow(!show)}
                 >
                   {show ? <FaEyeSlash/> : <FaEye/>}
                 </span>
               </div>
               <button type='submit' className="rounded-md px-7 py-2 bg-[#006EC4] text-white text-base font-bold cursor-pointer">
                 Register Now
               </button>
               <Link className="text-blue-700 hover:underline" to="/login">
                 Already have any account? Log in here!
               </Link>
             </form>
           </div>
         </div>
       </>
     );
}

export default Register;
