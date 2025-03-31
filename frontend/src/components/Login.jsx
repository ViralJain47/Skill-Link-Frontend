import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
  };

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2">
        <form
          onSubmit={handleLogin}
          className="max-w-lg min-h-7/12 mx-auto p-10 bg-white shadow-lg rounded-lg"
        >
          <h2 className="text-3xl font-semibold text-center mb-6 text-[#FF5722]">
            Login
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold py-3"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-[#FF5722]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold py-3"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-[#FF5722]"
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
              onClick={() => navigate("/register")}
              className="text-[#E91E63] text-sm hover:underline"
            >
              Don't have an account? Register
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 min-h-screen flex justify-center items-center">
        <img src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg?ga=GA1.1.1425286223.1739288370&semt=ais_hybrid" alt="" />
      </div>
    </div>
  );
}

export default Login;
