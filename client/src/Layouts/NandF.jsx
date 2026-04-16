import React, { useState } from "react";
import { NavLink, Link, Outlet, useParams } from "react-router-dom";
import {FaAlignRight, FaArchway, FaArrowAltCircleDown, FaBars, FaBell, FaCaretRight, FaRegArrowAltCircleDown, FaSearch, FaSortDown, FaSortUp, FaTimes, FaUserCircle} from 'react-icons/fa'
import {MdArrowDownward, MdArrowForward, MdArrowUpward, MdDarkMode, MdDashboard, MdDocumentScanner, MdEditDocument, MdInput, MdLightMode, MdNewspaper, MdOutput, MdPreview, MdProductionQuantityLimits, MdReport, MdSettings} from 'react-icons/md'

const NandF = () => {
  
  const [open, setOpen] = useState(false)
  const [mode,setMode]=useState(false)
  return (
    <div className={`${mode?'dark':' '}`}>
      <div className="flex gap-2 items-center md:items-start flex-col-reverse md:flex-row px-2 pt-2">
        {/* Navigation Part */}
        <div className="flex">
          <div
            className={`flex flex-col justify-between bg-blue-100 dark:bg-black rounded-xl shadow-md mb-5 md:p-2 w-150 h-15  md:static fixed bottom-0 z-60 backdrop-blur-md md:w-64 md:min-h-screen `}
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 bg-white dark:bg-black rounded-xl  items-center">
                <img src="logo.png" alt="" className="w-15 h-15" />
                <h2 className="font-bold text-xl dark:text-white">Invertory</h2>
              </div>
              <div className="">
                <ul className="flex flex-col gap-2 ">
                  <li className="">
                    <NavLink
                      to="/"
                      className="text-lg  flex items-center px-2 py-2 gap-2 hover:bg-white dark:text-white  hover:rounded-md dark:hover:text-gray-600"
                    >
                      <MdDashboard className="text-2xl text-green-500 " />
                      <span className=" ">Dashboard</span>
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to="/products"
                      className="text-lg dark:text-white  dark:hover:text-gray-600   flex items-center px-2 py-2 gap-2 hover:bg-white hover:rounded-md dark:text-white  dark:hover:text-gray-600 "
                    >
                      <MdProductionQuantityLimits className="text-2xl text-green-500 " />
                      <span className="">Product</span>
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to="/stockin"
                      className="text-lg  flex items-center px-2 py-2 gap-2 hover:bg-white hover:rounded-md dark:text-white  dark:hover:text-gray-600 "
                    >
                      <MdArrowUpward className="text-2xl text-green-500 " />
                      <span className="">Stock In</span>
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to="/stockout"
                      className="text-lg  flex items-center px-2 py-2 gap-2 hover:bg-white dark:text-white  dark:hover:text-gray-600  hover:rounded-md"
                    >
                      <MdArrowDownward className="text-2xl text-green-500 " />
                      <span className="">Stock Out</span>
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to="/reports"
                      className="text-lg  flex items-center px-2 py-2 gap-2 hover:bg-white hover:rounded-md dark:text-white  dark:hover:text-gray-600 "
                    >
                      <MdNewspaper className="text-2xl text-green-500 " />
                      <span className="">Report</span>
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to="/setting"
                      className="text-lg  flex items-center px-2 py-2 gap-2 hover:bg-white hover:rounded-md dark:text-white  dark:hover:text-gray-600 "
                    >
                      <MdSettings className="text-2xl text-green-500 " />
                      <span className="">Setting</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="">
              <button
                onClick={() => setMode(!mode)}
                className={`flex items-center text-lg gap-2 mb-2 ${mode?'bg-white text-black':'bg-black text-white'}  px-2 py-2 rounded-md w-full`}
              >
                {mode ? <MdLightMode /> : <MdDarkMode />}
                {mode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
          <FaCaretRight className="fixed z-60 ml-62 mt-40 bg-white rounded-md text-green-500 w-6 h-6 shadow-md p-1 text-center text-2xl" />
        </div>
        {/* Main Part */}
        <div className="bg-gray-100 w-full min-h-screen  rounded-xl p-2 flex-1">
          <div className="flex flex-col gap-2">
            {/* Header Section */}
            <div className="p-2 bg-white rounded-xl">
              <div className="px-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* {open?<FaTimes className="text-xl cursor-pointer" onClick={()=>setOpen(!open)} />:<FaBars className="text-xl cursor-pointer" onClick={()=>setOpen(!open)}/>} */}
                  <h1 className="text-xl font-bold text-green-500">
                    Invertory Management System
                  </h1>
                </div>
                <div className="flex items-center lg:gap-4 md:gap-10 gap-10 ">
                  <div className="">
                    <form action="" className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="Search Here....."
                        className="border-2 pl-7 py-2 rounded-xl outline-none border-green-300 hidden md:hidden lg:block"
                      />
                      <button type="submit" className="absolute left-0 p-2 ">
                        <FaSearch className="text-gray-500 text-2xl lg:text-lg" />
                      </button>
                    </form>
                  </div>
                  {/* Profile and Notication */}
                  <div className="flex gap-2 items-center">
                    <div className="flex bg-gray-200 px-1 py-1 rounded gap-1 md:gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <div className="">
                          <FaUserCircle className="text-4xl text-green-500" />
                        </div>
                        <div className="hidden md:block">
                          <h2 className="text-lg font-bold text-green-500 md:text-md">
                            King Bonheur
                          </h2>
                          <p className="text-md font-semibold text-gray-500 md:text-sm">
                            Admin
                          </p>
                        </div>
                      </div>
                      <div
                        className="duration-300 bg-gray-400 text-center rounded-full"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <FaSortUp className="text-xl text-white" />
                        ) : (
                          <FaSortDown className="text-xl text-white" />
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <FaBell className="text-3xl text-green-500" />
                      <p className="absolute top-0 right-0 bg-red-500 rounded-full text-[11px] text-center w-4 h-4  font-bold text-white ">
                        12
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* search responsive */}
              {/* User Tab responsive */}
              <div
                className={` ${open ? "fixed" : "hidden"} px-2 py-2 rounded-md right-17 w-50 bg-white shadow-md shadow-gray-500`}
              >
                <Link
                  className=" rounded-2xl text-xl text-white bg-red-500 px-12 font-semibold py-1"
                  to="/login"
                >
                  Log Out
                </Link>
              </div>
            </div>
            {/* Body Section */}
            <div className="">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NandF;
