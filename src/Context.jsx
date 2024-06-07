import React, { createContext, useState } from "react";

export const Task = createContext();

const Context = ({ children }) => {
  const [allItems, setAllItems] = useState([]);
  return (
    <Task.Provider value={{ allItems, setAllItems }}>{children}</Task.Provider>
  );
};

export default Context;
