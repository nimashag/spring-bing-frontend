import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './SocialMedia.css';
import { EffectCoverflow, Pagination } from 'swiper/modules';

const SocialMedia: React.FC = () => {
  return (
    <div>
      <div className="social-media-header">
        <h2 className='text-4xl font-bold mb-6 leading-snug text-center'>Get Featured on Spring Bing!</h2>
        <p className='text-center'>Join our social media community and get a chance to be featured on our website.<br />Share your style, tag us, and you could be our next spotlight!</p>
      </div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {/* Swiper Slides */}
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/7216834/pexels-photo-7216834.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/13652450/pexels-photo-13652450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/6900834/pexels-photo-6900834.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/14663902/pexels-photo-14663902.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/2086989/pexels-photo-2086989.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/20401623/pexels-photo-20401623/free-photo-of-woman-posing-among-pink-decoration.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/8774421/pexels-photo-8774421.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/5775981/pexels-photo-5775981.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/16259491/pexels-photo-16259491/free-photo-of-a-woman-sitting-on-top-of-an-orange-mustang.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/12644848/pexels-photo-12644848.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/7244585/pexels-photo-7244585.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/12476642/pexels-photo-12476642.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/4667543/pexels-photo-4667543.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/15011412/pexels-photo-15011412/free-photo-of-a-woman-in-a-fashionable-outfit.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://images.pexels.com/photos/14848583/pexels-photo-14848583.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </SwiperSlide>
      </Swiper>

      <div className="social-media-footer">
        <p className='text-xl'>Want to see more amazing styles?</p>
        <p>Follow us on Instagram and get the latest updates on our featured products and community spotlights.</p>
        <a href="https://www.instagram.com/_.spring_bing._/" target="_blank" rel="noopener noreferrer">
            <br/>
            <button className="instagram-button">Follow Us on Instagram</button>
        </a>
    </div>

      <br/><br/><br/>
    </div>
  );
}

export default SocialMedia;
