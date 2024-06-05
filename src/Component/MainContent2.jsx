import Card from "./Card";
const MainContent2 = () => {
  return (
    <>
      <section className="bg-[#F3FAFF] min-h-screen w-full mt-5 p-4 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </>
  );
};

export default MainContent2;
