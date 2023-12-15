import React, { useEffect, useState } from 'react'
import { Modal, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { actionitemAction } from '../../Redux/Actions/ActionItemActions'
import request from '../../util/request'
import Button from '../Button/Button'
import { toast } from 'react-toastify'
import { FailureToastNotification } from '../ToastServerError/ToasterMessage'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const CreateModal = ({
    show,
    setShow,
    title,
    lblTitle,
    lblPlaceHolder,
    onClick,
    editId,
    setEditId,
    viewActionADta
}) => {

    const dispatch = useDispatch()
    const [isUpdate, setisUpdte] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    const [inputFields, setInputFields] = useState({
        actionitem: ''
    })
    const actionValidtaionSchema = yup.object({
        actionitem: yup
            .string()
            .trim('Extra Space Not Allowed')
            .required('Please Enter Action Item')
            .max(500, 'Action item must be at most 500 characters')
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
    } = useForm({ resolver: yupResolver(actionValidtaionSchema), mode: 'all' })

    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
        reset: reset2
    } = useForm({ mode: 'submit' })

    const handleShow = () => {
        setShow(true)
    }
    const [getInput, setGetInput] = useState('')
    const handleClose = () => {
        reset()
        setShow(false)
        if (editId) {
            setEditId(null)
        }
        reset2()
        setGetInput('')
    }
    const [question, setQuetion] = useState('')
    const [actionItem, setactionItem] = useState('')
    const { thoughtId } = useParams()

    function fetchData(params, values) {
        request(
            'POST',
            '/action-items/view',
            { actionId: editId },
            {},
            true
        ).then((res) => {
            setInputFields({ actionitem: res.data.data.actionName })
            setValue('actionitem', res.data.data.actionName)
            setisUpdte(true)
        })
    }

    useEffect(() => {
        if (editId) {
            fetchData(editId)
        } else {
            setValue('actionitem', '')
            setInputFields({ actionitem: '' })
        }
        return () => {
            reset()
        }
    }, [editId])

    const onSubmit = (e, data) => {
        if (!isUpdate) {
            setDisableBtn(true)
            dispatch(
                actionitemAction(
                    { thoughtId, actionName: actionItem, actionId: '' },
                    () => {
                        handleClose()
                        reset()
                        viewActionADta() 
                    }
                )
            )
            setTimeout(() => {
                setDisableBtn(false)
            }, 3000)
        } else {
            setDisableBtn(true)
            dispatch(
                actionitemAction(
                    { thoughtId, actionId: editId, actionName: actionItem },
                    () => {
                        handleClose()
                        reset()
                        viewActionADta()
                    }
                )
            )
            setTimeout(() => {
                setDisableBtn(false)
            }, 3000)
        }
    }

    const onSubmit2 = (e2) => {
        setDisableBtn(true)
        request(
            'POST',
            '/question-answer/add',
            { thoughtId, questionName: question, level: 1 },
            {},
            true
        )
            .then((res) => {
                if (res.data.meta.status === 1) {
                    toast.success(res.data.meta.message)
                    setShow(false)
                  
                    reset2()
                    setDisableBtn(false)
                }
                // else{
                //   // toast.error(res.data.meta.message)
                //   console.log("error message",res?.meta?.message);
                // }
            })
            .catch((err) => {
                FailureToastNotification(err.meta.message)
                setDisableBtn(false)
                // setTimeout(() => {
                //     setDisableBtn(false)
                // }, 3000)
            })

    }

    switch (title) {
        case (title = 'Create Action Item'):
            return (
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-box"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Body>
                        <Modal.Title id="example-custom-modal-styling-title">
                            {editId ? 'Edit Action Item' : title}
                        </Modal.Title>
                        <Form key={1} onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group
                                className="mb-3 form-box"
                                controlId="formBasicEmail"
                            >
                                <Form.Label className="ilabel">
                                    {lblTitle}
                                </Form.Label>
                                <Form.Control
                                    as="textarea" 
                                    className="icontrol"
                                    type="text"
                                    placeholder={lblPlaceHolder}
                                    defaultValue={inputFields.actionitem}
                                    name="actionitem"
                                    // {...register("actionitem", {
                                    //   required: { value: true, message: "Please Enter Action Item" },
                                    //   maxLength: { value: 50, message: "Maximum Input Should be 50" },
                                    //   onChange: (e) => setactionItem(e.target.value),
                                    // })}
                                    {...register('actionitem', {
                                        onChange: (e) => {
                                            setactionItem(e.target.value)
                                        }
                                    })}

                                    ///// for cover latter
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
                                <span
                                    style={{
                                        position: 'absolute',

                                        right: '18px'
                                    }}>
                                    {watch()?.actionitem?.trim()?.length ?? 0} /500{' '}
                                </span>
                                    {/* ///// end cove latter */}
                                {/* <span style={{ color: 'red' }}>
                                    {errors.actionitem?.message}
                                </span> */}

                                {errors.actionitem?.message && (
                                    <span style={{color:"red"}}>
                                        {errors.actionitem?.message}
                                    </span>
                                )}

                                {/* {errors.actionitem?.type === "required" && (
                  <span style={{ color: "red" }}>
                    {errors.actionitem.message}
                  </span>
                )}
                {errors.actionitem?.type === "maxLength" && (
                  <span style={{ color: "red" }}>
                    {errors.actionitem?.message}
                  </span>
                )} */}
                            </Form.Group>
                            <div className="quescbtn-box">
                                <Button
                                    type="Submit"
                                    addedClass="create"
                                    isLink={false}
                                    disabled={disableBtn}
                                    // text={disableBtn ? (editId ? "Edit" : "Create") : (editId ? "Edit" : "Create")}
                                    text={editId ? 'Edit' : 'Create'}
                                />
                                <Button
                                    type="button"
                                    addedClass="cancel"
                                    isLink={false}
                                    onClick={() => handleClose()}
                                    text="Close"
                                />
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            )
        case (title = 'Create Question'):
            return (
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-box"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Body>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Create Question
                        </Modal.Title>
                        <Form key={2} onSubmit={handleSubmit2(onSubmit2)}>
                            <Form.Group
                                className="mb-3 form-box"
                                controlId="formBasicEmail"
                            >
                                <Form.Label className="ilabel">
                                    {lblTitle}
                                </Form.Label>
                                <Form.Control
                                    className="icontrol"
                                    type="text"
                                    autoFocus = {true}
                                    placeholder={lblPlaceHolder}
                                    name="question"
                                    {...register2('question', {
                                        required: {
                                            value: true,
                                            message: 'please Enter Question'
                                        },
                                        maxLength: {
                                            value: 50,
                                            message:
                                                'Maximum Input Should be 50'
                                        },
                                        onChange: (e2) =>
                                            setQuetion(e2.target.value)
                                    })}
                                />
                                {errors2.question?.type === 'required' && (
                                    <span style={{ color: 'red' }}>
                                        {errors2.question.message}
                                    </span>
                                )}
                                {errors2.question?.type === 'maxLength' && (
                                    <span style={{ color: 'red' }}>
                                        {errors2.question?.message}
                                    </span>
                                )}
                            </Form.Group>
                            <div className="quescbtn-box">
                                <Button
                                    addedClass="create"
                                    isLink={false}
                                    onClick={() => handleShow()}
                                    text={
                                        disableBtn ? (
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            'Save'
                                        )
                                    }
                                    disabled={disableBtn ? true : false}
                                />
                                <Button
                                    type="button"
                                    addedClass="cancel"
                                    isLink={false}
                                    onClick={() => handleClose()}
                                    text="Cancel"
                                />
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            )

        default:
            break
    }
}

export default React.memo(CreateModal)
