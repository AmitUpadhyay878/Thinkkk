import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as RightarrowIcon } from '../../assets/images/rightarrow.svg'
import congratsImg from '../../assets/dashboardimg/congrats.png'
import gif from '../../assets/dashboardimg/vector.gif'
import { useEffect } from 'react'
import { home, signin, thoughts, dashbard } from '../../config/routingConsts'
import queryString from 'query-string'
import request from '../../util/request'
import { useDispatch } from 'react-redux'
import { USER_LOGIN_SUCCESS } from '../../Redux/Actions/actionConsts'

const Payment = () => {
    const location = useLocation()

    const parsed = queryString.parse(location.search)
    const params = new URLSearchParams(parsed)
    const paymentStatus = params.get('status')
    const sessionId = params.get('session_id')
    const [storeUserData, setStoreUserData] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
                setStoreUserData(data)
                // dispatch({type:USER_LOGIN_SUCCESS,payload:data})
            })
            .catch((err) => {
                console.log(err, 'error')
            })
    }
    useEffect(() => {
        fetchdata()
    }, [])

    const handleClick = () => {
        if (storeUserData){
            dispatch({type:USER_LOGIN_SUCCESS,payload:storeUserData})
            navigate(home)   
        }
    }
    return (
        <>
            <div className="dash-t">
                <div className="backdrop-card">
                    {paymentStatus === 'success' ? (
                        <div className="card congratulations">
                            <div className="card-body">
                                <div className="vector-image">
                                    <img
                                        src={congratsImg}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                <div className="vector-gif">
                                    <img src={gif} alt="" loading="lazy" />
                                </div>
                                <div className="card-content">
                                    <h2>Payment Successful!</h2>
                                    <p>
                                        Your payment has been successfully done.
                                    </p>
                                    <button
                                        className="common-btn"
                                        onClick={()=> handleClick()}
                                        // onClick={()=>onContinueButtonClick()}
                                    >
                                        Continue
                                        <span className="ms-1">
                                            <RightarrowIcon />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card congratulations">
                            <div className="card-body">
                                <div className="vector-image">
                                    <img
                                        src={congratsImg}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                                <div className="vector-gif">
                                    <img src={gif} alt="" loading="lazy" />
                                </div>
                                <div className="card-content">
                                    <h2>Payment Fail!</h2>
                                    <p>Your payment has been not success.</p>
                                    <button
                                        className="common-btn"
                                        onClick={() => {
                                            // navigate('/')
                                            navigate(-1)
                                        }}
                                    >
                                        Continue
                                        <span className="ms-1">
                                            <RightarrowIcon />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Payment
