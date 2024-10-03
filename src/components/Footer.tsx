import React from 'react';
import logoicon from '../assets/finallogo.png';

const Footer: React.FC = () => {
  return (
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      <div>
        <img src={logoicon} className='mb-5 w-32' alt="" />
        <p className='w-full md:w-2/3 text-gray-600'>
        Spring Bing is your go-to destination for stylish and trendy clothing. We blend quality with fashion to bring you the latest collections that cater to your unique style. 
        Visit us at our Nugegoda store or shop online to discover a world of fashion that suits every occasion. At Spring Bing, we make every day a fashion statement.
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
                <li>Phone : +94-423-987-83</li>
                <li>Email : contact@springbing.com</li>
                <li>Location: No. 45, High Level Road, Nugegoda, Colombo 10250, Sri Lanka</li>
                <li></li>
            </ul>
        </div>
        
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ springbing.com - All Rights Reserved.</p>
        </div>
        
    </div>
  );
}

export default Footer;
