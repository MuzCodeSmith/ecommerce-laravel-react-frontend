import React from 'react'
import SliderOneImg from '../../assets/images/banner-1.jpg';
import SliderTwoImg from '../../assets/images/banner-2.jpg';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


const Slider = () => {
  return (
    <section className="section-1">
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      breakpoints={{
        1024: {
          slidesPerView: 1,
          spaceBetween: 0,
        }
      }}
    >
      <SwiperSlide>
        <div className="content" style={{ backgroundImage: `url(${SliderOneImg})` }}>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="content" style={{ backgroundImage: `url(${SliderTwoImg})` }}>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>

  )
}

export default Slider