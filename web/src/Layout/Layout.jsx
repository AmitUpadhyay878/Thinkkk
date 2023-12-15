import React from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import Footer from './Footer'
import Header from './Header'


const Layout = () => {
  return (
    <>
    <Header />
    <ScrollToTop />
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout