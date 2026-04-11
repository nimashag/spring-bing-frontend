import React from 'react'
import Title from '../components/Title'
import aboutusimg from '../assets/aboutusimg5.jpg'
import NewsLetter from '../components/NewsLetter'

const About : React.FC = () => {
  return (
    <div>
      <div className='text-2xl pt-8'>
        <h2 className='text-4xl font-bold'>Welcome to Renora – Where Science Meets Beauty</h2>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-[600px]' src={aboutusimg} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Welcome to Renora, your destination for premium skincare that blends 
                science, nature, and innovation. We are committed to offering high-quality
                 skincare solutions designed to nourish, protect, and enhance your natural 
                 beauty. Rooted in the heart of Nugegoda, Renora has quickly become a trusted
                  name for those seeking effective, dermatologist-approved products that cater 
                  to every skin type and concern.
              </p>

              <p>At Renora, we believe that skincare is more than just a routine—it’s a 
                commitment to self-care and confidence. Our carefully crafted formulas 
                harness the power of natural extracts, clinically proven ingredients, and 
                cutting-edge skincare technology to deliver visible results. Whether you're 
                looking for deep hydration, anti-aging solutions, or daily protection, our 
                products are designed to bring out the best in your skin.
              </p>

              <b className='text-gray-800'>Our Mission</b>

              <p>At Renora, our mission is to empower individuals through skincare by offering 
                safe, effective, and innovative products that promote radiant and healthy skin. 
                We are dedicated to transparency, sustainability, and customer satisfaction, ensuring 
                that every product we create is backed by science and nature.
              </p>

              <p>Our goal is not just to meet expectations but to exceed them, providing skincare solutions 
                that are dermatologist-tested, cruelty-free, and free from harsh chemicals. Whether you're new 
                to skincare or a beauty enthusiast, Renora is here to help you achieve your glow with confidence.
              </p>
          </div>

          
      </div>

      <div className='text-2xl py-4'>
            <Title text1={'WHY'} text2={' CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
              <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b className='text-2xl'>Quality Assuarance:</b>
                <p className='text-gray-600'>At Spring Bing, quality is our top priority. We meticulously select every fabric and inspect each garment to ensure 
                  that our products meet the highest standards. Our commitment to quality assurance guarantees that every piece you purchase is durable, comfortable, 
                  and crafted with care, so you can shop with confidence knowing that you're getting the best.
                </p>
              </div>

              <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b className='text-2xl'>Convenience:</b>
                <p className='text-gray-600'>Spring Bing is committed to making your shopping experience as convenient as possible. From our easily accessible 
                  location in Nugegoda to our user-friendly online store, we’ve designed every aspect of our service with your convenience in mind. Enjoy flexible 
                  payment options, fast delivery, and a hassle-free return policy that ensures shopping with us is always a breeze.
                </p>
              </div>

              <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b className='text-2xl'>Exceptional Customer Service:</b>
                <p className='text-gray-600'>At the heart of Spring Bing is our dedication to exceptional customer service. We believe that every customer deserves
                   personalized attention and a seamless shopping experience. Whether you’re shopping online or visiting our store, our friendly and knowledgeable 
                   team is here to assist you every step of the way. Your satisfaction is our success.
                </p>
              </div>
        </div>

      <NewsLetter />
    </div>
  )
}

export default About;