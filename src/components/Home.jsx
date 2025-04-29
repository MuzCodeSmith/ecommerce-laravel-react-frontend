import React from 'react'

// Import Swiper styles
import 'swiper/css';
import LatestProducts from './common/LatestProducts';
import FeaturedProducts from './common/FeaturedProducts';
import Header from './common/Header';
import Slider from './common/Slider';
import Footer from './common/Footer';


const Home = () => {
  return (
    <>
      <Header/>
      <Slider/>
      <LatestProducts />
      <FeaturedProducts />
      <Footer />
    </>
  )
}

export default Home