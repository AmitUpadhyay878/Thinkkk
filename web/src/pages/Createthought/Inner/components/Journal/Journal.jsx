import React, { Suspense, useEffect, useState } from 'react'
import { Dropdown, Form, Modal } from 'react-bootstrap'
import { ReactComponent as SearchIcon } from '../../../../../assets/dashboardimg/search.svg'
import dotImg from '../../../../../assets/dashboardimg/three-dots.png'
import plusIcon from '../../../../../assets/dashboardimg/plus.png'
import trashIcon from '../../../../../assets/dashboardimg/trash.png'
import editpenIcon from '../../../../../assets/dashboardimg/editicon.png'
import { ReactComponent as PlusIcon } from '../../../../../assets/dashboardimg/roundplus.svg'
import Button from '../../../../../components/Button'
// import vectorImg from '../../../../../assets/dashboardimg/actionvector.webp'
import vectorImg from '../../../../../assets/dashboardimg/actionvector.svg'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
    journalAddEditAction,
    journalDeleteAction,
    journalListingAction,
    journalViewAction
} from '../../../../../Redux/Actions/JournalActions'
import DeleteFactmodal from '../../../../../components/DeleteFactModal/DeleteFactmodal'
import DeleteJournalModal from '../../../../../components/DeleteJournalModal'
import { YoptaEditor, YoptaRenderer } from 'yopta-editor'
import { ReactComponent as EditIcon } from '../../../../../assets/images/EditSVGIcon.svg'
import { uploadToCloudinary } from '../../../../../util/common'



