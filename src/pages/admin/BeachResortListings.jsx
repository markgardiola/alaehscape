import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const BeachResortListings = () => {
  const [resorts, setResorts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resortsPerPage = 6;

  const fetchResorts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/resorts");
      setResorts(response.data);
    } catch (error) {
      console.error("Failed to fetch resorts:", error);
    }
  };

  useEffect(() => {
    fetchResorts();
  }, []);

  const handleDeleteResort = async (resortId) => {
    try {
      await axios.delete(`http://localhost:5000/api/resorts/${resortId}`);
      setResorts((prev) => prev.filter((resort) => resort.id !== resortId));
      toast.success("Resort deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete resort.");
    }
  };

  // Pagination logic
  const indexOfLastResort = currentPage * resortsPerPage;
  const indexOfFirstResort = indexOfLastResort - resortsPerPage;
  const currentResorts = resorts.slice(indexOfFirstResort, indexOfLastResort);
  const totalPages = Math.ceil(resorts.length / resortsPerPage);

  return (
    <div className="container">
      <h2 className="mb-4">Beach Resort Listings</h2>
      <div className="mb-3 text-end">
        <Link to="add">
          <button className="btn btn-success">
            <i className="bi bi-plus-circle pe-2"></i>Add New Resort
          </button>
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered align-middle">
          <thead className="table-success">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentResorts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No resorts found.
                </td>
              </tr>
            ) : (
              currentResorts.map((resort, index) => (
                <tr key={resort.id}>
                  <td>{indexOfFirstResort + index + 1}</td>
                  <td className="d-flex justify-content-center">
                    <img
                      src={`http://localhost:5000/uploads/${resort.image}`}
                      alt={resort.name}
                      style={{
                        width: "100px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{resort.name}</td>
                  <td>{resort.location}</td>
                  <td>{resort.description}</td>
                  <td className="text-center">
                    <Link
                      to={`/adminDashboard/resorts/${resort.id}`}
                      className="btn btn-sm btn-outline-success me-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/adminDashboard/resorts/${resort.id}/edit`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "This resort will be permanently deleted.",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#6c757d",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDeleteResort(resort.id);
                          }
                        });
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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

export default BeachResortListings;
