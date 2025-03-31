import { Outlet } from 'react-router-dom'
import './App.css'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import HeroSection from './components/HeroSection'

function App() {
  return (
    <>
    <Header />
    <div className='flex flex-col'>
    <HeroSection />
    <Outlet />
    <AboutUs />
    <ContactUs />
    </div>
    <Footer />
    </>
  )
}

export default App
