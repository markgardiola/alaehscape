import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark py-5 mt-auto">
      <div className="container-fluid text-light">
        <div className="row gy-4 text-center flex-column flex-md-row align-items-start">
          <div className="col-md-4 text-start ps-5">
            <h5 className="text-capitalize">you can contact us via email</h5>
            <p className="fst-italic">alaehscape@gmail.com</p>
          </div>

          <div className="col-md-4">
            <p
              className="display-6 mb-2"
              style={{
                fontFamily: "'Merienda', sans-serif",
                fontWeight: 500,
              }}
            >
              Ala-Eh-scape
            </p>
            <small className="text-white-50">
              &copy; Copyright by Team Ala-Eh. All rights reserved.
            </small>
          </div>

          <div className="col-md-4 text-end pe-5">
            <Link to="/adminSignIn" className="btn btn-outline-light btn-sm">
              Sign in as Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
