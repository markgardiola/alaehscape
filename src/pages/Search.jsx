import React, { useState } from "react";
import "../styles/search.css";

const Search = ({ onSearch }) => {
  const [destination, setDestination] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(destination.trim());
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-light display-5 text-uppercase find-resort-title">
        Find Your Perfect Beach Resort
      </h2>
      <form onSubmit={handleSubmit} className="row g-3 d-flex flex-column justify-items-center align-items-center">
        <div className="col-md-4 text-center">
          <label htmlFor="destination" className="form-label">
            Area Destination
          </label>
          <input
            type="text"
            className="form-control"
            id="destination"
            name="destination"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div className="col-12 text-center mt-3">
          <button type="submit" className="btn btn-success">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
