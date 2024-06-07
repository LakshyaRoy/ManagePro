import { useEffect } from "react";
import Card from "./Card";

const MainContent2 = ({ items, handleDelete, handleToggleCompleted }) => {
  // setting local storage data
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      {/* bg-[#F3FAFF] */}
      <section className="min-h-screen w-full mt-5 p-4 sm:p-8 bg-[#F3FAFF]">
        {!items.length ? (
          <h2 className="text-2xl font-bold  text-[#485565] flex justify-center items-center  ">
            There are no tasks to display at the moment.
          </h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
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
