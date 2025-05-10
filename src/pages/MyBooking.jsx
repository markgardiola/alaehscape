import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchBookings = () => {
    axios
      .get(`http://localhost:5000/api/bookings/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const deleteBooking = async (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:5000/api/bookings/${bookingId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          fetchBookings();
          toast.success(
            "Deleted!",
            "Your booking has been deleted.",
            "success"
          );
        } catch (err) {
          console.error("Error deleting booking:", err);
          toast.error("Error!", "Failed to delete booking.", "error");
        }
      }
    });
  };

  const updateBookingStatus = (bookingId, status) => {
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

  useEffect(() => {
    fetchBookings();
  }, [userId, token]);

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  return (
    <div className="container mt-5 pt-5">
      <h3 className="mb-4">My Bookings</h3>

      {bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>Resort Name</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Adults</th>
                <th>Children</th>
                <th>Status</th>
                <th>Date Booked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.resort_name}</td>
                  <td>
                    {new Date(booking.check_in).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    {new Date(booking.check_out).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td>{booking.adults}</td>
                  <td>{booking.children}</td>
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
                  <td>{new Date(booking.created_at).toLocaleDateString()}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => navigate(`/viewMyBooking/${booking.id}`)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-sm btn-warning me-2"
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
                            updateBookingStatus(booking.id, "Cancelled");
                          }
                        });
                      }}
                      disabled={
                        booking.status === "Cancelled" ||
                        booking.status === "Confirmed"
                      }
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteBooking(booking.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
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

export default MyBooking;
