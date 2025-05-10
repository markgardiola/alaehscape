import React from "react";
import Carousel from "./Carousel";
import Search from "./Search";
import Destinations from "./Destinations";

function Home() {
  return (
    <div className="container-fluid mt-5 p-0 bg-transparent">
      <Carousel />
      <Search />
      <Destinations />
    </div>
  );
}

export default Home;
