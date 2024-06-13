import React, { createContext, useEffect, useState } from "react";

export const Task = createContext();
export const Filter = createContext();

const Context = ({ children }) => {
  const savedItems = localStorage.getItem("items");
  const [allItems, setAllItems] = useState(
    savedItems !== null ? JSON.parse(savedItems) : []
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Update localStorage whenever allItems changes
    localStorage.setItem("items", JSON.stringify(allItems));
  }, [allItems]);
  return (
    <Task.Provider
      value={{ allItems, setAllItems, searchQuery, setSearchQuery }}
    >
      {children}
    </Task.Provider>
  );
};

export default Context;
