import React from 'react';
import logoicon from '../assets/logospringbing.jpeg';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className='mt-12 border-t'>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-12 text-sm'>
        {/* Logo and Description */}
        <div>
          <img src={logoicon} className='mb-5 w-32' alt="Spring Bing Logo" />
          <p className='w-full md:w-2/3 text-gray-600'>
          Spring Bing is your go-to destination for stylish and trendy clothing. We blend quality with fashion to bring you the latest collections that cater to your unique style. 
          Visit us at our Nugegoda store or shop online to discover a world of fashion that suits every occasion. At Spring Bing, we make every day a fashion statement.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-xl font-medium mb-5'>Company</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li><a href="/" className="hover:text-blue-800">Home</a></li>
            <li><a href="/about" className="hover:text-blue-800">About Us</a></li>
            <li><a href="/faqs" className="hover:text-blue-800">FAQs</a></li>
            <li><a href="/contactus" className="hover:text-blue-800">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
            <p className='text-xl font-medium mb-5'>Get In Touch</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li className="flex items-center space-x-2">
                  <FaPhone className="text-blue-800" />
                  <span>+94-423-987-83</span>
                </li>
                  
                <li className="flex items-center space-x-2">
                  <FaEnvelope className="text-blue-800" />
                  <span>contact@springbing.com</span>
                </li>
                  
                <li className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-blue-800" />
                  <span>No. 45, High Level Road, Nugegoda, Colombo 10250, Sri Lanka</span>
                </li>
            </ul>
        </div>
        </div>
        
         {/* Divider */}
        <div className="mt-8 mb-4 border-t border-gray-200 pt-5 text-center">
          <p>Copyright © 2024 springbing.com - All Rights Reserved.</p>
        </div>
    </footer>
  );
}

export default Footer;
