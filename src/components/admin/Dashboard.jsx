import React, { useContext } from 'react'
import Layout from '../common/Layout'
import { AdminAuthContext } from '../context/AdminAuth'
import Sidebar from '../common/Sidebar'

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
            <Sidebar/>
          </div>
          <div className="col-md-9"></div>
        </div>
      </div>
    </Layout>
    )
}

export default Dashboard