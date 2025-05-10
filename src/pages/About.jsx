import React from "react";
import Carousel2 from "./Carousel2";
import "../styles/about.css";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="container-fluid p-0">
      <Carousel2 />
      <div className="container py-5">
        <div className="row-heading">
          <div className="col">
            <h1 className="display-5 mb-5 text-uppercase text-center">
              about us
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col border-end border-2 border-success">
            <div className="row text-capitalize py-3">
              <h1
                style={{
                  letterSpacing: "5px",
                  fontWeight: "300",
                  textShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                }}
              >
                hi! we are team ala-eh!
              </h1>
            </div>
            <div className="row ps-5 fs-5">
              <p
                className="py-3 px-5"
                style={{
                  textAlign: "justify",
                  textIndent: "60px",
                }}
              >
                Welcome to Ala-Eh-scape! We're your gateway to the breathtaking
                shores of Batangas, where life slows down, and connections grow
                deeper. Our passion is helping you find the perfect excape-a
                chance to step away from the daily grind, immerse yourself in
                nature's beauty, and cherish quality time with family and
                friends. We believe in the power of a good getaway to nurture
                the soul, strengthen relationships, and bring peace of mind.
                Join us as we celebrate life, one beach at a time!
              </p>
            </div>
            <div className="row text-capitalize pt-0 pb-3">
              <h1
                style={{
                  letterSpacing: "5px",
                  fontWeight: "300",
                  textShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                }}
              >
                aba'y larga na!
              </h1>
            </div>
            <div className="row fs-5" style={{ fontWeight: "300" }}>
              <p className="mb-0">You can contact us via our email</p>
              <p className="fst-italic">alaehscape2025@gmail.com</p>
            </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="card" style={{ width: "28rem" }}>
              <img
                src="../images/friends.avif"
                className="card-img-top"
                alt="Card image cap"
              />
              <div className="card-body text-dark d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="30"
                  fill="currentColor"
                  className="bi bi-bookmark-heart me-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"
                  />
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                </svg>
                <p className="card-text mb-0 border-success border-end rounded border-2">
                  "Tumakas patungo sa paraiso, kung saan ang bawat alon ay
                  bumubulong ng kapayapaan at ang bawat paglubog ng araw ay
                  nagbibigay inspirasyon sa mga pangarap."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
