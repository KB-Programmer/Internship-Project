import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaEye,
  FaTimes,
  FaTrash,
  FaLessThanEqual,
} from "react-icons/fa";
import { MdDelete, MdEdit, MdNoteAlt, MdReadMore } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const StockOut = () => {
  const [stockOutData,setstockOutData]=useState([])
  const [productData, setProductData] = useState([]);
  const [modal, setModal] = useState(false);
  const [search,setSearch] = useState("")
  const [category,setCategory] = useState("")
  const [formData, setFormData] = useState({
    productId: "",
    qty_issued: "",
    reason: "",
    note: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4001/api/stockout/addproduct",
        formData,
      );
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      setFormData({
    productId: "",
    qty_issued: "",
    reason: "",
    note: "",
      });
      setModal(false);
      return toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
    console.log(formData);
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4001/api/stockout/selectall",
      );
      if (!res.data.success) {
        return toast.error("data Not Fetched");
      }
      return setstockOutData(res.data.stocks);
    } catch (error) {
      console.log(error);
    }
  };
  const getProduct = async () => {
    try {
      const res = await axios.get(
       "http://localhost:4001/api/product/selectall",
         );
         setProductData(res.data.products)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchData();
    getProduct();
  }, [handleSubmit || handleDelete]);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete ${name}`)) return;
    try {
      const res = await axios.delete(
        "http://localhost:4001/api/stockout/delete/" + id,
      );
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilter = stockOutData.filter((item) => (
    item.productId?.name.toLowerCase().includes(search.toLocaleLowerCase()) && 
      (
      category == "" || item.productId?.category == category
      )
  ))

  return (
    <div>
      <div className="">
        <div className="flex flex-col gap-2 py-7">
          <div className="flex px-5  items-center justify-between">
            <h1 className="text-xl text-green-500 font-bold dark:text-white">
              Stock Out
            </h1>
            <div
              className="flex w-50 h-12 dark:bg-green-500/70 rounded-lg px-5 bg-green-500 items-center gap-5 text-white font-semibold text-md cursor-pointer"
              onClick={() => {
                setModal(true);
                setFormData({
                  productId: "",
                  qty_issued: "",
                  reason: "",
                  note: "",
                });
              }}
            >
              <FaPlus />
              <span>Add StockOut</span>
            </div>
          </div>
          <div className="f">
            <form
              action=""
              className="flex gap-1 items-center justify-between px-5"
            >
              <div className="w-full">
                <input
                  type="text"
                  className="w-full dark:text-white p-2 rounded-md border-2 border-green-500"
                  placeholder="Search Product ..."
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <select
                name=""
                id=""
                className="dark:bg-green-500/70 p-3 bg-green-500 border-2 border-white rounded-md text-white font-semibold"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="">All Category</option>
                <option value="Electonics">Electonics</option>
                <option value="Stationary">Stationary</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Food">Food</option>
                <option value="Other">Other</option>
              </select>
            </form>
          </div>
        </div>
        <div className="">
          <div className="w-full duration-500 dark:bg-black p-3  rounded-lg bg-gray-200">
            <table className="w-full h-12 overflow-hidden overflow-scroll-auto  rounded-md shadow-md shadow-gray-400 p-4">
              <thead className="h-10 dark:bg-black  p-2 bg-white border-b-green-500 border border-t-0 border-r-0 border-l-0 cursor-pointer">
                <tr className=" text-md text-end font-semibold text-gray-600 ">
                  <th className="px-2 py-4">#</th>
                  <th className="px-2 py-4">Product Name</th>
                  <th className="px-2 py-4">Category</th>
                  <th className="px-2 py-4">Quantity Issued</th>
                  <th className="px-2 py-4">Date</th>
                  <th className="px-2 py-4">Reason</th>
                  <th className="px-2 py-4">Note</th>
                  <th className="px-2 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="px-4 duration-500 dark:bg-black/60 text-end bg-gray-100">
                {handleFilter.length == 0 ? (
                  <tr className="hover:bg-white hover:border-b-green-500 hover:border hover:border-t-0 hover:border-r-0 hover:border-l-0 cursor-pointer">
                    <td
                      colSpan={10}
                      className="text-center p-3 text-lg text-gray-700"
                    >
                      No Product Added
                    </td>
                  </tr>
                ) : (
                  handleFilter.map((item, index) => (
                    <tr
                      key={index}
                      className="h-12 text-lg  hover:bg-white dark:hover:bg-gray-500 dark:text-white/70    hover:border-b-green-500 hover:border hover:border-t-0 hover:border-r-0 hover:border-l-0 cursor-pointer"
                    >
                      <td>{index + 1}</td>
                      <td>{item.productId?.name}</td>
                      <td>{item.productId?.category}</td>
                      <td>{item.qty_issued}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>{item.reason}</td>
                      <td>{item.note}</td>

                      <td className="flex justify-end gap-3 p-3">
                        <FaEye className="text-green-500 dark:text-green-500/70" />
                        <MdDelete
                          className="text-red-500 hover:bg-white dark:text-red-500/70 "
                          onClick={() => {
                            handleDelete(item._id, item.productId?.name);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {modal && (
        <div
          className="fixed inset-0 flex justify-center bg-black/10 dark:bg-black/50"
          onClick={() => {
            setModal(false);
          }}
        >
          <div
            className="z-60 bg-white px-10 dark:bg-black duration-500 rounded-xl h-150 mt-10"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex justify-between items-center py-7">
              <h2 className="dark:text-white/70 text-xl text-green-500 font-semibold">
                Stock New Product
              </h2>
              <FaTimes
                onClick={() => {
                  setModal(false);
                }}
                className="w-7 dark:text-white/70 dark:bg-gray-700 p-1 h-7 bg-gray-200 text-sm text-green-500 rounded-full"
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
                      htmlFor="productId"
                      className="text-md font-semibold dark:text-gray-400 text-gray-700"
                    >
                      Select Product
                    </label>
                    <select
                      value={formData.productId}
                      onChange={handleFormData}
                      name="productId"
                      id=""
                      className="border-2 dark:text-white/70 dark:bg-black border-green-500 rounded-md p-2 focus:outline-blue-400"
                    >
                      <option>Select Product</option>
                      {productData.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name} : Stock {`(${item.current_stock})`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="qty_issued"
                      className="text-md font-semibold text-gray-700 dark:text-gray-400"
                    >
                      Quantity Issued
                    </label>
                    <input
                      value={formData.qty_issued}
                      className="border-2 dark:text-white   border-green-500 rounded-md p-2 focus:outline-blue-400"
                      onChange={handleFormData}
                      type="number"
                      name="qty_issued"
                      placeholder="Enter Quantity Recieced"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="reason"
                      className="text-md font-semibold text-gray-700 dark:text-gray-400"
                    >
                      Reason
                    </label>
                    <select
                      value={formData.reason}
                      onChange={handleFormData}
                      name="reason"
                      id=""
                      className="border-2 border-green-500 dark:text-white/70 dark:bg-black rounded-md p-2 focus:outline-blue-400"
                    >
                      <option>Select Reason</option>
                      <option>Sold</option>
                      <option>Expired</option>
                      <option>Department Consumed</option>
                      <option>Damaged</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="note"
                      className="text-md font-semibold text-gray-700 dark:text-gray-400"
                    >
                      Note
                    </label>
                    <input
                      value={formData.note}
                      className="border-2 dark:text-white  border-green-500 rounded-md p-2 focus:outline-blue-400"
                      onChange={handleFormData}
                      type="text"
                      name="note"
                      placeholder="Enter Short note...."
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="p-2 dark:bg-green-500/50 dark:text-white/70 bg-green-500 rounded-md text-white text-md font-semibold"
                >
                  Create New Product
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockOut;


