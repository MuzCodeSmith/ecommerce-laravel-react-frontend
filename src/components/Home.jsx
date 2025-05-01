import React from 'react'

// Import Swiper styles
import 'swiper/css';
import LatestProducts from './common/LatestProducts';
import FeaturedProducts from './common/FeaturedProducts';
import Header from './common/Header';
import Slider from './common/Slider';
import Footer from './common/Footer';
import Layout from './common/Layout';


const Home = () => {
  return (
    <>
      <Layout>
        <Slider/>
        <LatestProducts />
        <FeaturedProducts />
      </Layout>
    </>
  )
}

export default Home