import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminTopBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    navigate("/adminSignIn");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light mb-4 shadow-sm">
      <div className="container-fluid px-4">
        <span className="navbar-brand fw-bold">Admin Dashboard</span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="adminNavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <button
                className="btn btn-outline-success dropdown-toggle"
                id="adminDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome, Admin
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item text-capitalize text-danger bg-light"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminTopBar;
