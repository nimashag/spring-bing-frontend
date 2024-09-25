import React from 'react';

import './Homepics.css';

import dressimg from '../../assets/dressimg.png';
import skirtimg from '../../assets/skirt.jpg';
import topimg from '../../assets/topimg2.png';
import pantsimg from '../../assets/pantsimg.png';
import jumpsuiteimg from '../../assets/jumpsuiteimg.png';
import romperimg from '../../assets/romperimg.png';
import shortsimg from '../../assets/shorts1.jpg';
import bodysuitimg from '../../assets/bodysuit1.jpg';
import camisimg from '../../assets/camis1.jpg';
import teesimg from '../../assets/tees.jpg';
import sweaterimg from '../../assets/sweaters1.jpg';
import blouseimg from '../../assets/blouse.jpg';

const Homepics: React.FC = () => {
  const items = [
    { id: 1, img: dressimg, label: 'D R E S S E S' },
    { id: 2, img: skirtimg, label: 'S K I R T S' },
    { id: 3, img: topimg, label: 'T O P S' },
    { id: 4, img: pantsimg, label: 'P A N T S' },
    { id: 5, img: jumpsuiteimg, label: 'J U M P S U I T S' },
    { id: 6, img: romperimg, label: 'R O M P E R S' },
    { id: 7, img: shortsimg, label: 'S H O R T S' },
    { id: 8, img: bodysuitimg, label: 'B O D Y S U I T S' },
    { id: 9, img: camisimg, label: 'C A M I S' },
    { id: 10, img: teesimg, label: 'T E E S' },
    { id: 11, img: sweaterimg, label: 'S W E A T E R S' },
    { id: 12, img: blouseimg, label: 'B L O U S E S' }
  ];

  const quantity = items.length;

  return (
    <div className="automated-slider" style={{ '--quantity': quantity, '--gap': '30px' } as React.CSSProperties}>
      <div className="list">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="item"
            style={{ '--position': index + 1 } as React.CSSProperties}
          >
            <img src={item.img} alt={item.label} />
            <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px', textAlign: 'center' }}>
              <p className="prata-regular">{item.label}</p>
            </div>
          </div>
        ))}

        {/* Duplicate the list for continuous looping */}
        {items.map((item, index) => (
          <div
            key={`${item.id}-duplicate`}
            className="item"
            style={{ '--position': index + 1 } as React.CSSProperties}
          >
            <img src={item.img} alt={item.label} />
            <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '10px', textAlign: 'center' }}>
              <p className="prata-regular">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepics;
