import React from 'react'
import ProductImg1 from '../../assets/images/Mens/eight.jpg';
import ProductImg2 from '../../assets/images/Mens/seven.jpg';
import ProductImg3 from '../../assets/images/Mens/six.jpg';
import ProductImg4 from '../../assets/images/Mens/fivee.jpg';
const LatestProducts = () => {
  return (
    <section className="section-2 py-5">
    <div className="container">
        <h2>New Arrivals</h2>
        <div className="row mt-4">
            <div className="col-md-3 col-6">
                {/* Product 1 */}
                <div className="product card border-0">
                    <div className="card-img">
                        <img src={ProductImg1} alt="" className='w-100' />
                    </div>
                    <div className="card-body pt-3">
                        <a href="">Red Check Shirt For Men</a>
                        <div className='price'>
                            $50 <span className='text-decoration-line-through'>$80</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Product 2 */}
            <div className="col-md-3 col-6">
                <div className="product card border-0">
                    <div className="card-img">
                        <img src={ProductImg2} alt="" className='w-100' />
                    </div>
                    <div className="card-body pt-3">
                        <a href="">Red Check Shirt For Men</a>
                        <div className='price'>
                            $50 <span className='text-decoration-line-through'>$80</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Product 3 */}
            <div className="col-md-3 col-6">
                <div className="product card border-0">
                    <div className="card-img">
                        <img src={ProductImg3} alt="" className='w-100' />
                    </div>
                    <div className="card-body pt-3">
                        <a href="">Red Check Shirt For Men</a>
                        <div className='price'>
                            $50 <span className='text-decoration-line-through'>$80</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Product 4 */}
            <div className="col-md-3 col-6">
                <div className="product card border-0">
                    <div className="card-img">
                        <img src={ProductImg4} alt="" className='w-100' />
                    </div>
                    <div className="card-body pt-3">
                        <a href="">Red Check Shirt For Men</a>
                        <div className='price'>
                            $50 <span className='text-decoration-line-through'>$80</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default LatestProducts