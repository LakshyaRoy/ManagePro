import React, { useEffect, useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import MainContent2 from "../Component/MainContent2";
import { MdOutlineEdit } from "react-icons/md";
import { FaSort } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";

const MainContent = () => {
  const [description, setDescription] = useState("");
  const [selectValue, setSelectValue] = useState(1);
  const [title, setTitle] = useState("");
  const [mainTitle, setMainTitle] = useState("Product design");
  const [clicked, setClicked] = useState(false);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectValue(Number(e.target.value));
  };
  const handletitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handletitleSubmit = (e) => {
    e.preventDefault();
    const notify = () => toast.warn("Please add some title!");
    if (!title) {
      return notify();
    }
    setMainTitle(title);
    setTitle("");
    setClicked(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const notify = () => toast.warn("Please add some description to add task!");
    if (!description) {
      return notify();
    }

    const newItems = {
      description: description,
      selectValue: selectValue,
      isCompleted: false,
      id: Math.floor(Math.random() * 10000000),
      date: new Date().toLocaleDateString("en-GB"),
      time: new Date().toLocaleTimeString("en-GB"),
    };

    console.log(newItems);

    // Reset form fields
    setDescription("");
    setSelectValue(1);
  };

  return (
    <>
      <main className="p-4 sm:p-8 relative">
        <p className="text-gray-500 text-sm font-semibold my-4">
          Last Update{" "}
          <span>
            <span className="text-blue-500">10 minutes ago</span>
          </span>
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center">
          <div className="flex items-end gap-5 mb-4 sm:mb-0">
            <p className="text-[36px] sm:text-[54px] font-bold capitalize">
              {mainTitle}
            </p>
            <MdOutlineEditNote
              size={24}
              sm:size={30}
              color="gray"
              className="cursor-pointer mb-2"
              onClick={() => setClicked((prev) => !prev)}
            />
            {clicked == true ? (
              <div className="absolute bg-white border-gray-300 border-2 rounded-lg p-4 sm:p-8 shadow sm:shadow-2xl shadow-[#dfeffa] ${clicked ? 'h-[40vh] sm:h-auto' : 'h-0'} w-[90vw] sm:w-[50vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ease-in-out">
                <div className="flex flex-col gap-4 relative">
                  <p className="text-gray-500 text-sm font-semibold ">
                    Last Update{" "}
                    <span>
                      <span className="text-blue-500">10 minutes ago</span>
                    </span>
                  </p>
                  <p className="text-gray-500 text-sm font-semibold mb-4 ">
                    <span>Title:</span>{" "}
                    <span>
                      <span className="text-blue-500">{mainTitle}</span>
                    </span>
                  </p>
                  <IoCloseCircleOutline
                    className="absolute top-0 right-0 cursor-pointer text-red-500 hover:text-red-700 "
                    size={30}
                    onClick={() => setClicked((prev) => !prev)}
                  />
                </div>

                <form
                  onSubmit={handletitleSubmit}
                  className="flex flex-col gap-4 w-full  mb-4  sm:mb-0  "
                >
                  <input
                    className="border border-gray-300 p-2 rounded-lg w-full mb-4 outline-none text-lg  font-semibold font-sans  text-[#485565] bg-[#fff]"
                    type="text"
                    value={title}
                    onChange={handletitleChange}
                    placeholder="Enter new title"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:shadow-md"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-end">
            <p className="text-gray-500 text-sm">Created On</p>
            <p className="text-blue-500 font-bold text-md">June 14, 2024</p>
          </div>
        </div>

        <p className="text-gray-500 text-sm font-semibold my-4">
          What do you want to add here?
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-between items-center"
        >
          <div className="flex justify-start items-center gap-4 sm:gap-10 mb-4 sm:mb-0">
            <select
              value={selectValue}
              onChange={(e) => handleSelectChange(e)}
              name="numbers"
              id="numbers"
              className="bg-[#fff] rounded-md px-4 sm:px-6 py-2 border-none outline-none shadow-md focus:shadow-sm"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
                return (
                  <option key={num} value={num}>
                    {num}
                  </option>
                );
              })}
            </select>
            <div className="relative">
              <input
                type="text"
                placeholder="Type here..."
                className="outline-none border-none text-[#485565] bg-[#fff] py-2 pl-10 pr-2 w-full sm:w-96 rounded-md shadow-md focus:shadow-sm"
                value={description}
                onChange={(e) => handleChange(e)}
              />

              <MdOutlineEdit
                className="cursor-pointer absolute top-[10px] left-2"
                size={20}
                color="gray"
              />
            </div>

            <button className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-md shadow-lg hover:shadow-md hover:bg-blue-600">
              Add
            </button>
          </div>
          <div className="flex justify-end items-center gap-4">
            <div className="flex items-center gap-2 relative">
              <FaSort size={20} color="gray" className="absolute left-1" />
              <select
                name="Sort"
                id="Sort"
                className="bg-[#fff] rounded-md px-8 py-2 border-none outline-none shadow-md focus:shadow-sm"
              >
                <option value="Sort by Input Order">Sort by Input Order</option>
                <option value="Sort by Description">Sort by Description</option>
                <option value="Sort by Packed Status">
                  Sort by Packed Status
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white px-4 sm:px-6 py-2 rounded-md shadow-lg hover:shadow-md hover:bg-red-600 flex items-center gap-2"
            >
              <span>
                <FaRegTrashCan />
              </span>
              Clear List
            </button>
          </div>
        </form>

        {/* MainContent2 Component  */}
      </main>
      <MainContent2 />
      <ToastContainer />
    </>
  );
};

export default MainContent;
