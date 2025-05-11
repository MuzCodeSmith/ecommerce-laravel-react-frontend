import React, { useEffect, useState } from 'react'
import ProductImg1 from '../../assets/images/Mens/six.jpg';
import ProductImg2 from '../../assets/images/Mens/seven.jpg';
import ProductImg3 from '../../assets/images/Mens/six.jpg';
import ProductImg4 from '../../assets/images/Mens/fivee.jpg';
import { adminToken, apiUrl } from './http';
import { Link, Links } from 'react-router-dom';
const FeaturedProducts = () => {

    const [products, setProducts] = useState([]);

    const getLatestProducts = async () => {
        let res = await fetch(`${apiUrl}/get-featured-products`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`,
            }
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setProducts(result.data);
                } else {
                    console.log("something went wrong")
                }
            })
    }

    useEffect(() => {
        getLatestProducts()
    }, [])

    return (
        <section className="section-2 py-5">
            <div className="container">
                <h2>Featured Products</h2>
                <div className="row mt-4">

                    {
                        products && products.map(product => {
                            return (

                                <div className="col-md-3 col-6">
                                    <div className="product card border-0">
                                        <div className="card-img">
                                            <Link to={`/product/${product.id}`}>

                                                {
                                                    product.image_url !== "" ? <img src={product.image_url} alt="" />
                                                        : <img src={'https://placehold.co/360x540/png'} alt="" />
                                                }

                                            </Link>
                                        </div>
                                        <div className="card-body pt-3">
                                            <a href="">{product.title}</a>
                                            <div className='price'>
                                                ${product.price} <span className='text-decoration-line-through'>${product.compare_price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }

                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts