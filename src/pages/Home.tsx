import React from 'react'
import Hero from '../components/Hero'
import OurPolicy from '../components/OurPolicy'
import NewsLetter from '../components/NewsLetter'

const Home : React.FC = () => {
  return (
    <div>
      <Hero />
      <OurPolicy />
      <NewsLetter />
    </div>
  )
}

export default Home