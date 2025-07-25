import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "../assets/signup.png";
import { useFormik } from "formik";
import { SignupSchema } from "../schemas/Index";
import Footer from "./Footer";

const SignIn = () => {
  const credentials = {
    name: "",
    email: "",
    password: "",
  };
  const navigate =useNavigate()

  // const navigate = useNavigate();

  const { values, handleChange, handleBlur,handleSubmit, errors, touched } =
    useFormik({
      initialValues: credentials,
      validationSchema: SignupSchema,
      onSubmit: async (values, action) => {
        console.log(values);

        const { name, email, password } = values;

        try {
          const response =  await fetch("http://localhost:3000/api/auth/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
          });

          console.log('Response status:', response.status);

          const json = await response.json();
          console.log('Response data:', json);

          if (json.success) {
            localStorage.setItem("token", json.authToken);
            navigate("/signin");
            action.resetForm();
          } else {
            console.error("Login failed", json.error);
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
  //   const { name, password, email } = credentials;

  //   const response = await fetch("", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, password, email }),
  //   });
  //   const json = await response.json();
  //   if (json.success) {
  //     localStorage.setItem("token", json.authToken);
  //     navigate("/home");
  //   } else {
  //     console.error("Login failed", json.error);
  //   }
  // };

  return (
    <div className="container mt-5 mb-5 border p-3 shadow">
      <div className="row">
        <div className="col-lg-6">
          <div className="p-3 d-flex flex-column justify-content-center mt-4">
            <h1 className="text-center fw-bold" style={{ color: "#A78FDE" }}>
              SignUp
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">
                  name
                </label>
                <input
                  type="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  id="name"
                />
                {errors.name && touched.name ? (
                  <p className="text-danger">{errors.name}</p>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  id="email"
                />
                {errors.email && touched.email ? (
                  <p className="text-danger">{errors.email}</p>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  id="password"
                />
                {errors.password && touched.password ? (
                  <p className="text-danger">{errors.password}</p>
                ) : null}
              </div>

                <p className="mt-3">
                  Already have an account?
                  <Link
                    to="/signin"
                    className="text-decoration-none fw-bold ms-2"
                    style={{ color: "#A78FDE" }}
                  >
                    Signin
                  </Link>
                </p>
             

              <button
                type="submit"
                className="btn d-block mx-auto px-4 fw-bold"
                style={{ backgroundColor: "#A78FDE" }}
              >
                Register
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-6">
          <img
            src={Img}
            alt="signup"
            className="img-fluid"
            style={{ width: "100%", height: "70vh", objectFit: "fill" }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
