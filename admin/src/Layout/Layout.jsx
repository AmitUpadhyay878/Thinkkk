import React from 'react'
import Header from './Header/Header'
import SideBar from './SideBar/SideBar'
import {Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <>
      <div className="admin-t">
        <Header />
        <div className="row ">
          <div className="col-lg-2 col-md-12 col-12">
            <SideBar />
          </div>
          <div className="col-lg-10 col-md-12 col-12 ms-auto">
            {/* {children} */}
            <div className="admin-content-page" style={{padding: "110px 20px 40px"}}>
            <Outlet/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout