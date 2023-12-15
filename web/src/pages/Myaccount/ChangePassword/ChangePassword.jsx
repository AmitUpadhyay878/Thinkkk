import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { ReactComponent as EyeIcon } from '../../../assets/images/eye.svg'
import { ReactComponent as Hide } from '../../../assets/images/hide.svg'
import Button from '../../../components/Button/Button'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {
    FailureToastNotification,
    SuccessToastNotification
} from '../../../components/ToastServerError/ToasterMessage'

const ChangePassword = () => {
    const formSchema = Yup.object().shape({
        oldpassword: Yup.string()
            .required('Please Enter Old Password')
            .min(6, 'Password must be 6 to 30 characters long')
            .max(30, 'Password must be 6 to 30 characters long'),
        newpassword: Yup.string()
            .required('Please Enter New Password')
            .min(6, 'Password must be 6 to 30 characters long')
            .max(30, 'Password must be 6 to 30 characters long'),
        confirmpassword: Yup.string()
            .required('Please Enter Confirm Password')
            .min(6, 'Confirm Password must be at 6 char long')
            // .max(15,"Password must be between 6 and 15 characters long ")
            .oneOf([Yup.ref('newpassword')], 'Password does not match')
    })

    const [serverError, setserverError] = useState('')
    const [networkloader, setNetWorkLoader] = useState(false)
    const { auth } = useSelector((state) => state.Auth)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(formSchema), mode: 'all' })

    const [password, setPassword] = useState({
        password: ''
    })
    const [toggle, settoggle] = useState([])
    const [disableBtn, setDisableBtn] = useState(false)
    const handleChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }
    console.log(auth, 'tokenData')
    const onSubmit = (data) => {
        setDisableBtn(true)
        const { confirmpassword, ...demo } = data
        if (networkloader === false) {
            setNetWorkLoader(true)
            axios
                .post(
                    'http://110.227.212.251:3007/api/v1/user/change-password',
                    {
                        oldPassword: demo.oldpassword,
                        newPassword: demo.newpassword
                    },
                    { headers: { Authorization: `Bearer ${auth.tokenData}` } }
                )
                .then((res) => {
                    setNetWorkLoader(false)
                    if (res.data.meta.status === 1) {
                        // setserverError(res.data.meta.message);
                        SuccessToastNotification(res.data.meta.message)
                    } else if (res.data.meta.status === 0) {
                        // setserverError(res.data.meta.message);
                        FailureToastNotification(res.data.meta.message)
                    }
                })
            setTimeout(() => {
                setDisableBtn(false)
            }, 3000)
        }
    }

    return (
        <div className="col-lg-9 col-md-12 col-12">
            <div className="sidebar-content myaccount-content">
                <div className="card">
                    <div className="card-body">
                        <div className="title-text">
                            <h5>Change Password</h5>
                        </div>

                        <div className="editprofile-box">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-lg-4 col-md-6 col-12">
                                        <Form.Group
                                            className="mb-3 form-box"
                                            controlId="formBasicEmail"
                                        >
                                            <Form.Label className="ilabel">
                                                Old Password
                                            </Form.Label>
                                            <Form.Control
                                                className="icontrol"
                                                type={
                                                    toggle.includes(
                                                        'oldpassword'
                                                    )
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                placeholder="***************"
                                                name="oldpassword"
                                                {...register('oldpassword', {
                                                    onChange: (e) => {
                                                        handleChange(e)
                                                    }
                                                })}
                                            />
                                            <div className="eye-icon">
                                                <i
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {toggle.includes(
                                                        'oldpassword'
                                                    ) ? (
                                                        <EyeIcon
                                                            onClick={() => {
                                                                settoggle(
                                                                    (e) => {
                                                                        return e.filter(
                                                                            (
                                                                                e
                                                                            ) =>
                                                                                e !==
                                                                                'oldpassword'
                                                                        )
                                                                    }
                                                                )
                                                            }}
                                                        />
                                                    ) : (
                                                        <Hide
                                                            onClick={() => {
                                                                settoggle(
                                                                    (e) => {
                                                                        return [
                                                                            ...e,
                                                                            'oldpassword'
                                                                        ]
                                                                    }
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                </i>
                                            </div>
                                            <span style={{ color: 'red' }}>
                                                {errors.oldpassword?.message}
                                            </span>
                                        </Form.Group>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
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
                                                name="newpassword"
                                                {...register('newpassword', {
                                                    onChange: (e) => {
                                                        handleChange(e)
                                                    }
                                                })}
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
                                                                    (e) => {
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
                                                                    (e) => {
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
                                            <span style={{ color: 'red' }}>
                                                {errors.newpassword?.message}
                                            </span>
                                        </Form.Group>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-12">
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
                                                        onChange: (e) => {
                                                            handleChange(e)
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
                                                        'confirmpassword'
                                                    ) ? (
                                                        <EyeIcon
                                                            onClick={() => {
                                                                settoggle(
                                                                    (e) => {
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
                                                                    (e) => {
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
                                            <span style={{ color: 'red' }}>
                                                {
                                                    errors.confirmpassword
                                                        ?.message
                                                }
                                            </span>
                                        </Form.Group>
                                    </div>
                                    <div className="col-12">
                                        <div className="save-btn">
                                            <Button
                                                isLink={false}
                                                text={
                                                    disableBtn
                                                        ? 'Please Wait..'
                                                        : 'Save'
                                                }
                                                type="Submit"
                                                commonClass="common-btn"
                                                // disabled={networkloader ? true : false}
                                                disabled={disableBtn}
                                            />

                                            {/* {serverError && (
                        <span style={{ color: "red", marginLeft: "350px" }}>
                          {serverError}
                        </span>
                      )} */}
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
