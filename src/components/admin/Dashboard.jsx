import React, { useContext } from 'react'
import Layout from '../common/Layout'
import { AdminAuthContext } from '../context/AdminAuth'

const Dashboard = () => {

  const {logout} = useContext(AdminAuthContext)

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className='h4 pb-0 mb-0'>Dashboard</h4>
          </div>
          <div className="col-md-3">
            <div className="card shadow sidebar">
              <div className="card-body p-4">
                <ul>
                  <li>
                    <a href="">Dashboard</a>
                  </li>
                  <li>
                    <a href="">Categories</a>
                  </li>
                  <li>
                    <a href="">Brands</a>
                  </li>
                  <li>
                    <a href="">Products</a>
                  </li>
                  <li>
                    <a href="">Orders</a>
                  </li>
                  <li>
                    <a href="">Users</a>
                  </li>
                  <li>
                    <a href="">Shipping</a>
                  </li>
                  <li>
                    <a href="">Change Password</a>
                  </li>
                  <li>
                    <a href="" onClick={logout} >Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9"></div>
        </div>
      </div>
    </Layout>
    )
}

export default Dashboard