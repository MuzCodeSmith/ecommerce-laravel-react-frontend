import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../common/DashboardLayout'
import { adminToken, apiUrl } from '../../common/http';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const OrderDetails = () => {

    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const params = useParams()

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()


    const fetchOrder = async () => {
        fetch(`${apiUrl}/orders/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.status === 200) {
                    setLoading(false)
                    setOrder(result.data);
                    setItems(result.data.items);
                    reset({
                        status:result.data.status,
                        payment_status:result.data.payment_status,
                    })
                }
            })
    }

    const onSubmitStatus = (data) => {
        fetch(`${apiUrl}/update-order/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body:JSON.stringify(data),
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.status === 200) {
                   toast.success(result.message);
                   fetchOrder()
                }
            })
    }

    useEffect(() => {
        fetchOrder();
    }, [])


    return (
        <div>
            <DashboardLayout innerShadow={false} pagetitle='Show Details' btnLabel='Back' btnLink='/admin/orders'>
                {
                    loading === true &&
                    <div className="text-center py-5">
                        <div className="spinner-border" role='status'>
                            <span className="visaully-hidden"></span>
                        </div>
                    </div>
                }

                {
                    loading == false && order &&
                    <div className="row">
                        <div className="col-md-9">
                            <div className="card shadow">
                                <div className="card-body">
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
                                            <div className="text-secondary">Payment Status</div>
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
                                            <div className="text-secondary pt-5">Payment Status</div>
                                            <p>COD</p>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <h3 class="pb-2 "><strong>Items</strong></h3>
                                        {
                                            items && items.map(item =>
                                                <div class="row justify-content-end">
                                                    <div class="col-lg-12">
                                                        <div class="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                            <div class="d-flex">
                                                                <img width="70" class="me-3" src={item.product.image_url} alt="" />
                                                                <div class="d-flex flex-column">
                                                                    <div class="mb-2"><span>{item.name}</span></div>
                                                                    <div><button class="btn btn-size">{item.size}</button></div>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex">
                                                                <div>X {item.qty}</div>
                                                                <div class="ps-3">${item.price}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>)
                                        }
                                        <div class="row justify-content-end">
                                            <div class="col-lg-12">
                                                <div class="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                    <div>Subtotal</div>
                                                    <div>${order.subtotal}</div>
                                                </div>
                                                <div class="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                    <div>Shipping</div>
                                                    <div>${order.shipping}</div>
                                                </div>
                                                <div class="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                    <div><strong>Grand Total</strong></div>
                                                    <div>${order.grand_total}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card shadow">
                                <div className="card-body p-4">
                                    <form onSubmit={handleSubmit(onSubmitStatus)} action="">
                                        <div className="mb-3">
                                            <label className='form-label' htmlFor="status">Status</label>
                                            <select
                                                {
                                                ...register('status', {
                                                    required: "The status field is required",
                                                })
                                                }
                                                className={`form-select ${errors.status && 'is-invalid'}`} id="status">
                                                <option value="pending">Pending</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                            {
                                                errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label className='form-label' htmlFor="payment_status">Payment Status</label>
                                            <select
                                                {
                                                ...register('payment_status', {
                                                    required: "The Payment Status field is required",
                                                })
                                                }
                                                className={`form-select ${errors.payment_status && 'is-invalid'}`} id="payment_status">
                                                <option value="paid">Paid</option>
                                                <option value="not paid">Not Paid</option>
                                            </select>
                                            {
                                                errors.payment_status && <p className='invalid-feedback'>{errors.payment_status?.message}</p>
                                            }
                                        </div>
                                        <button className='btn btn-primary'>Update</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {
                    loading === false && order.length === 0 &&
                    <div className="row">
                        <h1 className="text-center fw-bold text-muted">Order Not Found!</h1>
                    </div>
                }
            </DashboardLayout>
        </div>
    )
}
