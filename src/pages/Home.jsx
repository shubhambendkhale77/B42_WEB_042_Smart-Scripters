import React from 'react'
import HeroSection from '../components/HeroSection'
import Category from '../components/Category'
import HomePageProductCard from '../components/HomePageProductCard'
import Track from '../components/Track'
import Testimonial from '../components/Testimonial'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <Category/>
      <HomePageProductCard/>
      <Track/>
      <Testimonial/>
    </div>
  )
}

export default Home
