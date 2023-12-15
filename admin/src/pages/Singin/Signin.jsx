import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import vectorImg from "../../assets/images/account-vector.png";
import { ReactComponent as AccontLogoImg } from "../../assets/images/logo.svg";
import { ReactComponent as EyeIcon } from "../../assets/images/eye.svg";
import { ReactComponent as Hide } from "../../assets/images/hide.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../Redux/Actions/AuthActions";
import { forgotpassword, home } from "../../config/routingConsts";
import { Form, Spinner } from "react-bootstrap";
import AmitButton from "../../Components/AmitButton/AmitButton";
import { toast } from "react-toastify";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const { error,isLoggedIn,admin,auth,loading } = useSelector((state) => state.Auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serverError, setServerError] = useState("");
  const [disableBtn,setDisableBtn] = useState(false);
  const [adminuser, setadminUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setadminUser({ ...adminuser, [e.target.name]: e.target.value });
  };

  //#region Password Show/Hide
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  //#endregion


  //#region OnSubmit Func
  const onSubmit = ({ email, password }) => {
    setDisableBtn(true);
    dispatch(
      loginAdmin({email: email, password: password },()=>{
        navigate(home)
      },
       setTimeout(()=>{setDisableBtn(false)},3000)
      )
    );
  };
  //#endregion

  return (
    <div className="admin-t">
      <div className="account-area spacer">
        <div className="container">
          <div className="row justify-content-center align-items-end">
            <div className="col-lg-7 col-md-12 col-12"> 
              <div className="vector-image text-center mt-5">
                <Link to={home}><img data-src={vectorImg} className="lazyload img-fluid" /></Link>
                <p className="mt-5 text-center">
                  Discover and work on new ideas and share on the world.
                </p>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-12">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="createaccount-box card">
                  <div className="account-logo text-center" style={{ padding: "24px" }}>
                    <AccontLogoImg />
                  </div>
                  <hr className="m-0" />
                  <div className="account-body card-body">
                    <div className="account-content text-center">
                      <h3 style={{ color: "#000" }}>Sign in your account</h3>
                      <p>
                        Hey, Enter your details to get sign in to your account.
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
                              Email
                            </Form.Label>
                            <Form.Control
                              className="icontrol"
                              type="text"
                              placeholder="markjonsan@gmail.com"
                              name="email"
                              {...register("email", {
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Please Enter Valid Email",
                                },
                                required: {
                                  value: true,
                                  message: "Please Enter Email",
                                },
                                maxLength :{
                                  value:40,
                                  message:"Maximum Input Should Be 40"
                                },

                                onChange: (e) => {
                                  handleChange(e);
                                },
                              })}
                            />
                            {errors.email?.type === "required" && (<span style={{ color: "red" }}>{errors.email.message}</span>)}
                            {errors.email?.type === "pattern" && (<span style={{ color: "red" }}>{errors.email.message}</span>)}
                            {errors.email?.type === "maxLength" && (<span style={{ color: "red" }}>{errors.email.message}</span>)}
                          </Form.Group>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                          <Form.Group
                            className="mb-3 form-box"
                            controlId="formBasicEmail"
                          >
                            <Form.Label className="ilabel">Password</Form.Label>
                            <Form.Control
                              className="icontrol"
                              type={passwordShown ? "text" : "password"}
                              placeholder="***************"
                              name="password"
                              {...register("password", {
                                required: {
                                  value: true,
                                  message: "Please Enter Password",
                                },
                                minLength:{
                                  value:6,
                                  message : "Minimum input Should be 6"
                                },
                                maxLength:{
                                  value:20,
                                  message : "Maximum input Should be 20"
                                },
                                onChange: (e) => {
                                  handleChange(e);
                                },
                              })}
                            />
                            <div className="eye-icon">
                              <i onClick={togglePasswordVisiblity} style={{ cursor: "pointer" }} >
                                {passwordShown ? <EyeIcon /> : <Hide />}
                              </i>
                            </div>
                            {errors.password?.type === "required" && (<span style={{ color: "red" }}>{errors.password.message}</span>)}
                            {errors.password?.type === "minLength" && (<span style={{ color: "red" }}>{errors.password.message}</span>)}
                            {errors.password?.type === "maxLength" && (<span style={{ color: "red" }}>{errors.password.message}</span>)}
                            <NavLink
                              className="text-none"
                              style={{ textDecoration: "none" }}
                              to={forgotpassword}
                            >
                              <div className="forgot-passowrd text-end mt-3">
                                {" "}
                                Forgot password?
                              </div>
                            </NavLink>
                          </Form.Group>
                        </div>
                        <div className="col-lg-12 col-md-12 col-12">
                          <div className="send-btn text-center">
                          <AmitButton 
                          text={disableBtn ? (
                            <span>
                             <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          /> Signing in ...</span> ): "Sign in"}
                           commonClass="common-btn"
                           addedClass="w-100 d-block mx-auto"
                            type="Submit"
                            isDisabled = {disableBtn ? true :false}
                           />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12 col-12">
                          <div className="account-label mt-4 text-center">
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
  );
};

export default Signin;
