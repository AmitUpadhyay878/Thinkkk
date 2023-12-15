import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import downloadImg from '../../../../assets/images/download.png'
import CloseIcon from '../../../../assets/images/closeicon.svg'
import backbtn from '../../../../assets/images/backarrow.png'
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import AmitButton from '../../../../Components/AmitButton'
import { usermanagement } from "../../../../config/routingConsts"
import {userAddEditAction} from "../../../../Redux/Actions/UserActions"
import { toast } from 'react-toastify'
import userDummyImg from "../../../../assets/images/userDummyImg.png"

const UserAddEdit = () => {
  const location = useLocation();
  console.log(location.state, "location");
  const dispatch = useDispatch();
  const validationObj = yup.object({
    Fname: yup.string().trim("only Space is not required").max(20,"Firstname must be between 6 to 20 characters long").required("Please Enter First Name"),
    Lname: yup.string().trim("only Space is not required").max(20,"Lastname must be between 6 to 20 characters long").required("Please Enter Last Name"),
    Uname: yup.string().trim("only Space is not required").max(50,"Username must be between 6 to 50 characters long").required("Please Enter User Name"),
    // email: yup.string().trim("only Space is not required").max(50,"Email must be between 15 to 50 characters long").email("Please Enter Valid mail").required("Please Enter Email "),
    // switchStatus:yup.boolean().oneOf([true],"Please Active for Status")
  });
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [imgError,setImgError] = useState('');

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const { auth } = useSelector(state => state.Auth)
  const {loading,error} = useSelector(state=>state.User)
  const navigate = useNavigate();
  const [CurrentUser, setCurrentUser] = useState(location.state)
  const [GetData, setData] = useState({});
  const [images, setImages] = useState([]);
  const [errrors, setErrrors] = useState('');
  const { register, reset, formState: { errors }, handleSubmit, setValue } = useForm({ resolver: yupResolver(validationObj), mode: "all" });

  useEffect(() => {
    axios.post("http://122.169.113.151:3007/admin/user/view", {
      userId: CurrentUser
    }, {headers: {Authorization: `Bearer ${auth?.tokenData}`}}).then((res) => {
      console.log(res.data.data.status,"data");
      setData(res.data.data)
      setImages([{ preview: res.data.data.profileImage }])
      setValue("Fname", res.data.data.firstName)
      setValue("Lname", res.data.data.lastName)
      setValue("Uname", res.data.data.userName)
      setValue("email", res.data.data.email)
      setValue("switchStatus",res.data.data.status === 1)
    })
  }, [CurrentUser])

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      "image/jpg": [".jpg"],
      "image/png": [".png"],
      "image/jpeg" : [".jpeg"]
    },
    onDrop: (acceptedFiles, fileRejections) => {
      setImages(
        acceptedFiles.map((upFile) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
            upFile: upFile[0],
          })
        )
      );
      if (fileRejections?.length > 0) {
        setErrrors(fileRejections[0]?.errors[0].message);
        reset();
      }
    },
    maxFiles:1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
  })

  const removeFile = (file) => {
    const newFiles = [...images];
    newFiles.splice(newFiles.indexOf(file), 1);
    setImages(newFiles);
  }
  const [inputFields, setInputFields] = useState({
    Fname: "",
    Lname: "",
    Uname: "",
    email: "",
    switchStatus:"",
  });
  const handleChange = (e) => {
    setInputFields({...inputFields, [e.target.name]: e.target.value})
  }
  useEffect(()=>{
    let toastId = toast.error(error);
    return () =>{
      toast.dismiss(toastId)
    }
  },[error])

  const onSubmit = (demo) => {
   let rawFormData = new FormData();
   rawFormData.append("userId",CurrentUser)
   rawFormData.append("firstName", demo.Fname)
   rawFormData.append("lastName", demo.Lname)
   rawFormData.append("userName", demo.Uname)
  //  rawFormData.append("email",demo.email)
   rawFormData.append("status",demo.switchStatus === true ? 1 : 2)
   images.map((file)=>rawFormData.append("profileImage",file))
        dispatch(userAddEditAction(
          rawFormData,()=>{navigate(usermanagement)})
        );
  }

  return (
    <>
      <div className="card user-edit mb-3" style={{ height: "auto", maxHeight: "fit-content" }}>
        <div class="header-box">
          <div class="title-text mb-4">
            {/* <sapn> <img src={backarrow} alt="" /></sapn> */}
            <h2><img src={backbtn} alt=""  onClick={()=>navigate(-1)} style={{cursor:"pointer"}}/>&nbsp; User Update</h2>
          </div>
        </div>
        <div className="card" style={{
          margin: "30px 30px", height: "auto",
          maxHeight: "initial",
        }}>
          <div className="card-body" style={{ padding: "30px 30px" }}>
            <div className="row">
              <div className="col-lg-6 col-md-12 col-12">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-12">
                      <Form.Group className="form-box mb-3" controlId="formBasicEmail">
                        <Form.Label className='ilabel'>first name</Form.Label>
                        <Form.Control className='icontrol' type="text" placeholder="First Name" name="Fname"
                          defaultValue={inputFields.Fname}
                          {...register("Fname" ,{onChange:e=>handleChange(e)})}
                        />
                        <span style={{ color: "red" }}>{errors.Fname?.message}</span>
                      </Form.Group>
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                      <Form.Group className="form-box mb-3" controlId="formBasicEmail">
                        <Form.Label className='ilabel'>last name</Form.Label>
                        <Form.Control className='icontrol' type="text" placeholder="Lirst Name" name="Lname"
                          defaultValue={inputFields.Lname}
                          {...register("Lname" ,{onChange:e=>handleChange(e)})}
                        />
                        <span style={{ color: "red" }}>{errors.Lname?.message}</span>
                      </Form.Group> 
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <Form.Group className="form-box mb-3" controlId="formBasicEmail">
                        <Form.Label className='ilabel'>User Name</Form.Label>
                        <Form.Control className='icontrol' type="text" placeholder="User Name" name="Uname"
                          defaultValue={inputFields.Uname}
                          {...register("Uname",{onChange:e=>handleChange(e)})} 
                        />
                        <span style={{ color: "red" }}>{errors.Uname?.message}</span>
                      </Form.Group>
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <Form.Group className="form-box mb-3" controlId="formBasicEmail">
                        <Form.Label className='ilabel'>Email Address</Form.Label>
                        <Form.Control className='icontrol' type="text" placeholder="Enter Email" name="email"
                          defaultValue={GetData.email}
                          disabled="true"
                        />
                        <span style={{ color: "red" }}>{errors.email?.message}</span>
                      </Form.Group>
                    </div>
                    <div className="col-lg-12 co-md-12 col-12">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        name="switchStatus"
                        label="Active"
                        className='my-3'
                        value = {inputFields.switchStatus}
                        {...register("switchStatus",{onChange: e => handleChange(e)})}
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <div className="save-btn">
                        <AmitButton commonClass="common-btn" type="Submit" text={loading ? 
                               <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />:"Save"} isDisabled={loading ? true :false}/>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>

              <div className="col-lg-auto col-md-12 col-12 mx-auto">
                {images.length <= 0 ? (
                      <Form.Group controlId="formFile" className="mb-2">
                       <Form.Label>Upload Image</Form.Label>
                       <div className="uploadimage-box">
                          <div className="choose-image text-center">
                          <div className="upload-filebox" {...getRootProps()}>
                          <Form.Control
                            name="image"
                            type="file"
                            className="vector mb-3"
                            {...getInputProps()}
                          />
                          <div className="vector mb-3">
                            <img src={downloadImg} alt="" />
                          </div>
                          <div className="content text-center">
                            {isDragActive ? (
                              <p>Drag & Drop image here</p>
                            ) : (
                              <p>
                                Drag your image here, or <span>browse</span>
                              </p>
                            )}
                            <h5>Supports: JPG, PNG </h5>
                          </div>
                        </div>
                          </div>
                       </div>
                       
                        <p style={{ color: "red", fontSize: "12px" }}>{errrors}</p>
                        <p style={{ color: "red" }}>{imgError}</p>
                      </Form.Group>
                    ) : (
                      <>
                        {images.map((upFiles) => (
                          <>
                            <Form.Group>
                              <div className="preview-image">
                                <img
                                  src={upFiles.preview ? upFiles.preview : userDummyImg}
                                  alt=""
                                  className="img-fluid"
                                />
                                <div
                                  className="close-icon"
                                  onClick={() => removeFile()}
                                >
                                  <img src={CloseIcon} alt="close-icon" />
                                </div>
                              </div>
                            </Form.Group>
                          </>
                        ))}
                      </>
                    )}             
              </div> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserAddEdit  
