import React from 'react'
import { Link } from 'react-router-dom'
import complaintpic from '../assets/complaintimg2.png'

const Complaints: React.FC = () => {
    return (
        <div className='w-full mt-8 py-12 bg-white px-4 lg:px-20 relative'>
            {/* Background Image */}
            <div className='absolute inset-0'>
                <img src={complaintpic} alt="background" className='w-full h-full object-cover' />
            </div>

            {/* Overlay */}
            <div className='relative z-10 bg-black bg-opacity-50 p-8 md:p-12 lg:p-12 text-white'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
                    <div className='md:w-1/2'>
                        <h2 className='text-4xl font-bold mb-6 leading-snug'>Any Issues Regarding Our Website?</h2>
                        <p>
                            If you encounter any issues while browsing our website or have questions about our services, 
                            please don't hesitate to reach out. Our dedicated support team is here to assist you with any technical difficulties, 
                            order concerns, or general inquiries. We're committed to ensuring a seamless shopping experience for you. Your satisfaction 
                            is our priority, and we're always ready to help resolve any problems quickly and efficiently. Thank you for choosing Spring Bing!
                        </p>
                        <Link to="/faqs" className='mt-5 block'>
                            <button className='bg-black text-white font-semibold px-5 py-2 rounded hover:bg-white hover:text-black transition-all duration-300'>
                                F A Q
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Complaints
