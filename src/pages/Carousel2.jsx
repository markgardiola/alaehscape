import React from "react";
import beachImg from "/images/beach.jpg";
import "../styles/carousel.css";

const Carousel2 = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide border-top border-bottom border-success border-2"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active c-item" data-bs-interval="5000">
          <img src={beachImg} className="d-block w-100 c-img" />
          <div className="carousel-caption c-caption">
            <h1
              className="display-1 text-capitalize fw-bold"
              style={{ paddingBottom: "180px" }}
            >
              Ala-Eh-scape
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel2;
