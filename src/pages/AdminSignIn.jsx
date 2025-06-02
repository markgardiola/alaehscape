import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import formbg from "/images/dashboard.png";

const AdminSignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/api/login`, values)
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
    <div className="container-fluid d-flex justify-content-center align-items-center w-100 vh-100">
      <div
        className="row w-75 py-4 w-md-75 border border-2 border-success rounded-4 m-2"
        style={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center p-3 border-end border-2 border-success">
          <img
            src={formbg}
            alt="Form Background"
            className="img-fluid border rounded border-2 border-success"
            style={{
              maxHeight: "500px",
            }}
          />
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4">
          <form onSubmit={handleSubmit} className="w-75" autoComplete="off">
            <h1 className="text-center mb-4 text-success fw-bold">
              Admin Sign In
            </h1>

            <div>
              <label htmlFor="email" className="form-label text-success">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
                name="email"
                onChange={handleChange}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              />
            </div>

            <div>
              <label htmlFor="password" className="mt-3 text-success">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  required
                  name="password"
                  onChange={handleChange}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={togglePasswordVisibility}
                  tabIndex={-1}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="d-flex flex-column justify-content-center mt-4">
              <button className="btn btn-outline-success fw-bold" type="submit">
                Sign In
              </button>

              <Link to="/signIn" className="text-center text-success mt-3">
                Go back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
