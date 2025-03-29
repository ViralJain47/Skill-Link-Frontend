import { Link } from "react-router-dom"
import Button from "../Button"

function Header() {
  return (
    <header className="w-full py-4 px-6 md:px-12 lg:px-24 flex items-center justify-between">
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
        <Link to="/" className="text-sm font-medium hover:text-gray-600">
          Home
        </Link>
        <Link to="/" className="text-sm font-medium hover:text-gray-600">
          Product
        </Link>
        <Link to="/" className="text-sm font-medium hover:text-gray-600">
          Pricing Plans
        </Link>
        <Link to="/" className="text-sm font-medium hover:text-gray-600">
          Contact
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Link to="/" className="text-sm font-medium hover:text-gray-600">
          Log In
        </Link>
        <Button className="bg-amber-500 hover:bg-amber-600 text-black font-normal rounded-xl px-1.5-2.5">Get Started</Button>
      </div>
    </header>
  )
}

export default Header;