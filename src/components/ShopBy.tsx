import React, { useRef, useState } from 'react';
import Homepics from '../pages/animations/Homepics';

const ShopBy :React.FC= () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      <h2 className='text-4xl font-bold leading-snug text-black'>Explore Our Curated Categories</h2>
        <br/>
      <p>Discover the latest styles and trends handpicked just for you.
        <br />Whether you're looking for chic dresses, cozy rompers, or versatile jumpsuits, we have something for every occasion.
      </p>

      <div className='mt-8'>
        <Homepics />
      </div>

      <div className="social-media-footer">
          <p className='text-xl'>Browse our collections and find the perfect pieces to elevate your wardrobe.</p>
          <a href="/products" target="_blank" rel="noopener noreferrer">
              <br/>
              <button className="bg-black text-white font-semibold px-5 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">Browse Collections</button>
          </a>
      </div>
    </div>
  )
}

export default ShopBy