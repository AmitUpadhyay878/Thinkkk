import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AmitButton from "../../../Components/AmitButton/AmitButton";
import { ReactComponent as EyeIcon } from "../../../assets/images/eye.svg";
import { ReactComponent as Hide } from "../../../assets/images/hide.svg";
import { FailureToastNotification,SuccessToastNotification } from "../../../Components/ToastServerError/ToasterMessage";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import request from "../../../util/request";
const ChangePassword = () => {

  const { auth,user,loading,error } = useSelector((state) => state.Auth);

  const formSchema = Yup.object().shape({
    oldpassword: Yup.string()
      .required('Please Enter Old Password')
      .min(6, 'Password must be at 6 char long')
      .max(15,"Password must be between 6 and 15 characters long "),
    newpassword: Yup.string()
      .required('Please Enter New Password')
      .min(6, 'Password must be at 6 char long')
      .max(15,"Password must be between 6 and 15 characters long "),
    confirmpassword: Yup.string()
      .required('Please Enter Confirm Password')
      .min(6, 'Confirm Password must be at 6 char long')
      .oneOf([Yup.ref('newpassword')], 'Passwords does not match'),
  })

  const [disableBtn,setDisableBtn] = useState(false);
  const [toggle, settoggle] = useState([]);
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema), mode: "all" });

  const [password, setPassword] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const onSubmit = (data) => {
    setDisableBtn(true)
    const { confirmpassword, ...demo } = data;

    axios
      .post(
        "http://122.169.113.151:3007/admin/admin/change-password",
        { oldPassword: demo.oldpassword, newPassword: demo.newpassword },
        { headers: { Authorization: `Bearer ${auth?.tokenData}` } }
      )
      .then((res) => {
        if (res.data.meta.status === 1) {
          // setserverError(res.data.meta.message);
          SuccessToastNotification(res.data.meta.message)
        } else{
          // setserverError(res.data.meta.message);
          FailureToastNotification(res.data.meta.message)
        }
      });
      setTimeout(()=>{
        setDisableBtn(false)
      },3000)

  }

  return (

    <div className="card">
      <div className="card-body" style={{ padding: "50px 30px" }}>
        <div className="title-text">
          <h5>Change password</h5>
        </div>
        <div className="change-passwordbox">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12">
                <Form.Group
                  className="mb-3 form-box"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="ilabel">Old Password</Form.Label>
                  <Form.Control
                    className="icontrol"
                    type={
                      toggle.includes("oldpassword")
                        ? "text"
                        : "password"
                    }
                    placeholder="***************"
                    name="oldpassword"
                    {...register("oldpassword", {
                      onChange: (e) => {
                        handleChange(e);
                      },
                    })}
                  />
                  <div className="eye-icon">
                    <i style={{ cursor: "pointer" }}>
                    {toggle.includes("oldpassword") ? (
                                  <EyeIcon
                                    onClick={() => {
                                      settoggle((e) => {
                                        return e.filter(
                                          (e) => e !== "oldpassword"
                                        );
                                      });
                                    }}
                                  />
                                ) : (
                                  <Hide
                                    onClick={() => {
                                      settoggle((e) => {
                                        return [...e, "oldpassword"];
                                      });
                                    }}
                                  />
                                )}
                    </i>
                  </div>
                  <span style={{ color: "red" }}>
                    {errors.oldpassword?.message}
                  </span>
                </Form.Group>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <Form.Group
                  className="mb-3 form-box"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="ilabel">New Password</Form.Label>
                  <Form.Control
                    className="icontrol"
                    type={
                      toggle.includes("newpassword")
                        ? "text"
                        : "password"
                    }
                    placeholder="***************"
                    name="newpassword"
                    {...register("newpassword", {
                      onChange: (e) => {
                        handleChange(e);
                      },
                    })}
                  />
                  <div className="eye-icon">
                    <i style={{ cursor: "pointer" }}>
                    {toggle.includes("newpassword") ? (
                                  <EyeIcon
                                    onClick={() => {
                                      settoggle((e) => {
                                        return e.filter(
                                          (e) => e !== "newpassword"
                                        );
                                      });
                                    }}
                                  />
                                ) : (
                                  <Hide
                                    onClick={() => {
                                      settoggle((e) => {
                                        return [...e, "newpassword"];
                                      });
                                    }}
                                  />
                                )}
                    </i>
                  </div>
                  <span style={{ color: "red" }}>
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
                      toggle.includes("confirmpassword")
                        ? "text"
                        : "password"
                    }
                    placeholder="***************"
                    name="confirmpassword"
                    {...register("confirmpassword", {
                      onChange: (e) => {
                        handleChange(e);
                      },
                    })}
                  />
                  <div className="eye-icon">
                    <i  style={{ cursor: "pointer" }}>
                    {toggle.includes("confirmpassword") ? (
                                  <EyeIcon
                                    onClick={() => {
                                      settoggle((e) => {
                                        return e.filter(
                                          (e) => e !== "confirmpassword"
                                        );
                                      });
                                    }}
                                  />
                                ) : (
                                  <Hide
                                    onClick={() => {
                                      settoggle((e) => {
                                        return [...e, "confirmpassword"];
                                      });
                                    }}
                                  />
                                )}
                    </i>
                  </div>
                  <span style={{ color: "red" }}>
                    {errors.confirmpassword?.message}
                  </span>
                </Form.Group>
              </div>
              <div className="col-12">
                <div className="save-btn">
                  <AmitButton
                    text={disableBtn?<Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />:"save"}
                    commonClass="common-btn"
                    addedClass=""
                    type="submit"
                    isDisabled={disableBtn ? true:false}
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>

  );
};

export default ChangePassword;
