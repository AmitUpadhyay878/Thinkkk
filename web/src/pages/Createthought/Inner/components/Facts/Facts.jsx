import React, { Suspense, useEffect, useState } from 'react'
import { Dropdown, Form, Modal, Spinner } from 'react-bootstrap'
import { ReactComponent as SearchIcon } from '../../../../../assets/dashboardimg/search.svg'
import dotImg from '../../../../../assets/dashboardimg/three-dots.png'
import plusIcon from '../../../../../assets/dashboardimg/plus.png'
import trashIcon from '../../../../../assets/dashboardimg/trash.png'
import editpenIcon from '../../../../../assets/dashboardimg/editicon.png'
import Button from '../../../../../components/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import vectorImg from '../../../../../assets/dashboardimg/actionvector.webp'
import vectorImg from '../../../../../assets/dashboardimg/actionvector.svg'
import DeleteFactmodal from '../../../../../components/DeleteFactModal/DeleteFactmodal'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


import {
    factAddAction,
    factListAction
} from '../../../../../Redux/Actions/Facts'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';



import { YoptaEditor, YoptaRenderer } from 'yopta-editor'
import { ReactComponent as EditIcon } from '../../../../../assets/images/EditSVGIcon.svg'
import { FailureToastNotification } from '../../../../../components/ToastServerError/ToasterMessage'

