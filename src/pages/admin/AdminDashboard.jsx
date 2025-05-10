import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSideBar from "../../components/AdminSideBar";
import AdminTopBar from "../../components/AdminTopBar";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");

  // Default: collapsed
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!token) {
    return <Navigate to="/signIn" replace />;
  }

  return (
    <div
      className="d-flex bg-light"
      style={{ minHeight: "100vh", overflow: "auto" }}
    >
      <AdminSideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className="flex-grow-1"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0.8in",
          transition: "margin-left 0.3s ease-in-out",
          width: "100%",
        }}
      >
        <AdminTopBar />
        <div className="container-fluid py-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
