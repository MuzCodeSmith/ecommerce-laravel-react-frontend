import React from 'react'
import Layout from './common/Layout'
import ProductImg1 from '../assets/images/Mens/eight.jpg';
import { Link } from 'react-router-dom';

const Shop = () => {
  return (
    <Layout>
      <div className="container">
        <nav aria-label="breadcrumb" className='py-4'>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
            <li class="breadcrumb-item active" aria-current="page"><Link to="/shop">Shop</Link></li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-md-3">
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h1 className='mb-3'>categories</h1>
                <ul>
                  <li className='mb-2'>
                    <input type="checkbox" name="kids" id="kids" />
                    <label htmlFor="kids" className='ps-2'>Kids</label>
                  </li>
                  <li className='mb-2'>
                    <input type="checkbox" name="women" id="women" />
                    <label htmlFor="women" className='ps-2' >Women</label>
                  </li>
                  <li className='mb-2'>
                    <input type="checkbox" name="men" id="men" />
                    <label htmlFor="men" className='ps-2'>Men</label>
                  </li>
                </ul>
              </div>

            </div>
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4 mb-3">
                <h1 className='mb-3'>Brands</h1>
                <ul>
                  <li className='mb-2'>
                    <input type="checkbox" name="kids" id="kids" />
                    <label htmlFor="kids" className='ps-2'>Puma</label>
                  </li>
                  <li className='mb-2'>
                    <input type="checkbox" name="women" id="women" />
                    <label htmlFor="women" className='ps-2' >Killer</label>
                  </li>
                  <li className='mb-2'>
                    <input type="checkbox" name="men" id="men" />
                    <label htmlFor="men" className='ps-2'>Levis</label>
                  </li>
                  <li className='mb-2'>
                    <input type="checkbox" name="men" id="men" />
                    <label htmlFor="men" className='ps-2'>Flying Machine</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">

            <div className="row pb-5">
              {/* Product 1 */}
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                  <Link to="/product">
                    <img src={ProductImg1} alt="" className='w-100' />
                  </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt For Men</Link>
                    <div className='price'>
                      $50 <span className='text-decoration-line-through'>$80</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 1 */}
              <div className="col-md-4 col-6">
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

              {/* Product 1 */}
              <div className="col-md-4 col-6">
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

              {/* Product 1 */}
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={ProductImg1} alt="" className='w-100' />
                    </Link>
                  </div>
                  <div className="card-body pt-3">
                    <Link to="/product">Red Check Shirt For Men</Link>
                    <div className='price'>
                      $50 <span className='text-decoration-line-through'>$80</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 1 */}
              <div className="col-md-4 col-6">
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

              {/* Product 1 */}
              <div className="col-md-4 col-6">
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

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Shop