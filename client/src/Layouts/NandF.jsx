import React, { useState } from "react";
import { NavLink, Link, Outlet, useParams } from "react-router-dom";
import {FaAlignRight, FaArchway, FaArrowAltCircleDown, FaBars, FaBell, FaCaretRight, FaRegArrowAltCircleDown, FaSearch, FaSortDown, FaSortUp, FaTimes, FaUserCircle} from 'react-icons/fa'
import {MdArrowDownward, MdArrowForward, MdArrowUpward, MdDarkMode, MdDashboard, MdDocumentScanner, MdEditDocument, MdInput, MdLightMode, MdNewspaper, MdOutput, MdPreview, MdProductionQuantityLimits, MdReport, MdSettings} from 'react-icons/md'

const NandF = () => {
  
  const [open, setOpen] = useState(false)
  const [mode,setMode]=useState(false)
  return (
    <div className={`${mode ? "dark" : " "} duration-500  dark:bg-black/80`}>
      <div className="flex gap-2  md:items-start flex-col-reverse md:flex-row px-2">
        {/* Navigation Part */}
        <div className="flex justify-center w-full md:w-auto">
          <div
            className={`flex flex-row pt-2 duration-500  mx-5 md:mx-0 justify-around md:flex-col md:justify-between bg-blue-100 dark:bg-black/95 rounded-xl shadow-md mb-5 md:mb-0 md:p-2 w-full h-15  md:static fixed bottom-0 z-60 backdrop-blur-md md:w-64 md:min-h-screen `}
          >
            <div className="flex  flex-row md:flex-col gap-4">
              <div className=" hidden md:flex gap-2  bg-white dark:bg-black/95 rounded-xl  items-center">
                <img
                  src="logo.png"
                  alt=""
                  className="w-10 h-10 md:w-15 md:h-15"
                />
                <h2 className="font-bold text-xl dark:text-white/85 ">
                  Invertory
                </h2>
              </div>
              <div className="">
                <ul className="flex flex-row md:flex-col gap-2 ">
                  <li className="">
                    <NavLink
                      title="Dashboard"
                      to="/"
                      className="text-lg  flex items-center px-2 py-2 gap-2 hover:bg-white dark:text-white/85  hover:rounded-md dark:hover:text-gray-600"
                    >
                      <MdDashboard className="text-xl text-green-500 " />
                      <span className="hidden md:block ">Dashboard</span>
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      title="Products"
                      to="/products"
                      className="text-lg dark:text-white/85  dark:hover:text-gray-600   flex items-center px-2 py-2 gap-2 hover:bg-white hover:rounded-md dark:text-white/85  dark:hover:text-gray-600 "
                    >
                      <MdProductionQuantityLimits className="text-xl text-green-500 " />
                      <span className="hidden md:block">Product</span>
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      title="Stock In"
                      to="/stockin"
                      className="text-lg  flex items-center px-2 py-2 gap-2 hover:bg-white hover:rounded-md dark:text-white/85  dark:hover:text-gray-600 "
                    >
                      <MdArrowUpward className="text-xl text-green-500 " />
                      <span className="hidden md:block">Stock In</span>
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      title="Stock Out"
                      to="/stockout"
                      className="text-lg  flex items-center px-2 py-2 gap-2 hover:bg-white dark:text-white/85  dark:hover:text-gray-600  hover:rounded-md"
                    >
                      <MdArrowDownward className="text-xl text-green-500 " />
                      <span className="hidden md:block">Stock Out</span>
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      title="Reports"
                      to="/reports"
                      className="text-lg  flex items-center px-2 py-2 gap-2 hover:bg-white hover:rounded-md dark:text-white/85  dark:hover:text-gray-600 "
                    >
                      <MdNewspaper className="text-xl text-green-500 " />
                      <span className="hidden md:block">Report</span>
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      title="Settings"
                      to="/setting"
                      className="text-lg  flex items-center px-2 py-2 gap-2 hover:bg-white hover:rounded-md dark:text-white/85  dark:hover:text-gray-600 "
                    >
                      <MdSettings className="text-xl text-green-500 " />
                      <span className="hidden md:block">Setting</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="">
              <button
                onClick={() => setMode(!mode)}
                className={`flex items-center text-md gap-2 mb-0 md:mb-2 ${mode ? "bg-white text-black" : "bg-black text-white"}  px-2 py-2 rounded-md w-full`}
                title={`${mode ? "Light Mode" : "Dark Mode"}`}
              >
                {mode ? <MdLightMode /> : <MdDarkMode />}
                <span className="hidden md:block">
                  {mode ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
            </div>
          </div>
          <FaCaretRight className="fixed z-60 ml-62 mt-40 bg-white rounded-md text-green-500 w-6 h-6 shadow-md p-1 text-center text-xl" />
        </div>
        {/* Main Part */}
        <div className="bg-gray-100 duration-500  dark:bg-black/85 w-full min-h-screen overflow-y-scroll scroll-smooth  rounded-xl p-2 flex-1">
          <div className="flex flex-col gap-2">
            {/* Header Section */}
            <div className="p-2 bg-white duration-500  dark:bg-black/95 rounded-xl">
              <div className="px-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* {open?<FaTimes className="text-xl cursor-pointer" onClick={()=>setOpen(!open)} />:<FaBars className="text-xl cursor-pointer" onClick={()=>setOpen(!open)}/>} */}
                  <h1 className="text-xl font-bold text-green-500 dark:text-white/85">
                    Invertory Management System
                  </h1>
                </div>
                <div className="flex items-center lg:gap-4 md:gap-10 gap-10 ">
                  <div className="">
                    <form action="" className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="Search Here....."
                        className="border-2 pl-7 dark:text-white/85 py-2 rounded-xl outline-none border-green-300 hidden md:hidden lg:block"
                      />
                      <button type="submit" className="absolute left-0 p-2 ">
                        <FaSearch className="text-gray-500 text-xl lg:text-lg" />
                      </button>
                    </form>
                  </div>
                  {/* Profile and Notication */}
                  <div className="flex gap-2 items-center">
                    <div className="flex bg-gray-200 dark:bg-green-400 px-1 py-1 rounded gap-1 md:gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <div className="">
                          <FaUserCircle className="text-3xl text-green-500 dark:text-black" />
                        </div>
                        <div className="hidden md:block">
                          <h2 className="text-md font-bold text-green-500 dark:text-black md:text-md">
                            King Bonheur
                          </h2>
                          <p className="text-sm font-semibold text-gray-500 dark:text-gray-500 md:text-sm">
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
                      <FaBell className="text-2xl text-green-500" />
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
