import React from 'react'
import Layout from './common/Layout'

const Confirmation = () => {
  return (
    <Layout>
      <div className="container py-5">
            <div className="row">
              <h1 className="text-center fw-bold text-success">Thank You!</h1>
              <p className="text-muted text-center">Your Order has been successfully placed.</p>
            </div>
            <div className="card shadow">
              <div className="card-body">
                <h3 className='fw-bold'>Order Summary</h3>
                <hr />
                <div className="row">
                  <div className="col-6">
                    <p><strong>Order ID: </strong>#12212</p>
                    <p><strong>Date: </strong>17 March 2025</p>
                    <p>
                      <strong>Status:</strong>
                      <span className="badge badge-warnning">Pending</span>
                    </p>
                    <p><strong>Payment Method: </strong> COD</p>
                  </div>
                  <div className="col-6">
                    <p><strong>Customer: </strong>Muzaffar Shaikh</p>
                    <p><strong>Address: </strong>Dummy Address</p>
                    <p><strong>Contact: </strong>8208091113</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <table className="table-striped table-bordered table">
                      <thead className='table-light'>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th width={150}>Price</th>
                          <th width={150}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Product 1</td>
                          <td>100</td>
                          <td>$10</td>
                          <td>10</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className='text-end fw-bold' colSpan={3}>Subtotal</td>
                          <td>$10</td>
                        </tr>
                        <tr>
                          <td className='text-end fw-bold' colSpan={3}>Shipping</td>
                          <td>$0</td>
                        </tr>
                        <tr>
                          <td className='text-end fw-bold' colSpan={3}>Grand total</td>
                          <td>$10</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary">Wiew Order Details</button>
                    <button className="btn btn-outline-secondary ms-2">Continue Shopping</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default Confirmation