import React from 'react'
import contactimg from '../assets/contactusimg3.jpg'
import NewsLetter from '../components/NewsLetter'
import { Link } from 'react-router-dom'

const ContactUs : React.FC = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 '>
        <h2 className='text-4xl font-bold'>Contact Us</h2>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='md:max-w-[420px]' src={contactimg} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Location : <br />No. 45,High Level Road,<br />Nugegoda, Colombo 10250,<br /> Sri Lanka </p>
          <p className='text-gray-500'>Tel: (+94)-423-987-83 <br /> Email: applyinq@springbing.com</p>
          <p className='font-semibold text-xl text-gray-600'>Any Issues?</p>
          <p className='text-gray-500'>Is there any issues regarding the website? Ask Your Question!</p>
          <Link to='/faqs'>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>F A Q</button>
          </Link>
        </div>
      </div>

      <NewsLetter/>
    </div>
  )
}

export default ContactUs;