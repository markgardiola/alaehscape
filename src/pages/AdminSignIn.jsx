import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminSignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/login", values)
      .then((res) => {
        if (res.data.token && res.data.user) {
          const { token, user } = res.data;

          localStorage.setItem("token", token);
          localStorage.setItem("username", user.username);
          localStorage.setItem("email", user.email);
          localStorage.setItem("role", user.role);

          toast.success(res.data.success, {
            position: "top-right",
            autoClose: 3000,
          });

          navigate("/adminDashboard");
        } else {
          alert("Invalid server response.");
        }
      })
      .catch((err) => {
        console.log("Login error:", err);

        if (err.response?.data?.message) {
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        } else if (err.message === "Network Error") {
          toast.error("Unable to connect to the server.", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.error("An unexpected error occurred.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      });
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
      <form
        className="form-control p-5 mb-4 rounded-3 shadow w-25"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2 className="text-center">Admin Sign In</h2>
        <div>
          <label htmlFor="email" className="mt-3">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            required
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="mt-3">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            required
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="d-flex flex-column justify-content-center mt-4">
          <button className="btn btn-primary mb-3">Sign In</button>
        </div>
      </form>
      <Link to="/signIn" className="btn btn-secondary mb-3">
        Go Back
      </Link>
    </div>
  );
};

export default AdminSignIn;
