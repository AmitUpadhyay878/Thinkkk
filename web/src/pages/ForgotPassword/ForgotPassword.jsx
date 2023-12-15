import React, { useEffect, useState } from 'react'
import { resetpassword, signin } from '../../config/routingConsts'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import Helmet from 'react-helmet'
import vectorImg from '../../assets/images/account-vector_webp.webp'
import backarrow from '../../assets/images/backarrow.png'
import Button from '../../components/Button/Button'
import { authErrorReset, forgetPassword } from '../../Redux/Actions/AuthActions'
import { toast } from 'react-toastify'
import Header from '../../Layout/Header'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.Auth)
    const [disableBtn, setDisableBtn] = useState(false)
    const dispatch = useDispatch()
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = ({ email }) => {
        setDisableBtn(true)
        dispatch(
            forgetPassword(
                { userName: email },
                () => {
                    setTimeout(() => {
                        navigate(resetpassword, (Option = { state: email }))
                        reset()
                    }, 500)
                },
                setTimeout(() => {
                    setDisableBtn(false)
                }, 3000)
            )
        )
    }
    return (
        <>
            <Header/>
            <div className="forgot-passwordpage">
                <Helmet>
                    <title>Forgot Password</title>
                    <meta name="forgetPassword" content="forgetPassword page" />
                </Helmet>
                <div className="account-area spacer">
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
                                            Discover and work on new ideas and share
                                            on the world.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-12 col-12 login-col">
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="createaccount-box card scrollbar-tab">
                                            <div className="account-content text-center">
                                                <h3>Forgot Password</h3>
                                                <p>
                                                    Enter your email id and we will
                                                    send you a <br /> otp to reset
                                                    your password.
                                                </p>
                                                {/* <Link to={signin}>
                                                    <div className="back-arrow">
                                                        <span>
                                                            <img
                                                                src={backarrow}
                                                                alt=""
                                                            />
                                                        </span>
                                                    </div>
                                                </Link> */}
                                            </div>

                                            <hr className="m-0" />
                                            <div className="account-body card-body">
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
                                                                    placeholder="markjonsan@gmail.com"
                                                                    name="text"
                                                                    {...register(
                                                                        'email',
                                                                        {
                                                                            required:
                                                                                {
                                                                                    value: true,
                                                                                    message:
                                                                                        'Please Enter Email / Username'
                                                                                }
                                                                        }
                                                                    )}
                                                                />
                                                                {errors.email
                                                                    ?.type ===
                                                                    'required' && (
                                                                    <span
                                                                        style={{
                                                                            color: 'red'
                                                                        }}
                                                                    >
                                                                        {' '}
                                                                        {
                                                                            errors
                                                                                .email
                                                                                .message
                                                                        }
                                                                    </span>
                                                                )}
                                                            </Form.Group>
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 col-12">
                                                            <div className="send-btn text-center">
                                                                <Button
                                                                    text={
                                                                        disableBtn
                                                                            ? 'Please Wait...'
                                                                            : 'Reset Password'
                                                                    }
                                                                    isLink={false}
                                                                    addedClass="w-100 d-block mx-auto"
                                                                    disabled={
                                                                        disableBtn
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />
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
            </div>
        </>
    )
}

export default ForgotPassword
