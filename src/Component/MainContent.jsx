import React, { useContext, useEffect, useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import MainContent2 from "../Component/MainContent2";
import { MdOutlineEdit } from "react-icons/md";
import { FaSort } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../Context";

const MainContent = () => {
  const { allItems, setAllItems } = useContext(Task);
  const [description, setDescription] = useState("");
  const [selectValue, setSelectValue] = useState(1);
  const [title, setTitle] = useState("");
  const [mainTitle, setMainTitle] = useState(() => {
    return getLocalStorage("title") || "Add Title...";
  });
  const [lastUpdateTimeForTitle, setLastUpdateTimeForTitle] = useState(
    Date.now()
  );
  const [timeSinceUpdate, setTimeSinceUpdate] = useState(() => {
    return getLocalStorage("TitleUpdateTime") || "0 minutes ago";
  });
  const [clicked, setClicked] = useState(false);
  const [clearedList, setClearedList] = useState(false);
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Function to get an item from local storage
  function getLocalStorage(name) {
    const storedValue = localStorage.getItem(name);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  // console.log(getLocalStorage("TitleUpdateTime"));

  // Function to set an item in local storage
  const setLocalStorage = (name, value) => {
    return localStorage.setItem(`${name}`, JSON.stringify(value));
  };

  // Function to add a new item to the list
  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
    // Update context state
    setAllItems((prevItems) => [...prevItems, item]);
  };

  // Function to handle changes in the description input field
  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  // Function to delete a specific item from the list
  const handleDelete = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };
  // Function to cancel the clear confirmation popup
  const handleDeleteNo = () => {
    setClearedList(false);
  };

  // Function to confirm and delete all tasks
  const handleDeleteYes = () => {
    const checkLocal = getLocalStorage("items");
    // console.log(checkLocal.length);

    if (checkLocal.length === 0) {
      console.log("local storage is empty");
      toast.warning("There is no task to clear!");
      setClearedList(false);
    } else {
      setItems([]);
      localStorage.removeItem("items");
      toast.success("All tasks cleared!");
      setClearedList(false);
    }
  };

  // Function to show the clear confirmation popup
  const handleClearPopUP = () => {
    setClearedList(true);
  };

  // Function to handle changes in the select dropdown
  const handleSelectChange = (e) => {
    setSelectValue(Number(e.target.value));
  };

  // Function to handle changes in the title input field
  const handletitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Function to handle the form submission for title
  const handletitleSubmit = (e) => {
    e.preventDefault();
    const notify = () => toast.warn("Please add some title!");
    if (!title) {
      return notify();
    }
    setMainTitle(title);
    setLastUpdateTimeForTitle(Date.now());
    setTitle("");
    setClicked(false);
  };

  // Function to toggle the completion status of an item
  const handleToggleCompleted = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    console.log(updatedItems);
    setItems(updatedItems);
    setLocalStorage("items", updatedItems);
  };

  // Function to handle the form submission for adding a new task
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
      id: uuidv4(),
      date: new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date()),
      time: new Date().toLocaleTimeString("en-US"),
    };

    handleAddItems(newItems);

    // Reset form fields
    setDescription("");
    setSelectValue(1);
  };

  // Effect to update local storage whenever the main title changes
  useEffect(() => {
    setLocalStorage("title", mainTitle);
  }, [mainTitle]);

  // Effect to calculate and update the time difference since the last update
  useEffect(() => {
    const updateTimeDifference = () => {
      const currentTime = Date.now();
      const timeElapsed = currentTime - lastUpdateTimeForTitle;

      // Calculate time difference in seconds
      const seconds = Math.floor(timeElapsed / 1000);

      if (seconds < 60) {
        // 1  minutes = 60 seconds
        // Less than a minute ago
        setTimeSinceUpdate(`${seconds} seconds ago`);
      } else if (seconds < 3600) {
        // 1 hour = 3600 seconds
        // Less than an hour ago
        const minutes = Math.floor(seconds / 60);
        setTimeSinceUpdate(`${minutes} minutes ago`);
      } else if (seconds < 86400) {
        // 1 day = 86400 seconds
        // Less than a day ago
        const hours = Math.floor(seconds / 3600);
        setTimeSinceUpdate(`${hours} hours ago`);
      } else {
        // More than a day ago
        const days = Math.floor(seconds / 86400);
        setTimeSinceUpdate(`${days} days ago`);
      }

      // Update local storage
    };

    // Update immediately
    updateTimeDifference();

    // Then update every second
    const intervalId = setInterval(updateTimeDifference, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [lastUpdateTimeForTitle]);

  // Current date formatting for display
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <>
      <main
        className={`p-4 sm:p-8 relative ${
          clicked || clearedList ? "select-none" : ""
        }`}
      >
        <p className="text-gray-500 text-md font-bold my-4">
          Last Update{" "}
          <span>
            <span className="text-blue-500 ">{timeSinceUpdate}</span>
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
            {clicked ? (
              <div
                className={`absolute bg-white border-gray-300 border-2 rounded-lg p-4 sm:p-8 shadow sm:shadow-2xl shadow-[#dfeffa] ${
                  clicked ? "h-[40vh] sm:h-auto" : "h-0"
                } w-[90vw] sm:w-[50vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ease-in-out `}
              >
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
            <p className="text-gray-500 text-md font-bold">Todays Date</p>
            <p className="text-blue-500 font-bold text-lg">{formattedDate}</p>
          </div>
        </div>

        <p className="text-gray-500 text-lg font-semibold my-4">
          What do you want to add here?
        </p>

        {/* Form section */}
        <section className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center p-4  space-y-4 sm:space-y-0 space-x-0 ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-start items-center gap-4 sm:gap-6 w-full sm:w-auto"
          >
            <select
              value={selectValue}
              onChange={handleSelectChange}
              name="numbers"
              id="numbers"
              className="bg-white rounded-md px-4 py-2 border-none outline-none shadow-md focus:shadow-sm w-full sm:w-auto"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Type here..."
                className="outline-none border-none text-gray-600 bg-white py-2 pl-10 pr-2 w-full rounded-md shadow-md focus:shadow-sm"
                value={description}
                onChange={handleChange}
              />
              <MdOutlineEdit
                className="cursor-pointer absolute top-1/2 left-3 transform -translate-y-1/2"
                size={20}
                color="gray"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-md shadow-lg hover:shadow-md hover:bg-blue-600 w-full sm:w-auto"
            >
              Add
            </button>
          </form>

          {clearedList && (
            <div
              className={`absolute bg-white border-gray-300 border-2 rounded-lg p-4 sm:p-8 shadow-md transition-all duration-300 ease-in-out w-[90vw] sm:w-[50vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ${
                clicked ? "h-[40vh] sm:h-auto" : ""
              }`}
            >
              <div className="flex flex-col gap-4 ">
                <p className="text-gray-500 text-lg">
                  Are you sure you want to clear all the items in the list?
                </p>
                <div className="flex justify-end items-center gap-6">
                  <button
                    onClick={handleDeleteNo}
                    className="text-green-500 border-2 border-green-500 px-6 py-2 rounded-md text-center hover:bg-green-700 hover:text-white transition-all duration-300 ease-in-out shadow-md"
                  >
                    No
                  </button>
                  <button
                    onClick={handleDeleteYes}
                    className="text-red-500 border-2 border-red-500 px-6 py-2 rounded-md text-center hover:bg-red-700 hover:text-white transition-all duration-300 ease-in-out shadow-md"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-end items-center gap-4 w-full sm:w-auto relative">
            <div className="flex items-center gap-2 relative w-full sm:w-auto">
              <FaSort
                size={20}
                color="gray"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <select
                name="Sort"
                id="Sort"
                className="bg-white rounded-md pl-10 pr-4 py-2 border-none outline-none shadow-md focus:shadow-sm w-full sm:w-auto"
              >
                <option value="Sort by Input Order">Sort by Input Order</option>
                <option value="Sort by Description">Sort by Description</option>
                <option value="Sort by Packed Status">
                  Sort by Packed Status
                </option>
              </select>
            </div>

            <button
              onClick={handleClearPopUP}
              className="bg-red-500 text-white px-4 text-center sm:px-6 py-2 rounded-md shadow-lg hover:shadow-md hover:bg-red-600 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FaRegTrashCan />
              <span>Clear List</span>
            </button>
          </div>
        </section>

        {/* MainContent2 Component  */}
      </main>
      <MainContent2
        items={items}
        handleDelete={handleDelete}
        handleToggleCompleted={handleToggleCompleted}
      />
      <ToastContainer />
    </>
  );
};

export default MainContent;
