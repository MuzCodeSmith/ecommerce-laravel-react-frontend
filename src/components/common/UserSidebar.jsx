import React from 'react'
import { Link } from 'react-router-dom'

const UserSidebar = () => {
  return (
    <div className="card shadow mb-5 sidebar">
    <div className="card-body p-4">
      <ul>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="">Orders</Link>
        </li>
        <li>
          <Link to="">Change Password</Link>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default UserSidebar