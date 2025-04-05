import React from 'react'
import {Button} from '../'

function Card({img = "", imgClass = "", className = "",label = "Generic Label", description = "Generic Description", button = "", buttonClass = "", buttonProps}) {
  return (
    <div className={`w-full flex flex-col gap-3 justify-center items-baseline px-6 py-4 text-white bg-neutral-500 hover:scale-101 ${className}`}>
      <div>
        <h2 className='text-semibold text-2xl'>{label}</h2>
        {img && <img src={img} className={imgClass} alt='Alt text' />}
      </div>
      <p>{description}</p>
      {button && <Button children={button} props = {buttonProps} className={buttonClass} />}
    </div>
  )
}

export default Card
