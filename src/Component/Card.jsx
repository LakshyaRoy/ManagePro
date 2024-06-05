import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";

const Card = () => {
  return (
    <>
      <div className="p-4 w-full max-w-[320px] border rounded-md m-8 flex flex-col md:mx-auto">
        <figure className="flex justify-start w-10 h-10 rounded-full overflow-hidden ">
          <img
            className="w-full h-full object-cover bg-center"
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=" User Profile Image"
          />
        </figure>
        <blockquote className="font-serif font-bold my-1 ">
          Lakshya Roy
        </blockquote>
        <p className="text-gray-500 text-lg font-semibold my-1 ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur,
          sit.
        </p>
        <div className="flex justify-between items-start flex-col sm:flex-row gap-4 mt-4">
          <div className="select-none bg-green-700 text-white px-2 py-2 rounded-md shadow-lg hover:shadow-md hover:bg-green-800">
            <label htmlFor="check" className="text-gray-500 flex items-center">
              <input type="checkbox" name="check" id="check" className="mr-2" />
              <span className="text-white">Completed</span>
            </label>
          </div>

          <button className="bg-red-500 text-white px-2 py-2 rounded-md shadow-lg hover:shadow-md hover:bg-red-600 flex items-center gap-2">
            <span>
              <FaRegTrashCan />
            </span>{" "}
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
