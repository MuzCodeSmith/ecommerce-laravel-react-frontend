import React, { useEffect, useState } from 'react'
import UserDashboardLayout from '../common/UserDashboardLayout'
import { apiUrl, userToken } from '../common/http';
import { Link } from 'react-router-dom';


const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchOrders = async () => {
    fetch(`${apiUrl}/get-orders`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${userToken()}`
      }
    }).then(res => res.json())
      .then(result => {
        if (result.status === 200) {
          console.log(result)
          setLoading(false)
          setOrders(result.data)
          console.log(result.data)
        }
      })
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <UserDashboardLayout pagetitle='My Orders' btnLabel='Back' btnLink='/orders'>
    {
        loading == false && orders &&
        <table className="table table-stripped">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Payment Status</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              orders && orders.map(order => {
                return (
                  <tr>
                    <td>
                      <Link className='fw-bold text-primary' to={`/admin/orders/${order.id}`}>{order.id}</Link></td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>${order.subtotal}</td>
                    <td>{order.created_at}</td>
                    <td>{
                      order.payment_status == 'paid' ? <span className="badge text-bg-success">paid</span>
                        : <span className="badge text-bg-danger">not paid</span>
                    }</td>
                    <td>{
                      order.status == 'pending' ?
                        <span className="badge text-bg-warning">Pending</span>
                        : order.status == 'shipped' ?
                          <span className="badge text-bg-secondary">Shipped</span>
                          : order.status == 'delivered' ?
                            <span className="badge text-bg-success">Delivered</span>
                            : order.status == 'cancelled' ? <span className="badge text-bg-danger">Cancelled</span> : ''
                    }</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      }
    </UserDashboardLayout>
  )
}

export default MyOrders