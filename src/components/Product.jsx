import React, { useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { Rating } from 'react-simple-star-rating'

// images
import ProductImg1 from '../assets/images/Mens/fivee.jpg';
import ProductImg2 from '../assets/images/Mens/six.jpg';
import ProductImg3 from '../assets/images/Mens/seven.jpg';

const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(0)


    return (
        <Layout>
            <div className="container product-detail">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item " aria-current="page"><Link to="/shop">Shop</Link></li>
                                <li className="breadcrumb-item " aria-current="page">Dummy Product</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="row">

                            <div className="col-2">
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    direction={`vertical`}
                                    spaceBetween={10}
                                    slidesPerView={6}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper mt-2"
                                >

                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImg1}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImg2}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <div className='content'>
                                            <img
                                                src={ProductImg3}
                                                alt=""
                                                height={100}
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                            <div className="col-10">

                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#000',
                                        '--swiper-pagination-color': '#000',
                                    }}
                                    loop={true}
                                    spaceBetween={0}
                                    navigation={true}
                                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >

                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImg1}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImg2}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide >
                                        <div className='content'>
                                            <img
                                                src={ProductImg3}
                                                alt=""
                                                className='w-100' />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>

                            </div>

                        </div>
                    </div>
                    <div className="col-md-7">

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product