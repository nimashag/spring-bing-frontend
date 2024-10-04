import React from 'react'
import Title from '../components/Title'
import aboutusimg from '../assets/womenase1.jpg'
import NewsLetter from '../components/NewsLetter'

const About : React.FC = () => {
  return (
    <div>
      <div className='text-2xl pt-8'>
        <h2 className='text-4xl font-bold'>About Us</h2>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-[700px] md:max-w-[700px]' src={aboutusimg} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>Welcome to Spring Bing, where fashion meets innovation and style knows no bounds. 
                Founded with a passion for providing high-quality, trendy clothing, we are committed to offering our 
                customers a curated selection of apparel that embodies both elegance and comfort. Located in the vibrant heart of
                 Nugegoda, Spring Bing has quickly become a go-to destination for fashion enthusiasts seeking the latest styles and 
                 timeless classics. Our team is dedicated to bringing you a shopping experience that is not only enjoyable but also memorable, 
                 with collections that cater to every occasion and personality.
              </p>

              <p>At Spring Bing, we believe in more than just selling clothes; we believe in creating a community. Our mission is to inspire confidence through fashion,
                 helping our customers express their unique style with every piece they wear. We take pride in our carefully selected collections, our attention to detail, 
                 and our commitment to sustainability. As we continue to grow, our focus remains on you—our valued customer. Join us on this journey, and discover why Spring 
                 Bing is more than just a clothing store; it’s a place where your style story begins.
              </p>

              <b className='text-gray-800'>Our Mission</b>

              <p>Our mission at Spring Bing is to empower individuals through fashion by offering high-quality, stylish clothing that inspires confidence and self-expression.
                 We are dedicated to creating a shopping experience that is inclusive, enjoyable, and accessible to all. With a focus on sustainability, exceptional customer service,
                  and innovative designs, we strive to set new standards in the fashion industry. Our goal is to not only meet but exceed our customers' expectations, ensuring that every
                   piece we offer is a reflection of our commitment to excellence.
              </p>
          </div>

          
      </div>

      <div className='text-4xl py-4'>
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

export default About