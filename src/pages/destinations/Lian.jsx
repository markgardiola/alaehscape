import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SanJuanLaiya = () => {
  const [resorts, setResorts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/resorts/location/Lian, Batangas")
      .then((response) => setResorts(response.data))
      .catch((error) => console.error("Error fetching resorts:", error));
  }, []);

  const navigate = useNavigate();

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
        Lian, Batangas
      </h1>
      <p
        className="fs-4 mb-5 text-center text-capitalize fw-light"
        style={{
          letterSpacing: "5px",
        }}
      >
        popular destination for outdoor activities, including beach side camping
      </p>
      <div className="row">
        {resorts.map((resort) => (
          <div className="col-12 mb-4" key={resort.id}>
            <div className="card w-100 shadow-sm">
              <div className="row g-0">
                <div className="col-md-4 d-flex flex-column justify-content-between w-25">
                  <img
                    src={`http://localhost:5000/uploads/${resort.image}`}
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
    </div>
  );
};

export default SanJuanLaiya;
