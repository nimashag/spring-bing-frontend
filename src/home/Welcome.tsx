import React from 'react';
import welcomeImg from '../assets/welcomeImg.png';

const Welcome: React.FC = () => {
  return (
    <div className="px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="md:w-1/2">
        <br />
        <br />
        <img src={welcomeImg} alt="Welcome" className="rounded md:w-10/12" />
      </div>

      <div className="md:w-1/2 space-y-6">
        <h2 className="text-5xl font-bold my-5 md:w-3/4 leading-snug">
          <span className="text-green-700">Our Services</span>
        </h2>
        <p className="mb-10 text-lg md:w-5/6">
          Our app is a vibrant ecosystem designed for the urban gardener, offering a suite of integrated services that includes a knowledge hub, community network, a comprehensive inventory system for gardening supplies, job opportunities in the green sector, weather updates tailored for agricultural planning, and a sustainable delivery service. At the heart of our mission lies a commitment to enriching urban agriculture communities, facilitating growth and connectivity, and providing seamless access to the resources and information necessary for a flourishing green lifestyle.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
