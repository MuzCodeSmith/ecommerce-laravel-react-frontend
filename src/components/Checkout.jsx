import React, { useContext, useState } from 'react'
import Layout from './common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from './context/Cart';
import { useForm } from 'react-hook-form';
import { userToken, apiUrl } from './common/http';
import { toast } from 'react-toastify';



const Checkout = () => {

    const { cardData, grandTotal, subTotal, shipping, updatedCartItem, deleteCartItem } = useContext(CartContext)
    const [paymenMethod, setPaymentMethod] = useState('cod');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }

    const processOrder = (data) => {
        if(paymenMethod == 'cod'){
            saveOrder(data, 'not paid')
        }
    }

    const saveOrder = (formdata,paymentStatus) =>{
        let newFormdata = {
            ...formdata,
            grand_total:grandTotal(),
            sub_total:subTotal(),
            shipping:shipping(),
            discount:0,
            payment_status:paymentStatus,
            status:'pending',
            cart:cardData
        }

        fetch(`${apiUrl}/save-order`,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json',
                'Authorization':`Bearer ${userToken()}`
            },
            body:JSON.stringify(newFormdata)
        }).then(res => res.json())
        .then(result =>{
            if(result.status){
                localStorage.removeItem('cart')
                navigate(`/order/confirmation/${result.id}`);
                toast.success(result.message);
            }else{
                toast.error(result.message);
            }
        })
    }
    return (
        <Layout>
            <div className="container pb-5">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" className='py-4'>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <form action="" onSubmit={handleSubmit(processOrder)} >
                    <div className="row">
                        <div className="col-md-7">
                            <h3 className='border-bottom pb-3'><strong>Billing Details</strong></h3>
                            <div className="row pt-3">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input type="text"
                                            {
                                            ...register("name", {
                                                required: "the Name field is required."
                                            })
                                            }
                                            className={`form-control ${errors.name && 'is-invalid'}`} placeholder='name' />
                                        {
                                            errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {
                                            ...register("email", {
                                                required: "the Email field is required."
                                            })
                                            }
                                            type="text" className={`form-control ${errors.email && 'is-invalid'}`} placeholder='email' />
                                        {
                                            errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                        }
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        {
                                        ...register("address", {
                                            required: "the Address field is required."
                                        })
                                        }
                                        className={`form-control ${errors.address && 'is-invalid'}`} placeholder='address' cols="30" rows="5"></textarea>
                                    {
                                        errors.address && <p className='invalid-feedback'>{errors.address?.message}</p>
                                    }
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {
                                            ...register("city", {
                                                required: "the City field is required."
                                            })
                                            }
                                            type="text" className={`form-control ${errors.city && 'is-invalid'}`} placeholder='city' />
                                        {
                                            errors.city && <p className='invalid-feedback'>{errors.city?.message}</p>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                            {
                                            ...register("state", {
                                                required: "the State field is required."
                                            })
                                            }
                                            type="text"
                                            className={`form-control ${errors.state && 'is-invalid'}`}
                                            placeholder='state' />
                                        {
                                            errors.state && <p className='invalid-feedback'>{errors.state?.message}</p>
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input
                                        {
                                            ...register("zip", {
                                                required: "the Zip field is required."
                                            })
                                            }
                                        type="text" className={`form-control ${errors.zip && 'is-invalid'}`} placeholder='zip' />
                                             {
                                        errors.zip && <p className='invalid-feedback'>{errors.address?.message}</p>
                                    }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <input 
                                        
                                        {
                                            ...register("mobile", {
                                                required: "the Mobile field is required."
                                            })
                                            }
                                        type="text" className={`form-control ${errors.mobile && 'is-invalid'}`} placeholder='mobile' />
                                             {
                                        errors.mobile && <p className='invalid-feedback'>{errors.mobile?.message}</p>
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <h3 className='border-bottom pb-3'><strong>Items</strong></h3>
                            <table className="table">
                                <tbody>
                                    {
                                        cardData && cardData.map(cartItem => {
                                            return (
                                                <tr key={`cartitem-${cartItem.id}`} >
                                                    <td width={100}>
                                                        <img src={cartItem.image_url} width={80} alt="" />
                                                    </td>
                                                    <td width={600}>
                                                        <h4>{cartItem.title}</h4>
                                                        <div className="align-items-center d-flex pt-3">
                                                            <span>${cartItem.price}</span>
                                                            <div className="ps-3">
                                                                {
                                                                    cartItem.size && <button className="btn btn-size">{cartItem.size}</button>
                                                                }
                                                            </div>
                                                            <div className="ps-5">x {cartItem.qty}</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex justify-content-between border-bottom pb-2">
                                        <div><strong>Subtotal</strong></div>
                                        <div>${subTotal()}</div>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom py-2">
                                        <div><strong>Shipping</strong></div>
                                        <div>${shipping()}</div>
                                    </div>
                                    <div className="d-flex justify-content-between border-bottom py-2">
                                        <div><strong>Grand Total</strong></div>
                                        <div>${grandTotal()}</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <input type="radio" onClick={handlePaymentMethod} checked={paymenMethod === 'stripe'} value={'stripe'} name="" id="stripeRadio" />
                                <label htmlFor="stripeRadio" className='form-label ps-2'>Stripe</label>
                                <input onClick={handlePaymentMethod} type="radio" checked={paymenMethod === 'cod'} value={'cod'} name="" id="codRadio" className='ms-3' />
                                <label htmlFor="codRadio" className='form-label ps-2'>COD</label>
                            </div>

                            <h3 className='border-bottom pt-4 pb-3'><strong>Payment Methods</strong></h3>
                            <div className="d-flex py-3">
                                <button className="btn btn-primary">Pay Now</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Checkout