import React from "react";
import Footer from "./Footer";
import Img2 from "../assets/about.png";
import "../App.css"

const About = () => {
  return (
    <>
      <div
        style={{
          position: "relative",
        }}
        className="about-img"
      >

        <div className="about" style={{ position: "absolute", top: "35%", right: "55%", left: "5%", textAlign: "center", color: "#333" }}>
          <h2 style={{ marginBottom: "10px", fontSize: "34px", fontWeight: "bolder", textTransform: "uppercase", color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>About Us</h2>
          <p>
            We are a team of passionate individuals committed to delivering the
            best experience for our users. Our application is designed to be
            user-friendly and efficient, helping you achieve your goals with
            ease.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
