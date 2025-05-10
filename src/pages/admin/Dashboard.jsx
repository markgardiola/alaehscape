import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalResorts, setTotalResorts] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const totalFeedbacks = 99;

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/total_users"
        );
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  useEffect(() => {
    const fetchTotalResorts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/total_resorts"
        );
        setTotalResorts(response.data.totalResorts);
      } catch (error) {
        console.error("Error fetching total resorts:", error);
      }
    };

    fetchTotalResorts();
  }, []);

  useEffect(() => {
    const fetchTotalBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/total_bookings"
        );
        setTotalBookings(response.data.totalBookings);
      } catch (error) {
        console.error("Error fetching total bookings:", error);
      }
    };

    fetchTotalBookings();
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">Admin Overview</h2>
      <div className="row g-4">
        <div className="col-md-3 col-sm-6">
          <Link to="/adminDashboard/users" className="text-decoration-none">
            <div className="card dashboard-card text-white bg-primary h-100">
              <div className="card-body d-flex flex-column align-items-start">
                <i className="bi bi-people-fill fs-2 mb-2"></i>
                <h5 className="card-title">Users</h5>
                <p className="card-text fs-4">{totalUsers}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 col-sm-6">
          <Link to="/adminDashboard/resorts" className="text-decoration-none">
            <div className="card dashboard-card text-white bg-success h-100">
              <div className="card-body d-flex flex-column align-items-start">
                <i className="bi bi-house-door-fill fs-2 mb-2"></i>
                <h5 className="card-title">Beach Resorts</h5>
                <p className="card-text fs-4">{totalResorts}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3 col-sm-6">
          <Link to="/adminDashboard/bookings" className="text-decoration-none">
            <div className="card dashboard-card text-white bg-warning h-100">
              <div className="card-body d-flex flex-column align-items-start">
                <i className="bi bi-calendar-check-fill fs-2 mb-2"></i>
                <h5 className="card-title">Bookings</h5>
                <p className="card-text fs-4">{totalBookings}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* <div className="col-md-3 col-sm-6">
          <Link to="/adminDashboard/feedbacks" className="text-decoration-none">
            <div className="card dashboard-card text-white bg-warning h-100">
              <div className="card-body d-flex flex-column align-items-start">
                <i className="bi bi-chat-dots-fill fs-2 mb-2"></i>
                <h5 className="card-title">Feedbacks</h5>
                <p className="card-text fs-4">{totalFeedbacks}</p>
              </div>
            </div>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
