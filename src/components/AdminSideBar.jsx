import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/AdminSideBar.css";
import logoImg from "/images/logo.png";
import { FaHome, FaUsers, FaHotel, FaClipboardList } from "react-icons/fa";

const AdminSideBar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const getNavLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "text-dark" : "text-white"}`;

  return (
    <>
      {/* Toggle Button (shown only on small screens) */}

      <div
        className="side-bar d-flex flex-column position-fixed"
        style={{
          width: isOpen ? "250px" : "0.8in",
          height: "100vh",
          padding: "1rem",
          top: 0,
          left: 0,
          zIndex: 1000,
          transition: "width 0.3s ease-in-out",
          backgroundColor: "#F3DFC9",
        }}
      >
        <button
          className="btn btn-outline-success mb-3"
          style={{ zIndex: 1100 }}
          onClick={toggleSidebar}
        >
          <i className="bi bi-box-arrow-in-right"></i>
        </button>
        <div className="d-flex justify-content-center mb-3">
          {isOpen && <img src={logoImg} className="img-fluid" />}
        </div>
        <div className={`text-center mb-2 ${isOpen ? "" : "d-none"}`}>
          <p>Ala-Eh-scape</p>
        </div>
        <nav className="nav flex-column">
          <NavLink to="/adminDashboard" end className={getNavLinkClass}>
            {isOpen ? "Dashboard" : <FaHome />}
          </NavLink>
          <NavLink to="/adminDashboard/users" className={getNavLinkClass}>
            {isOpen ? "User Management" : <FaUsers />}
          </NavLink>
          <NavLink to="/adminDashboard/resorts" className={getNavLinkClass}>
            {isOpen ? "Resort Listings" : <FaHotel />}
          </NavLink>
          <NavLink to="/adminDashboard/bookings" className={getNavLinkClass}>
            {isOpen ? "Booking Requests" : <FaClipboardList />}
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default AdminSideBar;
