import React, { createContext, useState } from "react";

export const Task = createContext();
export const Filter = createContext();

const Context = ({ children }) => {
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  return (
    <Task.Provider value={{ allItems, setAllItems }}>
      <Filter.Provider value={{ filteredItems, setFilteredItems }}>
        {children}
      </Filter.Provider>
    </Task.Provider>
  );
};

export default Context;
