import React from "react";
import "../styles/search.css";

const Search = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 fw-light display-5 text-uppercase find-resort-title">
        Find Your Perfect Beach Resort
      </h2>
      <form action="filterResorts.php" method="GET" className="row g-3">
        <div className="col-md-4">
          <label htmlFor="destination" className="form-label">
            Area Destination
          </label>
          <input
            type="text"
            className="form-control"
            id="destination"
            name="destination"
            placeholder="Enter destination"
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="checkin" className="form-label">
            Check-In Date
          </label>
          <input
            type="date"
            className="form-control"
            id="checkin"
            name="checkin"
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="checkout" className="form-label">
            Check-Out Date
          </label>
          <input
            type="date"
            className="form-control"
            id="checkout"
            name="checkout"
            required
          />
        </div>
      </form>
      <div className="col-12 text-center mt-5">
        <button type="submit" className="btn btn-success">
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