const Facts = ({ isActiveTab }) => {
    const { factlist, factlistID, loading, error, factId } = useSelector(
        (state) => state.FactList
    )
    const { ID } = useParams()
    const { auth, user } = useSelector((state) => state.Auth)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [facts, setFacts] = useState([])
    const [factShow, setFactShow] = useState(false)
    const { thoughtId } = useParams()
    const [editorDescription, setEditorDescription] = useState([])
    const [disableBtn, setDisableBtn] = useState(false)
    // const [edit, setEdit] = useState(false)
    const handleShow = () => {

        setShow(true)

        // setEditorDescription(null)
    }
    // const [delShow,setDelShow] = useState(false)
    const [ckeditordata, setckeditordata] = useState([])
    function handleCKEditor(event, editor) {
        const data = editor.getData()
        setckeditordata(data)
    }


    const validationObj = yup.object({
        factTitle: yup
            .string()
            .required('Please Enter Fact Title')
            .trim('Only Space Not Allowed')
        // .min(6, 'Title name must be between 6 to 50 characters long')
        // .max(50, 'Title name must be between 6 to 50 characters long'),
        // editordescription: yup
        //     .mixed()
        //     .test('test', 'Please Enter Fact Description', (e) => {
        //         return e && e.length > 0 && !!e?.[0]?.children?.[0].text
        //     })
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

    // const {
    //     handleSubmit,
    //     reset,
    //     register,
    //     required,
    //     formState: { errors },
    //     setValue,
    //     control
    // } = useForm({ mode: 'all' })
    const [factInputField, setFactInputField] = useState({
        factTitle: '',
        factDescription: []
    })
    const handleChange = (e) => {
        setFactInputField({
            ...factInputField,
            [e.target.name]: e.target.value
        })
    }
    const handleClose = () => {
        setShow(false)
        // setEdit(false)
        setFactEditId(null)
        setckeditordata([])
        // setEditorDescription([])
        reset({ factTitle: '', factDescription: '' })
        setValue('editordescription', "")
    }
    // /// List Api call ////
    const [searchFact, setSearchFact] = useState('')
    const handleSearchChange = (e) => {
        setSearchFact(e.target.value)
    }
    useEffect(() => {
        if (isActiveTab && !factShow) {
            dispatch(factListAction({ thoughtId, search: searchFact }))
        }
    }, [
        factShow,
        thoughtId,
        // editActionShow,
        factlistID,
        isActiveTab,
        searchFact
    ])
    ///// emd list api call ////

    ///// edit on factId modal call ///
    const [isUpdate, setIsUpdate] = useState(false)
    const [editFactId, setFactEditId] = useState()
    const [editFactShow, setEditFactShow] = useState(false)
    const editFact = async (id) => {
        setFactEditId(id)
        setShow(true)
        await axios
            .post(
                `http://110.227.212.251:3007/api/v1/fact/view`,
                { factId: id },
                { headers: { Authorization: `Bearer ${auth.tokenData}` } }
            )
            .then((res) => {
               
                setFactInputField({
                    factTitle: res.data.data.factTitle
                    // factDescription: res.data.data.factDescription
                })
                setValue('factTitle', res.data.data.factTitle)
                // setValue('editordescription', res.data.data.factDescription)
                setckeditordata(res.data.data.factDescription.join())
                // setEditorDescription(res.data.data.factDescription)
                // setValue('factDescription',res.data.data.factDescription)
                setIsUpdate(true)
            })
            .catch((err) => {
                FailureToastNotification(err?.message)
            })
    }
    ///// end factid modal ////

    ////  Delete fcat on id ////
    const [deleteFactId, setDeleteFactId] = useState(null)
    const [delShow, setDelShow] = useState(false)
    const deleteFact = (id) => {
        setDeleteFactId(id)
        setDelShow(true)
    }
    // End delete fact on id ///

    // Add-Edit fact Api call ////

    const onFactSubmit = (e, data) => {
        let payload = {}
        if (!isUpdate) {
            setDisableBtn(true)
            payload = {
                thoughtId,
                factTitle: factInputField.factTitle,
                factDescription: [ckeditordata]
                // rawFormData.append(
                //     'thoughtDescription',
                //     JSON.stringify(editorDescription)
                // )
            }
        } else {
            setDisableBtn(true)
            payload = {
                factId: editFactId,
                thoughtId,
                factTitle: factInputField.factTitle,
                factDescription: [ckeditordata]
            }
        }
        dispatch(
            factAddAction(payload, () => {
                handleClose()
                // setEditorDescription(null)
                reset({ factTitle: '', factDescription: '', editFactId: '' })
                setDisableBtn(false)
            })
        )
        // setEdit(false)
        // setTimeout(() => {
        // }, 2000)
       
    }

    // End Add-Edit Api call ////

    return (
        <>
            <div className="action-wholebox">
                <div className="header-box">
                    <div className="title-text">
                        <h2>Facts</h2>
                    </div>

                    <div className="head-btnbox">
                        <div className="lang-account-box search-box">
                            <Form.Group
                                className="formbox"
                                controlId="formBasicEmail"
                            >
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="icontrol"
                                    onChange={(e) => {
                                        handleSearchChange(e)
                                    }}
                                />
                                <div className="search-icon">
                                    <SearchIcon />
                                </div>
                            </Form.Group>
                        </div>
                        {/*  */}
                        <Suspense fallback={<div>Loading...</div>}>
                            <Button
                                isLink={false}
                                logoClass="plus"
                                addedClass="quesc"
                                text="Create Fact"
                                onClick={handleShow}
                            // onClick={
                            //     thoughtId ? handleAction : editActionhandler
                            // }
                            // onClick={handleAction}
                            />
                        </Suspense>
                    </div>
                </div>

                {factlist && factlist.length === 0 ? (
                    <>
                        <div className="actionvector-box">
                            <div className="vector-image">
                                <img
                                    src={vectorImg}
                                    alt=""
                                    className="img-fluid"
                                    loading="lazy"
                                />
                                <p>You haven’t added fact item over here.</p>
                                <p>
                                    <span>
                                        So please create and complete the fact
                                        item
                                    </span>
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {factlist.map((factdatamap) => (
                            <>
                                <div className="fact-wholebox">
                                    <div className="fact-tab">
                                        <div className="title">
                                            {factdatamap.factTitle}
                                        </div>
                                        <div className="three-dots">
                                            <div className="edit-box">
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        variant="success"
                                                        id="dropdown-basic"
                                                    >
                                                        <img
                                                            src={dotImg}
                                                            alt=""
                                                            loading="lazy"
                                                        />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                editFact(
                                                                    factdatamap.factId
                                                                )
                                                            }}
                                                        >
                                                            <span>
                                                                <img
                                                                    src={
                                                                        editpenIcon
                                                                    }
                                                                    alt=""
                                                                    loading="lazy"
                                                                />
                                                            </span>
                                                            Edit Fact
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                deleteFact(
                                                                    factdatamap.factId
                                                                )
                                                            }}
                                                        >
                                                            <span>
                                                                <img
                                                                    src={
                                                                        trashIcon
                                                                    }
                                                                    alt=""
                                                                    loading="lazy"
                                                                />
                                                            </span>
                                                            Delete Fact
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fact-panel">
                                        {/* <YoptaRenderer
                                            className="editor-prefix"
                                            wrapCls="editor-renderer"
                                            data={factdatamap?.factDescription}
                                        /> */}
                                        {console.log("factdatamap", factdatamap)}
                                        <div
                                            dangerouslySetInnerHTML={{ __html: factdatamap?.factDescription }}
                                        />

                                        {/* {factdatamap?.map((des)=> {
                                            console.log(des,"des")
                                            // <h1 key = {des.factId}> {des?.factDescription}</h1>
                                        })} */}


                                    </div>
                                </div>
                            </>
                        ))}
                    </>
                )}
            </div>

            <Modal
                backdrop={false}
                show={show}
                onHide={handleClose}
                keyboard={false}
                className="fact-modal"
            >
                <Modal.Body>
                    <div className="modal-title">
                        {editFactId ? 'Edit Fact' : 'Create Fact'}
                    </div>
                    <Form onSubmit={handleSubmit(onFactSubmit)}>
                        <Form.Group
                            className="form-box mb-3"
                            controlId="formBasicEmail"
                        >
                            <Form.Label className="lcontrol">
                                Title
                            </Form.Label>
                            <Form.Control
                                className="icontrol"
                                type="text"
                                autoFocus
                                name="factTitle"
                                {...register('factTitle', {
                                    required: {
                                        value: true,
                                        message: 'Please Enter Fact Title.'
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: 'Maximum Input Should be 50.'
                                    },
                                    onChange: (e) => {
                                        handleChange(e)
                                    }
                                })}
                                defaultValue={factInputField.factTitle}
                            />
                            {errors.factTitle?.type === 'required' && (
                                <span style={{ color: 'red' }}>
                                    {errors.factTitle.message}
                                </span>
                            )}
                            {errors.factTitle?.type === 'maxLength' && (
                                <span style={{ color: 'red' }}>
                                    {errors.factTitle?.message}
                                </span>
                            )}

                            {/* <Form.Control
                                        className="icontrol"
                                        type="text"
                                        name="factTitle"
                                        {...register('factTitle', {
                                            onChange: (e) => {
                                                handleChange(e)
                                            }
                                        })}
                                        defaultValue={factInputField.factTitle}
                                    />
                                    <span style={{ color: 'red' }}>
                                        {errors.factTitle?.message}
                                    </span> */}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="ilabel">
                                Fact Description
                            </Form.Label>

                            <div className="yopta-editor fact-yopta">
                                {/* <Controller
                                    control={control}
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
                                    }) => ( */}
                                        <>
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
                                            //     fontFamily: {
                                            //         options: [
                                            //             'default',
                                            //             'Ubuntu, Arial, sans-serif',
                                            //             'Ubuntu Mono, Courier New, Courier, monospace'
                                            //         ]
                                            //     },
                                            //     toolbar: [
                                            //         'heading',
                                            //         '|',
                                            //         'bold',
                                            //         'italic',
                                            //         'link',
                                            //         'bulletedList',
                                            //         'numberedList',
                                            //         "blockQuote",
                                            //         "fontFamily",
                                            //         // 'ckfinder',
                                            //         // '|',
                                            //         // 'imageTextAlternative',
                                            //         // 'imageUpload',
                                            //         // 'imageStyle:full',
                                            //         // 'imageStyle:side',
                                            //         // '|',
                                            //         // 'mediaEmbed',
                                            //         // 'insertTable',
                                            //         // "tableColumn",
                                            //         // "tableRow",
                                            //         // "mergeTableCells",
                                            //         '|',
                                            //         'undo',
                                            //         'redo'
                                            //     ]
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
                                        
                                        </>
                                    {/* )}
                                /> */}


                                {errors?.editordescription?.message && (
                                    <span
                                        style={{
                                            color: 'red',
                                            fontSize: '12px'
                                        }}
                                    >
                                        {errors?.editordescription?.message}
                                    </span>
                                )}
                            </div>
                        </Form.Group>

                        {/* youpta end editor controller */}

                        <div class="factbtn-box">
                            <Button
                                type="Submit"
                                addedClass="common-btn create"
                                isLink={false}
                                disabled={disableBtn}
                                text={
                                    disableBtn ? (
                                        <span>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />{' '}
                                        </span>
                                    ) : editFactId ? (
                                        'Save'
                                    ) : (
                                        'Save'
                                    )
                                }
                            />

                            <Button
                                type="button"
                                addedClass="common-btn cancel"
                                isLink={false}
                                onClick={() => handleClose()}
                                text="Close"
                            />
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <DeleteFactmodal
                show={delShow}
                setShow={setDelShow}
                deleteFactId={deleteFactId}
            />
        </>
    )
}

export default Facts