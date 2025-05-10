import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [receipt, setReceipt] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const gcashNumber = "0917-123-4567";
  const QrCode = "../../public/images/QR_Code.png";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReceipt(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receipt) {
      toast.error("Please upload a receipt.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const bookingId = localStorage.getItem("bookingId");

      const formData = new FormData();
      formData.append("receipt", receipt);
      formData.append("bookingId", bookingId);

      await axios.post("http://localhost:5000/api/upload_receipt", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Receipt uploaded successfully!");
      localStorage.removeItem("bookingId");
      navigate("/");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload receipt. Try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5 px-3">
      <Card className="shadow-lg my-5 rounded-4 p-4 p-md-5 w-75 w-md-75 w-lg-50">
        <div className="mb-2">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
        <h3 className="mb-3 text-center">GCash Payment</h3>
        <p className="text-center">
          <strong>Account Number:</strong> {gcashNumber}
        </p>
        <div className="d-flex justify-content-center">
          <img
            src={QrCode}
            alt="GCash QR Code"
            style={{ maxWidth: "250px", width: "100%", borderRadius: "8px" }}
            className="mb-3"
          />
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload your payment receipt:</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>

          {preview && (
            <div className="mb-3">
              <p className="mb-1">Receipt Preview:</p>
              <div className="d-flex justify-content-center">
                <img
                  src={preview}
                  alt="Receipt Preview"
                  style={{
                    maxWidth: "300px",
                    width: "100%",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          )}

          <div className="d-flex justify-content-center">
            <Button type="submit" variant="success">
              Submit Receipt
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Payment;
