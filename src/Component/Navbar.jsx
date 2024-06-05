import React from "react";
import { MdInsertEmoticon } from "react-icons/md";
import { ImPushpin } from "react-icons/im";
import { MdSearch } from "react-icons/md";

const Navbar = () => {
  const styles = {
    navBarCenter: `flex justify-center items-center gap-4`,
    NavText: `font-bold font-serif text-md text-[#485565] cursor-pointer`,
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between p-4 sm:p-8 items-center border border-b-2">
      <div className={`${styles.navBarCenter} mb-4 sm:mb-0`}>
        <ImPushpin size={35} color="#3B82F6" />
        <figcaption className={`${styles.NavText}`}>ManagePro</figcaption>
      </div>
      <div className="flex justify-center items-center gap-2 relative mb-4 sm:mb-0">
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
        />
      </div>
      <div className={`${styles.navBarCenter} hidden sm:flex`}>
        <MdInsertEmoticon size={40} color="#3B82F6" />
        <figcaption className={`${styles.NavText}`}>Lakshya Roy</figcaption>
      </div>
    </nav>
  );
};

export default Navbar;
