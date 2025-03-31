import { Outlet } from 'react-router-dom'
import './App.css'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import Features from './components/Features'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import HeroSection from './components/HeroSection'
import Dashboard from './components/Dashboard'
import AuthLayout from './components/AuthLayout'
import { useSelector } from 'react-redux'

function App() {
  const isAuthenticated = useSelector((state) => state.auth.status);

  return (
    <>
      
    </>
  )
}

export default App
