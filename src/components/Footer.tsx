import React from 'react';
import logoicon from '../assets/logoicon.png';

const Footer: React.FC = () => {
  return (
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      <div>
        <img src={logoicon} className='mb-5 w-32' alt="" />
        <p className='w-full md:w-2/3 text-gray-600'>
          Dummy Text
        </p>
      </div>

      <div>
        <p className='text-xl font-medium mb-5'>Company</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>Home</li>
          <li>About Us</li>
          <li>Feedback</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

        <div>
            <p className='text-xl font-medium mb-5'>Get In Touch</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Phone : +1-423-987-83</li>
                <li>Email : contact@springbing.com</li>
                <li>Location: No. 45, High Level Road, Nugegoda, Colombo 10250, Sri Lanka</li>
                <li></li>
            </ul>
        </div>

    </div>
  );
}

export default Footer;
