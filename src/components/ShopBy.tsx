import React from 'react'
import dressimg from '../assets/dressimg.png';
import skirtimg from '../assets/skirtimg.png';
import topimg from '../assets/topimg2.png';
import pantsimg from '../assets/pantsimg.png';
import jumpsuiteimg from '../assets/jumpsuiteimg.png'
import romperimg from '../assets/romperimg.png'

const ShopBy = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2 className='prata-regular text-2xl sm:py-3 lg:text-2xl leading-relaxed'>Shop By Category</h2>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', padding: '0 20px' }}>
        <div className='cursor-pointer' style={{ width: '200px' }}>
          <img src={dressimg} alt="" style={{ width: '100%' }} />
          <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
            <p>D R E S S E S</p>
          </div>
        </div>
        <div className='cursor-pointer' style={{ width: '200px' }}>
          <img src={pantsimg} alt="" style={{ width: '100%' }} />
          <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
            <p>P A N T S</p>
          </div>
        </div>
        <div className='cursor-pointer' style={{ width: '200px' }}>
          <img src={skirtimg} alt="" style={{ width: '100%' }} />
          <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
            <p>S K I R T S</p>
          </div>
        </div>
        <div className='cursor-pointer' style={{ width: '200px' }}>
          <img src={jumpsuiteimg} alt="" style={{ width: '100%' }} />
          <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
            <p>J U M P S U I T E S</p>
          </div>
        </div>
        <div className='cursor-pointer' style={{ width: '200px' }}>
          <img src={topimg} alt="" style={{ width: '100%' }} />
          <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px' }}>
            <p>T O P S</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopBy