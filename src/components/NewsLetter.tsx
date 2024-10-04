import React from 'react'

const NewsLetter: React.FC = () => {
    {/* 
        -----not to reload the webpage-----

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

        onSubmit={onSubmitHandler}

    */}


  return (
    <div className='mt-4 text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now To Get Our Latest Arrivals</p>
        <p className='text-gray-400 mt-3'>Stay ahead of the fashion curve by subscribing to our newsletter.<br/>Be the first to know about our latest arrivals, 
            exclusive offers, and style tips tailored just for you.<br/> Join our community of trendsetters and never miss out on what's new at Spring Bing.
        </p>

        <form  className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter Your Email Here!' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter