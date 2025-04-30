import React, { useState } from 'react'
import Layout from './common/Layout'
import { Link } from 'react-router-dom'
import ProductImg from '../assets/images/Mens/eight.jpg';


const Checkout = () => {
    const [paymenMethod, setPaymentMethod] = useState('cod');

    const handlePaymentMethod=(e)=>{
        setPaymentMethod(e.target.value)
    }
    return (
        <Layout>
            <div className="container pb-5">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-7">
                        <h3 className='border-bottom pb-3'><strong>Billing Details</strong></h3>
                        <form action="">
                            <div className="row pt-3">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='name' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='email' />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <textarea className='form-control' placeholder='address' cols="30" rows="5"></textarea>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='city' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='state' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='zip' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text" className='form-control' placeholder='mobile' />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-5">
                        <h3 className='border-bottom pb-3'><strong>Items</strong></h3>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td width={100}>
                                        <img src={ProductImg} width={80} alt="" />
                                    </td>
                                    <td width={600}>
                                        <h4>Dummy Project Title</h4>
                                        <div className="align-items-center d-flex pt-3">
                                            <span>$10</span>
                                            <div className="ps-3">
                                                <button className="btn btn-size">S</button>
                                            </div>
                                            <div className="ps-5">x 1</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex justify-content-between border-bottom pb-2">
                                    <div><strong>Subtotal</strong></div>
                                    <div>$20</div>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div><strong>Shipping</strong></div>
                                    <div>$5</div>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-2">
                                    <div><strong>Grand Total</strong></div>
                                    <div>$25</div>
                                </div>
                                <div className="d-flex justify-content-end  py-3">
                                    <button className="btn btn-primary">Procceed to checkout</button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <input type="radio" onClick={handlePaymentMethod} checked={paymenMethod ==- 'stripe'} value={'stripe'} name="" id="" />
                            <label htmlFor="" className='form-label ps-2'>Stripe</label>
                            <input onClick={handlePaymentMethod} type="radio" checked={paymenMethod ==- 'cod'} value={'cod'} name="" id="" className='ms-3' />
                            <label htmlFor="" className='form-label ps-2'>COD</label>
                        </div>

                        <h3 className='border-bottom pt-4 pb-3'><strong>Payment Methods</strong></h3>
                        <div className="d-flex py-3">
                                    <button className="btn btn-primary">Pay Now</button>
                                </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Checkout