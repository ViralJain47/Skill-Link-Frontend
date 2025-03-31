import React from 'react';
import { motion } from 'framer-motion'; // Import motion
import Email from '../assets/email.svg';
import Button from './Button'; // Assuming Button correctly handles className and onClick

function ContactUs() {
  function handleClear(event) {
    // Prevent default form submission if inside a form and type isn't explicitly button
    event.preventDefault();
    // Logic to clear the form fields (needs state management)
    console.log('Clear button clicked');
    // Example: If using state:
    // setEmail('');
    // setMessage('');
  }

  function handleSubmit(event) {
    // Prevent default form submission which causes page reload
    event.preventDefault();
    // Logic to handle form submission
    console.log('Submit button clicked');
    // Example: Get form data and send it
    // const formData = new FormData(event.target.closest('form'));
    // const email = formData.get('email'); // Add name="email" to input
    // const message = formData.get('message'); // Add name="message" to textarea
    // console.log({ email, message });
  }

  return (
    // Use motion.section for entrance animation
    <motion.section id='contact'
      initial={{ opacity: 0, y: 50 }} // Start invisible and slightly down
      whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position when in view
      viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 30% is visible
      transition={{ duration: 0.6, ease: 'easeOut' }} // Animation duration and easing
      className='w-full flex flex-col md:flex-row justify-center items-center px-6 sm:px-12 md:px-20 py-20 md:py-40 gap-12 md:gap-20' // Added responsive padding/gap and flex-col for mobile
    >
      {/* Left Side */}
      <div className='flex-col justify-center items-start w-full md:w-auto'> {/* Control width on mobile */}
        <div className='flex flex-col justify-center item-start mb-10 md:mb-15'> {/* Consistent margin */}
          <h2 className='text-3xl sm:text-4xl font-semibold'>Send us a message</h2>
          <p className='mt-3 sm:mt-4 text-neutral-700'> {/* Slightly adjusted margin/color */}
            Fill in the details below and we'll get back to you promptly
          </p>
        </div>
        {/* Email Link with enhanced transitions */}
        <a
          href='mailto:support.skilllink@gmail.com'
          className='flex border border-amber-400 hover:scale-105 hover:shadow-lg hover:bg-amber-400/80  transition-all duration-300 ease-in-out justify-start items-center px-5 py-4 sm:px-7 sm:py-5 bg-amber-400 rounded-2xl gap-4 sm:gap-5 group' // Added hover background, shadow, transition-all, group
        >
          <img src={Email} alt="Email icon" className='w-7 sm:w-8 transition-transform duration-300 group-hover:rotate-[15deg]' /> {/* Subtle icon animation on hover */}
          <p className='text-neutral-800 text-base sm:text-xl'> {/* Responsive text size */}
            Mail us at: <span className='text-black font-medium'>support.skilllink@gmail.com</span> {/* Added font-medium */}
          </p>
        </a>
      </div>

      {/* Right Side - Form */}
      <div className='w-full md:w-1/2'>
        {/* Note: Pass handleSubmit to the form's onSubmit */}
        <form className='flex flex-col w-full justify-center items-center gap-8 md:gap-10' onSubmit={handleSubmit}>
          {/* Email Input Field */}
          <div className='w-full flex flex-col gap-2'>
            <label className='text-lg sm:text-xl font-semibold' htmlFor="userEmail"> {/* Added htmlFor */}
              Your email
            </label>
            <input
              id="userEmail" // Added id matching htmlFor
              name="email" // Added name attribute for form handling
              className='mt-1 border px-4 py-3 rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 ease-in-out' // Added focus ring, transition, padding
              type="email" // Use type="email" for better validation/mobile keyboards
              placeholder='example@mail.com'
              required // Make email required
            />
            <p className='text-sm text-neutral-600'>We'll reply to this email</p> {/* Adjusted color/size */}
          </div>

          {/* Message Textarea Field */}
          <div className='w-full flex flex-col gap-2'>
            <label className='text-lg sm:text-xl font-semibold' htmlFor="userMessage"> {/* Added htmlFor */}
              Message
            </label>
            <textarea
              id="userMessage" // Added id matching htmlFor
              name="message" // Added name attribute for form handling
              className='mt-1 border px-4 py-3 rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 ease-in-out h-32 resize-none' // Added focus ring, transition, height, disable resize
              placeholder='Type your message here'
              maxLength={500} // Enforce max length
              required // Make message required
            />
            <p className='text-sm text-neutral-600'>Max 500 Characters</p> {/* Adjusted color/size */}
          </div>

          {/* Buttons */}
          <div className='w-full mt-5 flex gap-4 sm:gap-7 justify-start items-center'> {/* Changed justify-baseline to start */}
            {/* Ensure Button component accepts className and onClick */}
            {/* Corrected onClick prop passing */}
            <Button
              type='button' // Explicitly type="button" to prevent form submission
              onClick={handleClear}
              className='border text-lg sm:text-xl py-2.5 sm:py-3 w-1/3 hover:bg-red-500 hover:text-white active:scale-95 transition-all duration-300 ease-in-out rounded-md' // Added hover text color, active scale, rounded-md
            >
              Clear
            </Button>
            <Button
              type='submit' // This button submits the form
              // onClick={handleSubmit} // Remove onClick here, use form's onSubmit
              className='border border-amber-500 text-lg sm:text-xl py-2.5 sm:py-3 w-1/3 bg-amber-500 text-white hover:bg-amber-600 active:scale-95 transition-all duration-300 ease-in-out rounded-md' // Added border color, text color, active scale, rounded-md
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </motion.section>
  );
}

export default ContactUs;