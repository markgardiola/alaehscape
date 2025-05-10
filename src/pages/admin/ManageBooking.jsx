import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const navigate = useNavigate();

  const fetchBookings = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = (bookingId, status) => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success(`Booking ${status}`);
        fetchBookings();
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        toast.error("Failed to update booking status");
      });
  };

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  return (
    <div className="container">
      <div>
        <h2 className="mb-3">Manage Bookings</h2>
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-success">
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Resort</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No bookings found.
                </td>
              </tr>
            ) : (
              currentBookings.map((booking) => (
                <tr key={booking.booking_id}>
                  <td>{booking.booking_id}</td>
                  <td>{booking.username}</td>
                  <td>{booking.resort_name}</td>
                  <td>
                    {new Date(booking.check_in).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    to{" "}
                    {new Date(booking.check_out).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
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
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() =>
                        navigate(
                          `/adminDashboard/bookingDetails/${booking.booking_id}`
                        )
                      }
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-outline-success me-2"
                      onClick={() => {
                        Swal.fire({
                          title: "Approve this booking?",
                          text: "This will mark the booking as Confirmed.",
                          icon: "question",
                          showCancelButton: true,
                          confirmButtonColor: "#28a745",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, approve it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            updateBookingStatus(
                              booking.booking_id,
                              "Confirmed"
                            );
                          }
                        });
                      }}
                      disabled={booking.status === "Confirmed"}
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        Swal.fire({
                          title: "Cancel this booking?",
                          text: "This will mark the booking as Cancelled.",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#6c757d",
                          confirmButtonText: "Yes, cancel it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            updateBookingStatus(
                              booking.booking_id,
                              "Cancelled"
                            );
                          }
                        });
                      }}
                      disabled={booking.status === "Cancelled"}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
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
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ManageBooking;
