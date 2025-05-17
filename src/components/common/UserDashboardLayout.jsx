import React from 'react'
import Layout from './Layout'
import UserSidebar from './UserSidebar'
import { Link } from 'react-router-dom'

const UserDashboardLayout = ({pagetitle,btnLabel,btnLink="", children, innerShadow=true}) => {
  return (
    <Layout>
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className='h4 pb-0 mb-0'>{pagetitle}</h4>
          {
            btnLabel && <Link className='btn btn-primary' to={btnLink} >{btnLabel}</Link>
          }
        </div>
        <div className="col-md-3">
          <UserSidebar/>
        </div>
        <div className="col-md-9">
          <div  className={innerShadow ? "card shadow mb-5" :""}>
            <div className={innerShadow?"card-body p-4":"card-body"}>
                {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default UserDashboardLayout