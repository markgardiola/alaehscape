import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import formbg from "/images/form-bg.jpg";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        if (res.data.token && res.data.user) {
          const { token, user } = res.data;

          localStorage.setItem("token", token);
          localStorage.setItem("userId", user.id);
          localStorage.setItem("username", user.username);
          localStorage.setItem("email", user.email);
          localStorage.setItem("role", user.role);

          toast.success(res.data.success, {
            position: "top-right",
            autoClose: 3000,
          });

          toast.error(res.data.err, {
            position: "top-right",
            autoClose: 3000,
          });

          navigate("/");
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
    <div>
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
              className="img-fluid border border-2 border-success"
              style={{
                maxHeight: "500px",
                borderTopLeftRadius: "10rem",
                borderBottomRightRadius: "10rem",
                borderTopRightRadius: "0",
                borderBottomLeftRadius: "0",
              }}
            />
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4">
            <form onSubmit={handleSubmit} className="w-75" autoComplete="off">
              <h1 className="text-center mb-4 text-success fw-bold">Sign In</h1>

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
                <input
                  type="password"
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
              </div>

              <div className="d-flex flex-column justify-content-center mt-4">
                <button
                  className="btn btn-outline-success fw-bold"
                  type="submit"
                >
                  Sign In
                </button>

                <p className="mt-3 text-center text-success">
                  Don't have an account yet?
                </p>

                <Link to="/signUp" className="text-center text-success">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignIn;
