import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "../assets/signup.png";
import { useFormik } from "formik";
import { SignupSchema } from "../schemas/Index";

const SignIn = () => {
  const credentials = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const navigate =useNavigate()

  // const navigate = useNavigate();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: credentials,
      validationSchema: SignupSchema,
      onSubmit: async (values, action) => {
        console.log(values);

        const { username, email, password } = values;

        try {
          const response = fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
          });

          const json = await response.json();

          if (json.success) {
            localStorage.setItem("token", json.authToken);
            navigate("/home");
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
  //   const { username, password, email } = credentials;

  //   const response = await fetch("", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ username, password, email }),
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
                  Username
                </label>
                <input
                  type="name"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  id="name"
                />
                {errors.username && touched.username ? (
                  <p className="text-danger">{errors.username}</p>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email
                </label>
                <input
                  type="name"
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
              <div className="mb-3">
                <label htmlFor="confirmpassword" className="form-label fw-bold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  id="confirmpassword"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <p className="text-danger">{errors.confirmPassword}</p>
                ) : null}

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
              </div>

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
    </div>
  );
};

export default SignIn;
