import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewMyBooking = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBooking(res.data))
      .catch((err) => console.error("Error fetching booking:", err));
  }, [bookingId]);

  if (!booking) {
    return <div className="text-center mt-5">Loading your booking...</div>;
  }

  return (
    <div className="container mt-5 py-4">
      <div className="card shadow-sm border-0 rounded-4 px-5 pb-5 mt-3">
        <div className="mt-4">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            ← Back to My Bookings
          </button>
        </div>
        <div className="card-body">
          <h2 className="card-title text-center mb-5">My Booking Details</h2>

          <div className="row mb-3">
            <div className="col-6 fw-bold">Booking ID:</div>
            <div className="col-6">{booking.id}</div>
          </div>

          <div className="row mb-3">
            <div className="col-6 fw-bold">Name:</div>
            <div className="col-6">{booking.full_name}</div>
          </div>

          <div className="row mb-3">
            <div className="col-6 fw-bold">Resort:</div>
            <div className="col-6">{booking.resort_name}</div>
          </div>

          <div className="row mb-3">
            <div className="col-6 fw-bold">Email:</div>
            <div className="col-6">{booking.email}</div>
          </div>

          <div className="row mb-3">
            <div className="col-6 fw-bold">Mobile:</div>
            <div className="col-6">{booking.mobile}</div>
          </div>

          <div className="row mb-3">
            <div className="col-6 fw-bold">Address:</div>
            <div className="col-6">{booking.address}</div>
          </div>

          <div className="row mb-3">
            <div className="col-6 fw-bold">Check-In:</div>
            <div className="col-6">
              {new Date(booking.check_in).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6 fw-bold">Check-Out:</div>
            <div className="col-6">
              {new Date(booking.check_out).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6 fw-bold">Adults:</div>
            <div className="col-6">{booking.adults}</div>
          </div>

          <div className="row mb-3">
            <div className="col-6 fw-bold">Children:</div>
            <div className="col-6">{booking.children}</div>
          </div>

          <div className="row mb-3">
            <div className="col-6 fw-bold">Status:</div>
            <div className="col-6">
              <span
                className={`badge bg-${
                  booking.status === "Confirmed"
                    ? "success"
                    : booking.status === "Cancelled"
                    ? "danger"
                    : "secondary"
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-6 fw-bold">Receipt:</div>
            <div className="col-6">
              {booking.receipt ? (
                <img
                  src={`http://localhost:5000/uploads/receipts/${booking.receipt}`}
                  alt="Receipt"
                  className="img-thumbnail"
                  style={{
                    maxHeight: "150px",
                    cursor: "pointer",
                    border: "2px solid #0d6efd",
                  }}
                  onClick={handleShowModal}
                />
              ) : (
                <span className="text-muted">No receipt uploaded</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for viewing receipt */}
      {showModal && (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1040 }}
            onClick={handleCloseModal}
          ></div>

          <div
            className="position-fixed d-flex flex-column top-50 start-50 translate-middle bg-white rounded-4 shadow-lg p-3"
            style={{
              zIndex: 1050,
              width: "90vw",
              maxWidth: "500px",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <div className="d-flex justify-content-between align-items-center px-4 mb-3">
              <h3>Proof of Payment</h3>
              <button
                className="btn btn-danger btn-sm mb-3"
                onClick={handleCloseModal}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
            <img
              src={`http://localhost:5000/uploads/receipts/${booking.receipt}`}
              alt="Receipt"
              className="img-fluid rounded"
              style={{ objectFit: "contain", maxHeight: "80vh" }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ViewMyBooking;
