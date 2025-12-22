import React from "react";
import Navbar from "../components/Navbar";
import About from "../components/About.jsx";   // ✅ CORRECT
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <About />
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
