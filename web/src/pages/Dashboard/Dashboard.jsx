import React, { Suspense, useState } from 'react'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import request from '../../util/request'
import { ReactComponent as RightarrowIcon } from '../../assets/images/rightarrow.svg'
import congratsImg from '../../assets/dashboardimg/congrats.png'
import gif from '../../assets/dashboardimg/vector.gif'

//Image Section
import vectorImg from '../../assets/dashboardimg/amazingtimage.png'

//component Section
import HellouserCard from './components/HellouserCard/HellouserCard'
import RightSection from './components/RightSection/RightSection'
import WelcomePopup from './components/WelcomePopup/WelcomePopup'
import Payment from '../Payment/Payment'

const RecentThoughts = React.lazy(() => import('./components/RecentThoughts'))
const Dashboard = () => {
    const location = useLocation()

    const [showPreview, setShowPreview] = useState(false)
    const handlePreviewShow = () => {
        setShowPreview(true)
    }

    useEffect(() => {
        if (location.state === 'dashboard') handlePreviewShow()
    }, [location.state])

    const parsed = queryString.parse(location.search)
    const params = new URLSearchParams(parsed)
    const paymentStatus = params.get('status')
    const sessionId = params.get('session_id')

    const navigate = useNavigate()

    // useEffect( () => {
    //     if(paymentStatus && sessionId){
    //          request(
    //             'POST',
    //             `/payment/check-payment-status?status=${paymentStatus}&session_id=${sessionId}`
    //         )
    //             .then(({ data }) => {
    //                 console.log(data, 'data payment')
    //             })
    //             .catch((err) => {console.log(err,"error")})
    //     }
    // }, [paymentStatus,sessionId])


    const getpaymentStatus = () => {
        request(
            'POST',
            `/payment/check-payment-status?status=${paymentStatus}&session_id=${sessionId}`
        )
            .then(({ data }) => {
                console.log(data, 'data payment')
            })
            .catch((err) => { console.log(err, "error") })
    }



    useEffect(() => {
        if (paymentStatus === "success") {
            // getpaymentStatus()
        }
    }, [paymentStatus, sessionId])

    return (
        <>
            <Helmet>
                <title>Thinkkk</title>
            </Helmet>
            <div className="row ">
                <div className="col-lg-7 col-md-12 col-12">
                    <div className="spartion scrollbar-tab">
                        <div className="thought-card card">
                            <div className="thought-cardbody card-body">
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-xl-8 col-lg-8 col-md-12 col-12">
                                        <HellouserCard />
                                        {/* Component */}
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-12 ms-auto">
                                        <div className="vector-image text-end">
                                            <img
                                                src={vectorImg}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Suspense
                            fallback={
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            }
                        >
                            <RecentThoughts /> {/* Component */}
                        </Suspense>
                    </div>
                </div>
                <RightSection /> {/* Component */}
            </div>

            {
                paymentStatus === "success"
                    ?
                    <Payment />
                    :
                    <WelcomePopup
                        showPreview={showPreview}
                        setShowPreview={setShowPreview}
                    />
            }


            {/* 
<div className="backdrop-card">
                {paymentStatus=== 'success' ? 
                <div className="card congratulations">
                    <div className="card-body">
                        <div className="vector-image">
                            <img src={congratsImg} alt="" loading="lazy" />
                        </div>
                        <div className="vector-gif">
                            <img src={gif} alt="" loading="lazy" />
                        </div>
                        <div className="card-content">
                            <h2>Payment Successful!</h2>
                            <p>Your payment has been successfully done.</p>
                            <button
                                className="common-btn"
                                onClick={() => navigate('/')}
                            >
                                Continue
                                <span className="ms-1">
                                    <RightarrowIcon />
                                </span>
                            </button>
                        </div>
                    </div>
                </div> : "failure" }
            </div> */}
        </>
    )
}

export default Dashboard
