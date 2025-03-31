import { Outlet } from "react-router-dom";
import "./App.css";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Features from "./components/Features";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection";
import Dashboard from "./components/Dashboard";
import AuthLayout from "./components/AuthLayout";
import { useSelector } from "react-redux";
import { useState } from "react";
import MainLoader from "./components/Loaders/MainLoader";
import Sidebar from "./components/Sidebar";
import UtilityBar from "./components/UtilityBar";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(false);

  if (loading) return <MainLoader />;

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="flex">
        <Sidebar className={"min-h-screen fixed bg-amber-200"} />
        <div className="flex flex-col">
          <UtilityBar />
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
