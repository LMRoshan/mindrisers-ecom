import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa6";
import ProductContext from "../context/ProductContext";

const Navbar = (props) => {
  const { state } = useContext(ProductContext);

  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Mindrisers React
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mt-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item mt-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item mt-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/products"
                >
                  Products
                </Link>
              </li>
              <li className="nav-item mt-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/addproducts"
                >
                  Add Products
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/practiceNPM"
                >
                  NPM Practice
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/users"
                >
                  Users
                </Link>
              </li> */}
              <li className="nav-item mt-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/news"
                >
                  News
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/products1"
                >
                  Prod1
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/usereducer"
                >
                  UseReducer
                </Link>
              </li> */}
              <Link className="nav-link position-relative" to="/cart">
                <button
                  type="button"
                  className="btn btn-primary position-relative"
                >
                  <FaCartArrowDown />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {state?.cart?.length ?? 0}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </button>
              </Link>
            </ul>
            <Link to="/signin" className="me-2">
              <button className="btn btn-outline-info" type="button">
                Sign In
              </button>
            </Link>
            <Link to="/signup" className="me-2">
              <button className="btn btn-outline-info" type="button">
                Sign Up
              </button>
            </Link>

            <button
              className="btn btn-outline-success"
              onClick={props.toggle}
              type="submit"
            >
              {props.btnText}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
