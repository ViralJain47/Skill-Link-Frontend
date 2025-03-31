import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  const navigate = useNavigate();
  
  return (
    <form onSubmit={handleSubmit} className="w-120 h-120 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-[#FF5722]">Sign Up</h2>
      
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-semibold">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-semibold">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-semibold">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-[#FF5722] hover:bg-[#FF7043] text-white p-2 rounded-md mt-4"
      >
        Sign Up
      </button>
      
      {/* Back to Login Link */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => navigate('/login')} // Switch to login form
          className="text-[#E91E63] text-sm hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </form>
  );
}

export default SignUp;