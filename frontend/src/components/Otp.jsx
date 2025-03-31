import React, { useState, useEffect, useRef } from "react";

function Otp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
    // Handle left arrow
    else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    // Handle right arrow
    else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    
    // Check if pasted content is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (otp.some((digit) => digit === "")) {
      setError("Please enter all 6 digits of the OTP");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`OTP Submitted: ${otp.join("")}`);
    }, 1500);
  };

  const handleResendOTP = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0].focus();
    
    // Simulate sending new OTP
    alert("New OTP has been sent to your email");
  };

  // Auto-submit when all fields are filled
  useEffect(() => {
    if (otp.every(digit => digit !== "")) {
      handleSubmit();
    }
  }, [otp]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transition duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Verification Code</h2>
        
        <p className="text-gray-600 text-center mb-6">
          We've sent a 6-digit code to your email address.
          Enter it below to verify your identity.
        </p>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
            <p>{error}</p>
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
                className={`
                  w-12 h-14 text-xl font-semibold text-center 
                  rounded-lg outline-none transition-all duration-200
                  ${digit ? 'bg-indigo-50 border-2 border-indigo-500' : 'border-2 border-gray-300'} 
                  focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200
                `}
                placeholder=""
                autoComplete="off"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || otp.some(digit => digit === "")}
            className={`
              w-full py-3 px-4 rounded-lg font-medium text-white 
              transition duration-300 flex justify-center items-center
              ${isSubmitting || otp.some(digit => digit === "") 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'}
            `}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : (
              'Verify OTP'
            )}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={handleResendOTP}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-300"
          >
            Resend verification code
          </button>
        </div>
      </div>
    </div>
  );
}

export default Otp;