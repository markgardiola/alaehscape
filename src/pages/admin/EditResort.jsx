import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditResort = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resortData, setResortData] = useState({
    name: "",
    location: "",
    description: "",
    rooms: [],
    amenities: [],
    image: null,
    existingImage: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResort = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/resorts/${id}`);
        const data = res.data;

        setResortData({
          name: data.name,
          location: data.location,
          description: data.description,
          rooms: data.rooms || [],
          amenities: data.amenities || [],
          image: null,
          existingImage: data.image,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load resort details.");
        setLoading(false);
      }
    };

    fetchResort();
  }, [id]);

  const handleChange = (e) => {
    setResortData({ ...resortData, [e.target.name]: e.target.value });
  };

  const handleRoomChange = (index, field, value) => {
    const updatedRooms = [...resortData.rooms];
    updatedRooms[index][field] = value;
    setResortData({ ...resortData, rooms: updatedRooms });
  };

  const handleAmenityChange = (index, value) => {
    const updatedAmenities = [...resortData.amenities];
    updatedAmenities[index] = value;
    setResortData({ ...resortData, amenities: updatedAmenities });
  };

  const handleImageChange = (e) => {
    setResortData({ ...resortData, image: e.target.files[0] });
  };

  const addRoom = () => {
    setResortData({
      ...resortData,
      rooms: [...resortData.rooms, { name: "", price: "" }],
    });
  };

  const removeRoom = (index) => {
    const updatedRooms = [...resortData.rooms];
    updatedRooms.splice(index, 1);
    setResortData({ ...resortData, rooms: updatedRooms });
  };

  const addAmenity = () => {
    setResortData({ ...resortData, amenities: [...resortData.amenities, ""] });
  };

  const removeAmenity = (index) => {
    const updatedAmenities = [...resortData.amenities];
    updatedAmenities.splice(index, 1);
    setResortData({ ...resortData, amenities: updatedAmenities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", resortData.name);
      formData.append("location", resortData.location);
      formData.append("description", resortData.description);
      formData.append("rooms", JSON.stringify(resortData.rooms));
      formData.append("amenities", JSON.stringify(resortData.amenities));
      if (resortData.image) {
        formData.append("image", resortData.image);
      }

      await axios.put(`http://localhost:5000/api/resorts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Resort updated successfully!");
      navigate("/adminDashboard/resorts");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update resort.");
    }
  };

  if (loading) return <div className="container py-5">Loading...</div>;

  return (
    <div className="container pb-5">
      <Link
        to="/adminDashboard/resorts"
        className="btn btn-outline-success mb-4"
      >
        ← Back to Listings
      </Link>

      <h2 className="mb-4">Edit Resort</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={resortData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={resortData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={resortData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Current Image</label>
          {resortData.existingImage && (
            <div className="mb-2">
              <img
                src={`http://localhost:5000/uploads/${resortData.existingImage}`}
                alt="Current"
                style={{ width: "200px", height: "130px", objectFit: "cover" }}
                className="rounded shadow-sm"
              />
            </div>
          )}
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        <hr />
        <h5>Room Options & Pricing</h5>
        {resortData.rooms.map((room, i) => (
          <div className="row mb-2" key={i}>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Room name"
                value={room.name}
                onChange={(e) => handleRoomChange(i, "name", e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={room.price}
                onChange={(e) => handleRoomChange(i, "price", e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeRoom(i)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline-primary mb-4"
          onClick={addRoom}
        >
          Add Room
        </button>

        <hr />
        <h5>Amenities</h5>
        {resortData.amenities.map((amenity, i) => (
          <div className="d-flex mb-2" key={i}>
            <input
              type="text"
              className="form-control me-2"
              value={amenity}
              onChange={(e) => handleAmenityChange(i, e.target.value)}
            />
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeAmenity(i)}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={addAmenity}
          >
            Add Amenity
          </button>
          <button type="submit" className="btn btn-success">
            Update Resort
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditResort;
