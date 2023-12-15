import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ReactComponent as EyeIcon } from "../../assets/images/eye.svg";
import { ReactComponent as Hide } from "../../assets/images/hide.svg";
import axios from "axios";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndCondition from "./TermsAndCondition";
import { FailureToastNotification , SuccessToastNotification } from "../../components/ToastServerError/ToasterMessage";
import Button from "../../components/Button/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Settings = () => {
  const { auth } = useSelector((state) => state.Auth);

  const formSchema = Yup.object().shape({
    oldpassword: Yup.string()
      .required("Please Enter Old Password")
      .min(6, "Password must be 6 to 30 characters long")
      .max(30,"Password must be 6 to 30 characters long"),
    newpassword: Yup.string()
      .required("Please Enter New Password")
      .min(6, "Password must be 6 to 30 characters long")
      .max(30,"Password must be 6 to 30 characters long"),
    confirmpassword: Yup.string()
      .required("Please Enter Confirm Password")
      .min(6, "Confirm Password must be at 6 char long")
      .oneOf([Yup.ref("newpassword")], "Passwords does not match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema), mode: "all" });
  const [disableBtn,setDisableBtn] = useState(false);
  const [toggle, settoggle] = useState([]);
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
        "http://110.227.212.251:3007/api/v1/user/change-password",
        { oldPassword: demo.oldpassword, newPassword: demo.newpassword },
        { headers: { Authorization: `Bearer ${auth.tokenData}` } }
      )
      .then((res) => {
        if (res.data.meta.status === 1) {
          // setserverError(res.data.meta.message);
          SuccessToastNotification(res.data.meta.message)
          setTimeout(()=>{setDisableBtn(false)},3000)
        } else if (res.data.meta.status === 0) {
          // setserverError(res.data.meta.message);
          FailureToastNotification(res.data.meta.message)
          setTimeout(()=>{setDisableBtn(false)},3000)
        }
      });
  };
  return (
    <>
      <div className="settings-page">
        <div className="side-pagecontent recentthought-page">
          <div className="recent-thoughtbox scrollbar">
            <div className="card">
              <div className="setting-box">
                <Tabs
                  defaultActiveKey="Change Password"
                  id="uncontrolled-tab-example"
                  className="mb-3 setiing-tabs"
                >
                  <Tab eventKey="Change Password" title="Change Password">
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
                            <Form.Label className="ilabel">
                              New Password
                            </Form.Label>
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
                              <i style={{ cursor: "pointer" }}>
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
                             <Button isLink={false} 
                                     text={disableBtn ? "Please Wait.." : "Save"}
                                     type="Submit"
                                    commonClass="common-btn"
                                    disabled={disableBtn}
                            />
                          </div>
                        </div>
                      </div>
                    </Form>
                  </Tab>
                  <Tab eventKey="Privacy Policy" title="Privacy Policy">
                    <PrivacyPolicy />
                  </Tab>

                  <Tab
                    eventKey="Terms and Condtions"
                    title="Terms and Condtions"
                  >
                    <TermsAndCondition />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
