import React from "react";
import { Link } from "react-router-dom";
import "../styles/destinations.css";
import laiyaImg from "/images/san-juan-batangas.jpg";
import calataganImg from "/images/Stilts-Calatagan-Batangas.jpg";
import mabiniImg from "/images/anilao.jpg";
import lianImg from "/images/lian-batangas.jpg";

const destinations = [
  {
    name: "San Juan, Laiya",
    path: "/destinations/san-juan-laiya",
    caption:
      "Famous for its white sand beaches and clear waters, perfect for summer getaways.",
    image: laiyaImg,
  },
  {
    name: "Calatagan, Batangas",
    path: "/destinations/calatagan",
    caption: "Home to serene beaches, sandbars, and the popular Stilts resort.",
    image: calataganImg,
  },
  {
    name: "Mabini, Batangas",
    path: "/destinations/mabini",
    caption:
      "A diver’s paradise, known for Anilao’s vibrant marine life and reefs.",
    image: mabiniImg,
  },
  {
    name: "Lian, Batangas",
    path: "/destinations/lian",
    caption: "Relaxing beach spot with peaceful vibes and sunset views.",
    image: lianImg,
  },
];

const Destinations = () => {
  return (
    <div className="container py-5">
      <h2
        className="text-center text-uppercase fw-light mb-4"
        style={{
          letterSpacing: "8px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Top Beach Destinations in Batangas
      </h2>
      <div className="row">
        {destinations.map((dest, index) => (
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={index}>
            <Link to={dest.path} className="text-decoration-none text-dark">
              <div className="card destinations-card h-100 shadow-sm">
                <img
                  src={dest.image}
                  className="card-img-top"
                  alt={dest.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{dest.name}</h5>
                  <p className="card-text">{dest.caption}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
