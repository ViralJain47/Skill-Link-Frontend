import {React, useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../store/authSlice";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function UtilityBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  function handleLogout() {
    localStorage.setItem("token", "");
    dispatch(logout());
    navigate("/");
  }

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const userButtonRef = useRef(null);

  // Handle clicks outside of the profile menu to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current && 
        !profileMenuRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  // Toggle profile menu visibility
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm p-4">
      <div className="flex justify-around items-center gap-20">
        <div className="w-full">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search skills, users, events..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <div className="absolute left-3 top-2.5 text-amber-500">🔍</div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-amber-400 hover:text-amber-500 relative">
            🔔
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
          <button className="p-2 text-amber-400 hover:text-amber-500 relative">
            ✉️
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              2
            </span>
          </button>
          <div className="relative">
            <button 
              ref={userButtonRef}
              className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md"
              onClick={toggleProfileMenu}
            >
              U
            </button>
            
            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div 
                ref={profileMenuRef}
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white text-lg font-semibold">
                      U
                    </div>
                    <div>
                      <h2 className="font-bold text-xs text-gray-800">{userData.name}</h2>
                      <p className="text-xs text-gray-500">{userData.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    👤 View Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    ⚙️ Settings
                  </Link>
                  <Link to="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    ❓ Help & Support
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button
            className="px-4 py-2 rounded-md border border-red-600 text-red-600 hover:text-white hover:bg-orange-700 duration-200 relative"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default UtilityBar;