import React from 'react'

import BannerCard from './BannerCard'
import Title from '../../components/Title'
import { Link } from 'react-router-dom'

const Banner :React.FC= () => {
  return (
    <div className='px-4 lg:px-24 bg-white flex items-center'>
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>

            {/* left side */}
            <div className='md:w-1/2 space-y-8 h-full'>
                
                <h2 className='text-4xl font-bold leading-snug text-black'>What Our Customers Said About Us!</h2>
                <Title text1={'CUSTOMER'} text2={' REVIEWS'}/>
                <p className='md:w-23/24'>At Spring Bing, we value the voice of our customers. The "Customer Reviews" section is where our community shares their
                 experiences, opinions, and feedback about our products. Whether you're curious about the fit, quality, or style, hear directly from others who have 
                 made a purchase. Our reviews are authentic and transparent, providing you with real insights to help you make informed decisions. Explore what others 
                 have to say, and don’t forget to share your own experience!</p>
                <div>

                    {/* Add Link Here! */}
                    <Link to="/reviews" className='mt-5 block'>
                        <button className='bg-black px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200'>Browse Reviews</button>
                    </Link>
                    
                    
                </div>
            </div>

            {/* Right Side */}
            <div>
                <BannerCard></BannerCard>
            </div>

        </div>
    </div>
  )
}

export default Banner