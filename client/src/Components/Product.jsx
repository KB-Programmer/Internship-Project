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

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [search,setSearch] = useState("")
  const [category,setCategory] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    unit: "",
    buying_price: "",
    selling_price: "",
    current_stock: "",
    reorder_level: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4001/api/product/addproduct",
        formData,
      );
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      setFormData({
        name: "",
        category: "",
        unit: "",
        buying_price: "",
        selling_price: "",
        current_stock: "",
        reorder_level: "",
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
        "http://localhost:4001/api/product/selectall",
      );
      if (!res) {
        return toast.error("data Not Fetched");
      }
      return setProductData(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [handleSubmit || handleDelete || handleEditForm]);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete ${name}`)) return;
    try {
      const res = await axios.delete(
        "http://localhost:4001/api/product/delete/" + id,
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

  const handleEdit = async (p) => {
    setIsEdit(true);
    setModal(true);
    setFormData(p);
  };
  const handleEditForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:4001/api/product/update/${formData._id}`,formData);
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }
      setModal(false)
      toast.success(res.data.message)
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleFilter = productData.filter((item) => (
    item.name.toLowerCase().includes(search.toLocaleLowerCase()) && 
      (
      category == "" || item.category == category
      )
  ))

  return (
    <div>
      <div className="">
        <div className="flex flex-col gap-2 py-7">
          <div className="flex px-5  items-center justify-between">
            <h1 className="text-xl text-green-500 dark:text-white font-bold">
              Products
            </h1>
            <div
              className="flex w-50 h-12 rounded-lg px-5 bg-green-500 dark:bg-green-500/70 items-center gap-5 text-white font-semibold text-md cursor-pointer"
              onClick={() => {
                setModal(true);
                setIsEdit(false);
                setFormData({
                  name: "",
                  category: "",
                  unit: "",
                  buying_price: "",
                  selling_price: "",
                  current_stock: "",
                  reorder_level: "",
                });
              }}
            >
              <FaPlus />
              <span>Add Product</span>
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
                className="p-3 bg-green-500 dark:bg-green-500/70 border-2 border-white rounded-md text-white font-semibold"
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
          <div className="w-full p-3  rounded-lg duration-500 bg-gray-200 dark:bg-black">
            <table className="w-full h-12 overflow-hidden overflow-scroll-auto  rounded-md shadow-md shadow-gray-400 p-4">
              <thead className="h-10 p-2 bg-white dark:bg-black border-b-green-500 border border-t-0 border-r-0 border-l-0 cursor-pointer">
                <tr className=" text-md text-end font-semibold text-gray-600 ">
                  <th className="px-2 py-4">#</th>
                  <th className="px-2 py-4">Product Name</th>
                  <th className="px-2 py-4">Category</th>
                  <th className="px-2 py-4">Unit</th>
                  <th className="px-2 py-4">Buying Price</th>
                  <th className="px-2 py-4">Selling Price</th>
                  <th className="px-2 py-4">Current Stock</th>
                  <th className="px-2 py-4">Reoder Level</th>
                  <th className="px-2 py-4">Status</th>
                  <th className="px-2 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="px-4 text-end bg-gray-100 duration-500 dark:bg-black/60">
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
                      className="h-12 text-lg dark:hover:bg-gray-500 dark:text-white/70  hover:bg-white hover:border-b-green-500 hover:border hover:border-t-0 hover:border-r-0 hover:border-l-0 cursor-pointer"
                    >
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.unit}</td>
                      <td>{item.buying_price}</td>
                      <td>{item.selling_price}</td>
                      <td>{item.current_stock}</td>
                      <td>{item.reorder_level}</td>
                      <td>
                        {item.current_stock <= item.reorder_level ? (
                          <span className="rounded-4xl text-white text-sm  bg-red-300 dark:bg-red-300/70 px-2">
                            Low Stock
                          </span>
                        ) : (
                          <span className="rounded-4xl text-white text-sm  bg-green-500  dark:bg-green-500/70 px-2">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="flex justify-end gap-3 p-3">
                        <FaEye className="text-green-500 dark:text-green-500/70" />
                        <MdEdit
                          className="text-blue-500 dark:text-blue-500/70 "
                          onClick={() => {
                            handleEdit(item);
                          }}
                        />
                        <MdDelete
                          className="text-red-500 dark:text-red-500/70  hover:bg-white "
                          onClick={() => {
                            handleDelete(item._id, item.name);
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
            className="z-60 duration-500 bg-white dark:bg-black  px-10 rounded-xl h-150 mt-10"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex justify-between items-center py-7">
              <h2 className="text-xl text-green-500 dark:text-white/70 font-semibold">
                Add New Product
              </h2>
              <FaTimes
                onClick={() => {
                  setModal(false);
                }}
                className="w-7 p-1 h-7 bg-gray-200 dark:bg-gray-700 text-sm text-green-500 dark:text-white/70  rounded-full"
              />
            </div>
            <div className="w-full">
              <form
                action=""
                className="w-full flex flex-col gap-5"
                onSubmit={isEdit ? handleEditForm : handleSubmit}
              >
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-md font-semibold text-gray-700 dark:text-gray-400"
                    >
                      Product Name
                    </label>
                    <input
                      value={formData.name}
                      onChange={handleFormData}
                      className="border-2 border-green-500 dark:text-white rounded-md p-2 focus:outline-blue-400"
                      type="text"
                      name="name"
                      placeholder="Enter Product Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="category"
                      className="text-md font-semibold text-gray-700 dark:text-gray-400"
                    >
                      Select Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={handleFormData}
                      name="category"
                      id=""
                      className="border-2 border-green-500 dark:text-white/70 dark:bg-black rounded-md p-2 focus:outline-blue-400"
                    >
                      <option value="">Select category</option>
                      <option value="Electonics">Electonics</option>
                      <option value="Stationary">Stationary</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Food">Food</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="unit"
                      className="text-md font-semibold text-gray-700 dark:text-gray-400"
                    >
                      Select Untit
                    </label>
                    <select
                      value={formData.unit}
                      onChange={handleFormData}
                      name="unit"
                      id=""
                      className="border-2 border-green-500 dark:text-white/70 dark:bg-black rounded-md p-2 focus:outline-blue-400"
                    >
                      <option value="">Select Unit</option>
                      <option value="Pieces">Pieces</option>
                      <option value="Kg">Kg</option>
                      <option value="Litres">Litres</option>
                      <option value="Box">Box</option>
                      <option value="Ream">Ream</option>
                      <option value="Dozen">Dozen</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="buying_price"
                      className="text-md font-semibold text-gray-700 dark:text-gray-400"
                    >
                      Buying Price
                    </label>
                    <input
                      value={formData.buying_price}
                      className="border-2 border-green-500 dark:text-white rounded-md p-2 focus:outline-blue-400"
                      onChange={handleFormData}
                      type="number"
                      name="buying_price"
                      placeholder="Enter Buying Price..."
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="selling_price"
                      className="text-md font-semibold text-gray-700 dark:text-gray-400"
                    >
                      Selling Price
                    </label>
                    <input
                      value={formData.selling_price}
                      className="border-2 border-green-500 dark:text-white rounded-md p-2 focus:outline-blue-400"
                      onChange={handleFormData}
                      type="number"
                      name="selling_price"
                      placeholder="Enter Selling Price...."
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="current_stock"
                      className="text-md font-semibold text-gray-700 dark:text-gray-400"
                    >
                      Current Stock
                    </label>
                    <input
                      value={formData.current_stock}
                      className="border-2 border-green-500 dark:text-white rounded-md p-2 focus:outline-blue-400"
                      onChange={handleFormData}
                      type="number"
                      name="current_stock"
                      placeholder="Enter Current Stock...."
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="reorder_level"
                      className="text-md font-semibold text-gray-700 dark:text-gray-400"
                    >
                      Reorder Qty
                    </label>
                    <input
                      value={formData.reorder_level}
                      className="border-2 border-green-500 dark:text-white rounded-md p-2 focus:outline-blue-400"
                      onChange={handleFormData}
                      type="number"
                      name="reorder_level"
                      placeholder="Enter Reorder Qty"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="p-2 bg-green-500 dark:bg-green-500/50 dark:text-white/70 rounded-md text-white text-md font-semibold"
                >
                  {isEdit
                    ? `Edit "${formData.name}" Product`
                    : "Create New Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
