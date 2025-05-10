import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navBar.css";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    setUsername(storedUsername);
    setRole(storedRole);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    setUsername(null);
    window.location.href = "/signIn";
  };

  const collapseNavbar = () => {
    const navbar = document.getElementById("navbarSupportedContent");
    if (navbar.classList.contains("show")) {
      const bsCollapse = new window.bootstrap.Collapse(navbar, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container text-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="28"
            fill="currentColor"
            className="bi bi-geo-alt"
            viewBox="0 0 16 16"
          >
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          <div className="nav-link disabled">
            <a className="navbar-brand text-success fw-normal">Ala-Eh-scape</a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center d-flex align-items-center">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={collapseNavbar}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link" onClick={collapseNavbar}>
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Our Services
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item disabled">Staycation</a>
                  </li>
                  <li>
                    <a className="dropdown-item disabled">Adventure</a>
                  </li>
                  <li>
                    <a className="dropdown-item disabled">Camping</a>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto text-center d-flex align-items-center">
              {username && role !== "admin" ? (
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-outline-success dropdown-toggle"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hi, {username}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link
                        to="/profile"
                        className="dropdown-item text-capitalize bg-light"
                        onClick={collapseNavbar}
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/myBooking"
                        className="dropdown-item text-capitalize bg-light"
                        onClick={collapseNavbar}
                      >
                        My Booking
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-capitalize text-danger bg-light"
                        onClick={() => {
                          handleLogout();
                          document.body.click();
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>
                  <Link
                    to="/signIn"
                    className="btn btn-outline-success text-capitalize"
                    onClick={() => document.body.click()}
                  >
                    sign in
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
