import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form, Spinner } from 'react-bootstrap'
import Helmet from 'react-helmet'
import vectorImg from '../../assets/images/account-vector_webp.webp'
import { ReactComponent as AccontLogoImg } from '../../assets/images/logo.svg'
import { ReactComponent as EyeIcon } from '../../assets/images/eye.svg'
import { ReactComponent as Hide } from '../../assets/images/hide.svg'
import {
    signin,
    privacypolicy,
    termsandconditions,
    home
} from '../../config/routingConsts'
import Button from '../../components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { authErrorReset, registerUser } from '../../Redux/Actions/AuthActions'
import { exceptionHandler } from '../../util/common'
import { FailureToastNotification } from '../../components/ToastServerError/ToasterMessage'
import request from '../../util/request'
import { USER_LOGIN_SUCCESS } from '../../Redux/Actions/actionConsts'
import Header from "../../Layout/Header"
const Signup = () => {
    const { loading, error } = useSelector((state) => state.Auth)
    const [disableBtn, setDisableBtn] = useState(false)
    const { state: priceId } = useLocation()
    const userNamePattern = /^[aA-zZ0-9\s]+$/
    const validationObj = yup.object({
        firstName: yup
            .string()
            .required('Please Enter First Name')
            .max(10, 'Maximum Input Should Be 10'),
        lastName: yup
            .string()
            .required('Please Enter Last Name')
            .max(10, 'Maximum Input Should Be 10'),
        userName: yup
            .string()
            .required('Please Enter Username')
            // .matches(userNamePattern, 'Special Characters Not Allowed')
            // .min(8, 'Username must be between 8 and 15 characters long')
            // .max(15, 'Username must be between 8 and 15 characters long')
            .matches(/^(\S+$)/g, 'Space Not Allow'),
        email: yup
            .string()
            .email('Please Enter Valid Email')
            .required('Please Enter Email'),
        password: yup
            .string()
            .required('Please Enter Password')
            .min(6, 'Password must be between 6 and 30 characters long')
            .max(30, 'Password must be between 6 and 30 characters long'),
        agree: yup
            .boolean()
            .oneOf(
                [true],
                'Please confirm that I have read the terms & conditions and privacy policy of ToDo and agree with them.'
            )
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationObj), mode: 'all' })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [passwordShown, setPasswordShown] = useState(false)
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true)
    }

    const onSubmit = (data, id) => {
        setDisableBtn(true)
        var { agree, ...demo } = data
        let payload = {
            ...demo
        }
        if (priceId) {
            request(
                'POST',
                `/payment/checkout
        `,
                { ...demo, priceId: priceId ?? '' }
            )
                .then(({ data }) => {
                    console.log(data?.data, 'from signup for Checkout')

                    if (data?.data?.url) {
                        window.open(data?.data?.url, '_self')
                        // console.log(data?.data, 'Subscription user data*--*-*-')
                        // localStorage.setItem('user', JSON.stringify(data?.data))
                        // localStorage.setItem('auth', JSON.stringify(data?.meta))
                    } else {
                        navigate('/', { state: 'dashboard' })
                    }
                })
                .catch((error) => {
                    let response = exceptionHandler(error)
                    FailureToastNotification(response?.message)
                })
            setTimeout(() => {
                setDisableBtn(false)
            }, 3000)
        } else {
            request('POST', `/user/signup`, payload)
                .then(({ data }) => {
                    console.log("Hello",data.data)
                    localStorage.setItem('auth', JSON.stringify(data?.meta))
                    localStorage.setItem('user', JSON.stringify(data?.data))
                    // sessionStorage.setItem("auth",  JSON.stringify(data?.meta))
                    // sessionStorage.setItem("user",  JSON.stringify(data?.data))
                        dispatch({type:USER_LOGIN_SUCCESS,payload:data})
                        navigate(home,{state:'dashboard'})   
                    
                    // navigate(signin)
                })
                .catch((error) => {
                    let response = exceptionHandler(error)
                    FailureToastNotification(response?.message)
                })
            setTimeout(() => {
                setDisableBtn(false)
            }, 3000)
        }
    }

    const handleClick = () => {
        navigate('/')
    }
    return (
        <>
        
            <Header/>
        <div className="account-area spacer">
            <Helmet>
                <title>Sign Up</title>
                <meta name="signup" content="signup page" />
            </Helmet>
            <div className="container">
            <div className="createaccount-wholebox">
                <div className="row justify-content-center align-align-items-baseline">
                    <div className="col-lg-7 col-md-12 col-12 login-col">
                        <div className="vector-image text-center">
                            <img
                                data-src={vectorImg}
                                className="lazyload img-fluid"
                                alt=""
                            />
                            <p className="mt-3 text-center">
                                Discover and work on new ideas and share on the
                                world.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 col-12 login-col">
                        {errors.message}
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="createaccount-box card scrollbar-tab">
                                {/* <div className="account-logo text-center">
                                    <AccontLogoImg
                                        onClick={handleClick}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div> */}
                                <hr className="m-0" />
                                <div className="account-body card-body">
                                    <div className="account-content text-center">
                                        <h3>Create new account</h3>
                                        <p>
                                            Do you have a team or are you a lone
                                            wolf?
                                        </p>
                                    </div>
                                    <div className="account-formbox">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12 col-12">
                                                <Form.Group
                                                    className="mb-3 form-box"
                                                    controlId="formBasicEmail"
                                                >
                                                    <Form.Label className="ilabel">
                                                        First Name
                                                    </Form.Label>
                                                    <Form.Control
                                                        className="icontrol"
                                                        type="text"
                                                        // placeholder="Mark"
                                                        name="firstName"
                                                        {...register(
                                                            'firstName'
                                                        )}
                                                    />
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        {
                                                            errors.firstName
                                                                ?.message
                                                        }
                                                    </span>
                                                </Form.Group>
                                            </div>
                                            <div className="col-lg-6 col-md-12 col-12">
                                                <Form.Group
                                                    className="mb-3 form-box"
                                                    controlId="formBasicEmail"
                                                >
                                                    <Form.Label className="ilabel">
                                                        Last Name
                                                    </Form.Label>
                                                    <Form.Control
                                                        className="icontrol"
                                                        type="text"
                                                        // placeholder="Jonsan"
                                                        name="lastName"
                                                        {...register(
                                                            'lastName'
                                                        )}
                                                    />
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        {
                                                            errors.lastName
                                                                ?.message
                                                        }
                                                    </span>
                                                </Form.Group>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-12">
                                                <Form.Group
                                                    className="mb-3 form-box"
                                                    controlId="formBasicEmail"
                                                >
                                                    <Form.Label className="ilabel">
                                                        Username
                                                    </Form.Label>
                                                    <Form.Control
                                                        className="icontrol"
                                                        type="text"
                                                        // placeholder="Markjonsan"
                                                        name="userName"
                                                        {...register(
                                                            'userName'
                                                        )}
                                                    />
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        {
                                                            errors.userName
                                                                ?.message
                                                        }
                                                    </span>
                                                </Form.Group>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-12">
                                                <Form.Group
                                                    className="mb-3 form-box"
                                                    controlId="formBasicEmail"
                                                >
                                                    <Form.Label className="ilabel">
                                                        Email Address
                                                    </Form.Label>
                                                    <Form.Control
                                                        className="icontrol"
                                                        type="text"
                                                        // placeholder="markjonsan@gmail.com"
                                                        name="email"
                                                        {...register('email')}
                                                    />
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        {errors.email?.message}
                                                    </span>
                                                </Form.Group>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-12">
                                                <Form.Group
                                                    className="mb-3 form-box"
                                                    controlId="formBasicEmail"
                                                >
                                                    <Form.Label className="ilabel">
                                                        Password
                                                    </Form.Label>
                                                    <Form.Control
                                                        className="icontrol"
                                                        type={
                                                            passwordShown
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        // placeholder="***************"
                                                        name="password"
                                                        {...register(
                                                            'password'
                                                        )}
                                                    />
                                                    <div className="eye-icon">
                                                        <i
                                                            onClick={
                                                                togglePasswordVisiblity
                                                            }
                                                            style={{
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            {passwordShown ? (
                                                                <EyeIcon />
                                                            ) : (
                                                                <Hide />
                                                            )}
                                                        </i>
                                                    </div>
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        {
                                                            errors.password
                                                                ?.message
                                                        }
                                                    </span>
                                                </Form.Group>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-12">
                                                <Form.Check
                                                    className="form-checkbox mb-3"
                                                    type="checkbox"
                                                    id="checkbox"
                                                    label={
                                                        <>
                                                            <p>
                                                                I hereby confirm
                                                                that I have read
                                                                the{' '}
                                                                <Link
                                                                    to={
                                                                        termsandconditions
                                                                    }
                                                                    target="_blank"
                                                                >
                                                                    <span>
                                                                        terms
                                                                        &amp;
                                                                        conditions
                                                                    </span>
                                                                </Link>{' '}
                                                                and the{' '}
                                                                <Link
                                                                    to={
                                                                        privacypolicy
                                                                    }
                                                                    target="_blank"
                                                                >
                                                                    <span>
                                                                        privacy
                                                                        policy
                                                                    </span>
                                                                </Link>{' '}
                                                                of ToDo and
                                                                agree with them.
                                                            </p>
                                                            <span
                                                                className="terms-error"
                                                                style={{
                                                                    color: 'red',
                                                                    fontSize:
                                                                        '12px'
                                                                }}
                                                            >
                                                                {
                                                                    errors.agree
                                                                        ?.message
                                                                }
                                                            </span>
                                                        </>
                                                    }
                                                    name="agree"
                                                    {...register('agree')}
                                                />
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-12">
                                                <div className="send-btn text-center">
                                                    <Button
                                                        disabled={
                                                            disableBtn
                                                                ? true
                                                                : false
                                                        }
                                                        text={
                                                            disableBtn ? (
                                                                <span>
                                                                    <Spinner
                                                                        as="span"
                                                                        animation="border"
                                                                        size="sm"
                                                                        role="status"
                                                                        aria-hidden="true"
                                                                    />{' '}
                                                                    Signing up
                                                                    ...
                                                                </span>
                                                            ) : (
                                                                'Sign up'
                                                            )
                                                        }
                                                        isLink={false}
                                                        addedClass="w-100 d-block mx-auto"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-12">
                                                <div className="account-label mt-4 text-center">
                                                    <p>
                                                        I already have an
                                                        account?{' '}
                                                        <Link to={signin}>
                                                            <span>Sign in</span>
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup
