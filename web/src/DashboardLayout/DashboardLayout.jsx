import React, { forwardRef, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import Header from './Header'
import Sidebar from './Sidebar'

const DashboardLayout = () =>
    // {children}
    {
        return (
            <>
                <div className="dash-t">
                    <Header />
                    <ScrollToTop />
                    <div className="mainsidebar-content sidebarcontent-wholebox">
                        <Sidebar />

                        <div className="sidebar-content">
                            {/* {children} */}
                            <Outlet />
                        </div>
                    </div>
                </div>
            </>
        )
    }

export default DashboardLayout
