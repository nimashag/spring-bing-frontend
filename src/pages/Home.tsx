import React from 'react'
import Hero from '../components/Hero'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'
import CurrentTrending from '../components/CurrentTrending'
import Recomendation from '../components/Recomendation'
import Complaints from '../components/Complaints'

const Home : React.FC = () => {
  return (
    <div>
      <Hero />
      <CurrentTrending />
      <Recomendation />
      <OurPolicy />
      <Complaints />
      <br /><br /><br/><br /><br/>
      <NewsLetter />
    </div>
  )
}

export default Home