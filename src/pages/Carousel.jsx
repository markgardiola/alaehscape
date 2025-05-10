import React from "react";
import "../styles/carousel.css";
import cocoons from "/images/cocoons.jpg";
import watersports from "/images/watersports.png";
import campingBg from "/images/camping-bg.jpg";

const Carousel = () => {
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
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active c-item" data-bs-interval="3000">
          <img src={cocoons} className="d-block w-100 c-img" />
          <div className="carousel-caption c-caption">
            <h1 className="display-1 text-capitalize fw-bold">staycation</h1>
            <p className="fs-3">
              Escape to the beach—your perfect staycation awaits!
            </p>
          </div>
        </div>
        <div className="carousel-item c-item" data-bs-interval="3000">
          <img src={watersports} className="d-block w-100 c-img" />
          <div className="carousel-caption c-caption">
            <h1 className="display-1 text-capitalize fw-bold">adventure</h1>
            <p className="fs-3">
              Discover paradise—explore hidden islands on an unforgettable
              adventure!
            </p>
          </div>
        </div>
        <div className="carousel-item c-item" data-bs-interval="3000">
          <img src={campingBg} className="d-block w-100 c-img" />
          <div className="carousel-caption c-caption">
            <h1 className="display-1 text-capitalize fw-bold">camping</h1>
            <p className="fs-3">
              Leep under the stars, wake up to the ocean breeze—your seaside
              camp adventure starts here!
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