const Journal = ({ isActiveTab }) => {
    const { thoughtId } = useParams()
    const {
        error,
        loading,
        journals: journalsList
    } = useSelector((state) => state.Journals)
    const {
        handleSubmit,
        reset,
        formState: { errors },
        Control,
        register,
        setValue
    } = useForm({ mode: 'all' })
    const [show, setShow] = useState(false)
    const [journalModal, setJournalModal] = useState(false)
    const [editorDescription, setEditorDescription] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [selectedJournalId, setSeletedJournalId] = useState(null)
    const handleClose = () => {
        setShow(false)
        setEditJournalId(null)
    }
    const handleShow = () => {
        setShow(true)
        setEditJournalId('')
        reset({ journalTitle: '' })
    }
    const [description, setDescription] = useState([])
    const dispatch = useDispatch()

    const onModalSubmit = (value) => {
        let payload = {}
        if (formType === 'edit') {
            payload = {
                thoughtId,
                journalTitle: value?.journalTitle,
                journalDescription: [description],
                journalId: editJournalId
            }
        } else {
            payload = {
                thoughtId,
                journalTitle: value?.journalTitle,
                journalDescription: [description]
            }
        }
        dispatch(journalAddEditAction(payload))
        // add-edit api here
        reset()
        setDescription([])
        setFormType('')
        setEditJournalId(null)
        handleClose()
    }

    const handleDeleteJournal = (deleteId) => {
        dispatch(journalDeleteAction({ journalId: deleteId }))
    }

    // Delet journal ////
    const [deleteFactId, setDeleteFactId] = useState(null)
    const [delShow, setDelShow] = useState(false)
    const deleteFact = (id) => {
        setDeleteFactId(id)
        setDelShow(true)
    }
    //end delet journal////

    const [formType, setFormType] = useState('add')
    const [editJournalId, setEditJournalId] = useState(null)
    const handleEditJournal = (slug) => {
        setFormType('edit')
        setShow(true)
        const payload = {
            thoughtId
        }
        const params = {
            slug
        }
        dispatch(
            journalViewAction(payload, params, (data) => {
                const { journalTitle, journalDescription } = data
                setDescription(journalDescription?.[0])
                setValue('journalTitle', journalTitle)
            })
        )
    }

    const [journalInputField, setJournalInputField] = useState({
        journalTitle: '',
        description: []
    })
    const handleChange = (e) => {
        setJournalInputField({
            ...journalInputField,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (isActiveTab) {
            dispatch(
                journalListingAction({ thoughtId }, (data) => {
                    setSeletedJournalId(data?.[0])
                })
            )
        }
    }, [isActiveTab])

    useEffect(() => {
        setEditMode(false)
        setEditorDescription([])
        if (selectedJournalId) {
            const payload = {
                thoughtId
            }
            const params = {
                slug: selectedJournalId?.slug
            }
            dispatch(
                journalViewAction(payload, params, (data) => {
                    setEditorDescription(data?.journalDescription)
                })
            )
        }
    }, [selectedJournalId])

    useEffect(() => {
        // const timeout = setTimeout(() => {
        //     const payload = {
        //         thoughtId,
        //         journalTitle: selectedJournalId?.journalTitle,
        //         journalDescription: editorDescription,
        //         journalId: selectedJournalId?.journalId
        //     }
        //     dispatch(journalAddEditAction(payload))
        // }, 2000)
        // return () => {
        //     clearTimeout(timeout)
        // }

        if (editorDescription.length === 0){
            return
        } else {
            const payload = {
                thoughtId,
                journalTitle: selectedJournalId?.journalTitle,
                journalDescription: editorDescription,
                journalId: selectedJournalId?.journalId
            }
            dispatch(journalAddEditAction(payload))
        }

    }, [editorDescription])

    // yoptaeditor add edia for image uploade ////
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    // if (editMode === true) {
    //     const onChangeMedia = async (file, type) => {
    //       const { url, data } = await uploadToCloudinary(file, type);
    //       return { url, options: data };
    //     };


    const onChangeMedia = async (file, type) => {

        const { url, data } = await uploadToCloudinary(file, type,selectedJournalId?.journalId);
      
        console.log("url, data",url, data)
        return { url, options: data };
  };
const media ={
    imageProps : {
        onChange :(file) =>onChangeMedia(file,'image'),
        accept:'image/',
        multiple : true
    }
}
    return (    
        <>
            <div className="action-wholebox">
                {/* <div className="header-box">
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
                                />
                                <div className="search-icon">
                                    <SearchIcon />
                                </div>
                            </Form.Group>
                        </div>
                  
                        <Suspense fallback={<div>Loading...</div>}>
                            <Button
                                isLink={false}
                                logoClass="plus"
                                addedClass="quesc"
                                text="Create Journal"
                                onClick={handleShow}
                                // onClick={() => alert('HEllo')}
                                // onClick={handleAction}
                            />
                        </Suspense>
                    </div>
                </div> */}

                {journalsList?.length > 0 ? (
                    <div className="journal-contentbox">
                        <ul className="sidebar">
                            <li>
                                <div className="tab">
                                    <span>Journal</span>
                                    <span onClick={handleShow}>
                                        <PlusIcon />
                                    </span>
                                </div>
                            </li>
                            {journalsList?.map((j) => {
                                return (
                                    <li>
                                        <div
                                            className={`tab ${
                                                j?.journalId ===
                                                    selectedJournalId?.journalId &&
                                                'active'
                                            }`}
                                            onClick={() =>
                                                setSeletedJournalId(j)
                                            }
                                        >
                                            <span className="label">
                                                {j?.journalTitle}
                                            </span>
                                            <span
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
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
                                                                    handleEditJournal(
                                                                        j.slug
                                                                    )
                                                                    setEditJournalId(
                                                                        j.journalId
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
                                                                Edit Journal
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                // onClick={() =>
                                                                //     handleDeleteJournal(
                                                                //         j.journalId
                                                                //     )
                                                                // }
                                                                onClick={() => {
                                                                    deleteFact(
                                                                        j.journalId
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
                                                                Delete Journal
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="sidebar-content">
                            {/* <YoptaEditor
                            className="editor-prefix"
                            value={editorDescription}
                            onChange={(data) =>
                                setEditorDescription(data)
                            }
                        />  */}
                            <div className="yopta-editor journal-yopta">
                                {!editMode ? (
                                    <>
                                        {' '}
                                        <YoptaRenderer
                                            className="editor-prefix"
                                            data={editorDescription}
                                        />
                                        <button
                                            className="edit-btn"
                                            type="button"
                                            onClick={() => setEditMode(true)}
                                        >
                                            <span style={{color:"green",fontSize:"14px"}}>
                                                <EditIcon /> Edit Text
                                            </span>
                                        </button>
                                    </>
                                ) : (
                                    <YoptaEditor 
                                        className="editor-prefix"
                                        value={editorDescription}
                                        onChange={(data) =>
                                            setEditorDescription(data)
                                        }
                                        media={media}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="actionvector-box">
                            <div className="create-journalbtn">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Button
                                        isLink={false}
                                        logoClass="plus"
                                        addedClass="quesc"
                                        text="Create Journal"
                                        onClick={handleShow}
                                        // onClick={
                                        //     thoughtId ? handleAction : editActionhandler
                                        // }
                                        // onClick={handleAction}
                                    />
                                </Suspense>
                            </div>
                            <div className="vector-image">
                                <img
                                    src={vectorImg}
                                    alt=""
                                    className="img-fluid"
                                    loading="lazy"
                                />
                                <p>You haven’t added journal over here.</p>
                                <p>
                                    <span>
                                        So please create and complete the
                                        journal item
                                    </span>
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                // backdrop="static"
                keyboard={false}
                className="journal-modal fact-modal"
            >
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onModalSubmit)}>
                        <div className="modal-title">Create Journal</div>
                        <Form.Group
                            className="form-box mb-3"
                            controlId="formBasicEmail"
                        >
                            <Form.Label className="lcontrol">
                                Journal Title
                            </Form.Label>
                            <Form.Control
                                className="icontrol"
                                type="text"
                                name="journalTitle"
                                {...register('journalTitle', {
                                    required: {
                                        value: true,
                                        message: 'Please Enter Journal Title.'
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: 'Maximum Input Should be 50.'
                                    },
                                    onChange: (e) => {
                                        handleChange(e)
                                    }
                                })}
                            />
                            {errors.journalTitle?.type === 'required' && (
                                <span style={{ color: 'red' }}>
                                    {errors.journalTitle.message}
                                </span>
                            )}
                            {errors.journalTitle?.type === 'maxLength' && (
                                <span style={{ color: 'red' }}>
                                    {errors.journalTitle?.message}
                                </span>
                            )}
                        </Form.Group>

                        <div class="factbtn-box">
                            <button class="common-btn create" type="Submit">
                                {formType === 'edit' ? 'Edit' : 'Create'}
                            </button>
                            <button
                                class="common-btn cancel"
                                type="button"
                                onClick={() => handleClose()}
                            >
                                Close
                            </button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <DeleteJournalModal
                show={delShow}
                setShow={setDelShow}
                deleteId={deleteFactId}
            />
        </>
    )
}

export default React.memo(Journal)







// import React, { Suspense, useEffect, useState } from 'react'
// import { Dropdown, Form, Modal } from 'react-bootstrap'
// import { ReactComponent as SearchIcon } from '../../../../../assets/dashboardimg/search.svg'
// import dotImg from '../../../../../assets/dashboardimg/three-dots.png'
// import plusIcon from '../../../../../assets/dashboardimg/plus.png'
// import trashIcon from '../../../../../assets/dashboardimg/trash.png'
// import editpenIcon from '../../../../../assets/dashboardimg/editicon.png'
// import { ReactComponent as PlusIcon } from '../../../../../assets/dashboardimg/roundplus.svg'
// import Button from '../../../../../components/Button'
// // import vectorImg from '../../../../../assets/dashboardimg/actionvector.webp'
// import vectorImg from '../../../../../assets/dashboardimg/actionvector.svg'
// import { useForm } from 'react-hook-form'
// import { useParams } from 'react-router'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//     journalAddEditAction,
//     journalDeleteAction,
//     journalListingAction,
//     journalViewAction
// } from '../../../../../Redux/Actions/JournalActions'
// import DeleteFactmodal from '../../../../../components/DeleteFactModal/DeleteFactmodal'
// import DeleteJournalModal from '../../../../../components/DeleteJournalModal'
// import { YoptaEditor, YoptaRenderer } from 'yopta-editor'
// import { ReactComponent as EditIcon } from '../../../../../assets/images/EditSVGIcon.svg'

// const Journal = ({ isActiveTab }) => {
//     const { thoughtId } = useParams()
//     const {
//         error,
//         loading,
//         journals: journalsList
//     } = useSelector((state) => state.Journals)
//     const {
//         handleSubmit,
//         reset,
//         formState: { errors },
//         Control,
//         register,
//         setValue
//     } = useForm({ mode: 'all' })
//     const [show, setShow] = useState(false)
//     const [journalModal, setJournalModal] = useState(false)
//     const [editorDescription, setEditorDescription] = useState([])
//     const [editMode, setEditMode] = useState(false)
//     const [selectedJournalId, setSeletedJournalId] = useState(null)
//     const handleClose = () => {
//         setShow(false)
//         setEditJournalId(null)
//     }
//     const handleShow = () => {
//         setShow(true)
//         setEditJournalId('')
//         reset({ journalTitle: '' })
//     }
//     const [description, setDescription] = useState([])
//     const dispatch = useDispatch()

//     const onModalSubmit = (value) => {
//         let payload = {}
//         if (formType === 'edit') {
//             payload = {
//                 thoughtId,
//                 journalTitle: value?.journalTitle,
//                 journalDescription: description,
//                 journalId: editJournalId
//             }
//         } else {
//             payload = {
//                 thoughtId,
//                 journalTitle: value?.journalTitle,
//                 journalDescription: description
//             }
//         }
//         dispatch(journalAddEditAction(payload))
//         // add-edit api here
//         reset()
//         setDescription([])
//         setFormType('')
//         setEditJournalId(null)
//         handleClose()
//     }

//     const handleDeleteJournal = (deleteId) => {
//         dispatch(journalDeleteAction({ journalId: deleteId }))
//     }

//     // Delet journal ////
//     const [deleteFactId, setDeleteFactId] = useState(null)
//     const [delShow, setDelShow] = useState(false)
//     const deleteFact = (id) => {
//         setDeleteFactId(id)
//         setDelShow(true)
//     }
//     //end delet journal////

//     const [formType, setFormType] = useState('add')
//     const [editJournalId, setEditJournalId] = useState(null)
//     const handleEditJournal = (slug) => {
//         setFormType('edit')
//         setShow(true)
//         const payload = {
//             thoughtId
//         }
//         const params = {
//             slug
//         }
//         dispatch(
//             journalViewAction(payload, params, (data) => {
//                 const { journalTitle, journalDescription } = data
//                 setDescription(journalDescription?.[0])
//                 setValue('journalTitle', journalTitle)
//             })
//         )
//     }

//     const [journalInputField, setJournalInputField] = useState({
//         journalTitle: '',
//         description: []
//     })
//     const handleChange = (e) => {
//         setJournalInputField({
//             ...journalInputField,
//             [e.target.name]: e.target.value
//         })
//     }

//     useEffect(() => {
//         if (isActiveTab) {
//             dispatch(
//                 journalListingAction({ thoughtId }, (data) => {
//                     setSeletedJournalId(data?.[0])
//                 })
//             )
//         }
//     }, [isActiveTab])

//     useEffect(() => {
//         setEditMode(false)
//         setEditorDescription([])
//         if (selectedJournalId) {
//             const payload = {
//                 thoughtId
//             }
//             const params = {
//                 slug: selectedJournalId?.slug
//             }
//             dispatch(
//                 journalViewAction(payload, params, (data) => {
//                     setEditorDescription(data?.journalDescription)
//                 })
//             )
//         }
//     }, [selectedJournalId])

//     useEffect(() => {
//         // const timeout = setTimeout(() => {
//         //     const payload = {
//         //         thoughtId,
//         //         journalTitle: selectedJournalId?.journalTitle,
//         //         journalDescription: editorDescription,
//         //         journalId: selectedJournalId?.journalId
//         //     }
//         //     dispatch(journalAddEditAction(payload))
//         // }, 2000)
//         // return () => {
//         //     clearTimeout(timeout)
//         // }


//         if (editorDescription.length === 0){
//             return
//         } else {
//             const payload = {
//                 thoughtId,
//                 journalTitle: selectedJournalId?.journalTitle,
//                 journalDescription: editorDescription,
//                 journalId: selectedJournalId?.journalId
//             }
//             dispatch(journalAddEditAction(payload))
//         }
//     }, [editorDescription])

//     return (
//         <>
//             <div className="action-wholebox">
//                 {/* <div className="header-box">
//                     <div className="title-text">
//                         <h2>Facts</h2>
//                     </div>
//                     <div className="head-btnbox">
//                         <div className="lang-account-box search-box">
//                             <Form.Group
//                                 className="formbox"
//                                 controlId="formBasicEmail"
//                             >
//                                 <Form.Control
//                                     type="search"
//                                     placeholder="Search"
//                                     className="icontrol"
//                                 />
//                                 <div className="search-icon">
//                                     <SearchIcon />
//                                 </div>
//                             </Form.Group>
//                         </div>
                  
//                         <Suspense fallback={<div>Loading...</div>}>
//                             <Button
//                                 isLink={false}
//                                 logoClass="plus"
//                                 addedClass="quesc"
//                                 text="Create Journal"
//                                 onClick={handleShow}
//                                 // onClick={() => alert('HEllo')}
//                                 // onClick={handleAction}
//                             />
//                         </Suspense>
//                     </div>
//                 </div> */}

//                 {journalsList?.length > 0 ? (
//                     <div className="journal-contentbox">
//                         <ul className="sidebar">
//                             <li>
//                                 <div className="tab">
//                                     <span>Journal</span>
//                                     <span onClick={handleShow}>
//                                         <PlusIcon />
//                                     </span>
//                                 </div>
//                             </li>
//                             {journalsList?.map((j) => {
//                                 return (
//                                     <li>
//                                         <div
//                                             className={`tab ${
//                                                 j?.journalId ===
//                                                     selectedJournalId?.journalId &&
//                                                 'active'
//                                             }`}
//                                             onClick={() =>
//                                                 setSeletedJournalId(j)
//                                             }
//                                         >
//                                             <span className="label">
//                                                 {j?.journalTitle}
//                                             </span>
//                                             <span
//                                                 onClick={(e) =>
//                                                     e.stopPropagation()
//                                                 }
//                                             >
//                                                 <div className="edit-box">
//                                                     <Dropdown>
//                                                         <Dropdown.Toggle
//                                                             variant="success"
//                                                             id="dropdown-basic"
//                                                         >
//                                                             <img
//                                                                 src={dotImg}
//                                                                 alt=""
//                                                                 loading="lazy"
//                                                             />
//                                                         </Dropdown.Toggle>
//                                                         <Dropdown.Menu>
//                                                             <Dropdown.Item
//                                                                 onClick={() => {
//                                                                     handleEditJournal(
//                                                                         j.slug
//                                                                     )
//                                                                     setEditJournalId(
//                                                                         j.journalId
//                                                                     )
//                                                                 }}
//                                                             >
//                                                                 <span>
//                                                                     <img
//                                                                         src={
//                                                                             editpenIcon
//                                                                         }
//                                                                         alt=""
//                                                                         loading="lazy"
//                                                                     />
//                                                                 </span>
//                                                                 Edit Journal
//                                                             </Dropdown.Item>
//                                                             <Dropdown.Item
//                                                                 // onClick={() =>
//                                                                 //     handleDeleteJournal(
//                                                                 //         j.journalId
//                                                                 //     )
//                                                                 // }
//                                                                 onClick={() => {
//                                                                     deleteFact(
//                                                                         j.journalId
//                                                                     )
//                                                                 }}
//                                                             >
//                                                                 <span>
//                                                                     <img
//                                                                         src={
//                                                                             trashIcon
//                                                                         }
//                                                                         alt=""
//                                                                         loading="lazy"
//                                                                     />
//                                                                 </span>
//                                                                 Delete Journal
//                                                             </Dropdown.Item>
//                                                         </Dropdown.Menu>
//                                                     </Dropdown>
//                                                 </div>
//                                             </span>
//                                         </div>
//                                     </li>
//                                 )
//                             })}
//                         </ul>
//                         <div className="sidebar-content">
//                             {/* <YoptaEditor
//                             className="editor-prefix"
//                             value={editorDescription}
//                             onChange={(data) =>
//                                 setEditorDescription(data)
//                             }
//                         />  */}
//                             <div className="yopta-editor">
//                                 {!editMode ? (
//                                     <>
//                                         {' '}
//                                         <YoptaRenderer
//                                             className="editor-prefix"
//                                             data={editorDescription}
//                                         />
//                                         <button
//                                             className="edit-btn"
//                                             type="button"
//                                             onClick={() => setEditMode(true)}
//                                         >
//                                             <span>
//                                                 <EditIcon />
//                                             </span>
//                                         </button>
//                                     </>
//                                 ) : (
//                                     <YoptaEditor
//                                         className="editor-prefix"
//                                         value={editorDescription}
//                                         onChange={(data) =>
//                                             setEditorDescription(data)
//                                         }
//                                     />
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <>
//                         <div className="actionvector-box">
//                             <div className="create-journalbtn">
//                                 <Suspense fallback={<div>Loading...</div>}>
//                                     <Button
//                                         isLink={false}
//                                         logoClass="plus"
//                                         addedClass="quesc"
//                                         text="Create Journal"
//                                         onClick={handleShow}
//                                         // onClick={
//                                         //     thoughtId ? handleAction : editActionhandler
//                                         // }
//                                         // onClick={handleAction}
//                                     />
//                                 </Suspense>
//                             </div>
//                             <div className="vector-image">
//                                 <img
//                                     src={vectorImg}
//                                     alt=""
//                                     className="img-fluid"
//                                     loading="lazy"
//                                 />
//                                 <p>You haven’t added journal over here.</p>
//                                 <p>
//                                     <span>
//                                         So please create and complete the
//                                         journal item
//                                     </span>
//                                 </p>
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </div>

//             <Modal
//                 show={show}
//                 onHide={handleClose}
//                 // backdrop="static"
//                 keyboard={false}
//                 className="journal-modal fact-modal"
//             >
//                 <Modal.Body>
//                     <Form onSubmit={handleSubmit(onModalSubmit)}>
//                         <div className="modal-title">Create Journal</div>
//                         <Form.Group
//                             className="form-box mb-3"
//                             controlId="formBasicEmail"
//                         >
//                             <Form.Label className="lcontrol">
//                                 Journal Title
//                             </Form.Label>
//                             <Form.Control
//                                 className="icontrol"
//                                 type="text"
//                                 // placeholder="Resources"
//                                 name="journalTitle"
//                                 {...register('journalTitle', {
//                                     required: {
//                                         value: true,
//                                         message: 'Please Enter Journal Title.'
//                                     },
//                                     maxLength: {
//                                         value: 50,
//                                         message: 'Maximum Input Should be 50.'
//                                     },
//                                     onChange: (e) => {
//                                         handleChange(e)
//                                     }
//                                 })}
//                             />
//                             {errors.journalTitle?.type === 'required' && (
//                                 <span style={{ color: 'red' }}>
//                                     {errors.journalTitle.message}
//                                 </span>
//                             )}
//                             {errors.journalTitle?.type === 'maxLength' && (
//                                 <span style={{ color: 'red' }}>
//                                     {errors.journalTitle?.message}
//                                 </span>
//                             )}
//                         </Form.Group>

//                         {/* <Form.Group
//                             className="form-box mb-3"
//                             controlId="formBasicEmail"
//                         >
//                             <Form.Label className="lcontrol">
//                                 Journal Description
//                             </Form.Label>
//                             <Form.Control
//                                 className="icontrol"
//                                 type="text"
//                                 placeholder="Resources"
//                                 name="description"
//                                 defaultValue={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 {...register('journalDescription',{
//                                     required: {
//                                         value: true,
//                                         message:
//                                             'Please Enter Journal Description.'
//                                     },
//                                     maxLength: {
//                                         value: 100,
//                                         message: 'Maximum Input Should be 100.'
//                                     },
//                                     onChange: (e) => {
//                                         handleChange(e)
//                                     }
//                                 })}
//                             />
//                              {errors.journalDescription?.type === 'required' && (
//                                 <span style={{ color: 'red' }}>
//                                     {errors.journalDescription.message}
//                                 </span>
//                             )}
//                             {errors.journalDescription?.type === 'maxLength' && (
//                                 <span style={{ color: 'red' }}>
//                                     {errors.journalDescription?.message}
//                                 </span>
//                             )}
//                         </Form.Group> */}

//                         <div class="factbtn-box">
//                             <button class="common-btn create" type="Submit">
//                                 {formType === 'edit' ? 'Edit' : 'Create'}
//                             </button>
//                             <button
//                                 class="common-btn cancel"
//                                 type="button"
//                                 onClick={() => handleClose()}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </Form>
//                 </Modal.Body>
//             </Modal>

//             <DeleteJournalModal
//                 show={delShow}
//                 setShow={setDelShow}
//                 deleteId={deleteFactId}
//             />
//         </>
//     )
// }

// export default React.memo(Journal)