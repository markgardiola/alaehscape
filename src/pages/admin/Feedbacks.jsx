import React, { useState } from "react";

const feedbacks = [
  {
    name: "John Doe",
    date: "2025-04-16",
    comment: "Great experience! Booking was smooth and fast.",
  },
  {
    name: "Jane Smith",
    date: "2025-04-15",
    comment: "Clean beach and friendly staff. Highly recommend!",
  },
  {
    name: "Carlos Reyes",
    date: "2025-04-14",
    comment: "The resort was okay but the food could be better.",
  },
  {
    name: "Maria Gonzales",
    date: "2025-04-13",
    comment: "Perfect getaway! I’ll definitely book again.",
  },
  {
    name: "Alex Tan",
    date: "2025-04-12",
    comment: "Affordable and peaceful. Loved it.",
  },
  {
    name: "Liza Aquino",
    date: "2025-04-11",
    comment: "A bit crowded during the weekend, but overall nice.",
  },
];

const CustomerFeedback = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 3;

  const indexOfLast = currentPage * feedbacksPerPage;
  const indexOfFirst = indexOfLast - feedbacksPerPage;
  const currentFeedbacks = feedbacks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mb-5">
      <h2 className="mb-4">Customer Feedbacks</h2>

      <div className="row g-4">
        {currentFeedbacks.map((fb, i) => (
          <div className="col-md-4" key={i}>
            <div className="card border-0 shadow-sm h-100 rounded-4 bg-light-subtle">
              <div className="card-body">
                <h5 className="card-title text-success fw-semibold">
                  {fb.name}
                </h5>
                <h6
                  className="card-subtitle mb-2 text-muted"
                  style={{ fontSize: "0.85rem" }}
                >
                  {new Date(fb.date).toLocaleDateString()}
                </h6>
                <p className="card-text fst-italic">"{fb.comment}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4 gap-2 flex-wrap">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`btn btn-outline-success ${
              currentPage === i + 1 ? "active" : ""
            }`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomerFeedback;
