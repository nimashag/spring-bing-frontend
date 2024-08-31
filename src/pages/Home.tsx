import React from 'react'
import Hero from '../components/Hero'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'
import CurrentTrending from '../components/CurrentTrending'
import Recomendation from '../components/Recomendation'
import Complaints from '../components/Complaints'
import ShopByCategory from '../components/ShopByCategory'
import Banner from './banner/Banner'

const Home : React.FC = () => {
  return (
    <div>
      <Hero />
      <CurrentTrending />
      <Recomendation />
      <ShopByCategory />
      <Banner />
      <Complaints />
      <OurPolicy />
      <NewsLetter />
    </div>
  )
}

export default Home