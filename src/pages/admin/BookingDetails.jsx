import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingDetails = () => {
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
    return <div className="text-center mt-5">Loading booking details...</div>;
  }

  return (
    <div className="d-flex justify-content-center mb-3 vh-75">
      <div
        className="border border-success rounded p-4 w-100"
        style={{ maxWidth: "600px" }}
      >
        <div className="mb-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
        <h3 className="text-center mb-4">Booking Details</h3>
        <table className="table table-stripe table-bordered table-hover">
          <tbody>
            <tr>
              <th>Booking ID:</th>
              <td>{booking.id}</td>
            </tr>
            <tr>
              <th>Full Name:</th>
              <td>{booking.full_name}</td>
            </tr>
            <tr>
              <th>Resort Name:</th>
              <td>{booking.resort_name}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>{booking.email}</td>
            </tr>
            <tr>
              <th>Mobile:</th>
              <td>{booking.mobile}</td>
            </tr>
            <tr>
              <th>Address:</th>
              <td>{booking.address}</td>
            </tr>
            <tr>
              <th>Check-In:</th>
              <td>
                {new Date(booking.check_in).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
            </tr>
            <tr>
              <th>Check-Out:</th>
              <td>
                {new Date(booking.check_out).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
            </tr>
            <tr>
              <th>Adults:</th>
              <td>{booking.adults}</td>
            </tr>
            <tr>
              <th>Children:</th>
              <td>{booking.children}</td>
            </tr>
            <tr>
              <th>Status:</th>
              <td>
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
              </td>
            </tr>
            <tr>
              <th>Receipt:</th>
              <td>
                {booking.receipt ? (
                  <img
                    src={`http://localhost:5000/uploads/receipts/${booking.receipt}`}
                    alt="Receipt"
                    className="img-fluid rounded border"
                    style={{ maxHeight: "200px", cursor: "pointer" }}
                    onClick={handleShowModal}
                  />
                ) : (
                  <span className="text-muted">No receipt uploaded</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {showModal && (
          <>
            <div
              className="position-fixed top-0 start-0 w-100 h-100"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1040,
              }}
              onClick={handleCloseModal}
            ></div>

            <div
              className="position-fixed top-50 start-50 translate-middle bg-white border rounded shadow p-3"
              style={{
                zIndex: 1050,
                maxWidth: "90vw",
                maxHeight: "90vh",
                overflow: "auto",
              }}
            >
              <div className="d-flex justify-content-between align-items-center px-1 mb-3">
                <h3>Proof of Payment</h3>
                <button
                  className="btn btn-sm btn-danger mb-2"
                  onClick={handleCloseModal}
                >
                  <i className="bi bi-x-square"></i>
                </button>
              </div>
              <img
                src={`http://localhost:5000/uploads/receipts/${booking.receipt}`}
                alt="Receipt"
                className="img-fluid mx-auto d-block"
                style={{
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
