import React, { useState, useEffect, useRef } from "react";
import usePostData from "../hooks/usePostData";
import { useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Otp({ userId }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (otp.some((digit) => digit === "")) {
      setError("Please enter all 6 digits of the OTP");
      return;
    }

    if (timeLeft <= 0) {
      setError("OTP has expired. Please request a new one.");
      return;
    }

    setIsSubmitting(true);

    try {
      const body = await usePostData(
        `${import.meta.env.VITE_API_ROUTE}/api/auth/verify`,
        setError,
        { userId, otp: otp.join("") }
      );

      if (body.token) {
        localStorage.setItem("token", body.token);
        const token = localStorage.getItem("token");

        const userData = await useFetchData(
          `${import.meta.env.VITE_API_ROUTE}/api/auth/me`,
          token
        );

        if (userData?.name) {
          dispatch(login({ ...userData }));
          navigate("/"); 
        } else {
          setError("Incorrect OTP");
          setOtp(["", "", "", "", "", ""]);
          inputRefs.current[0].focus();
        }
      } else {
        setError("Incorrect OTP");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0].focus();
      }
    } catch (error) {
      setError("Incorrect OTP");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [otp]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="bg-white p-8 rounded-xl relative shadow-lg w-full max-w-md transition duration-300 hover:shadow-xl">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-amber-600 hover:text-amber-800 transition-colors duration-300"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-amber-600">
          Verification Code
        </h2>

        <p className="text-gray-700 text-center mb-6">
          We've sent a 6-digit code to your email address. Enter it below to
          verify your identity.
        </p>

        <div className="text-center mb-6">
          <p className={`text-sm ${timeLeft <= 30 ? 'text-red-600' : 'text-gray-600'}`}>
            Time remaining: {formatTime(timeLeft)}
          </p>
          {timeLeft <= 0 && (
            <p className="text-red-600 text-sm mt-2">
              OTP has expired. Please return to request a new one.
            </p>
          )}
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
            {error === "Incorrect OTP" ? (
              <p>Incorrect OTP. Please try again.</p>
            ) : (
              <p>{error}</p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-6" onPaste={handlePaste}>
          <div className="flex justify-between mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={timeLeft <= 0}
                className={`
                  w-12 h-14 text-xl font-semibold text-center 
                  rounded-lg outline-none transition-all duration-200
                  ${
                    timeLeft <= 0
                      ? "border-2 border-gray-300 bg-gray-100 cursor-not-allowed"
                      : error === "Incorrect OTP"
                      ? "border-2 border-red-500 bg-red-50"
                      : digit
                      ? "bg-amber-50 border-2 border-amber-500"
                      : "border-2 border-gray-300"
                  }
                  focus:border-amber-600 focus:ring-2 focus:ring-amber-200
                `}
                placeholder=""
                autoComplete="off"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || otp.some((digit) => digit === "") || timeLeft <= 0}
            className={`
              w-full py-3 px-4 rounded-lg font-medium text-white 
              transition duration-300 flex justify-center items-center
              ${
                isSubmitting || otp.some((digit) => digit === "") || timeLeft <= 0
                  ? "bg-amber-400 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-700"
              }
            `}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Otp;