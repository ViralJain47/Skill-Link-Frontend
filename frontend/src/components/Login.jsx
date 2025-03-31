import React, { useState } from 'react';
import loginImage from '../assets/login.png';
import Button from './Button';
import SignUp from './SignUp';

function Login() {
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true); 

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    
  };

  return (
    <div className="relative h-screen bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="relative overflow-hidden">
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-[#F5F5DC] transition-transform duration-500 ease-in-out ${
              isLogin ? 'transform translate-x-0' : 'transform -translate-x-full'
            }`}
          >
            <form onSubmit={handleLogin} className="w-120 h-120 p-10 bg-white shadow-lg rounded-lg">
              <h2 className="text-3xl font-semibold text-center mb-6 text-[#FF5722]">Login</h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-semibold py-3">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-[#FF5722]"
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold py-3">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-[#FF5722]"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-[#FF5722] hover:bg-[#FF7043] text-white p-2 rounded-md mt-4"
              >
                Login
              </Button>
              
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(false)} 
                  className="text-[#E91E63] text-sm hover:underline"
                >
                  Don't have an account? Register
                </button>
              </div>
            </form>
          </div>
          
          <div 
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              isLogin ? 'transform translate-x-full' : 'transform translate-x-0'
            }`}
          >
            <img src={loginImage} alt="Login" className="h-full w-full object-cover" />
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              isLogin ? 'transform translate-x-0' : 'transform -translate-x-full'
            }`}
          >
            <img src={loginImage} alt="Login" className="h-full w-full object-cover" />
          </div>
          
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-[#F5F5DC] transition-transform duration-500 ease-in-out ${
              isLogin ? 'transform translate-x-full' : 'transform translate-x-0'
            }`}
          >
            <SignUp setIsLogin={setIsLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;