import React, { Children } from 'react'
import { Outlet } from 'react-router-dom'
// import MobileTogel from '../admin/component/Mobile/MobileTogel'
import Sidebar from '../admin/component/Mobile/Sidebar'

export default function ProtectedAdmin({Children}) {
  return (
    <div>
      <Outlet/>
      <Sidebar/>
    </div>
  )
}
