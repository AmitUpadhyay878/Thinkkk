import React, { useCallback, useEffect, useState } from 'react'
import { Dropdown, Form, InputGroup, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import plusIcon from '../../../../../assets/dashboardimg/plus.png'
import dotImg from '../../../../../assets/dashboardimg/three-dots.png'
import editpenIcon from '../../../../../assets/dashboardimg/editicon.png'
import trashIcon from '../../../../../assets/dashboardimg/trash.png'
import answerImg from '../../../../../assets/dashboardimg/answer.png'
import quesaddlogo from '../../../../../assets/images/quesaddlogo.svg'
import vectorImg from '../../../../../assets/dashboardimg/actionvector.svg'
import { ReactComponent as SearchIcon } from '../../../../../assets/dashboardimg/search.svg'

import Button from '../../../../../components/Button/Button'
import CreateModal from '../../../../../components/CreateModal/CreateModal'
import {
    // answerAddAction, questionAddAction
    addAnswerRequest,
    addQuestionRequest,
    editAnswerRequest,
    editQuestionRequest,
    listingQARequest
} from '../../../../../Redux/Actions/QandAAction'
import DeleteQueAnsModal from '../../../../../components/DeleteQueAnsModal/DeleteQueAnsModal'
import { actionitemAction } from '../../../../../Redux/Actions/ActionItemActions'
import { toast } from 'react-toastify'
import AmitPagination from '../../../../../components/AmitPagination/AmitPagination'

const QandA = ({ isActiveTab }) => {
    let { thoughtId } = useParams()
    const dispatch = useDispatch()
    const { questionsanswers, error, loading } = useSelector(
        (state) => state.QueNAns
    )
    let totalQuestions = questionsanswers?.meta?.totalCount

    const [currentPage, setCurrentPage] = useState(1)
    const [currentthough, setCurrentThought] = useState('')
    const [DataLimit, setDataLimit] = useState(5)
    const [TotalPagies, setTotalPagies] = useState(1)

    useEffect(() => {
        setTotalPagies(Math.ceil(totalQuestions / DataLimit))
    }, [totalQuestions, DataLimit])
    const handleChange = (eventkey) => {
        setDataLimit(eventkey)
    }

    const handleChangePage = useCallback(
        (currentPage) => {
            setCurrentPage(currentPage)
        },
        [currentPage]
    )
    useEffect(() => {
        // setCurrentPage(currentPage > TotalPagies ? TotalPagies : currentPage);
        setCurrentPage(1)
    }, [TotalPagies])

    const { register, handleSubmit, reset ,watch, setValue} = useForm()
    const [addEditDetail, setAddEditDetail] = useState(null)
    const [serverError, setServerError] = useState('')
    const [ansCount, setAnscount] = useState(0)
    // const [editId, setEditId] = useState()
    const [show, setShow] = useState(false)
    const [deleteshow, setDeleteShow] = useState(false)
    const [id, setid] = useState('')
    const [QuestionIdDelete, setQuestionIdDelete] = useState('')
    const [levelNum, setLevelNum] = useState(1)
    const [AnswerIdDelete, setAnswerIdDelete] = useState('')
    const [addansshow, setAddansshow] = useState(false)
    const [editQ,setEditQ] = useState(false)
    const [edtiQAId, setEditQAId] = useState(null)
    const [editQAtype, setEditQAtype] = useState('')
    const [QandASearch, setQandASearch] = useState()

    const handleChangeSearch = (event) => {
        setQandASearch(event.target.value)
    }
    const deleteAnswer = (id, level) => {
        setAnswerIdDelete(id)
        setDeleteShow(true)
        setLevelNum(level)
    }
    const deleteQuestion = (id, level) => {
        setQuestionIdDelete(id)
        setDeleteShow(true)
        setLevelNum(level)
    }
    const handleAddAnswer = (id) => {
        setAddansshow(true)
        setid(id)
        setEditQAId(null)
    }
    function handleClose() {
        setid(null)
        setEditQAId(null)
        setShow(false)
        reset()
    }

    useEffect(() => {
        if (isActiveTab && !show && !deleteshow) {
            dispatch(
                listingQARequest({
                    limit: DataLimit,
                    page: currentPage,
                    search: QandASearch,
                    sortKey: '',
                    sortBy: 1,
                    thoughtId: thoughtId
                })
            )
        }
    }, [
        thoughtId,
        isActiveTab,
        show,
        deleteshow,
        DataLimit,
        currentPage,
        QandASearch
    ])

    useEffect(() => {
        setServerError(error)
    }, [error])

    const handleQuestion = () => {
        setShow(true)
    }

    const onSubmitNewAns = (values) => {
        dispatch(
            addAnswerRequest({
                questionId: addEditDetail.questionId,
                answerName: values.newanswer,
                level: addEditDetail.level
            })
        )
        setShow(false)
        setid(null)
        reset()
    }

    const onSubmitNewQues = (values) => {
        dispatch(
            addQuestionRequest({
                answerId: addEditDetail.answerId,
                questionName: values.newQues,
                level: addEditDetail.level + 1
            })
        )
        // setAddansshow(true)
        setShow(false)
        setid(null)
        reset()
    }

    const onSubmitEditAns = (values) => {
        const editAnsPayload = {
            answersId: edtiQAId,
            answerName: values.editedAnswer,
            level: addEditDetail.level
        }
        dispatch(editAnswerRequest(editAnsPayload))
        // setAddansshow(true)
        setShow(false)
        setEditQAId(null)
        reset()
    }

    const onSubmitEditQuestoin = (values) => {
        const editQuesPayload = {
            questionId: edtiQAId,
            questionName: values.editedQuestion,
            level: addEditDetail.level
        }
        dispatch(editQuestionRequest(editQuesPayload))
        // setAddansshow(true) 
        setShow(false)
        setEditQAId(null)
        reset()
    }

    async function convertToAction(ansName) {
        dispatch(
            actionitemAction({ thoughtId, actionName: ansName }, () => {
                toast.success('Answer is SuccessFully Convert To Action')
            })
        )
    }

    const fakeQa = (arr) => {
        return (
            <>
                {arr.map((q, i) => (
                    <div
                        className={q.level === 1 ? ' multiple-mainqabox' : ''}
                        key={i}
                    >
                        <div className="mul-quesbox">
                            <div className="main-wholebox">
                                {/* question */}
                                <div className="question-box qag">
                                    {edtiQAId !== q?.questionId && (
                                        <div className="quesans-close">
                                            <div className="que">
                                                Q&nbsp;:&nbsp;{q.questionName}
                                            </div>
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
                                                        {/* {q?.answers && */}
                                                    {q.answers?.length <
                                                        5 && 
                                                            (
                                                                <Dropdown.Item
                                                                    onClick={() =>
                                                                        handleAddAnswer(
                                                                            q.questionId
                                                                        )
                                                                    }
                                                                >
                                                                    <span>
                                                                        <img
                                                                            src={
                                                                                plusIcon
                                                                            }
                                                                            alt=""
                                                                            loading="lazy"
                                                                        />
                                                                    </span>
                                                                    Add Answer
                                                                </Dropdown.Item>
                                                            )
                                                            }
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                setEditQAtype(
                                                                    'editQuestion'
                                                                )
                                                                setEditQAId(
                                                                    q.questionId,
                                                                    q.level
                                                                )
                                                                setid(null)
                                                                setAddansshow(true)
                                                            }}
                                                        >
                                                            {' '}
                                                            <span>
                                                                <img
                                                                    src={
                                                                        editpenIcon
                                                                    }
                                                                    alt=""
                                                                    loading="lazy"
                                                                />
                                                            </span>{' '}
                                                            Edit Question
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() =>
                                                                deleteQuestion(
                                                                    q.questionId,
                                                                    q.level
                                                                )
                                                            }
                                                        >
                                                            {' '}
                                                            <span>
                                                                <img
                                                                    src={
                                                                        trashIcon
                                                                    }
                                                                    alt=""
                                                                    loading="lazy"
                                                                />
                                                            </span>{' '}
                                                            Delete Question
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    )}
                                    {editQAtype === 'editQuestion' &&
                                        edtiQAId === q.questionId && (
                                            // <Form
                                            //     onSubmit={handleSubmit(
                                            //         onSubmitEditQuestoin
                                            //     )}
                                            //     className="edit-ques"
                                            // >
                                            //     <InputGroup className="mb-3">
                                            //         <InputGroup.Text id="basic-addon1">
                                            //             {' '}
                                            //             <img
                                            //                 src={quesaddlogo}
                                            //                 alt=""
                                            //             />{' '}
                                            //         </InputGroup.Text>
                                            //         <Form.Control
                                            //             as="textarea"
                                            //             className="icontrol"
                                            //             placeholder="Question"
                                            //             aria-label="Question"
                                            //             aria-describedby="basic-addon1"
                                            //             {...register(
                                            //                 'editedQuestion',
                                            //                 {
                                            //                     onChange: (
                                            //                         e
                                            //                     ) => {
                                            //                         setAddEditDetail(
                                            //                             q
                                            //                         )
                                            //                     }
                                            //                 }
                                            //             )}
                                            //             defaultValue={
                                            //                 q.questionName
                                            //             }
                                            //         />
                                            //         <InputGroup.Text id="basic-addon1">
                                            //             <Button
                                            //                 addedClass="close-btn"
                                            //                 type="submit"
                                            //                 isLink={false}
                                            //                 text="Edit"
                                            //             />
                                            //             &nbsp; &nbsp;
                                            //             <Button
                                            //                 addedClass="close-btn close"
                                            //                 type="button"
                                            //                 isLink={false}
                                            //                 text="Close"
                                            //                 onClick={
                                            //                     handleClose
                                            //                 }
                                            //             />
                                            //         </InputGroup.Text>
                                            //     </InputGroup>
                                            // </Form>
                                            <Modal
                                                show={addansshow}
                                                onHide={() => setAddansshow(false)}
                                                dialogClassName="modal-box"
                                                aria-labelledby="example-custom-modal-styling-title"
                                            >
                                                <Modal.Body>
                                                    <Modal.Title id="example-custom-modal-styling-title">
                                                        Edit Question
                                                    </Modal.Title>
                                                    <Form key={1} onSubmit={handleSubmit(onSubmitEditQuestoin)}>
                                                        <Form.Group
                                                            className="mb-3 form-box"
                                                            controlId="formBasicEmail"
                                                        >
                                                            {/* <Form.Label className="ilabel">
                                                                Helloo
                                                            </Form.Label> */}
                                                            <Form.Control
                                                                className="icontrol"
                                                                type="text"
                                                                name="actionitem"
                                                                {...register(
                                                                    'editedQuestion',
                                                                    {
                                                                        onChange: (
                                                                            e
                                                                        ) => {
                                                                            setAddEditDetail(
                                                                                q
                                                                            )
                                                                        }

                                                                    }
                                                                )}
                                                                defaultValue={q.questionName}
                                                            />

                                                        </Form.Group>
                                                        <div className="quescbtn-box">
                                                            <Button
                                                                addedClass="close-btn"
                                                                type="submit"
                                                                isLink={false}
                                                                text="Save"
                                                            />
                                                            &nbsp; &nbsp;
                                                            <Button
                                                                addedClass="close-btn close"
                                                                type="button"
                                                                isLink={false}
                                                                text="Close"
                                                                onClick={
                                                                    handleClose
                                                                }
                                                            />
                                                        </div>
                                                    </Form>
                                                </Modal.Body>
                                            </Modal>

                                        )}
                                    {addansshow && id === q.questionId && (
                                        // <Form
                                        //     onSubmit={handleSubmit(
                                        //         onSubmitNewAns
                                        //     )}
                                        //     className="edit-ques"
                                        // >
                                        //     <InputGroup className="mb-3">
                                        //         <InputGroup.Text id="basic-addon1">
                                        //             <img
                                        //                 src={answerImg}
                                        //                 alt=""
                                        //                 loading="lazy"
                                        //             />
                                        //         </InputGroup.Text>
                                        //         <Form.Control
                                        //             as="textarea"
                                        //             className="icontrol"
                                        //             placeholder="Answer"
                                        //             aria-label="Answer"
                                        //             aria-describedby="basic-addon1"
                                        //             // defaultValue={selectedAns}
                                        //             {...register('newanswer', {
                                        //                 onChange: (e) => {
                                        //                     setAddEditDetail(q)
                                        //                 }
                                        //             })}
                                        //         />
                                        //         <InputGroup.Text id="basic-addon1">
                                        //             <Button
                                        //                 addedClass="close-btn"
                                        //                 type="submit"
                                        //                 isLink={false}
                                        //                 text="Add"
                                        //             />{' '}
                                        //             &nbsp; &nbsp;
                                        //             <Button
                                        //                 addedClass="close-btn"
                                        //                 type="button"
                                        //                 isLink={false}
                                        //                 text="Close"
                                        //                 onClick={handleClose}
                                        //             />
                                        //         </InputGroup.Text>
                                        //     </InputGroup>
                                        // </Form>
                                        <Modal
                                            show={addansshow}
                                            onHide={() => setAddansshow(false)}
                                            dialogClassName="modal-box"
                                            aria-labelledby="example-custom-modal-styling-title"
                                        >
                                            <Modal.Body>
                                                <Modal.Title id="example-custom-modal-styling-title">
                                                    Add Answer
                                                </Modal.Title>
                                                <Form key={1} onSubmit={handleSubmit(onSubmitNewAns)}>
                                                    <Form.Group
                                                        className="mb-3 form-box"
                                                        controlId="formBasicEmail"
                                                    >
                                                        <Form.Label className="ilabel">
                                                        Question :   {q?.questionName}
                                                        </Form.Label>
                                                        <Form.Control
                                                            className="icontrol"
                                                            type="text"
                                                            name="actionitem"
                                                            {...register('newanswer', {
                                                                onChange: (e) => {
                                                                    setAddEditDetail(q)
                                                                }
                                                            })}
                                                        />

                                                    </Form.Group>
                                                    <div className="quescbtn-box">
                                                        <Button
                                                            addedClass="close-btn"
                                                            type="submit"
                                                            isLink={false}
                                                            text="Save"
                                                        />{' '}
                                                        &nbsp; &nbsp;
                                                        <Button
                                                            addedClass="close-btn"
                                                            type="button"
                                                            isLink={false}
                                                            text="Close"
                                                            onClick={handleClose}
                                                        />
                                                            </div>
                                                        </Form>
                                                    </Modal.Body>
                                                    </Modal>
                                        )}
                                    {addansshow && id === q.questionId && (
                                        // <Form
                                        //     // onSubmit={handleSubmit(
                                        //     //     onSubmitNewAns
                                        //     // )}
                                        //     className="edit-ques"
                                        // >
                                        //     <InputGroup className="mb-3">
                                        //         <InputGroup.Text id="basic-addon1">
                                        //             <img
                                        //                 src={answerImg}
                                        //                 alt=""
                                        //                 loading="lazy"
                                        //             />
                                        //         </InputGroup.Text>
                                        //         <Form.Control
                                        //             as="textarea"
                                        //             className="icontrol"
                                        //             placeholder="Answer"
                                        //             aria-label="Answer"
                                        //             aria-describedby="basic-addon1"
                                        //             // defaultValue={selectedAns}
                                        //             {...register('newanswer', {
                                        //                 onChange: (e) => {
                                        //                     setAddEditDetail(q)
                                        //                 }
                                        //             })}
                                        //         />
                                        //         <InputGroup.Text id="basic-addon1">
                                        //             <Button
                                        //                 addedClass="close-btn"
                                        //                 type="submit"
                                        //                 isLink={false}
                                        //                 text="Add"
                                        //             />{' '}
                                        //             &nbsp; &nbsp;
                                        //             <Button
                                        //                 addedClass="close-btn"
                                        //                 type="button"
                                        //                 isLink={false}
                                        //                 text="Close"
                                        //                 onClick={handleClose}
                                        //             />
                                        //         </InputGroup.Text>
                                        //     </InputGroup>
                                        // </Form>

                                        <Modal
                                            show={addansshow}
                                            onHide={() => setAddansshow(false)}
                                            dialogClassName="modal-box"
                                            aria-labelledby="example-custom-modal-styling-title"
                                        >
                                            <Modal.Body>
                                                <Modal.Title id="example-custom-modal-styling-title">
                                                    {/* {id ? 'Add Answer' : ''} */}
                                                    Add Answer
                                                </Modal.Title>
                                                <Form
                                                    key={1}
                                                    onSubmit={handleSubmit(
                                                        onSubmitNewAns
                                                    )}
                                                >
                                                    <Form.Group
                                                        className="mb-3 form-box"
                                                        controlId="formBasicEmail"
                                                    >
                                                        <Form.Label className="ilabel">
                                                            Question : {q.questionName}
                                                        </Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            className="icontrol"
                                                            type="text"
                                                            {...register(
                                                                'newanswer',
                                                                {
                                                                    onChange: (
                                                                        e
                                                                    ) => {
                                                                        setAddEditDetail(
                                                                            q
                                                                        )
                                                                    }
                                                                }
                                                            )}
                                                            onPaste={(event) => {
                                                                event.preventDefault()
                        
                                                                const clipboardData =
                                                                    event.clipboardData || window.clipboardData
                                                                const pastedData = clipboardData
                                                                    .getData('text')
                                                                    ?.trimStart()
                                                                const maxLength = 500
                                                                const truncatedData = pastedData.substring(
                                                                    0,
                                                                    maxLength - event.target.value.length
                                                                )
                                                                document.execCommand('insertText', false, truncatedData)
                                                            }}
                                                            onKeyDown={(event) => {
                                                                const fixedLength = 500 // change 5 to your desired fixed length
                        
                                                                if (
                                                                    event.target.value.trimStart().length >= fixedLength &&
                                                                    event.key !== 'Backspace' &&
                                                                    event.key !== ' ' &&
                                                                    event.key !== 'ArrowLeft' &&
                                                                    event.key !== 'ArrowRight' &&
                                                                    event.key !== 'ArrowDown' &&
                                                                    event.key !== 'ArrowUp'
                                                                ) {
                                                                    event.preventDefault()
                                                                }
                                                            }}
                                                        />
                                                        {/* <span style={{ color: 'red' }}>
                                                        {errors.actionitem?.message}
                                                    </span> */}
                                                            <span
                                    style={{
                                        position: 'absolute',

                                        right: '18px'
                                    }}>
                                    {watch()?.newanswer?.trim()?.length ?? 0} /500{' '}
                                    
                                </span>

                                                    </Form.Group>
                                                    <div className="quescbtn-box">
                                                        <Button
                                                        addedClass="close-btn"
                                                        type="submit"
                                                        isLink={false}
                                                        text="Save"
                                                    />
                                                    &nbsp; &nbsp;
                                                    <Button
                                                        addedClass="close-btn"
                                                        type="button"
                                                        isLink={false}
                                                        text="Close"
                                                        onClick={handleClose}
                                                    />
                                                    </div>
                                                </Form>
                                            </Modal.Body>
                                        </Modal>
                                    )}
                                </div>
                                { }
                                {q.answers?.map((a, i) => {
                                    return (
                                        <div className="answer-box qag" key={i}>
                                            {/* answers */}
                                            {edtiQAId !== a?.answerId && (
                                                <div className="quesans-close">
                                                    <div className="ans">
                                                        A&nbsp;:&nbsp;{' '}
                                                        {a.answerName}
                                                    </div>
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
                                                                    onClick={() =>
                                                                        convertToAction(
                                                                            a.answerName
                                                                        )
                                                                    }
                                                                >
                                                                    <span>
                                                                        <img
                                                                            src={
                                                                                plusIcon
                                                                            }
                                                                            alt=""
                                                                            loading="lazy"
                                                                        />
                                                                    </span>
                                                                    Convert
                                                                    To
                                                                    Action
                                                                </Dropdown.Item>

                                                                {/* {a.level ===
                                                                    1    ? (
                                                                    // ||q.answers.length==5
                                                                    <Dropdown.Item
                                                                        onClick={() =>
                                                                            convertToAction(
                                                                                a.answerName
                                                                            )
                                                                        }
                                                                    >
                                                                        <span>
                                                                            <img
                                                                                src={
                                                                                    plusIcon
                                                                                }
                                                                                alt=""
                                                                                loading="lazy"
                                                                            />
                                                                        </span>
                                                                        Convert
                                                                        To
                                                                        Action
                                                                    </Dropdown.Item>
                                                                ) : 
                                                                // (
                                                                //     a.question
                                                                //         ?.length <
                                                                //     1 && (
                                                                        <Dropdown.Item
                                                                            onClick={() =>
                                                                                handleAddAnswer(
                                                                                    a.answerId
                                                                                )
                                                                            }
                                                                        >
                                                                            <span>
                                                                                <img
                                                                                    src={
                                                                                        plusIcon
                                                                                    }
                                                                                    alt=""
                                                                                    loading="lazy"
                                                                                />
                                                                            </span>
                                                                            Add Question
                                                                        </Dropdown.Item>
                                                                //     )
                                                                // )} */}
                                                                <Dropdown.Item
                                                                    onClick={() =>
                                                                        handleAddAnswer(
                                                                            a.answerId
                                                                        )
                                                                    }
                                                                >
                                                                    <span>
                                                                        <img
                                                                            src={
                                                                                plusIcon
                                                                            }
                                                                            alt=""
                                                                            loading="lazy"
                                                                        />
                                                                    </span>
                                                                    Add
                                                                    Question
                                                                </Dropdown.Item>


                                                                <Dropdown.Item
                                                                    onClick={() => {
                                                                        setEditQAtype(
                                                                            'editAnswer'
                                                                        )
                                                                        setEditQAId(
                                                                            a.answerId
                                                                        )
                                                                        setid(
                                                                            null
                                                                        )
                                                                        setValue("editedAnswer",a.answerName)
                                                                        setAddansshow(true)
                                                                    }}
                                                                >
                                                                    {' '}
                                                                    <span>
                                                                        <img
                                                                            src={
                                                                                editpenIcon
                                                                            }
                                                                            alt=""
                                                                            loading="lazy"
                                                                        />
                                                                    </span>{' '}
                                                                    Edit Answer
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    onClick={() =>
                                                                        deleteAnswer(
                                                                            a.answerId,
                                                                            a.level
                                                                        )
                                                                    }
                                                                >
                                                                    {' '}
                                                                    <span>
                                                                        <img
                                                                            src={
                                                                                trashIcon
                                                                            }
                                                                            alt=""
                                                                            loading="lazy"
                                                                        />
                                                                    </span>{' '}
                                                                    Delete
                                                                    Answer
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>  
                                            )}
                                            {editQAtype === 'editAnswer' &&
                                                edtiQAId === a?.answerId && (
                                                    // <Form
                                                    //     onSubmit={handleSubmit(
                                                    //         onSubmitEditAns
                                                    //     )}
                                                    //     className="edit-ques"
                                                    // >
                                                    //     <InputGroup className="mb-3">
                                                    //         <InputGroup.Text id="basic-addon1">
                                                    //             {' '}
                                                    //             <img
                                                    //                 src={
                                                    //                     answerImg
                                                    //                 }
                                                    //                 alt=""
                                                    //             />{' '}
                                                    //         </InputGroup.Text>
                                                    //         <Form.Control
                                                    //             as="textarea"
                                                    //             className="icontrol"
                                                    //             placeholder="Answer"
                                                    //             aria-label="Answer"
                                                    //             aria-describedby="basic-addon1"
                                                    //             {...register(
                                                    //                 'editedAnswer',
                                                    //                 {
                                                    //                     onChange:
                                                    //                         (
                                                    //                             e
                                                    //                         ) => {
                                                    //                             setAddEditDetail(
                                                    //                                 a
                                                    //                             )
                                                    //                         }
                                                    //                 }
                                                    //             )}
                                                    //             defaultValue={
                                                    //                 a?.answerName
                                                    //             }
                                                    //         />
                                                    //         <InputGroup.Text id="basic-addon1">
                                                    //             <Button
                                                    //                 addedClass="close-btn"
                                                    //                 type="submit"
                                                    //                 isLink={
                                                    //                     false
                                                    //                 }
                                                    //                 text="Edit"
                                                    //             />
                                                    //             &nbsp;&nbsp;
                                                    //             <Button
                                                    //                 addedClass="close-btn close"
                                                    //                 type="button"
                                                    //                 isLink={
                                                    //                     false
                                                    //                 }
                                                    //                 text="Close"
                                                    //                 onClick={
                                                    //                     handleClose
                                                    //                 }
                                                    //             />
                                                    //         </InputGroup.Text>
                                                    //     </InputGroup>
                                                    // </Form>
                                                <Modal
                                                    show={addansshow}
                                                    onHide={() => setAddansshow(false)}
                                                    dialogClassName="modal-box"
                                                    aria-labelledby="example-custom-modal-styling-title"
                                                >
                                                    <Modal.Body>
                                                        <Modal.Title id="example-custom-modal-styling-title">
                                                            {/* {id ? 'Add Answer' : ''} */}
                                                            Edit Answer
                                                            
                                                        </Modal.Title>
                                                        <Form
                                                            key={1}
                                                            onSubmit={handleSubmit(
                                                                onSubmitEditAns
                                                            )}
                                                        >
                                                            <Form.Group
                                                                className="mb-3 form-box"
                                                                controlId="formBasicEmail"
                                                            >
                                                                <Form.Label className="ilabel">
                                                                    {/* {lblTitle} */}
                                                                    Question : {q?.questionName}
                                                                </Form.Label>
                                                                <Form.Control
                                                                as="textarea"
                                                                    className="icontrol"
                                                                    type="text"
                                                                    defaultValue={a?.answerName}
                                                                    {...register(
                                                                                        'editedAnswer',
                                                                                        {
                                                                                            onChange:
                                                                                                (
                                                                                                    e
                                                                                                ) => {
                                                                                                    setAddEditDetail(
                                                                                                        a
                                                                                                    )
                                                                                                }
                                                                                        }
                                                                                    )}
                                                                      
                                                                                    onPaste={(event) => {
                                                                                        event.preventDefault()
                                                
                                                                                        const clipboardData =
                                                                                            event.clipboardData || window.clipboardData
                                                                                        const pastedData = clipboardData
                                                                                            .getData('text')
                                                                                            ?.trimStart()
                                                                                        const maxLength = 500
                                                                                        const truncatedData = pastedData.substring(
                                                                                            0,
                                                                                            maxLength - event.target.value.length
                                                                                        )
                                                                                        document.execCommand('insertText', false, truncatedData)
                                                                                    }}
                                                                                    onKeyDown={(event) => {
                                                                                        const fixedLength = 500 // change 5 to your desired fixed length
                                                
                                                                                        if (
                                                                                            event.target.value.trimStart().length >= fixedLength &&
                                                                                            event.key !== 'Backspace' &&
                                                                                            event.key !== ' ' &&
                                                                                            event.key !== 'ArrowLeft' &&
                                                                                            event.key !== 'ArrowRight' &&
                                                                                            event.key !== 'ArrowDown' &&
                                                                                            event.key !== 'ArrowUp'
                                                                                        ) {
                                                                                            event.preventDefault()
                                                                                        }
                                                                                    }}
                                                                />
                                                                {/* <span style={{ color: 'red' }}>
                                                                {errors.actionitem?.message}
                                                            </span> */}
                                                             <span
                                                                style={{
                                                                    position: 'absolute',

                                                                    right: '18px' 
                                                                }}>
                                                                {watch()?.editedAnswer?.trim()?.length ?? 0} /500{' '}
                                                                {console.log("number",watch()?.newanswer?.trim()?.length)}
                                                            </span>
                                                            </Form.Group>
                                                            <div className="quescbtn-box">  
                                                            <Button
                                                                    addedClass="close-btn"
                                                                    type="submit"
                                                                    isLink={
                                                                        false
                                                                    }
                                                                    text="Save"
                                                                />
                                                                &nbsp;&nbsp;
                                                                <Button
                                                                    addedClass="close-btn close"
                                                                    type="button"
                                                                    isLink={
                                                                        false
                                                                    }
                                                                    text="Close"
                                                                    onClick={
                                                                        handleClose
                                                                    }
                                                                />
                                                            </div>
                                                        </Form>
                                                    </Modal.Body>
                                                </Modal>
                                                )}

                                            {addansshow &&
                                                id === a.answerId && (
                                                    // <Form
                                                    //     onSubmit={handleSubmit(
                                                    //         onSubmitNewQues
                                                    //     )}
                                                    //     className="edit-ques"
                                                    // >
                                                    //     <InputGroup className="mb-3">
                                                    //         <InputGroup.Text id="basic-addon1">
                                                    //             {' '}
                                                    //             <img
                                                    //                 src={
                                                    //                     quesaddlogo
                                                    //                 }
                                                    //                 alt=""
                                                    //                 loading="lazy"
                                                    //             />{' '}
                                                    //         </InputGroup.Text>
                                                    //         <Form.Control
                                                    //             as="textarea"
                                                    //             className="icontrol"
                                                    //             placeholder="Question"
                                                    //             aria-label="Question"
                                                    //             aria-describedby="basic-addon1"
                                                    //             {...register(
                                                    //                 'newQues',
                                                    //                 {
                                                    //                     onChange:
                                                    //                         () => {
                                                    //                             setAddEditDetail(
                                                    //                                 a
                                                    //                             )
                                                    //                         }
                                                    //                 }
                                                    //             )}
                                                    //         />
                                                    //         <InputGroup.Text id="basic-addon1">
                                                    //             <Button
                                                    //                 addedClass="close-btn"
                                                    //                 type="submit"
                                                    //                 isLink={
                                                    //                     false
                                                    //                 }
                                                    //                 text="Add"
                                                    //             />{' '}
                                                    //             &nbsp;&nbsp;
                                                    //             <Button
                                                    //                 addedClass="close-btn close"
                                                    //                 type="button"
                                                    //                 isLink={
                                                    //                     false
                                                    //                 }
                                                    //                 text="Cancel"
                                                    //                 onClick={
                                                    //                     handleClose
                                                    //                 }
                                                    //             />
                                                    //         </InputGroup.Text>
                                                    //     </InputGroup>
                                                    // </Form>

                                                    <Modal
                                                        show={addansshow}
                                                        onHide={() => setAddansshow(false)}
                                                        dialogClassName="modal-box"
                                                        aria-labelledby="example-custom-modal-styling-title"
                                                    >
                                                        <Modal.Body>
                                                            <Modal.Title id="example-custom-modal-styling-title">
                                                                Add Question
                                                            </Modal.Title>
                                                            <Form key={1} onSubmit={handleSubmit(onSubmitNewQues)}>
                                                                <Form.Group
                                                                    className="mb-3 form-box"
                                                                    controlId="formBasicEmail"
                                                                >
                                                                    <Form.Label className="ilabel">
                                                                        Answer  : {a?.answerName}
                                                                    </Form.Label>
                                                                    <Form.Control
                                                                        className="icontrol"
                                                                        type="text"
                                                                        name="actionitem"
                                                                        {...register(
                                                                            'newQues',
                                                                            {
                                                                                onChange:
                                                                                    () => {
                                                                                        setAddEditDetail(
                                                                                            a
                                                                                        )
                                                                                    }
                                                                            }
                                                                        )}
                                                                    />

                                                                </Form.Group>
                                                                <div className="quescbtn-box">
                                                                    <Button
                                                                        addedClass="close-btn"
                                                                        type="submit"
                                                                        isLink={
                                                                            false
                                                                        }
                                                                        text="Save"
                                                                    />{' '}
                                                                    &nbsp;&nbsp;
                                                                    <Button
                                                                        addedClass="close-btn close"
                                                                        type="button"
                                                                        isLink={
                                                                            false
                                                                        }
                                                                        text="Cancel"
                                                                        onClick={
                                                                            handleClose
                                                                        }
                                                                    />
                                                                </div>
                                                            </Form>
                                                        </Modal.Body>
                                                    </Modal>
                                                )}
                                            {fakeQa(a.question)}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            <div className="action-wholebox ">
                <div className="header-box">
                    <div className="title-text">
                        <h2>Questions & Answers</h2>
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
                                    onChange={(e) => handleChangeSearch(e)}
                                />
                                <div className="search-icon">
                                    <SearchIcon />
                                </div>
                            </Form.Group>
                        </div>
                        <Button
                            isLink={false}
                            addedClass="quesc"
                            // onClick={editQueId ? displyEditQueModal : handleQuestion}
                            logoClass="plus"
                            text="Create Question"
                            type="button"
                            onClick={handleQuestion}
                        />
                    </div>
                </div>
                {questionsanswers && questionsanswers.length == 0 ? (
                    <div className="actionvector-box">
                        <div className="vector-image">
                            <img src={vectorImg} alt="" className="img-fluid" />
                            <p>
                                You haven’t added question & answer over here.
                            </p>
                            <p>
                                <span>
                                    So please create and complete the question &
                                    answer process.
                                </span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div>{fakeQa(questionsanswers)}</div>
                        {questionsanswers?.meta?.totalCount >= 1 && (
                            <div className="card thought-pagination">
                                <div className="card-body">
                                    <div className="showing-pages">
                                        <p className="m-0">
                                            Showing{' '}
                                            {(currentPage - 1) * DataLimit + 1}{' '}
                                            to{' '}
                                            {Math.min(
                                                currentPage * DataLimit,
                                                totalQuestions
                                            )}{' '}
                                            of {totalQuestions} Questions{' '}
                                        </p>
                                    </div>
                                    <div className="itemperpage-box">
                                        <Dropdown
                                            flip="no"
                                            onSelect={handleChange}
                                        >
                                            <div className="item-text">
                                                Items per page:
                                            </div>
                                            <Dropdown.Toggle
                                                variant="success"
                                                id="dropdown-basic"
                                                style={{
                                                    backgroundColor: '#e7f7f2'
                                                }}
                                            >
                                                {DataLimit}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu
                                                style={{
                                                    backgroundColor: '#e7f7f2'
                                                }}
                                            >
                                                <Dropdown.Item eventKey="5">
                                                    5
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="10">
                                                    10
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="15">
                                                    15
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        )}
                        <AmitPagination
                            total={TotalPagies}
                            current={currentPage}
                            onChangePage={handleChangePage}
                        />
                    </>
                )}
                <CreateModal
                    show={show}
                    setShow={setShow}
                    // editId={editId}
                    edtiQAId={edtiQAId}
                    title={'Create Question'}
                    lblTitle={'Question Title'}
                    lblPlaceHolder={'Which resources do I need to start?'}
                />
                <DeleteQueAnsModal
                    show={deleteshow}
                    setShow={setDeleteShow}
                    QuestionIdDelete={QuestionIdDelete}
                    setQuestionIdDelete={setQuestionIdDelete}
                    AnswerIdDelete={AnswerIdDelete}
                    setAnswerIdDelete={setAnswerIdDelete}
                    levelNum={levelNum}
                />
            </div>
        </>
    )
}
export default QandA
