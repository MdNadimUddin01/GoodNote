
import React from 'react'

const EmptyCard = ({imgSrc , message}) => {
  return (
    <div className='flex flex-col item jus mt-20 w-full h-full '>
      <img src={imgSrc} alt='Not Notes' className='w-60 mx-auto'></img>
      <p className='w-1/2 font-medium text-slate-700 text-center leading mt-8 mx-auto '>{message}</p>
    </div>
  )
}

export default EmptyCard
