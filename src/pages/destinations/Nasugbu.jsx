import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../../config";

const Nasugbu = () => {
  const [resorts, setResorts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resortsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/resorts/location/Nasugbu, Batangas`)
      .then((response) => setResorts(response.data))
      .catch((error) => console.error("Error fetching resorts:", error));
  }, []);

  // Pagination logic
  const indexOfLastResort = currentPage * resortsPerPage;
  const indexOfFirstResort = indexOfLastResort - resortsPerPage;
  const currentResorts = resorts.slice(indexOfFirstResort, indexOfLastResort);
  const totalPages = Math.ceil(resorts.length / resortsPerPage);

  return (
    <div className="container mt-5 py-5">
      <div className="mb-1">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      <h1
        className="display-5 mb-4 text-center text-uppercase fw-light"
        style={{
          letterSpacing: "15px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Nasugbu, Batangas
      </h1>
      <p
        className="fs-4 mb-5 text-center text-capitalize fw-light"
        style={{ letterSpacing: "5px" }}
      >
        Sun, sea, and serenity 🌅
      </p>

      <div className="row">
        {currentResorts.map((resort) => (
          <div className="col-12 mb-4" key={resort.id}>
            <div className="card w-100 shadow-sm">
              <div className="row g-0">
                <div className="col-md-4 d-flex flex-column justify-content-between w-25">
                  <img
                    src={resort.image}
                    className="img-fluid rounded m-2 shadow"
                    alt={resort.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-8 w-75">
                  <div className="card-body d-flex flex-column justify-content-between h-100">
                    <div>
                      <h5 className="card-title fw-bold">{resort.name}</h5>
                      <p className="card-text text-success mb-1">
                        <i className="bi bi-geo-alt-fill me-1"></i>
                        {resort.location}
                      </p>
                      <p className="card-text">{resort.description}</p>
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                      <Link
                        to={`/viewDetails/${resort.id}`}
                        className="btn btn-outline-success me-2"
                      >
                        View Details
                      </Link>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          const role = localStorage.getItem("role");

                          if (token && role === "user") {
                            window.location.href = `/booking/${resort.id}`;
                          } else {
                            toast.warning(
                              ({ closeToast }) => (
                                <div>
                                  <p className="mb-2 text-center">
                                    Please log in to proceed with booking.
                                  </p>
                                  <div className="d-flex justify-content-center">
                                    <button
                                      className="btn btn-sm btn-success"
                                      onClick={() => {
                                        window.location.href = "/signIn";
                                        closeToast();
                                      }}
                                    >
                                      Go to Login
                                    </button>
                                  </div>
                                </div>
                              ),
                              {
                                position: "top-center",
                                autoClose: 5000,
                                closeOnClick: false,
                                closeButton: true,
                              }
                            );
                          }
                        }}
                      >
                        Book Now!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages && "disabled"}`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nasugbu;
