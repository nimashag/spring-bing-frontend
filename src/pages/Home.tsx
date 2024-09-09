import React from 'react'
import Hero from '../components/Hero'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'
import Recomendation from '../components/Recomendation'
import Complaints from '../components/Complaints'
import ShopByCategory from '../components/ShopByCategory'
import Banner from './banner/Banner'
import Trending from '../components/CurrentTrending'

const Home : React.FC = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      <Hero />
      <Trending />
      { token && (
        <Recomendation />
      )}
      <ShopByCategory />
      <Banner />
      <Complaints />
      <OurPolicy />
      <NewsLetter />
    </div>
  )
}

export default Home