import React from "react";

function LandingPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col">
        <HeroSection />
        <AboutUs />
        <Features />
        <ContactUs />
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
