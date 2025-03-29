import './App.css'
import AboutUs from './components/AboutUs'
import Header from './components/Header/Header'
import HeroSection from './components/HeroSection'

function App() {
  return (
    <>
    <Header />
    <div className='flex flex-col'>
    <HeroSection />
    <AboutUs /></div>
    </>
  )
}

export default App
