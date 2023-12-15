import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import vectorImg from '../../assets/images/account-vector_webp.webp'
import { ReactComponent as EyeIcon } from '../../assets/images/eye.svg'
import { ReactComponent as Hide } from '../../assets/images/hide.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { forgotpassword, signin } from '../../config/routingConsts'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, authErrorReset } from '../../Redux/Actions/AuthActions'
import backarrow from '../../assets/images/backarrow.png'
import Button from '../../components/Button/Button'
import Helmet from 'react-helmet'
import { toast } from 'react-toastify'
import Header from '../../Layout/Header'

const ResetPasword = () => {
    const { error, loading } = useSelector((state) => state.Auth)
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [disableBtn, setDisableBtn] = useState(false)
    useEffect(() => {
        if (state == null) navigate(forgotpassword)
    }, [state])

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({ mode: 'all' })

    const password = useRef({})
    password.current = watch('password', '')

    const [toggle, settoggle] = useState([])

    const onSubmit = (data) => {
        setDisableBtn(true)
        var { confirmpassword, ...demo } = data

        dispatch(
            resetPassword(
                {
                    userName: state,
                    newPassword: demo?.password,
                    otp: Number(demo.temppass)
                },
                () => {
                    navigate(signin)
                }
            ),
            setTimeout(() => {
                setDisableBtn(false)
            }, 3000)
        )
    }
    return (
    <>
        <Header/>
        <div className="forgot-passwordpage">
            <Helmet>
                <title>Reset Password</title>
                <meta name="resetPassword" content="resetPassword page" />
            </Helmet>

            <div className="account-area spacer">
                <div className="container">
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
                                    <div className="account-content text-center">
                                        <h3>Reset Password</h3>
                                        <p>Enter your new password.</p>
                                            {/* <Link to={forgotpassword}>
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
                                            <p>
                                                Enter the one type of password
                                                that you have received in your
                                                mail here. <br />
                                            </p>

                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-12">
                                                    <Form.Group
                                                        className="mb-3 form-box"
                                                        controlId="formBasicEmail"
                                                    >
                                                        <Form.Label className="ilabel">
                                                            Temporary Password
                                                        </Form.Label>
                                                        <Form.Control
                                                            className="icontrol"
                                                            type={
                                                                toggle.includes(
                                                                    'temppass'
                                                                )
                                                                    ? 'text'
                                                                    : 'password'
                                                            }
                                                            placeholder="Ex: 123456 (OTP)"
                                                            name="temppass"
                                                            {...register(
                                                                'temppass',
                                                                {
                                                                    required: {
                                                                        value: true,
                                                                        message:
                                                                            'Please Enter Temp. Password'
                                                                    }
                                                                }
                                                            )}
                                                        />
                                                        <div className="eye-icon">
                                                            <i
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {toggle.includes(
                                                                    'temppass'
                                                                ) ? (
                                                                    <EyeIcon
                                                                        onClick={() => {
                                                                            settoggle(
                                                                                (
                                                                                    e
                                                                                ) => {
                                                                                    return e.filter(
                                                                                        (
                                                                                            e
                                                                                        ) =>
                                                                                            e !==
                                                                                            'temppass'
                                                                                    )
                                                                                }
                                                                            )
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <Hide
                                                                        onClick={() => {
                                                                            settoggle(
                                                                                (
                                                                                    e
                                                                                ) => {
                                                                                    return [
                                                                                        ...e,
                                                                                        'temppass'
                                                                                    ]
                                                                                }
                                                                            )
                                                                        }}
                                                                    />
                                                                )}
                                                            </i>
                                                        </div>
                                                        {errors.temppass
                                                            ?.type ===
                                                            'required' && (
                                                            <span
                                                                className=""
                                                                style={{
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                {' '}
                                                                {
                                                                    errors
                                                                        .temppass
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </Form.Group>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-12">
                                                    <Form.Group
                                                        className="mb-3 form-box"
                                                        controlId="formBasicEmail"
                                                    >
                                                        <Form.Label className="ilabel">
                                                            New Password
                                                        </Form.Label>
                                                        <Form.Control
                                                            className="icontrol"
                                                            type={
                                                                toggle.includes(
                                                                    'newpassword'
                                                                )
                                                                    ? 'text'
                                                                    : 'password'
                                                            }
                                                            placeholder="***************"
                                                            name="password"
                                                            {...register(
                                                                'password',
                                                                {
                                                                    required: {
                                                                        value: true,
                                                                        message:
                                                                            'Please Enter New Password'
                                                                    },
                                                                    minLength: {
                                                                        value: 6,
                                                                        message:
                                                                            'Password must be between 6 and 30 characters long'
                                                                    },
                                                                    maxLength: {
                                                                        value: 6,
                                                                        message:
                                                                            'Password must be between 6 and 30 characters long'
                                                                    }
                                                                }
                                                            )}
                                                        />
                                                        <div className="eye-icon">
                                                            <i
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {toggle.includes(
                                                                    'newpassword'
                                                                ) ? (
                                                                    <EyeIcon
                                                                        onClick={() => {
                                                                            settoggle(
                                                                                (
                                                                                    e
                                                                                ) => {
                                                                                    return e.filter(
                                                                                        (
                                                                                            e
                                                                                        ) =>
                                                                                            e !==
                                                                                            'newpassword'
                                                                                    )
                                                                                }
                                                                            )
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <Hide
                                                                        onClick={() => {
                                                                            settoggle(
                                                                                (
                                                                                    e
                                                                                ) => {
                                                                                    return [
                                                                                        ...e,
                                                                                        'newpassword'
                                                                                    ]
                                                                                }
                                                                            )
                                                                        }}
                                                                    />
                                                                )}
                                                            </i>
                                                        </div>
                                                        {errors.password
                                                            ?.type ===
                                                            'required' && (
                                                            <span
                                                                style={{
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                {
                                                                    errors
                                                                        .password
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                        {errors.password
                                                            ?.type ===
                                                            'minLength' && (
                                                            <span
                                                                style={{
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                {
                                                                    errors
                                                                        .password
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                        {errors.password
                                                            ?.type ===
                                                            'maxLength' && (
                                                            <span
                                                                style={{
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                {
                                                                    errors
                                                                        .password
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                    </Form.Group>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-12">
                                                    <Form.Group
                                                        className="mb-3 form-box"
                                                        controlId="formBasicEmail"
                                                    >
                                                        <Form.Label className="ilabel">
                                                            Confirm Password
                                                        </Form.Label>
                                                        <Form.Control
                                                            className="icontrol"
                                                            type={
                                                                toggle.includes(
                                                                    'confirmpassword'
                                                                )
                                                                    ? 'text'
                                                                    : 'password'
                                                            }
                                                            placeholder="***************"
                                                            name="confirmpassword"
                                                            {...register(
                                                                'confirmpassword',
                                                                {
                                                                    required: {
                                                                        value: true,
                                                                        message:
                                                                            'Please Enter Password for Confirmation'
                                                                    },
                                                                    minLength: {
                                                                        value: 6,
                                                                        message:
                                                                            'Password must be between 6 and 30 characters long'
                                                                    },
                                                                    validate: (
                                                                        value
                                                                    ) =>
                                                                        value ===
                                                                            password.current ||
                                                                        'The passwords do not match'
                                                                }
                                                            )}
                                                        />
                                                        <div className="eye-icon">
                                                            <i
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {toggle.includes(
                                                                    'confirmpassword'
                                                                ) ? (
                                                                    <EyeIcon
                                                                        onClick={() => {
                                                                            settoggle(
                                                                                (
                                                                                    e
                                                                                ) => {
                                                                                    return e.filter(
                                                                                        (
                                                                                            e
                                                                                        ) =>
                                                                                            e !==
                                                                                            'confirmpassword'
                                                                                    )
                                                                                }
                                                                            )
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <Hide
                                                                        onClick={() => {
                                                                            settoggle(
                                                                                (
                                                                                    e
                                                                                ) => {
                                                                                    return [
                                                                                        ...e,
                                                                                        'confirmpassword'
                                                                                    ]
                                                                                }
                                                                            )
                                                                        }}
                                                                    />
                                                                )}
                                                            </i>
                                                        </div>

                                                        {errors.confirmpassword
                                                            ?.type ===
                                                            'required' && (
                                                            <span
                                                                style={{
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                {
                                                                    errors
                                                                        .confirmpassword
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                        {errors.confirmpassword
                                                            ?.type ===
                                                            'validate' && (
                                                            <span
                                                                style={{
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                {
                                                                    errors
                                                                        .confirmpassword
                                                                        .message
                                                                }
                                                            </span>
                                                        )}
                                                        {errors.confirmpassword
                                                            ?.type ===
                                                            'minLength' && (
                                                            <span
                                                                style={{
                                                                    color: 'red'
                                                                }}
                                                            >
                                                                {
                                                                    errors
                                                                        .confirmpassword
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
                                                                    ? 'Please Wait....Your Password Is Reset'
                                                                    : 'Submit'
                                                            }
                                                            isLink={false}
                                                            addedClass="w-100 d-block mx-auto"
                                                            disabled={
                                                                disableBtn
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
    </>
    )
}

export default ResetPasword











































// import React, { useEffect, useRef, useState } from 'react'
// import { Form } from 'react-bootstrap'
// import vectorImg from '../../assets/images/account-vector_webp.webp'
// import { ReactComponent as EyeIcon } from '../../assets/images/eye.svg'
// import { ReactComponent as Hide } from '../../assets/images/hide.svg'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { forgotpassword, signin } from '../../config/routingConsts'
// import { useForm } from 'react-hook-form'
// import { useDispatch, useSelector } from 'react-redux'
// import { resetPassword, authErrorReset } from '../../Redux/Actions/AuthActions'
// import backarrow from '../../assets/images/backarrow.png'
// import Button from '../../components/Button/Button'
// import Helmet from 'react-helmet'
// import { toast } from 'react-toastify'

// const ResetPasword = () => {
//     const { error, loading } = useSelector((state) => state.Auth)
//     const { state } = useLocation()
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [disableBtn, setDisableBtn] = useState(false)
//     useEffect(() => {
//         if (state == null) navigate(forgotpassword)
//     }, [state])

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         watch
//     } = useForm({ mode: 'all' })

//     const password = useRef({})
//     password.current = watch('password', '')

//     const [toggle, settoggle] = useState([])

//     const onSubmit = (data) => {
//         setDisableBtn(true)
//         var { confirmpassword, ...demo } = data

//         dispatch(
//             resetPassword(
//                 {
//                     userName: state,
//                     newPassword: demo?.password,
//                     otp: Number(demo.temppass)
//                 },
//                 () => {
//                     navigate(signin)
//                 }
//             ),
//             setTimeout(() => {
//                 setDisableBtn(false)
//             }, 3000)
//         )
//     }
//     return (
//         <div className="forgot-passwordpage">
//             <Helmet>
//                 <title>Reset Password</title>
//                 <meta name="resetPassword" content="resetPassword page" />
//             </Helmet>

//             <div className="account-area spacer">
//                 <div className="container">
//                 <div className="createaccount-wholebox">
//                     <div className="row justify-content-center align-align-items-baseline">
//                         <div className="col-lg-7 col-md-12 col-12">
//                             <div className="vector-image text-center mt-5">
//                                 <img
//                                     src={vectorImg}
//                                     alt=""
//                                     className="img-fluid"
//                                 />
//                                 <p className="mt-5 text-center">
//                                     Discover and work on new ideas and share on
//                                     the world.
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="col-lg-5 col-md-12 col-12">
//                             <Form onSubmit={handleSubmit(onSubmit)}>
//                                 <div className="createaccount-box card scrollbar-tab">
//                                     <div className="account-content text-center">
//                                         <h3>Reset Password</h3>
//                                         <p>Enter your new password.</p>
//                                         <Link to={forgotpassword}>
//                                             <div className="back-arrow">
//                                                 <span>
//                                                     <img
//                                                         src={backarrow}
//                                                         alt=""
//                                                     />
//                                                 </span>
//                                             </div>
//                                         </Link>
//                                     </div>
//                                     <hr className="m-0" />
//                                     <div className="account-body card-body">
//                                         <div className="account-formbox">
//                                             <p>
//                                                 Enter the one type of password
//                                                 that you have received in your
//                                                 mail here. <br />
//                                             </p>

//                                             <div className="row">
//                                                 <div className="col-lg-12 col-md-12 col-12">
//                                                     <Form.Group
//                                                         className="mb-3 form-box"
//                                                         controlId="formBasicEmail"
//                                                     >
//                                                         <Form.Label className="ilabel">
//                                                             Temporary Password
//                                                         </Form.Label>
//                                                         <Form.Control
//                                                             className="icontrol"
//                                                             type={
//                                                                 toggle.includes(
//                                                                     'temppass'
//                                                                 )
//                                                                     ? 'text'
//                                                                     : 'password'
//                                                             }
//                                                             placeholder="Ex: 123456 (OTP)"
//                                                             name="temppass"
//                                                             {...register(
//                                                                 'temppass',
//                                                                 {
//                                                                     required: {
//                                                                         value: true,
//                                                                         message:
//                                                                             'Please Enter Temp. Password'
//                                                                     }
//                                                                 }
//                                                             )}
//                                                         />
//                                                         <div className="eye-icon">
//                                                             <i
//                                                                 style={{
//                                                                     cursor: 'pointer'
//                                                                 }}
//                                                             >
//                                                                 {toggle.includes(
//                                                                     'temppass'
//                                                                 ) ? (
//                                                                     <EyeIcon
//                                                                         onClick={() => {
//                                                                             settoggle(
//                                                                                 (
//                                                                                     e
//                                                                                 ) => {
//                                                                                     return e.filter(
//                                                                                         (
//                                                                                             e
//                                                                                         ) =>
//                                                                                             e !==
//                                                                                             'temppass'
//                                                                                     )
//                                                                                 }
//                                                                             )
//                                                                         }}
//                                                                     />
//                                                                 ) : (
//                                                                     <Hide
//                                                                         onClick={() => {
//                                                                             settoggle(
//                                                                                 (
//                                                                                     e
//                                                                                 ) => {
//                                                                                     return [
//                                                                                         ...e,
//                                                                                         'temppass'
//                                                                                     ]
//                                                                                 }
//                                                                             )
//                                                                         }}
//                                                                     />
//                                                                 )}
//                                                             </i>
//                                                         </div>
//                                                         {errors.temppass
//                                                             ?.type ===
//                                                             'required' && (
//                                                             <span
//                                                                 className=""
//                                                                 style={{
//                                                                     color: 'red'
//                                                                 }}
//                                                             >
//                                                                 {' '}
//                                                                 {
//                                                                     errors
//                                                                         .temppass
//                                                                         .message
//                                                                 }
//                                                             </span>
//                                                         )}
//                                                     </Form.Group>
//                                                 </div>
//                                                 <div className="col-lg-12 col-md-12 col-12">
//                                                     <Form.Group
//                                                         className="mb-3 form-box"
//                                                         controlId="formBasicEmail"
//                                                     >
//                                                         <Form.Label className="ilabel">
//                                                             New Password
//                                                         </Form.Label>
//                                                         <Form.Control
//                                                             className="icontrol"
//                                                             type={
//                                                                 toggle.includes(
//                                                                     'newpassword'
//                                                                 )
//                                                                     ? 'text'
//                                                                     : 'password'
//                                                             }
//                                                             placeholder="***************"
//                                                             name="password"
//                                                             {...register(
//                                                                 'password',
//                                                                 {
//                                                                     required: {
//                                                                         value: true,
//                                                                         message:
//                                                                             'Please Enter New Password'
//                                                                     },
//                                                                     minLength: {
//                                                                         value: 6,
//                                                                         message:
//                                                                             'Password must be between 6 and 30 characters long'
//                                                                     },
//                                                                     maxLength : {
//                                                                         value : 30,
//                                                                         message:"Password must be between 6 and 30 characters long"
//                                                                     }
//                                                                 }
//                                                             )}
//                                                         />
//                                                         <div className="eye-icon">
//                                                             <i
//                                                                 style={{
//                                                                     cursor: 'pointer'
//                                                                 }}
//                                                             >
//                                                                 {toggle.includes(
//                                                                     'newpassword'
//                                                                 ) ? (
//                                                                     <EyeIcon
//                                                                         onClick={() => {
//                                                                             settoggle(
//                                                                                 (
//                                                                                     e
//                                                                                 ) => {
//                                                                                     return e.filter(
//                                                                                         (
//                                                                                             e
//                                                                                         ) =>
//                                                                                             e !==
//                                                                                             'newpassword'
//                                                                                     )
//                                                                                 }
//                                                                             )
//                                                                         }}
//                                                                     />
//                                                                 ) : (
//                                                                     <Hide
//                                                                         onClick={() => {
//                                                                             settoggle(
//                                                                                 (
//                                                                                     e
//                                                                                 ) => {
//                                                                                     return [
//                                                                                         ...e,
//                                                                                         'newpassword'
//                                                                                     ]
//                                                                                 }
//                                                                             )
//                                                                         }}
//                                                                     />
//                                                                 )}
//                                                             </i>
//                                                         </div>
//                                                         {errors.password
//                                                             ?.type ===
//                                                             'required' && (
//                                                             <span
//                                                                 style={{
//                                                                     color: 'red'
//                                                                 }}
//                                                             >
//                                                                 {
//                                                                     errors
//                                                                         .password
//                                                                         .message
//                                                                 }
//                                                             </span>
//                                                         )}
//                                                         {errors.password
//                                                             ?.type ===
//                                                             'minLength' && (
//                                                             <span
//                                                                 style={{
//                                                                     color: 'red'
//                                                                 }}
//                                                             >
//                                                                 {
//                                                                     errors
//                                                                         .password
//                                                                         .message
//                                                                 }
//                                                             </span>
//                                                         )}
//                                                          {errors.password
//                                                             ?.type ===
//                                                             'maxLength' && (
//                                                             <span
//                                                                 style={{
//                                                                     color: 'red'
//                                                                 }}
//                                                             >
//                                                                 {
//                                                                     errors
//                                                                         .password
//                                                                         .message
//                                                                 }
//                                                             </span>
//                                                         )}
//                                                     </Form.Group>
//                                                 </div>
//                                                 <div className="col-lg-12 col-md-12 col-12">
//                                                     <Form.Group
//                                                         className="mb-3 form-box"
//                                                         controlId="formBasicEmail"
//                                                     >
//                                                         <Form.Label className="ilabel">
//                                                             Confirm Password
//                                                         </Form.Label>
//                                                         <Form.Control
//                                                             className="icontrol"
//                                                             type={
//                                                                 toggle.includes(
//                                                                     'confirmpassword'
//                                                                 )
//                                                                     ? 'text'
//                                                                     : 'password'
//                                                             }
//                                                             placeholder="***************"
//                                                             name="confirmpassword"
//                                                             {...register(
//                                                                 'confirmpassword',
//                                                                 {
//                                                                     required: {
//                                                                         value: true,
//                                                                         message:
//                                                                             'Please Enter Password for Confirmation'
//                                                                     },
//                                                                     min: {
//                                                                         value: 6,
//                                                                         message:
//                                                                             'Password must be between 6 and 30 characters long'
//                                                                     },
//                                                                     validate: (
//                                                                         value
//                                                                     ) =>
//                                                                         value ===
//                                                                             password.current ||
//                                                                         'The passwords do not match'
//                                                                 }
//                                                             )}
//                                                         />
//                                                         <div className="eye-icon">
//                                                             <i
//                                                                 style={{
//                                                                     cursor: 'pointer'
//                                                                 }}
//                                                             >
//                                                                 {toggle.includes(
//                                                                     'confirmpassword'
//                                                                 ) ? (
//                                                                     <EyeIcon
//                                                                         onClick={() => {
//                                                                             settoggle(
//                                                                                 (
//                                                                                     e
//                                                                                 ) => {
//                                                                                     return e.filter(
//                                                                                         (
//                                                                                             e
//                                                                                         ) =>
//                                                                                             e !==
//                                                                                             'confirmpassword'
//                                                                                     )
//                                                                                 }
//                                                                             )
//                                                                         }}
//                                                                     />
//                                                                 ) : (
//                                                                     <Hide
//                                                                         onClick={() => {
//                                                                             settoggle(
//                                                                                 (
//                                                                                     e
//                                                                                 ) => {
//                                                                                     return [
//                                                                                         ...e,
//                                                                                         'confirmpassword'
//                                                                                     ]
//                                                                                 }
//                                                                             )
//                                                                         }}
//                                                                     />
//                                                                 )}
//                                                             </i>
//                                                         </div>

//                                                         {errors.confirmpassword
//                                                             ?.type ===
//                                                             'required' && (
//                                                             <span
//                                                                 style={{
//                                                                     color: 'red'
//                                                                 }}
//                                                             >
//                                                                 {
//                                                                     errors
//                                                                         .confirmpassword
//                                                                         .message
//                                                                 }
//                                                             </span>
//                                                         )}
//                                                         {errors.confirmpassword
//                                                             ?.type ===
//                                                             'validate' && (
//                                                             <span
//                                                                 style={{
//                                                                     color: 'red'
//                                                                 }}
//                                                             >
//                                                                 {
//                                                                     errors
//                                                                         .confirmpassword
//                                                                         .message
//                                                                 }
//                                                             </span>
//                                                         )}
//                                                     </Form.Group>
//                                                 </div>
//                                                 <div className="col-lg-12 col-md-12 col-12">
//                                                     <div className="send-btn text-center">
//                                                         <Button
//                                                             text={
//                                                                 disableBtn
//                                                                     ? 'Please Wait....Your Password Is Reset'
//                                                                     : 'Submit'
//                                                             }
//                                                             isLink={false}
//                                                             addedClass="w-100 d-block mx-auto"
//                                                             disabled={
//                                                                 disableBtn
//                                                             }
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Form>
//                         </div>
//                     </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ResetPasword
