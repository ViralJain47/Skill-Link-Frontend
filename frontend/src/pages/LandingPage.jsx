import React from "react";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import Features from "../components/Features";
import ContactUs from "../components/ContactUs";

function LandingPage() {
  return (
    <>
      <div className="flex flex-col">
        <HeroSection />
        <AboutUs />
        <Features />
        <ContactUs />
      </div>
    </>
  );
}

export default LandingPage;
