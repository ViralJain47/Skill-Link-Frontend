import React from 'react'
import Email from '../assets/email.svg'
import Button from './Button'

function ContactUs() {
  
  function handleClear() {

  }

  function handleSubmit() {

  }

  return (
    <div className='w-full flex justify-center items-center px-20 py-40 gap-20'>
      <div className='flex-col justify-center items-start'>
        <div className='flex flex-col justify-center item-start'>
        <h2 className='text-4xl font-semibold'>Send us a message</h2>
        <p className='mt-4'>Fill in the details below and we'll get back to you promptly</p>
        </div>
        <a href='mailto:support.skilllink@gmail.com' className='flex border hover:scale-105 duration-300 justify-around items-center px-7 py-5 mt-15 bg-amber-400 rounded-2xl gap-5'>
          <img src={Email} alt="svg" className='w-8' />
          <p className='text-neutral-800 text-xl'>Mail us at: <span className='text-black'>support.skilllink@gmail.com</span></p>
        </a>
      </div>
      <div className='w-1/2'>
        <form className='flex flex-col w-full justify-center items-center gap-10'>
          <div className='w-full flex flex-col gap-2'>
            <label className='text-xl font-semibold' htmlFor="">Your mail</label>
            <input className='mt-1 border px-4 py-2 rounded-md border-gray-300' type="text" placeholder='example@mail.com' />
            <p className='text-neutral-700'>We'll reply to this email</p>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <label className='text-xl font-semibold' htmlFor="">Message</label>
            <textarea className='mt-1 border px-4 py-2 rounded-md border-gray-300' placeholder='Type your message here' />
            <p className='text-neutral-700'>Max 500 Characters</p>
          </div>
          <div className='w-full mt-5 flex gap-7 justify-baseline items-center'>
            <Button children={'Clear'} className='border text-xl py-3 w-1/3 hover:bg-red-500 duration-300' type='button' props={onclick={handleClear}}/>
            <Button children={'Send'} className='border text-xl py-3 w-1/3 bg-amber-500 hover:bg-amber-600' type='submit' props={onclick={handleSubmit}}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
