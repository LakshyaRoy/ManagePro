import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 bg-gray-100 text-center ">
      <p className="text-gray-500  font-semibold my-4 text-sm lg:text-xl">
        You have <span className="font-bold text-[#555]"> 8 </span>
        items on your list. You have already completed{" "}
        <span className="font-bold text-[#555]"> 4</span>, which is
        <span className="font-bold text-[#555]"> 50% </span>
        of the total.
      </p>
      <p className="text-gray-500 text-sm font-semibold my-2">
        Made with ❤️ by Lakshya Roy
      </p>
      <p className="text-gray-500 text-sm font-semibold">
        &copy; 2024 Lakshya Roy. All rights reserved. 😁
      </p>
    </footer>
  );
};

export default Footer;
