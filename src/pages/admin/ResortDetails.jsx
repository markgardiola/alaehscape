import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ResortDetails = () => {
  const { id } = useParams();
  const [resort, setResort] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResort = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/resorts/${id}`
        );
        setResort(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch resort details.");
        setLoading(false);
      }
    };

    fetchResort();
  }, [id]);

  if (loading) return <div className="container py-5">Loading...</div>;
  if (error) return <div className="container py-5 text-danger">{error}</div>;
  if (!resort) return <div className="container py-5">Resort not found.</div>;

  return (
    <div className="container pb-5">
      <Link
        to="/adminDashboard/resorts"
        className="btn btn-outline-success mb-4"
      >
        ← Back to Listings
      </Link>

      <h2 className="fw-bold text-success">{resort.name}</h2>
      <p className="fs-5 text-muted mb-2">
        <strong>Location:</strong> {resort.location}
      </p>
      <p className="fs-5 mb-4">{resort.description}</p>

      {resort.image && (
        <div className="mb-4 w-75">
          <img
            src={`http://localhost:5000/uploads/${resort.image}`}
            alt={resort.name}
            className="img-fluid rounded-4 shadow-sm"
            style={{ height: "480px", objectFit: "cover", width: "100%" }}
          />
        </div>
      )}

      <h5 className="fw-semibold text-success">Room Options & Pricing:</h5>
      {resort.rooms && resort.rooms.length > 0 ? (
        <ul className="list-group list-group-flush mb-4 w-50">
          {resort.rooms.map((room, i) => (
            <li className="list-group-item" key={i}>
              <strong>{room.name}:</strong> ₱{room.price}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No rooms listed.</p>
      )}

      <h5 className="fw-semibold text-success">Amenities:</h5>
      {resort.amenities && resort.amenities.length > 0 ? (
        <table className="table table-bordered w-50">
          <tbody>
            {resort.amenities.map((amenity, i) => (
              <tr key={i}>
                <td className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-success"></i>
                  {amenity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No amenities listed.</p>
      )}
    </div>
  );
};

export default ResortDetails;
