import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/destinations.css";
import laiyaImg from "/images/san-juan-batangas.jpg";
import calataganImg from "/images/Stilts-Calatagan-Batangas.jpg";
import mabiniImg from "/images/anilao.jpg";
import lianImg from "/images/lian-batangas.jpg";
import loboImg from "/images/loboImg.jpg";
import nasugbuImg from "/images/nasugbuImg.jpg";

const defaultDestinations = [
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
  {
    name: "Lobo, Batangas",
    path: "/destinations/lobo",
    caption: "Chill vibes and coastal views 🌊 | Lobo, Batangas",
    image: loboImg,
  },
  {
    name: "Nasugbu, Batangas",
    path: "/destinations/nasugbu",
    caption: "Sun, sea, and serenity 🌅 | Nasugbu, Batangas",
    image: nasugbuImg,
  },
];

const Destinations = ({ searchTerm }) => {
  const [filteredDestinations, setFilteredDestinations] =
    useState(defaultDestinations);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const filtered = searchTerm
      ? defaultDestinations.filter((dest) =>
          dest.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : defaultDestinations;
    setFilteredDestinations(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container py-5">
      <h2
        className="text-center text-uppercase fw-light mb-4"
        style={{
          letterSpacing: "8px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        {searchTerm
          ? `Search Results for "${searchTerm}"`
          : "Top Beach Destinations in Batangas"}
      </h2>

      <div className="row">
        {paginatedDestinations.length > 0 ? (
          paginatedDestinations.map((dest, index) => (
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
          ))
        ) : (
          <p className="text-center mt-4">
            No destinations found for "{searchTerm}".
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Destinations;
