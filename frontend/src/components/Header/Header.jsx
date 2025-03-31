import { Link } from "react-router-dom"
import Button from "../Button"

function Header() {
  return (
    <header className="w-full py-4 px-6 md:px-12 lg:px-24 flex items-center justify-between border-b border-b-neutral-400 fixed top-0 left-0 bg-transparent/10 backdrop-blur-md p-4 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-black p-1 rounded flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div className="font-bold text-xl">Skill Link</div>
          <div className="text-xs text-gray-500 hidden sm:block">Communicate. Collaborate. Create.</div>
        </div>
      </div>

      <nav className="flex items-center gap-8 px-8 ml-auto">
        <a href="#home" className="text-sm font-medium text-gray-800 hover:text-black hover:underline">
          Home
        </a>
        <a href="#about" className="text-sm font-medium text-gray-800 hover:text-black hover:underline">
          About
        </a>
        <a href="#features" className="text-sm font-medium text-gray-800 hover:text-black hover:underline">
          Features
        </a>
        <a href="#contact" className="text-sm font-medium text-gray-800 hover:text-black hover:underline">
          Contact
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm font-medium hover:border-black border border-transparent px-4 py-2 rounded-xl duration-200">
          Log In
        </Link>
        <Link to="/register"><Button className="bg-amber-500 border hover:bg-amber-600 text-black font-normal rounded-xl px-1.5-2.5">Register</Button></Link>
      </div>
    </header>
  )
}

export default Header;