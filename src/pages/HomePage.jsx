import React from "react";
import Carousel from "../components/Carousel";
import CoinsTable from "../components/CoinsTable";

const HomePage = () => {
  return (
    <div className="w-full mt-10 flex flex-col items-center">
      <h2 className="text-xl font-bold">Trending Coins</h2>
      <Carousel />
      <CoinsTable />
    </div>
  );
};

export default HomePage;
