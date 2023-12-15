import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import vectorImg from '../../assets/images/account-vector.png'
import { ReactComponent as AccontLogoImg } from '../../assets/images/logo.svg'
import { ReactComponent as EyeIcon } from '../../assets/images/eye.svg'
import { Link, useNavigate } from 'react-router-dom'
import { forgotpassword, resetpassword, signin } from '../../config/routingConsts'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../Redux/Actions/AuthActions'
import backarrowIcon  from '../../assets/images/backarrow.png'
import Button from '../../Components/AmitButton'


const ForgotPassword = () => {

    const navigate = useNavigate()
    const { user,error,loading } = useSelector((state) => state.Auth)
    const [serverError, setServerError] = useState("")
    const [disableBtn,setDisableBtn] = useState(false);
    const dispatch = useDispatch()

    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
    } = useForm()
    const onSubmit = ({email}) => {
        setDisableBtn(true);
        // try{
        //     axios.post(`http://122.169.113.151:3007/admin/admin/forgot-password`,{email:email}).then((res)=>{ 
        //     if (res?.data?.meta?.status == 0) {
        //             setServerError(res?.data?.meta?.message)
        //          }else if(res?.data?.meta?.status == 1){
        //               setServerError(res?.data?.meta?.message)
        //                  setTimeout(()=>{
        //                         navigate (resetpassword,Option={ state:email})   
        //                     },500)
        //          }
        //     })
        // }catch(err){
        //     setServerError(err)
        // }

        dispatch(forgetPassword({email:email},()=>{
            setTimeout(()=>{
                navigate (resetpassword,Option={ state:email})   
            },500)
        },
        setTimeout(()=>{setDisableBtn(false)},3000)
        ))
    }
    return (
        <div className="forgot-passwordpage">
            <div className="account-area spacer">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-7 col-md-12 col-12">
                            <div className="vector-image text-center mt-5">
                                <img src={vectorImg} alt="" className='img-fluid' />
                                <p className='mt-5 text-center'>Discover and work on new ideas and share on the world.</p>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12 col-12">
                            <Form  onSubmit={handleSubmit(onSubmit)}>
                                <div className="createaccount-box card">
                                    <div className="account-content text-center">
                                        <h3>Forgot Password</h3>
                                        <p>Enter your email id and we will send you a <br /> link to reset your password.</p>
                                      
                                    </div>
                                    <div className="back-arrow">
                                       <img src={backarrowIcon} alt="" onClick={()=>navigate(-1)}/>
                                    </div>
                                    <hr className='m-0' />
                                    <div className="account-body card-body">
                                        <div className="account-formbox">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-12">
                                                    <Form.Group
                                                        className="mb-3 form-box"
                                                        controlId="formBasicEmail"
                                                    >
                                                        <Form.Label className="ilabel">Email Address</Form.Label>
                                                        <Form.Control
                                                            className="icontrol"
                                                            type="text"
                                                            placeholder="markjonsan@gmail.com"
                                                            name="text"
                                                            {...register("email", {
                                                                required: {
                                                                    value: true,
                                                                    message: "Please Enter Email",
                                                                },
                                                            })}
                                                        />
                                                        {errors.email?.type === "required" && (
                                                            <span style={{ color: "red" }}>
                                                                {" "}
                                                                {errors.email.message}
                                                            </span>
                                                        )}
                                                       
                                                    </Form.Group>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-12">
                                                    <div className="send-btn text-center">
                                                        <Button 
                                                            isDisabled={disableBtn? true:false} 
                                                            text={disableBtn ?"OTP Send To You Mail" :"Reset Password" } 
                                                            isLink={false} 
                                                            addedClass="common-btn w-100 d-block mx-auto"/><br/>
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
    )
}

export default ForgotPassword