import './App.css'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import Header from './components/Header/Header'
import HeroSection from './components/HeroSection'

function App() {
  return (
    <>
    <Header />
    <div className='flex flex-col'>
    <HeroSection />
    <AboutUs />
    <ContactUs />
    </div>
    </>
  )
}

export default App
