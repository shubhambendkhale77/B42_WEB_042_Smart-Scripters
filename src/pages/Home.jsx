import React from 'react'
import HeroSection from '../components/HeroSection'
import Category from '../components/Category'
import HomePageProductCard from '../components/HomePageProductCard'
import Track from '../components/Track'
import Testimonial from '../components/Testimonial'
import Carousel from '../components/Home/Carousel.jsx'
import FeaturedCategories from '../components/Home/FeaturedCategories.jsx'
import Coupons from '../components/Home/Coupons.jsx'
import Features from '../components/Home/Features.jsx'
import PageProductCard from '../components/Home/PageProductCard.jsx'
import TrendingProducts from '../components/Home/Trending.jsx'
import DealOfDay from '../components/Home/DealOfDay.jsx'
const Home = () => {
  return (
    <div>
      {/* <HeroSection/>
      <HomePageProductCard/>
      <Track/>
      <Testimonial/> */}
      <Carousel/>
      <FeaturedCategories/>
      <PageProductCard/>
      <TrendingProducts/>
      <DealOfDay/>
      <Coupons/>
      <Features/>
    </div>
  )
}

export default Home
