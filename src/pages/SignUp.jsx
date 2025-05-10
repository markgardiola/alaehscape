import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
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
      .post("http://localhost:5000/api/register_user", values)
      .then((res) => {
        toast.success(res.data.success, {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/signIn");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="border border-2 rounded-5 border-success p-5"
        autoComplete="off"
        style={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 className="text-center mb-4 text-success fw-bold">Sign Up</h1>

        <div>
          <label htmlFor="username" className="form-label text-success">
            Username
          </label>
          <input
            type="username"
            className="form-control"
            placeholder="Enter your username"
            required
            name="username"
            onChange={handleChange}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          />
        </div>

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
          <button className="btn btn-outline-success fw-bold" type="submit">
            Sign Up
          </button>

          <p className="mt-3 text-center text-success">
            Already have an account?
          </p>

          <Link to="/signIn" className="text-center text-success">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
