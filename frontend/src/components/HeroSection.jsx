import { Link } from "react-router-dom";
import heroImage from "../assets/LandingImage.png";
import { useEffect } from "react";

function HeroSection() {
  
  useEffect(() => {
   
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatContent {
        0% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0); }
      }
      
      @keyframes floatImage {
        0% { transform: translateY(0); }
        50% { transform: translateY(20px); }
        100% { transform: translateY(0); }
      }
      
      .content-float {
        animation: floatContent 8s ease-in-out infinite;
      }
      
      .image-float {
        animation: floatImage 8s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section id="home"
      className="relative grid grid-cols-2 justify-between items-center px-8 pb-25 pt-30 gap-10 align-middle"
      style={{
        backgroundColor: "#FFCCCC", 
      }}
    >
      <div
        className="flex-1 max-w-lg pl-20 mb-30 mt-3 content-float align-middle place-self-center"
      >
        <h1 className="text-4xl mb-5 text-black">Showcase, Learn and Grow</h1>
        <p className="text-base leading-6 text-gray-800 ">
          SkillLink connects learners and experts, offering diverse courses, workshops, and one-on-one sessions to share
          knowledge, master new skills, and build meaningful connections.
        </p>
        <Link
          to="/register"
          className="inline-block bg-amber-400 text-black py-3 px-8 rounded-full font-medium transition-colors duration-300 hover:bg-amber-500 mt-8 border"
        >
          Get Started
        </Link>
      </div>
      <div
        className="flex-1 flex place-self-center justify-center items-center mb-20 image-float"
      >
        <img
          src={heroImage}
          alt="Person learning online"
          className="w-xl"
        />
      </div>
      {/* Add the speech bubble tail */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,0,0,0z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  );
}

export default HeroSection;