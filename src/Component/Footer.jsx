import { useContext } from "react";
import { Task } from "../Context";

const Footer = () => {
  const { allItems, setAllItems } = useContext(Task);

  let totalItems = 0;
  let completedItems = 0;
  let totalPercentage = 0;
  // console.log(allItems);

  // Check if allItems is an array and not null/undefined
  if (allItems == null) {
    console.log("allItems is not an array or is undefined");
    return localStorage.setItem("items", JSON.stringify([]));
  }

  if (allItems.length) {
    totalItems = allItems.length;

    completedItems = allItems.filter((item) => item.isCompleted).length;

    // Avoid division by zero by checking if totalItems is greater than 0
    totalPercentage =
      totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  }

  // console.log(`Total Percentage: ${totalPercentage}%`);

  return (
    <footer className="py-4 bg-[#f5f5f5] text-center px-4 ">
      {totalPercentage === 100 ? (
        <p className="text-gray-500  font-semibold my-4 text-sm lg:text-xl">
          Woow! You have completed all your tasks! 🥳🍾
        </p>
      ) : (
        <p className="text-gray-500  font-semibold my-4 text-sm lg:text-xl">
          You have <span className="font-bold text-[#555]"> {totalItems} </span>
          items on your list. You have already completed{" "}
          <span className="font-bold text-[#555]"> {completedItems}</span>,
          which is
          <span className="font-bold text-[#555]"> {totalPercentage}% </span>
          of the total.
        </p>
      )}

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
