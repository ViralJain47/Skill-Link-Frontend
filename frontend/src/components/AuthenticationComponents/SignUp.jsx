import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonLoader } from '../';
import { register } from '../../features/auth';
import { toast } from 'react-toastify';

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      name, email, password
    }
    console.log(user);

    const body = await register(user);

    
    if(body.message ==  "User registered successfully") {
      navigate('/login')
    } else {
      setError(message);
    }
    
    setLoading(false);
    console.log(message);

    if(error) toast.error(body.error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    else {
      toast.success("Registered successfully.");
    }
    
  };

  
  return (
    
     <div className="flex justify-center items-center">
     <div className="w-1/2 min-h-screen flex justify-center items-center">
      <img src="https://img.freepik.com/premium-vector/vector-illustration-about-concept-mobile-app-account-successfully-registered-successful-login_675567-6141.jpg?ga=GA1.1.1425286223.1739288370&semt=ais_hybrid" alt="" />
     </div>
     <div className="w-1/2">
     <form onSubmit={handleSubmit} className="max-w-lg min-h-7/12 mx-auto p-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-[#FF5722]">Sign Up</h2>
      {error && <div className='text-xl text-red-500 my-4'>{error}</div>}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-semibold">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
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
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
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
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-[#FF5722] hover:bg-[#FF7043] text-white px-4 py-3 rounded-lg mt-4"
      >
        {loading ? <ButtonLoader /> : "Sign Up"}
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
     </div>
   </div>

  );
}

export default SignUp;