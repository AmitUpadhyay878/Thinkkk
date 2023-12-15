import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Navbar, Spinner } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import vectorImg from '../../assets/images/account-vector_webp.webp'
import { ReactComponent as AccontLogoImg } from '../../assets/images/logo.svg'
import { ReactComponent as EyeIcon } from '../../assets/images/eye.svg'
import { ReactComponent as Hide } from '../../assets/images/hide.svg'
import { forgotpassword, signup, home } from '../../config/routingConsts'
import { authErrorReset, loginUser } from '../../Redux/Actions/AuthActions'
import Button from '../../components/Button/Button'
import Helmet from 'react-helmet'
import { ReactComponent as LogoImg } from '../../assets/images/logo.svg'
import Header from '../../Layout/Header/Header'
const Signin = () => {
    const { error, loading } = useSelector((state) => state.Auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [disableBtn, setDisableBtn] = useState(false)
    const [loginuser, setloginUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setloginUser({ ...loginuser, [e.target.name]: e.target.value })
    }

    //#region yup validation
    const validationSchema = yup.object({
        email: yup.string().required('Please Enter Email / Username'),
        // .max(
        //     30,
        //     'Username or Email must be between 8 to 30 characters long'
        // ),
        password: yup
            .string()
            .required('Please Enter Password')
            .min(6, 'Password must be 6 to 30 characters long')
            .max(30, 'Password must be 6 to 30 characters long'),
        agree: yup.boolean().oneOf([true], 'Please Check Agree')
    })
    //#endregion

    //#region Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema), mode: 'all' })
    //#endregion

    //#region Password Show/Hide
    const [passwordShown, setPasswordShown] = useState(false)
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true)
    }
    //#endregion

    const onSubmit = (data) => {
        setDisableBtn(true)
        dispatch(
            loginUser({ userName: data.email, password: data.password }, () => {
                navigate(home)
            })
        )
        setTimeout(() => {
            setDisableBtn(false)
        }, 3000)
    }

    const handleClick = () => {
        navigate('/')
    }

    return (
        <>
        {/* <div className="header-area">
        <Navbar expand="lg">
                    <div className="container">
                        <div className="headermain-box">
                            <div className="dash-logo">
                                <Link to={home} state="Dashboard">
                                    <LogoImg />
                                </Link>
                            </div>
                        </div>
                    </div>
        </Navbar>
        </div> */}
            <Header/>
            <div className="account-area spacer">
                {/* <Helmet>
                    <title>Sign In</title>
                    <meta name="signin" content="signin page" />
                </Helmet> */}
                <div className="container">
                    <div className="createaccount-wholebox">
                        <div className="row justify-content-center align-align-items-baseline">
                            <div className="col-lg-7 col-md-12 col-12 login-col">
                                <div className="vector-image text-center">
                                    <img
                                        src={vectorImg}
                                        alt=""
                                        className="img-fluid"
                                    />
                                    <p className="mt-3 text-center">
                                        Discover and work on new ideas and share on
                                        the world.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-12 col-12 login-col">
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
                                                <h3>Sign in your account</h3>
                                                <p>
                                                    Hey, Enter your details to get
                                                    sign in to your account.
                                                </p>
                                            </div>
                                            <div className="account-formbox">
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-12">
                                                        <Form.Group
                                                            className="mb-3 form-box"
                                                            controlId="formBasicEmail"
                                                        >
                                                            <Form.Label className="ilabel">
                                                                Email Address /
                                                                Username
                                                            </Form.Label>
                                                            <Form.Control
                                                                className="icontrol"
                                                                type="text"
                                                                // placeholder="markjonsan@gmail.com"
                                                                name="email"
                                                                {...register(
                                                                    'email',
                                                                    {
                                                                        onChange: (
                                                                            e
                                                                        ) => {
                                                                            handleChange(
                                                                                e
                                                                            )
                                                                        }
                                                                    }
                                                                )}
                                                            />
                                                            <span
                                                                style={{
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                {
                                                                    errors.email
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
                                                                    'password',
                                                                    {
                                                                        onChange: (
                                                                            e
                                                                        ) => {
                                                                            handleChange(
                                                                                e
                                                                            )
                                                                        }
                                                                    }
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
                                                                style={{
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                {
                                                                    errors.password
                                                                        ?.message
                                                                }
                                                            </span>
                                                            <div className="forgot-passowrd text-end mt-3">
                                                                <NavLink
                                                                    className="text-none"
                                                                    style={{
                                                                        textDecoration:
                                                                            'none'
                                                                    }}
                                                                    to={
                                                                        forgotpassword
                                                                    }
                                                                >
                                                                    Forgot password?
                                                                </NavLink>
                                                            </div>
                                                        </Form.Group>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-12">
                                                        <div className="send-btn text-center">
                                                            <Button
                                                                // disabled={loading ?true : false}
                                                                disabled={
                                                                    disableBtn
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
                                                                            Signing
                                                                            in ...
                                                                        </span>
                                                                    ) : (
                                                                        'Sign in'
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
                                                                Don't have an
                                                                account?{' '}
                                                                <Link to={signup}>
                                                                    <span>
                                                                        Sign up
                                                                    </span>
                                                                </Link>{' '}
                                                            </p>
                                                            {/* {serverError && (
                                <span style={{ color: "red" }}>{serverError}</span>
                            )} */}
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

export default Signin
