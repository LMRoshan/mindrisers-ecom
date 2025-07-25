import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Img from "../assets/signup.png";
import { useFormik } from "formik";
import { LoginSchema } from "../schemas/Index";
import Footer from "./Footer";

const SignIn = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const credentials = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: credentials,
      validationSchema: LoginSchema,
      onSubmit: async (values, action) => {
        const { email, password } = values;
        try {
          const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const json = await response.json();

          // if (json.success) {
          //   localStorage.setItem("token", json.authToken);
          //   navigate("/home");
          //   action.resetForm();

          // } else {
          //   console.error("Login failed", json.error);
          // }

          if (response.ok) {
            localStorage.setItem("token", json.authToken);
            navigate("/home");
            action.resetForm();
          } else {
            if (json.error) {
              console.error("Login failed:", json.error);
            } else if (json.errors && json.errors.length > 0) {
              console.error(
                "Login failed due to validation errors:",
                json.errors
              );
            } else {
              console.error("Login failed: An unknown error occurred.", json);
              // alert("Login failed: Please try again.");
            }
          }
        } catch (error) {
          console.log("Network Error", error);
        } finally {
          action.setSubmitting(false);
        }
      },
    });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted", credentials);
  //   const { email, password } = credentials;

  //   const response = await fetch("", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email, password }),
  //   });
  //   const json = await response.json();
  //   if (json.success) {
  //     localStorage.setItem("token", json.authToken);
  //     navigate("/home");
  //   } else {
  //     console.error("Login failed", json.error);
  //   }
  // };

  // const handleChange = (e) => {
  //   setCredentials({ ...credentials, [e.target.name]: e.target.value });
  // };

  return (
    <div className="container mt-5 mb-5 border p-3 shadow">
      <div className="row">
        <div className="col-lg-6">
          <img
            src={Img}
            alt="signin"
            className="img-fluid"
            style={{ width: "100%", height: "60vh", objectFit: "fill" }}
          />
        </div>
        <div className="col-lg-6">
          <div className="p-3 d-flex flex-column justify-content-center mt-5">
            <h1
              className="text-center fw-bold mb-3"
              style={{ color: "#A78FDE" }}
            >
              Sign In
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email
                </label>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    id="email"
                  />
                </div>
                {errors.email && touched.email ? (
                  <p className="text-danger">{errors.email}</p>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  Password
                </label>
                <div className="input-group mb-3">
                  <input
                    type={!passwordVisibility ? "password" : "text"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    id="password"
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon2"
                    onClick={handlePasswordVisibility}
                  >
                    {!passwordVisibility ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && touched.password ? (
                  <p className="text-danger">{errors.password}</p>
                ) : null}
              </div>
              <p className="mt-2">
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-decoration-none ms-2 fw-bold"
                  style={{ color: "#A78FDE" }}
                >
                  Sign Up
                </Link>
              </p>
              <button
                type="submit"
                className="btn border d-block mx-auto px-4 fw-bold"
                style={{ backgroundColor: "#A78FDE" }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SignIn;
