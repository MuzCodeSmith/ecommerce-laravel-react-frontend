import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Rating } from 'react-simple-star-rating'

// images
import { apiUrl } from './common/http';

const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [rating, setRating] = useState(4)
    const [product, setProduct] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const params = useParams();

    const fetchProduct = async () => {
        fetch(`${apiUrl}/get-product/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(res => res.json())
            .then(result => {
                if (result.status === 200) {
                    console.log(result.data);
                    setProduct(result.data)
                    setProductImages(result.data.product_images)
                }
            })
    }

    useEffect(() => {
        fetchProduct();
    }, [])

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

                <div className="row mb-5">
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

                                    {
                                        productImages && productImages.map(productImage => {
                                            return (
                                                <SwiperSlide key={`sliderone-${productImage.id}`}>
                                                    <div className='content'>
                                                        <img
                                                            src={productImage.image_url}
                                                            alt=""
                                                            height={100}
                                                            className='w-100' />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }

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

                                    {
                                        productImages && productImages.map(productImage => {
                                            return (
                                                <SwiperSlide key={`slidertwo-${productImage.id}`} >
                                                    <div className='content'>
                                                        <img
                                                            src={productImage.image_url}
                                                            alt=""
                                                            className='w-100' />
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }

                                </Swiper>

                            </div>

                        </div>
                    </div>
                    <div className="col-md-7">
                        <h2>{product.title}</h2>
                        <div className='d-flex'>
                            <Rating readonly size={20} initialValue={rating} />
                            <span className='pt-1 ps-2'>10 Reviews</span>
                        </div>
                        <div className="price h3 py-3">${product.price} <span className='text-decoration-line-through'>${product.compare_price}</span>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: product.short_description }}>
                        </div>
                        <div className='pt-3'>
                            <strong>Select Sizes</strong>
                            <div className='sizes pt-2'>
                                {
                                    product.product_sizes && product.product_sizes.map(size => {
                                        return (
                                            <button className='btn btn-size me-2'>{size.size.name}</button>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className='add-to-cart my-4'>
                            <button className='btn btn-primary text-uppercase'>Add to Cart</button>
                        </div>

                        <hr />

                        <div>
                            <strong>SKU: </strong>
                            <span>
                                {product.sku}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Tabs
                            defaultActiveKey="description"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="description" title="Description">
                                <div dangerouslySetInnerHTML={{ __html: product.description }}>
                                </div>
                            </Tab>
                            <Tab eventKey="reviews" title="Reviews (10)">
                                Reviews section
                            </Tab>

                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product