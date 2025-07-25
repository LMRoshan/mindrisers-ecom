import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-white pt-5 pb-3 mt-3"
      style={{ backgroundColor: "#1C2A3A" }}
    >
      <div className="container">
        <div className="row">
          {/* Logo and Description */}
          <div className="col-md-3 mb-4 mb-md-0">
            <div className="d-flex flex-column align-items-center align-items-md-start">
              <img
                src="https://imgs.search.brave.com/N9R04cpJZjMe2vKyvj8QP_93ACtyFq5fQ6rg20JUm9o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hcGku/ZnJlZWxvZ29kZXNp/Z24ub3JnL2Fzc2V0/cy90aHVtYi9sb2dv/L2M0ZjcyYjVjNjlk/ODQ5Nzk4Njc2NjIy/Mzk5OTVkNzkzXzQw/MC5wbmc_dD02Mzg0/MTg4NDM0Mjg5NDAw/MDA"
                alt="Company Logo"
                className="img-fluid mb-3"
                style={{ width: "80px" }}
              />
              <p className="text-white">
                Your premium shopping destination for quality products.
              </p>
              <div className="d-flex mt-3">
                <a href="#" className="text-white me-3">
                  <FaFacebook />
                </a>
                <a href="#" className="text-white me-3">
                  <FaTwitter />
                </a>
                <a href="#" className="text-white me-3">
                  <FaInstagram />
                </a>
                <a href="#" className="text-white">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h5 className="text-warning mb-3">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">
                  Contact
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-md-3 mb-4">
            <h5 className="text-warning mb-3">Customer Service</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">
                  FAQ
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">
                  Shipping
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3">
            <h5 className="text-warning mb-3">Contact Us</h5>

            <p className="mb-2">123 Main Street</p>
            <p className="mb-2">Kathmandu, Nepal</p>
            <p className="mb-2">Email: info@example.com</p>
            <p>Phone: +977 1234567890</p>
          </div>
        </div>

        <hr />

        {/* Copyright Section */}
        <div className="row">
          <div className="col-md-6 text-center">
            <p className="small text-white">
              &copy;XXX Ltd. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <ul className="d-flex justify-content-center list-unstyled mb-0 gap-3">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Terms of Service
                </a>
              </li>
              <li>|</li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
