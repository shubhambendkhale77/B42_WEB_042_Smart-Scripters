import React from 'react'
import HeroSection from '../components/HeroSection'
import Category from '../components/Category'
import HomePageProductCard from '../components/HomePageProductCard'
import Carousel from '../components/Home/Carousel.jsx'
import FeaturedCategories from '../components/Home/FeaturedCategories.jsx'
import Coupons from '../components/Home/Coupons.jsx'
import Features from '../components/Home/Features.jsx'
import PageProductCard from '../components/Home/PageProductCard.jsx'
import TrendingProducts from '../components/Home/Trending.jsx'
import DealOfDay from '../components/Home/DealOfDay.jsx'
import UpcomingSales from '../components/Home/UpcomingSales.jsx'
import OrderTracker from './OrderTracker.jsx'
const Home = () => {
  return (
    <div>
      <Carousel/>
      <FeaturedCategories/>
      <PageProductCard/>
      <TrendingProducts/>
      <Coupons/>
      <UpcomingSales/>
      <DealOfDay/>
   
      <Features/>
    </div>
  )
}

export default Home
