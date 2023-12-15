import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import downloadImg from '../../../../assets/images/download.png'
import backbtn from '../../../../assets/images/backarrow.png'
import CloseIcon from "../../../../assets/images/closeicon.svg"
import request from '../../../../util/request'
import AmitButton from '../../../../Components/AmitButton'
import { useDropzone } from 'react-dropzone'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {thoughtmanagement} from "../../../../config/routingConsts";
import { thoughtAddEditAction } from '../../../../Redux/Actions/ThoughtAction'
import {toast} from "react-toastify"

const ThoughtAddEdit = () => {

    const location = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {loading,error} =useSelector(state=>state.ThoughtRedu)
    const [CurrentThought,setCurrentThought] =useState(location.state) 
    const [GetData,setData]= useState({})
    const [imgError, setImgError] = useState("");
    const validationObj = yup.object({
        title: yup.string().trim("Only Space Not Allowed").min(6,"Minimum Inputs Should Be 6").max(50,"Maximum Inputs Should Be 50").required("Please Enter Thoughts Title"),
        description: yup.string().trim("Only Space Not Allowed").min(6,'Minimum Inputs Should Be 6').max(500,"Maximum Inputs Should Be 500").required("Please Enter Thoughts Description"),
      });
    const {reset,register,handleSubmit,formState:{errors},setValue} = useForm({ resolver: yupResolver(validationObj), mode: "all" });
    const [images,setImages] = useState([]);
    const [errrors,setErrrors] = useState('');
    const [inputFields, setInputFields] = useState({
        title: "",
        description: "",
      });
      
      // useEffect(()=>{
      //  let toastId = toast.error(error)
      //  return()=>{
      //    toast.dismiss(toastId);
      //  }
      // },[error])
      
    // DropZone for image //
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
      });
      
      const removeFile = (file) =>{
        const newFiles = [...images];
        newFiles.splice(newFiles.indexOf(file), 1);
        setImages(newFiles);
      }

    useEffect(()=>{
        request("POST","thought/view",{ thoughtId:CurrentThought},{},true).then((res)=>{
          setData(res.data.data)
          setInputFields({title:res.data.data.thoughtName,description:res.data.data.thoughtDescription}) 
          setImages([{ preview: res.data.data.thoughtImage }]); 
          setValue("title",res.data.data.thoughtName);
          setValue("description",res.data.data.thoughtDescription); 
        })
    },[CurrentThought])

    const handleChange = (e) =>{
        setInputFields({...inputFields , [e.target.name] : e.target.value})
    }
   
    const onSubmit = (values) => {
        let rawFormData = new FormData();
        rawFormData.append("thoughtId",CurrentThought)
        rawFormData.append("thoughtName", values.title);
        rawFormData.append("thoughtDescription", values.description);
        images.map((file) => {
            rawFormData.append("thoughtImage", file);
        });

      if (images.length != 0) {
        dispatch(
          thoughtAddEditAction(rawFormData, () => {
            navigate(thoughtmanagement);
          }),
        );
        } 
        else {
          setImgError("Please Select Image File")
        }
    }

  return (
  <div className="card user-edit mb-3" style={{ height: "auto", maxHeight: "fit-content" }}>
    <div class="header-box">
        <div class="title-text mb-4">
            <h2><img src={backbtn} alt="" onClick={()=>navigate(-1)} style={{cursor:"pointer"}} />&nbsp; Thought Update</h2>
        </div>
    </div>
    <div className="card" style={{margin: "30px 30px", height: "auto",maxHeight: "initial"}}>
        <div className="card-body" style={{padding:"30px 30px"}}>
            <div className="row">
                <div className="col-lg-6 col-md-12 col-12">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-12">
                                <Form.Group className="form-box mb-3" controlId="formBasicEmail">
                                    <Form.Label className='ilabel'>Title Name</Form.Label>
                                    <Form.Control className='icontrol' type="text" placeholder="Title Name" name ="title"
                                    autoComplete='off'
                                    {...register("title" , {onChange:e=>{handleChange(e)}})}
                                    defaultValue={inputFields.title}
                                    />
                                  <span style={{ color: "red" }}>{errors.title?.message}</span>
                                </Form.Group>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12">
                                <Form.Group className="form-box mb-3" controlId="formBasicEmail">
                                    <Form.Label className='ilabel'>Thought Description</Form.Label>
                                    <textarea style={{height:"auto"}} placeholder="Write a description" rows="7" name="description" id="exampleForm.ControlTextarea1" class="icontrol form-control" spellcheck="false"
                                   {...register("description" , {onChange:e=>{handleChange(e)}})}
                                   defaultValue={inputFields.description}
                                    ></textarea>
                                    <span style={{ color: "red" }}>{errors.description?.message}</span>
                                </Form.Group>
                            </div>
                            {/* <div className="col-lg-12 co-md-12 col-12">
                                <Form.Check
                                  name ="checked"
                                  type="switch"
                                  id="custom-switch"
                                  label={GetData.status===1 ? "Active" :"InActive"}
                                  className='my-3'
                                  // {...register("checked" ,{onChange:e=>{handleChange(e)}})}
                                  checked={GetData.status}                          
                                />
                                <span style={{ color: "red" }}>{errors.checked?.message}</span> 
                            </div> */}
                            <div className="col-lg-12 col-md-12 col-12"> 
                                <div className="save-btn">
                                <AmitButton commonClass="common-btn" type="Submit" text={loading?"Please Wait..":"Save"} isDisabled={loading ? true : false}/>
                            </div>
                          </div>
                        </div>
                    </Form>
                </div>
               
              {/* new Code for image */}
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
                                  src={upFiles.preview}
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
  )
}

export default ThoughtAddEdit
