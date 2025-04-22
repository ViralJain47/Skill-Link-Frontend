import React from "react";
import { AboutUs, ContactUs, Features, HeroSection } from "../components";

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
