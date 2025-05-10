import React, { useState } from "react";
import axios from "axios";

const EditProfile = ({ user, onUpdateSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
    phone: user.phone || "",
    address: user.address || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/update_user", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("password", res.data.user.password);
        onUpdateSuccess(res.data.user);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update profile.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 mt-3 shadow-sm">
      <h4 className="mb-3">Edit Profile</h4>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="form-control mb-2"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="form-control mb-2"
        required
      />
      <input
        type="password"
        className="form-control"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter new password"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Mobile Number"
        className="form-control mb-2"
        required
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="form-control mb-3"
        required
      />
    </form>
  );
};

export default EditProfile;
