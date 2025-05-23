import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Otp, Button, ButtonLoader } from "../";
import { login } from "../../features/auth";
import { toast } from "react-toastify";

function Login() {
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(false);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const body = await login(userData);
    console.log(body);

    if (body?.error && body) {
      setError(body.error);
      toast.error(body.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      toast.info("Please enter the 6 digit code sent.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setUserId(body.userId);
      setOtp(true);
    }
    setLoading(false);
  };

  const navigate = useNavigate();

  return (
    <>
      {otp ? (
        <Otp userId={userId} />
      ) : (
        <div className="flex justify-center items-center">
          <div className="w-1/2">
            <form
              onSubmit={handleLogin}
              className="max-w-lg min-h-7/12 mx-auto p-10 bg-white shadow-lg rounded-lg"
            >
              <h2 className="text-3xl font-semibold text-center mb-6 text-[#FF5722]">
                Login
              </h2>
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
                  value={userData.email}
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...userData,
                      email: e.target.value,
                    }));
                  }}
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
                  value={userData.password}
                  onChange={(e) => {
                    setUserData(() => ({
                      ...userData,
                      password: e.target.value,
                    }));
                  }}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FF5722] hover:bg-[#FF7043] text-white p-2 rounded-md mt-4"
              >
                {loading ? <ButtonLoader /> : "Login"}
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
            <img
              src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg?ga=GA1.1.1425286223.1739288370&semt=ais_hybrid"
              alt=""
            />
          </div>
        </div>
      )}{" "}
    </>
  );
}

export default Login;
