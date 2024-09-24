import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './ShopBy.css';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

import dressimg from '../assets/dressimg.png';
import skirtimg from '../assets/skirt.jpg';
import topimg from '../assets/topimg2.png';
import pantsimg from '../assets/pantsimg.png';
import jumpsuiteimg from '../assets/jumpsuiteimg.png'
import romperimg from '../assets/romperimg.png'
import shortsimg from '../assets/shorts1.jpg'
import bodysuitimg from '../assets/bodysuit1.jpg'
import camisimg from '../assets/camis1.jpg'
import teesimg from '../assets/tees.jpg'
import sweaterimg from '../assets/sweaters1.jpg'
import blouseimg from '../assets/blouse.jpg'


const ShopBy :React.FC= () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      <h2 className='text-4xl font-bold leading-snug text-black'>Explore Our Curated Categories</h2>
        <br/>
      <p>Discover the latest styles and trends handpicked just for you.
        <br />Whether you're looking for chic dresses, cozy rompers, or versatile jumpsuits, we have something for every occasion.
      </p>

      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="shopBySwiper" 
      >

        <SwiperSlide>   
          <div className='cursor-pointer' style={{ width: '250px' }}>
            <img src={dressimg} alt="" style={{ width: '100%' }} />
            <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
              <p>D R E S S E S</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='cursor-pointer' style={{ width: '250px' }}>
            <img src={topimg} alt="" style={{ width: '100%' }} />
            <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
              <p>T O P S</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='cursor-pointer' style={{ width: '250px' }}>
            <img src={pantsimg} alt="" style={{ width: '100%' }} />
            <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
              <p>P A N T S</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='cursor-pointer' style={{ width: '250px' }}>
            <img src={skirtimg} alt="" style={{ width: '100%' }} />
            <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
              <p>S K I R T S</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='cursor-pointer' style={{ width: '250px' }}>
            <img src={jumpsuiteimg} alt="" style={{ width: '100%' }} />
            <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
              <p>J U M P S U I T E S</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
        <div className='cursor-pointer' style={{ width: '250px' }}>
            <img src={romperimg} alt="" style={{ width: '100%' }} />
            <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
              <p>R O M P E R S</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='cursor-pointer' style={{ width: '250px' }}>
              <img src={shortsimg} alt="" style={{ width: '100%' }} />
              <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
                <p>S H O R T S</p>
              </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='cursor-pointer' style={{ width: '250px' }}>
              <img src={bodysuitimg} alt="" style={{ width: '100%' }} />
              <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
                <p>B O D Y S U I T S</p>
              </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='cursor-pointer' style={{ width: '250px' }}>
              <img src={camisimg} alt="" style={{ width: '100%' }} />
              <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
                <p>C A M I S</p>
              </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='cursor-pointer' style={{ width: '250px' }}>
              <img src={teesimg} alt="" style={{ width: '100%' }} />
              <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
                <p>T E E S</p>
              </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='cursor-pointer' style={{ width: '250px' }}>
              <img src={sweaterimg} alt="" style={{ width: '100%' }} />
              <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
                <p>S W E A T E R S</p>
              </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='cursor-pointer' style={{ width: '250px' }}>
              <img src={blouseimg} alt="" style={{ width: '100%' }} />
              <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
                <p>B L O U S E S</p>
              </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="social-media-footer">
          <p className='text-xl'>Browse our collections and find the perfect pieces to elevate your wardrobe.</p>
          <a href="https://www.instagram.com/_.spring_bing._/" target="_blank" rel="noopener noreferrer">
              <br/>
              <button className="collection-button">Browse Collections</button>
          </a>
      </div>
    </div>
  )
}

export default ShopBy