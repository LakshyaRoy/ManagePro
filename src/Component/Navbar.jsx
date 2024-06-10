import React, { useContext, useEffect, useState } from "react";
import { MdInsertEmoticon } from "react-icons/md";
import { ImPushpin } from "react-icons/im";
import { MdSearch } from "react-icons/md";
import { Filter, Task } from "../Context";

const Navbar = () => {
  const { allItems, setAllItems } = useContext(Task);
  // const { filteredItems, setFilteredItems } = useContext(Filter);
  const [filter, setFilter] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [open, setOpen] = useState(false);

  function getLocalStorage(name) {
    const storedValue = localStorage.getItem(name);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  useEffect(() => {
    setAllItems(() => getLocalStorage("items"));
  }, []);

  function filterData() {
    if (allItems?.length) {
      const filtered = allItems.filter((item) =>
        item.description.toLowerCase().includes(filter.toLowerCase())
      );
      return filtered;
      // setNewFilteredItems(filtered);
    } else {
      console.log("no data is coming in allitems in navbar");
    }
    // setNewFilteredItems(filtered);
  }
  console.log(filterData());

  // useEffect(() => {
  //   console.log(newFilteredItems);
  // }, [allItems]);

  useEffect(() => {
    const getImageFromLocalStorage = () => {
      const storedImage = localStorage.getItem("profileImage");
      if (storedImage) {
        setProfileImage(storedImage);
      }
    };
    getImageFromLocalStorage();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    readImage(file);
    setOpen(false);
  };

  const readImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const imageUrl = reader.result;
      localStorage.setItem("profileImage", imageUrl);
      setProfileImage(imageUrl);
    };
  };

  const styles = {
    navBarCenter: `flex justify-center items-center gap-4`,
    NavText: `font-bold font-serif text-md text-[#485565] cursor-pointer`,
  };

  return (
    <nav className="flex sm:flex-row justify-between p-4 sm:p-8 items-center border border-b-2  gap-2">
      <div className={`${styles.navBarCenter} `}>
        <ImPushpin size={35} color="#3B82F6" />
        <figcaption className={`${styles.NavText} hidden sm:block`}>
          ManagePro
        </figcaption>
      </div>
      <div className="flex justify-center items-center gap-2 relative  ">
        <MdSearch
          size={20}
          color="#3B82F6"
          className="absolute left-2 sm:left-1"
        />
        <input
          type="search"
          name="Search"
          id="search"
          placeholder="Search"
          className="outline-none border-none text-[#485565] bg-[#fff] py-2 pl-10 pr-2 w-full sm:w-96 rounded-md shadow-md focus:shadow-sm"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className={`${styles.navBarCenter}  sm:flex relative `}>
        {profileImage ? (
          <>
            {profileImage && (
              <div className="w-10  h-10  rounded-full cursor-pointer hover:outline-double hover:outline-blue-500  object-cover bg-center  hover:shadow-md transition-all">
                <img
                  src={profileImage}
                  alt=" profile image"
                  className="w-full h-full rounded-full "
                  onClick={() => setOpen((p) => !p)}
                  title="click to change image"
                />
              </div>
            )}
            {open ? (
              <div className="w-40 h-10 bg-blue-500 absolute top-12 -left-[7rem] sm:-left-14 flex justify-center items-center rounded-md shadow-md z-10 hover:bg-blue-600 ">
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <p className="text-white">Change Image</p>
                </label>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  name="myImage"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleFileChange}
                />
              </div>
            ) : null}
          </>
        ) : (
          <>
            <input
              type="file"
              name="myImage"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleFileChange}
            />
            <MdInsertEmoticon size={40} color="#3B82F6" />
          </>
        )}

        <figcaption className={`${styles.NavText} hidden sm:block`}>
          Lakshya Roy
        </figcaption>
      </div>
    </nav>
  );
};

export default Navbar;
