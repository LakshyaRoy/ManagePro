import React, { useEffect, useState } from "react";

import { MdDeleteOutline } from "react-icons/md";

const Card = ({
  date,
  description,
  id,
  isCompleted,
  selectValue,
  time,
  handleDelete,
  handleToggleCompleted,
}) => {
  const [completed, setCompleted] = useState(isCompleted);

  const handleCompleted = () => {
    setCompleted(!completed);
    handleToggleCompleted(id);
  };

  return (
    <>
      <div className="p-4 w-full max-w-[320px] border rounded-md m-8 flex flex-col mx-auto">
        {/* <figure className="flex justify-start w-10 h-10 rounded-full overflow-hidden ">
          <img
            className="w-full h-full object-cover bg-center"
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=" User Profile Image"
          />
        </figure>
        <blockquote className="font-serif font-bold my-1 ">
          Lakshya Roy
        </blockquote> */}
        <div className="flex justify-between">
          <p className="text-blue-500 font-bold text-md">{date}</p>
          <p className="text-blue-500 font-bold text-md">{time}</p>
        </div>
        <p
          className={`text-gray-500 capitalize text-lg font-semibold my-1 ${
            completed ? "line-through" : ""
          }`}
        >
          {selectValue} {description}
        </p>
        <div className="flex justify-between items-start flex-col sm:flex-row gap-4 mt-4">
          <div className="select-none bg-green-800 text-white px-2 py-2 rounded-md shadow-lg hover:shadow-md hover:bg-green-700 w-full">
            <label
              className="text-gray-500 flex items-center"
              title="Click to mark as completed"
            >
              <input
                title="Click to mark as completed"
                type="checkbox"
                name="check"
                className="mr-2"
                checked={completed}
                onChange={handleCompleted}
              />
              <span className="text-white cursor-pointer">Completed</span>
            </label>
          </div>
          {/* Delete */}
          <button
            onClick={() => handleDelete(id)}
            title="Click to delete"
            className="bg-red-500 text-white px-2 py-2 rounded-md shadow-lg hover:shadow-md hover:bg-red-600 flex items-center gap-2 w-full"
          >
            <span>
              <MdDeleteOutline size={25} />
            </span>{" "}
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
