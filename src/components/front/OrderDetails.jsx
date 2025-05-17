import React, { useEffect, useState } from 'react'
import UserDashboardLayout from '../common/UserDashboardLayout'
import { useForm } from 'react-hook-form';
import { apiUrl, userToken } from '../common/http';
import { useParams } from 'react-router-dom';
const OrderDetails = () => {


    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const params = useParams()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    const fetchOrder = async () => {
        fetch(`${apiUrl}/get-order-details/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken()}`
            }
        }).then(res => res.json())
            .then(result => {
                if (result.status === 200) {
                    setLoading(false)
                    setOrder(result.data);
                    setItems(result.data.items);
                }
            })
    }

    useEffect(() => {
        fetchOrder();
    }, [])


    return (
        <UserDashboardLayout pagetitle='Order Details' btnLabel='Back' btnLink='/account/orders' innerShadow={false}>
            {
                loading == false && order &&
                <div className="row">
                    <div className="card shadow mb-5">
                        <div className="card-body ">
                            <div className="row">
                                <div className="col-md-4">
                                    <h3>Order ID:#{order.id}</h3>
                                    <p>
                                        {
                                            order.status == 'pending' && <span className="badge text-bg-warning">Pending</span>
                                        }
                                        {
                                            order.status == 'shipped' && <span className="badge text-bg-warning">Shipped</span>
                                        }
                                        {
                                            order.status == 'delivered' && <span className="badge text-bg-success">Delivered</span>
                                        }
                                        {
                                            order.status == 'cancelled' && <span className="badge text-bg-danger">Cancelled</span>
                                        }
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <div className="text-secondary">Date</div>
                                    <h4 className='pt-2'>{order.created_at}</h4>
                                </div>
                                <div className="col-md-4">
                                    <div className="text-secondary">Payment Option</div>
                                    {
                                        order.payment_status == 'paid' ? <span className="badge text-bg-success">paid</span>
                                            : <span className="badge text-bg-danger">not paid</span>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="py-5">
                                        <strong>{order.name}</strong>
                                        <div>{order.email}</div>
                                        <div>{order.mobile}</div>
                                        <div>{order.address}, {order.city}, {order.state}, {order.zip} </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="text-secondary pt-5">Payment Option</div>
                                    <p>COD</p>
                                </div>
                            </div>

                            <div className="row">
                                <h3 className="pb-2 "><strong>Items</strong></h3>
                                {
                                    items && items.map(item =>
                                        <div key={item.id} className="row justify-content-end">
                                            <div className="col-lg-12">
                                                <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                    <div className="d-flex">
                                                        <img width="70" className="me-3" src={item.product.image_url} alt="" />
                                                        <div className="d-flex flex-column">
                                                            <div className="mb-2"><span>{item.name}</span></div>
                                                            <div><button className="btn btn-size">{item.size}</button></div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex">
                                                        <div>X {item.qty}</div>
                                                        <div className="ps-3">${item.price}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
                                }
                                <div className="row justify-content-end">
                                    <div className="col-lg-12">
                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                            <div>Subtotal</div>
                                            <div>${order.subtotal}</div>
                                        </div>
                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                            <div>Shipping</div>
                                            <div>${order.shipping}</div>
                                        </div>
                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                            <div><strong>Grand Total</strong></div>
                                            <div>${order.grand_total}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </UserDashboardLayout>
    )
}

export default OrderDetails