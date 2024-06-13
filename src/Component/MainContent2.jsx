import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { Task } from "../Context";

const MainContent2 = ({ items, handleDelete, handleToggleCompleted }) => {
  const { searchQuery } = useContext(Task);

  const [updatedItems, setUpdatedItems] = useState([]);

  const filteredData = () => {
    // console.log(items);
    if (!searchQuery) {
      setUpdatedItems(items);
      return;
    }

    if (items.length && searchQuery.length) {
      const searchedItems = items.filter((item) =>
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setUpdatedItems(searchedItems);
      // console.log(searchedItems);
    }
  };

  useEffect(() => {
    filteredData();
  }, [searchQuery, items]);

  return (
    <>
      {/* bg-[#F3FAFF] */}
      <section className="min-h-[600px] h-full w-full mt-5 p-4 sm:p-8 bg-[#F3FAFF]">
        {!updatedItems?.length ? (
          <h2 className="text-2xl font-bold  text-[#485565] flex justify-center updatedItems?-center  ">
            There are no tasks to display at the moment.
          </h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {updatedItems?.map((item) => (
              <Card
                key={item.id}
                date={item?.date}
                description={item?.description}
                id={item?.id}
                isCompleted={item?.isCompleted}
                selectValue={item?.selectValue}
                time={item?.time}
                handleDelete={handleDelete}
                handleToggleCompleted={handleToggleCompleted}
              />
            ))}{" "}
          </div>
        )}
      </section>
    </>
  );
};

export default MainContent2;
