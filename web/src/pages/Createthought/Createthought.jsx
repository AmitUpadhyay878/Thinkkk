import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Spinner, ToastBody } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { thoughts, home, subscriptionplan } from '../../config/routingConsts'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import uploadfile from '../../assets/dashboardimg/uploadfile.png'
import CloseIcon from '../../assets/dashboardimg/closeicon.svg'
import { ReactComponent as Backarrow } from '../../assets/dashboardimg/backarrow.svg'
import Button from '../../components/Button/Button'
import { thoughtAddEditAction } from '../../Redux/Actions/ThoughAction'
import request from '../../util/request'
import { toast } from 'react-toastify'
import { YoptaEditor } from 'yopta-editor'
import { YoptaRenderer } from 'yopta-editor'
import 'yopta-editor/dist/index.css'
import { ReactComponent as EditIcon } from '../../assets/images/EditSVGIcon.svg'
import warningImg from '../../assets/images/Warning.png'
import binImg from '../../assets/dashboardimg/dustbin.png'
import { Modal } from 'react-bootstrap'
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';


const Createthought = () => {
    const { ID } = useParams()
    const { error, loading, thought } = useSelector((state) => state.Thought)
    const [show, setShow] = useState(false)
    // const toggleShow = () => setShow(!show);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [serverError, setServerError] = useState('')
    const [imgError, setImgError] = useState('')
    const [images, setImages] = useState([])
    const [editorDescription, setEditorDescription] = useState([])
    const [edit, setEdit] = useState(false)
    const [editorError, setEditorError] = useState('')
    const [errrors, setErrrors] = useState('')
    const [inputFields, setInputFields] = useState({
        title: '',
        image: []
    })

    const [isUpdating, setIsUpdating] = useState(false)

    const handleClose2 = () => setShow(false)

    // const [ckeditordata, setckeditordata] = useState([])
    // function handleCKEditor(event, editor) {
    //     const data = editor.getData()
    //     setckeditordata(data)
    // }
    const validationObj = yup.object({
        title: yup
            .string()
            .required('Please Enter Challenge Title')
            .trim('Only Space Not Allowed')
            .min(6, 'Title name must be between 6 to 50 characters long')
            .max(50, 'Title name must be between 6 to 50 characters long'),
        editordescription : yup
            .string()
            .required('Please enter Challenge description')
            .trim()
            // .mixed()
            // .test('test', 'Please Enter Challenge Description', (e) => {
            //     return e && e.length > 0 && !!e?.[0]?.children?.[0].text
            // })
    })
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        setError,
        control,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationObj), mode: 'onSubmit' })
    function fetchData(params, values) {
        request('POST', '/thought/view', { thoughtId: params }, {}, true).then(
            (res) => {
                setIsUpdating(true)
                setValue('title', res.data.data.thoughtName)
                setValue('image', res.data.data.thoughtImage)
                setValue(
                    'editordescription',
                    (res.data.data.thoughtDescription)
                )
                // setckeditordata(
                //     (res.data.data.thoughtDescription)
                // )
                setInputFields({
                    title: res.data.data.thoughtName,
                    image: res.data.data.thoughtImage
                })
                setImages([{ preview: res.data.data.thoughtImage }])
                // setEditorDescription(
                //     <YoptaRenderer data={res.data.data.thoughtDescription} />
                // )
            }
        )
    }
    useEffect(() => {
        if (ID) {
            fetchData(ID)
        }
    }, [ID])

    //   auto focus code /////

    const inputRefAuto = useRef('')
    // console.log('inputRefAuto', inputRefAuto)
    // useEffect(() => {
    //     if (inputRefAuto.current) {
    //         // inputRefAuto.current.focus()
    //         inputRefAuto.current.focus=()=>{}
    //     }
    // }, [])

    // end autofocus code /////

    useEffect(() => {
        if (
            error !==
            'You can not create challenge more than one. Please upgrade your subscription plan.'
        ) {
            let toastId = toast.error(error)
            return () => {
                toast.dismiss(toastId)
            }
        }
    }, [error])

    const handleChange = (e) => {
        setInputFields({ ...inputFields, [e.target.name]: e.target.value })
    }

    const { getRootProps, getInputProps, isDragActive, rootRef, inputRef } =
        useDropzone({
            accept: {
                'image/jpg': ['.jpg'],
                'image/jpeg': ['.jpeg'],
                'image/png': ['.png']
            },
            onDrop: (accepted, fileRejections) => {
                setImages(
                    accepted.map((upFile) =>
                        Object.assign(upFile, {
                            preview: URL.createObjectURL(upFile),
                            upFile: upFile[0]
                        })
                    )
                )
                if (fileRejections?.length > 0) {
                    setErrrors(fileRejections[0].errors[0].message)
                    reset()
                }
            },
            maxFiles: 1,
            multiple: false,
            maxSize: 5 * 1024 * 1024
        })
    const removeFile = (file) => {
        request('POST',`/thought/delete-image`,{thoughtId: ID},{},true)
        .then((res)=>{
            const newFiles = [...images]
            newFiles.splice(newFiles.indexOf(file), 1)
            setImages(newFiles)})
        .catch((err)=>{console.log(err,"error")})
    }

    const onSubmit = (values, data) => {

        let rawFormData = new FormData()
        rawFormData.append('thoughtName', values.title)
        rawFormData.append('thoughtDescription', values.editordescription)

        images.map((file) => {
            rawFormData.append('thoughtImage', file)
        })

        if (!isUpdating) {
            if (images.length === 0 || images.length !== 0) {
                dispatch(
                    thoughtAddEditAction(rawFormData, () => {
                        navigate(thoughts, { state: 'Challenges' })
                    })
                )
                setShow(true)
            } else {
                // setImgError('Please Select Image File')
                setEditorError('Please Enter Challenge Description')
            }
        } else {
            let formData = new FormData()
            formData.append('thoughtId', ID)
            formData.append('thoughtName', values.title)
            formData.append('thoughtDescription', values.editordescription)


            // if (images.length === 0) {
            //     formData.append('thoughtImage', [''])
            // } else {
            //     images.map((file) => {
            //         formData.append('thoughtImage', file)
            //     })
            // }

            images?.forEach(function (file) {
                if (file instanceof File) {
                    formData.append('thoughtImage', file)
                }
            })

            if (images.length != 0 || images.length == 0) {
                dispatch(
                    thoughtAddEditAction(formData, () => {
                        // if (
                        //     location.state === 'thoughts' ||
                        //     location.state === 'Thoughts'
                        // ) {
                        //     navigate(thoughts, { state: 'thoughts' })
                        // } else {
                        //     navigate(home, { state: 'Dashboard' })
                        // }
                        switch (location.state) {
                            case 'challenges':
                                return navigate(`${thoughts}/${ID}`, {
                                    state: 'challenges'
                                })
                            case 'Challenges':
                                return navigate(thoughts, {
                                    state: 'Challenges'
                                })
                            case 'Dashboard':
                                return navigate(home, { state: 'Dashboard' })
                        }
                        // navigate(thoughts);
                    })
                )
                setShow(true)
            } else {
                // setImgError('Please Select Image File')
                // setEditorError('Please Enter Challenge Description')
            }
        }
    }
    const handleModelClick = () => {
        navigate(subscriptionplan)
    }
    return (
        <>
            <div className="side-pagecontent createthought-page">
                <div className="side-pagecontent ">
                    <div className="card create-thought">
                        <div className="arrow-titlebox">
                            <div
                                className="back-arrow"
                                onClick={() => navigate(-1)}
                            >
                                <Backarrow />
                            </div>
                            <div className="head-title">
                                {ID ? (
                                    <h2>Edit Challenge</h2>
                                ) : (
                                    <h2>Create Challenge</h2>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-12">
                                <Form.Group
                                    className="mb-3 form-box"
                                    controlId="formBasicEmail"
                                >
                                    <Form.Label className="ilabel">
                                        Title
                                    </Form.Label>
                                    <Form.Control
                                        // ref={inputRefAuto}
                                        autoFocus
                                        className="icontrol"
                                        type="text"
                                        // placeholder=" Title Name"
                                        name="title"
                                        {...register('title', {
                                            onChange: (e) => {
                                                handleChange(e)
                                            }
                                        })}
                                        defaultValue={inputFields.title}
                                    />
                                    <span style={{ color: 'red' }}>
                                        {errors.title?.message}
                                    </span>
                                </Form.Group>

                                {
                                    error ===
                                    'You can not create challenge more than one. Please upgrade your subscription plan.' && (
                                        <Modal
                                            show={show}
                                            onHide={() => setShow(false)}
                                            dialogClassName="delete-modal"
                                            aria-labelledby="example-custom-modal-styling-title"
                                        >
                                            <Modal.Body>
                                                <div className="detelemodal-box">
                                                    <div className="delete-image">
                                                        <img
                                                            src={warningImg}
                                                            alt=""
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <h4>
                                                        {/* {error} */}
                                                        You can not create challenge more than one. Please upgrade your subscription plan.
                                                        You can create only one challenge with the Free Plan.
                                                        <strong
                                                            style={{
                                                                color: '#fa5560',
                                                                display:
                                                                    'inline-flex',
                                                                marginLeft:
                                                                    '5px'
                                                            }}
                                                        >
                                                            Would you like upgrade you plan to add more challenges?
                                                        </strong>
                                                    </h4>
                                                    <div className="quescbtn-box dismiss-modal">
                                                        <Button
                                                            text="Yes"
                                                            addedClass="yes"
                                                            // onClick={navigate(subscriptionplan)}
                                                            onClick={
                                                                handleModelClick
                                                            }
                                                        />
                                                        <Button
                                                            text="No"
                                                            addedClass="no"
                                                            onClick={
                                                                handleClose2
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    )
                                    // <h1> hellooo</h1>
                                }
                                <Form.Group ref={inputRefAuto}>
                                    <Form.Label className="ilabel">
                                        Challenge Description
                                    </Form.Label>

                                    <div className="yopta-editor createchallenge-yopta">
                                        {/* {ID ? (
                                            <>
                                                <Controller
                                                control={control}
                                                shouldUnregister={true}
                                                name="editordescription"
                                                render={({
                                                    field: {
                                                        onChange,
                                                        onBlur,
                                                        value,
                                                        name,
                                                        ref
                                                    },
                                                    fieldState: {
                                                        invalid,
                                                        isTouched,
                                                        isDirty,
                                                        error
                                                    },
                                                    formState
                                                }) => (
                                                    <CKEditor
                                                        data={
                                                            ckeditordata ?? ""
                                                        }
                                                        editor={DecoupledEditor}
                                                        config={{
                                                            removePlugins: [
                                                                'EasyImage',
                                                                'ImageUpload',
                                                                'MediaEmbed',
                                                                'CKFinder',
                                                                'ImageStyle:full',
                                                                'ImageStyle:side',
                                                                'Table',
                                                                'TableToolbar',
                                                                'TableCellProperties',
                                                                'TableProperties',
                                                                // 'Heading',
                                                                'Link',
                                                                'List',
                                                                // 'Bold',
                                                                // 'Italic',
                                                                // 'Underline'
                                                                'BlockQuote'

                                                            ],
                                                            //     allowedContent: true,
                                                            //     extraAllowedContent: true,
                                                        }}
                                                        onReady={(editor) => {
                                                            // Specify the DOM element where the editor should be rendered.
                                                            editor.ui.view.editable.element.parentElement.insertBefore(
                                                                editor.ui.view.toolbar.element,
                                                                editor.ui.view.editable.element
                                                            );
                                                        }}

                                                        onChange={handleCKEditor}
                                                    />
                                                )}
                                            />

                                            </>
                                        ) : ( */}
                                            <Controller
                                                control={control && control}
                                                name={'editordescription'}
                                                render={({
                                                    field: {
                                                        value,
                                                        onChange: ckEditoronchange
                                                    }
                                                }) => (
                                                    <CKEditor
                                                        data={
                                                            value 
                                                        }
                                                        editor={DecoupledEditor}
                                                        config={{
                                                            removePlugins: [
                                                                'EasyImage',
                                                                'ImageUpload',
                                                                'MediaEmbed',
                                                                'CKFinder',
                                                                'ImageStyle:full',
                                                                'ImageStyle:side',
                                                                'Table',
                                                                'TableToolbar',
                                                                'TableCellProperties',
                                                                'TableProperties',
                                                                // 'Heading',
                                                                'Link',
                                                                'List',
                                                                // 'Bold',
                                                                // 'Italic',
                                                                // 'Underline'
                                                                'BlockQuote'

                                                            ],
                                                            //     allowedContent: true,
                                                            //     extraAllowedContent: true,
                                                        }}
                                                        onReady={(editor) => {
                                                            // Specify the DOM element where the editor should be rendered.
                                                            editor.ui.view.editable.element.parentElement.insertBefore(
                                                                editor.ui.view.toolbar.element,
                                                                editor.ui.view.editable.element
                                                            );
                                                        }}
                                                       
                                                        onChange={(event, editor) => {
                                                            const data =
                                                                editor.getData()
                                                            ckEditoronchange(data)
                                                        }}
                                                    />
                                                )}
                                            />

                                        {/* )} */}

                                        {/* {errors?.editordescription?.message && ( */}
                                            <span
                                                style={{
                                                    color: 'red',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                {
                                                    errors?.editordescription
                                                        ?.message
                                                }
                                            </span>
                                        {/* )} */}
                                    </div>
                                </Form.Group>
                                {ID ? (
                                    <div className="create-btn">
                                        <Button
                                            type="Submit"
                                            text={
                                                // loading ? (
                                                //     <Spinner
                                                //         as="span"
                                                //         animation="border"
                                                //         size="sm"
                                                //     />
                                                // ) : (
                                                'Save'
                                                // )
                                            }
                                            commonClass="common-btn"
                                            isLink={false}
                                            disabled={loading ? true : false}
                                        />
                                    </div>
                                ) : (
                                    <div className="create-btn">
                                        <Button
                                            type="Submit"
                                            text={
                                                // loading ? (
                                                //     <Spinner
                                                //         as="span"
                                                //         animation="border"
                                                //         size="sm"
                                                //         role="status"
                                                //         aria-hidden="true"
                                                //     />
                                                // ) : (
                                                'Create'
                                                // )
                                            }
                                            commonClass="common-btn"
                                            isLink={false}
                                            disabled={loading ? true : false}
                                        />
                                    </div>
                                )}
                            </div>
                            {/* {console.log(error?.message,"Message Error")} */}

                            <div className="col-lg-6 col-md-12 col-12 mx-auto">
                                {images.length <= 0 ? (
                                    <Form.Group
                                        controlId="formFile"
                                        className="mb-2 upload-imagebox"
                                    >
                                        <Form.Label>Upload Image</Form.Label>
                                        <div
                                            className="upload-filebox"
                                            {...getRootProps()}
                                        >
                                            <Form.Control
                                                type="file"
                                                className="vector mb-3"
                                                {...getInputProps()}
                                            />
                                            <div className="vector mb-3">
                                                <img src={uploadfile} alt="" />
                                            </div>
                                            {isDragActive ? (
                                                <p>Drag & Drop image here</p>
                                            ) : (
                                                <p>
                                                    Drag your image here, or{' '}
                                                    <span>browse</span>
                                                </p>
                                            )}
                                            <h5>Supports: JPG, PNG </h5>
                                        </div>
                                        <p
                                            style={{
                                                color: 'red',
                                                fontSize: '12px'
                                            }}
                                        >
                                            {imgError}
                                        </p>
                                        <p
                                            style={{
                                                color: 'red',
                                                fontSize: '12px'
                                            }}
                                        >
                                            {errrors}
                                        </p>
                                    </Form.Group>
                                ) : (
                                    <>
                                        {images.map((upFiles, i) => (
                                            <>
                                                <Form.Group>
                                                    <div
                                                        className="preview-image"
                                                        key={i}
                                                    >
                                                        <img
                                                            name="image"
                                                            src={
                                                                upFiles.preview
                                                            }
                                                            alt=""
                                                            className="img-fluid"
                                                        />
                                                        <div
                                                            className="close-icon"
                                                            onClick={() =>
                                                                removeFile()
                                                            }
                                                        >
                                                            <img
                                                                src={CloseIcon}
                                                                alt="close-icon"
                                                            />
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                            </>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </Form>
                    {serverError && (
                        <span
                            style={{
                                color: 'red',
                                marginLeft: '30em',
                                marginTop: '10em'
                            }}
                        >
                            {serverError}
                        </span>
                    )}
                </div>
            </div>
        </>
    )
}

export default Createthought
