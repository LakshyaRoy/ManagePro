import { useContext, useEffect, useState } from "react";
import MainContent2 from "../Component/MainContent2";
import {
  MdOutlineEditNote,
  MdOutlineEdit,
  MdOutlineSort,
  MdDeleteOutline,
  MdClose,
  MdArrowDropDown,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../Context";

const MainContent = () => {
  const { allItems, setAllItems } = useContext(Task);
  const [selectValue, setSelectValue] = useState(1);
  const [mainTitle, setMainTitle] = useState(() => {
    return getLocalStorage("title") || "Add Title...";
  });
  const [timeSinceUpdate, setTimeSinceUpdate] = useState("");
  const [clicked, setClicked] = useState(false);
  const [clearedList, setClearedList] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sort by Input Order");

  // console.log(selectedOption);

  // Function to get an item from local storage
  function getLocalStorage(name) {
    const storedValue = localStorage.getItem(name);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  // Function to set an item in local storage
  const setLocalStorage = (name, value) => {
    return localStorage.setItem(`${name}`, JSON.stringify(value));
  };

  // Function to add a new item to the list
  const handleAddItems = (item) => {
    // Update context state
    // console.log(item);

    if (allItems !== null) {
      setAllItems([...allItems, item]);
      setLocalStorage("items", [...allItems, item]);
    } else {
      setAllItems([item]);
      setLocalStorage("items", [item]);
    }
  };
  // console.log(allItems);

  // Function to delete a specific item from the list
  const handleDelete = (id) => {
    setAllItems((items) => items.filter((item) => item.id !== id));
    setLocalStorage(
      "items",
      allItems.filter((item) => item.id !== id)
    );
  };
  // Function to cancel the clear confirmation popup
  const handleDeleteNo = () => {
    setClearedList(false);
  };

  // Function to confirm and delete all tasks
  const handleDeleteYes = () => {
    try {
      const checkLocal = JSON.parse(localStorage.getItem("items"));

      if (!checkLocal || checkLocal.length === 0) {
        console.log("Local storage is empty");
        toast.warning("There is no task to clear!");
        setClearedList(false);
      } else {
        setAllItems([]);
        localStorage.removeItem("items");
        toast.success("All tasks cleared!");
        setClearedList(false);
      }
    } catch (error) {
      console.error("Error accessing local storage:", error);
      toast.error("An error occurred while clearing tasks!");
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

  // Function to handle the form submission for title
  const handletitleSubmit = (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    if (!title) {
      return toast.warn("Please add some title!");
    }
    setMainTitle(title);
    setLocalStorage("title", title);
    setLocalStorage("TitleTime", new Date().toISOString());
    updateTimeDifference();
    setClicked(false);
  };

  // Function to toggle the completion status of an item
  const handleToggleCompleted = (id) => {
    const updatedItems = allItems?.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setAllItems(updatedItems);
    setLocalStorage("items", updatedItems);
  };

  // Function to handle the form submission for adding a new task
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectValue = e.target[0].value;
    const description = e.target[1].value;
    const notify = () => toast.warn("Please add some description to add task!");
    if (!description) {
      return notify();
    }
    const newItems = {
      description: description,
      selectValue: selectValue,
      isCompleted: false,
      id: uuidv4(),
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString("en-US"),
    };

    handleAddItems(newItems);

    // Reset form fields
    e.target.reset();
    setSelectValue(1);
  };

  const updateTimeDifference = () => {
    const lastUpdatedTime = getLocalStorage("TitleTime");
    const today =
      new Date().toDateString() === new Date(lastUpdatedTime).toDateString();
    if (today) {
      const hours =
        new Date().getHours() - new Date(lastUpdatedTime).getHours();
      const minutes =
        new Date().getMinutes() - new Date(lastUpdatedTime).getMinutes();

      const totalMinutes = hours * 60 + minutes;

      if (totalMinutes >= 60) {
        const totalHours = Math.floor(totalMinutes / 60);
        return setTimeSinceUpdate(`${totalHours} hours ago!`);
      }

      return setTimeSinceUpdate(`${totalMinutes} minutes ago!`);
    }

    setTimeSinceUpdate(new Date(lastUpdatedTime).toDateString());
  };
  // Effect to calculate and update the time difference since the last update
  useEffect(() => {
    const getTitleTimeFromLocalStorage = getLocalStorage("TitleTime");
    if (getTitleTimeFromLocalStorage !== null) {
      updateTimeDifference();
      const today =
        new Date().toDateString() ===
        new Date(getTitleTimeFromLocalStorage).toDateString();
      const interval = setInterval(() => {
        updateTimeDifference();
      }, 1000 * 60);

      if (!today) {
        clearInterval(interval);
      }
    }
  }, []);

  const [sortedItems, setSortedItems] = useState([]);
  const sortItems = () => {
    if (allItems === null) {
      setAllItems([]);
    }
    if (allItems !== null && allItems.length > 0) {
      switch (selectedOption) {
        case "Sort by Input Order":
          setSortedItems([...allItems]);
          break;

        case "Sort by Description":
          setSortedItems(
            [...allItems].sort((a, b) =>
              a.description.localeCompare(b.description)
            )
          );
          break;

        case "Sort by Completed Status":
          setSortedItems(
            [...allItems].sort(
              (a, b) => Number(b.isCompleted) - Number(a.isCompleted)
            )
          );
          break;

        default:
          setSortedItems([]);
          break;
      }
    } else {
      setSortedItems([]);
    }
  };

  useEffect(() => {
    sortItems();
  }, [allItems, selectedOption]);

  // console.log(sortedItems);

  return (
    <>
      <main
        className={`p-4 sm:p-8 w-full h-full relative ${
          clicked || clearedList ? "select-none" : ""
        }`}
      >
        {timeSinceUpdate.length > 0 ? (
          <p className="text-gray-500 text-md font-bold my-4">
            Last Update{" "}
            <span>
              <span className="text-blue-500 ">{timeSinceUpdate}</span>
            </span>
          </p>
        ) : null}

        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center">
          <div className="flex items-end gap-5 mb-4 sm:mb-0">
            <h1
              className="text-[36px] sm:text-[54px] font-bold capitalize"
              title={mainTitle}
            >
              {mainTitle}
            </h1>
            <MdOutlineEditNote
              size={24}
              sm:size={30}
              color="gray"
              className="cursor-pointer mb-2"
              onClick={() => setClicked((prev) => !prev)}
              title="Click to edit title"
            />
            {clicked ? (
              <div
                className={`absolute bg-white border-gray-300 border-2 rounded-lg p-4 sm:p-8 shadow sm:shadow-2xl shadow-[#dfeffa] ${
                  clicked ? " sm:h-auto" : "h-0"
                } w-[90vw] sm:w-[50vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ease-in-out `}
              >
                <div className="flex flex-col gap-4 relative">
                  <p className="text-gray-500 text-sm font-semibold mb-4 ">
                    <span>Title:</span>{" "}
                    <span>
                      <span className="text-blue-500">{mainTitle}</span>
                    </span>
                  </p>
                  <MdClose
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
                    name="title"
                    title="Enter title"
                    className="border border-gray-300 p-2 rounded-lg w-full mb-4 outline-none text-lg  font-semibold font-sans  text-[#485565] bg-[#fff]"
                    type="text"
                    placeholder="Enter new title"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg  hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-end">
            <p className="text-gray-500 text-md font-bold">Todays Date</p>
            <p className="text-blue-500 font-bold text-lg">
              {new Date().toDateString()}
            </p>
          </div>
        </div>

        <p className="text-gray-500 text-lg font-semibold my-4">
          What do you want to add here?
        </p>

        {/* Form section */}
        <section className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center p-4  space-y-4 sm:space-y-0 space-x-0 ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-start items-center gap-4 sm:gap-6 w-full sm:w-auto "
          >
            <div className="relative cursor-pointer flex items-center justify-between w-full sm:w-auto ">
              <label
                htmlFor="numbers"
                className=" sm:absolute text-sm -left-10 -z-10  "
              >
                <span className="text-gray-500  text-sm font-semibold sm:text-[#F5F5F5] mx-5 ">
                  Total Number of Quantity:
                </span>
              </label>

              <select
                value={selectValue}
                onChange={handleSelectChange}
                name="numbers"
                id="numbers"
                className="bg-white rounded-md px-4 py-2 border-none outline-none shadow-md focus:shadow-sm w-auto sm:w-auto "
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <MdArrowDropDown
                size={20}
                className=" absolute top-1/2 right-0 transform -translate-y-1/2  "
              />
            </div>

            <div className="relative w-full sm:w-96">
              <input
                type="text"
                name="description"
                title="Add description"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder="Type here..."
                className="outline-none border-none text-gray-600 bg-white py-2 pl-10 pr-2 w-full rounded-md shadow-md focus:shadow-sm"
              />
              <MdOutlineEdit
                className="cursor-pointer absolute top-1/2 left-3 transform -translate-y-1/2"
                size={20}
                color="gray"
              />
            </div>
            <button
              type="submit"
              title="Click to add"
              className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-md shadow-lg hover:shadow-md hover:bg-blue-500 w-full sm:w-auto"
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
              <label htmlFor="Sort">
                <span className="text-[#F5F5F5] text-sm font-semibold absolute -z-10">
                  Sort by:
                </span>
              </label>
              <MdOutlineSort
                size={20}
                color="gray"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <MdArrowDropDown
                size={20}
                color="gray"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              />
              <select
                name="Sort"
                id="Sort"
                title="Sort"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="bg-white rounded-md pl-10 pr-6 py-2 border-none outline-none shadow-md focus:shadow-sm w-full sm:w-auto"
              >
                <option value="Sort by Input Order">Sort by Input Order</option>
                <option value="Sort by Description">Sort by Description</option>
                <option value="Sort by Completed Status">
                  Sort by Completed Status
                </option>
              </select>
            </div>

            <button
              onClick={handleClearPopUP}
              title="Click to Clear all items"
              className="bg-red-500 text-white px-4 text-center sm:px-6 py-2 rounded-md shadow-lg hover:shadow-md hover:bg-red-600 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <MdDeleteOutline size={25} />
              <span>Clear List</span>
            </button>
          </div>
        </section>

        {/* MainContent2 Component  */}
      </main>
      <MainContent2
        items={sortedItems}
        handleDelete={handleDelete}
        handleToggleCompleted={handleToggleCompleted}
      />
      <ToastContainer />
    </>
  );
};

export default MainContent;
