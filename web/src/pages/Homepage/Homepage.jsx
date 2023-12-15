import React, { useEffect } from 'react'
import CommonCard from '../../components/CommonCard/CommonCard'
import PricePlanes from '../../components/PricePlans/PricePlanes'
import Aboutus from './components/Aboutus/Aboutus'
import ContactUs from './components/ContactUs'
import Herobanner from './components/Herobanner'
import Ourfeature from './components/Ourfeature'
import Ourvalues from './components/Ourvalues'
import OurWorkflow from './components/OurWorkflow'
import SuccessStories from '../../components/SuccessStories'
import Helmet from 'react-helmet'
import { homePageData } from './HomepageData'
import queryString from 'query-string'
import request from '../../util/request'
import { useLocation, useNavigate } from 'react-router-dom'
import Payment from '../Payment'
const Homepage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const parsed = queryString.parse(location.search)
    const params = new URLSearchParams(parsed)
    const paymentStatus = params.get('status')
    const sessionId = params.get('session_id')

    const fetchdata = async () => {
        await request(
            'POST',
            `/payment/check-payment-status?status=${paymentStatus}&session_id=${sessionId}`
        )
            .then(({ data }) => {
                console.log(data?.data, 'data payment')
                // console.log(data?.data?.subscriptionId,"=====");
                localStorage.setItem('auth', JSON.stringify(data?.meta))
                localStorage.setItem('user', JSON.stringify(data?.data))
                // sessionStorage.setItem("auth",  JSON.stringify(data?.meta))
                //     sessionStorage.setItem("user",  JSON.stringify(data?.data))

                // navigate('/payment')
                // JSON.parse(localStorage.getItem('auth'))
                // JSON.parse(localStorage.getItem('auth'))
                // localStorage.getItem('auth')
                // localStorage.getItem('user')

                // setStoreUserData(data)
            })
            .catch((err) => {
                console.log(err, 'error')
            })
    }
    useEffect(() => {
        // fetchdata()
    }, [])

    return (
        <>
            <div className="mainhome-page">
                <Helmet>
                    <title>Thinkkk</title>
                    <meta name="home" content="home page" />
                </Helmet>
                <Herobanner />
                <Aboutus keydata="about_Us" />
                <Ourvalues keydata="ourValues" />
                <OurWorkflow />
                <CommonCard />
                <Ourfeature />
                <PricePlanes />
                <SuccessStories />
                <ContactUs />
            </div>
            {paymentStatus && sessionId && <Payment/>}
        </>
    )
}

export default Homepage
