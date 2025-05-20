import React, { useState } from "react";
import Carousel from "./Carousel";
import Search from "./Search";
import Destinations from "./Destinations";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container-fluid mt-5 p-0 bg-transparent">
      <Carousel />
      <Search onSearch={setSearchTerm} />
      <Destinations searchTerm={searchTerm} />
    </div>
  );
}

export default Home;
