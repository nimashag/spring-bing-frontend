import React from 'react'
import Hero from '../components/Hero'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'
import Recomendation from '../components/Recomendation'
import Complaints from '../components/Complaints'
import Banner from './banner/Banner'
import Trending from '../components/CurrentTrending'
import SocialMedia from '../components/SocialMedia'
import ShopBy from '../components/ShopBy'


const Home : React.FC = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      <Hero />
      <Trending />
      { token && (
        <Recomendation />
      )}
      <ShopBy />
      <Banner />
      <Complaints />
      <OurPolicy />
      <SocialMedia />
      <NewsLetter />
    </div>
  )
}

export default Home