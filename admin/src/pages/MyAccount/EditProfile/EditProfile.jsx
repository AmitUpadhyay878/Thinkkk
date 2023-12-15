import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {editProfileAction,viewProfileAction} from "../../../Redux/Actions/AuthActions";
import DummyUser from "../../../assets/images/DummyUser.png";
import e1 from '../../../assets/images/DashboardImg/editimg.png' 
import Button from "../../../Components/AmitButton";
import request from "../../../util/request";
import { exceptionHandler } from "../../../util/common";
import { FailureToastNotification ,SuccessToastNotification } from "../../../Components/ToastServerError/ToasterMessage";

const EditProfile = () => {
  const { admin, loading, error } = useSelector((state) => state.Auth);

  const validationObj = yup.object({
    firstName: yup
      .string()
      .trim("Only Spaces Not Allowed")
      .required("Please Enter First Name"),
    lastName: yup
      .string()
      .trim("Only Spaces Not Allowed")
      .required("Please Enter Last Name"),
  });
  const first = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationObj), mode: "onChange" });

  const dispatch = useDispatch();
  const [serverError, setServerError] = useState("");
  const [disableBtn,setDisableBtn] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectImage, setSelectImage] = useState();
  const [errorPreview, setErrorPreview] = useState(null);
  const [userData, setuserData] = useState(admin);
  const [inputFields, setInputFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    selectImage: "",
  });
  // useEffect(() => {
  //   setServerError(error);
  // }, [error]);

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const uploadImageHanlder = (e) => {
    if (e.target.files[0] === undefined) {
      setErrorPreview(null);
    } else if (!/\.(jpe?g|png)$/i.test(e.target.files[0]?.name)) {
      setErrorPreview("*Images must be in .png, .jpeg, .jpg format");
    } else if (parseFloat(e.target.files[0]?.size) > 5242880) {
      setErrorPreview("Image size should be less than 5MB.");
    } else {
      setErrorPreview(null);
      setSelectImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = function (e) {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const fetchUserData = async () => {
    await request("POST", `admin/view-profile`, {}, {}, true).then(
      ({ data }) => {
        if (data && data.data) {
          reset(data.data);
          dispatch(viewProfileAction(data.data));
        }
      }
    );
  };

  useEffect(() => {
    fetchUserData();
  }, [reset]);

  const onSubmit = (data) => {
    setDisableBtn(true)
    const { firstName, lastName, email } = data;

    const rawFormData = new FormData();
    rawFormData.append("firstName", firstName);
    rawFormData.append("lastName", lastName);
    rawFormData.append("email", email);
    rawFormData.append("profileImage", selectImage);
    
    request("POST", `admin/edit-profile`, rawFormData, {}, true)
    .then(({ data }) => {
      dispatch({ type: "LODEAR_CLOSE" });
      dispatch(editProfileAction(data.data));
      if (data?.meta?.status === 1) {
        // setServerError(data?.meta?.message);
        if(errorPreview === null){
        SuccessToastNotification(data?.meta?.message)}
      }
      setTimeout(()=>{setDisableBtn(false)},3000)
    })
    .catch((error) => {
      // setServerError(exceptionHandler(error).message());
      FailureToastNotification(data?.meta?.message)
      setTimeout(()=>{setDisableBtn(false)},3000)
    });
  };

  return (
    <>
      <div className="col-lg-12 col-md-12 col-12">
        <div className="sidebar-content myaccount-content">
          <div className="card">
            <div className="card-body" style={{padding:"50px 30px"}}>
              <div className="title-text">
                <h5>Edit Profile</h5>
              </div>
              <div className="editprofile-box">
                <Form
                  className="profileform"
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form-data"
                >
                  <div className="profile-image">
                    <img
                      src={
                        userData?.profileImage
                          ? userData?.profileImage
                          : DummyUser
                      }
                      alt=""
                      onClick={() => {
                        first.current.click();
                      }}
                    />

                    <input
                      hidden
                      type="file"
                      ref={first}
                      name="UpdateProfilePic"
                      onChange={(e) => {
                        uploadImageHanlder(e);
                        setuserData({
                          ...userData,
                          profileImage: URL.createObjectURL(e.target.files[0]),
                        });
                      }}
                    />
                    <div className="edit-icon"  onClick={() => {
                        first.current.click();
                      }}>
                      <img src={e1} alt="" />
                    </div>
                  </div>
                  {errorPreview ? (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {errorPreview}
                    </span>
                  ) : null}

                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-12">
                      <Form.Group
                        className="mb-3 form-box"
                        controlId="formBasicEmail"
                      >
                        <Form.Label className="ilabel">First Name</Form.Label>
                        <Form.Control
                          className="icontrol"
                          type="text"
                          placeholder="Mark"
                          name="firstName"
                          {...register("firstName", {
                            onChange: (e) => handleChange(e),
                          })}
                          defaultValue={userData?.firstName}
                        />
                        <span style={{ color: "red" }}>
                          {errors.firstName?.message}
                        </span>
                      </Form.Group>
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                      <Form.Group
                        className="mb-3 form-box"
                        controlId="formBasicEmail"
                      >
                        <Form.Label className="ilabel">Last Name</Form.Label>
                        <Form.Control
                          className="icontrol"
                          type="text"
                          placeholder="Jonsan"
                          name="lastName"
                          {...register("lastName", {
                            onChange: (e) => handleChange(e),
                          })}
                          defaultValue={userData?.lastName}
                        />
                        <span style={{ color: "red" }}>
                          {errors.lastName?.message}
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
                          type="email"
                          placeholder="markjonsan@gmail.com"
                          name="email"
                          {...register("email", {
                            onChange: (e) => handleChange(e),
                          })}
                          defaultValue={userData?.email}
                          // disabled
                        />
                      </Form.Group>
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <div className="save-btn">
                        <Button
                          isLink={false}
                          commonClass="common-btn"
                          text={loading ? "Profile Updating" : "Save"}
                          type="Submit"
                          // isDisabled={loading ? true : false}
                          isDisabled={disableBtn}
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
              {/* {serverError && (
                <span style={{ color: "red", marginLeft: "300px" }}>
                  {serverError}
                </span>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
