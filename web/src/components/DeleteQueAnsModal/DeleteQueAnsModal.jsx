import React, { useState, useEffect } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import binImg from '../../assets/dashboardimg/dustbin.png'
import Button from '../Button/Button'
import request from '../../util/request'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const DeleteQueAnsModal = ({
    show,
    setShow,
    QuestionIdDelete,
    setQuestionIdDelete,
    AnswerIdDelete,
    setAnswerIdDelete,
    levelNum
}) => {
    // console.log({ QuestionIdDelete, AnswerIdDelete })
    const { error, loading } = useSelector((state) => state.QueNAns)
    const [serverError, setServerError] = useState('')
    const handleClose2 = () => setShow(false)
    useEffect(() => {
        setServerError(error)
    }, [error])

    const QueAnsDelete = () => {
        if (QuestionIdDelete) {
            request(
                'POST',
                '/question-answer/delete',
                { questionId: QuestionIdDelete, level: levelNum },
                {},
                true
            ).then((res) => {
                if (res.data.meta.status === 1) {
                    toast.success(res.data.meta.message)
                    setShow(false)
                } else {
                    toast.error(res.data.meta.message)
                }
            })
        } else {
            request(
                'POST',
                '/question-answer/delete',
                { answersId: AnswerIdDelete, level: levelNum },
                {},
                true
            ).then((res) => {
                if (res.data.meta.status === 1) {
                    toast.success(res.data.meta.message)
                    setShow(false)
                } else {
                    toast.error(res.data.meta.message)
                }
            })
        }
    }
    useEffect(() => {
        if (QuestionIdDelete || AnswerIdDelete) {
            QueAnsDelete()          
        }
    }, [])

    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="delete-modal"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Body>
                    <div className="detelemodal-box">
                        <div className="delete-image">
                            <img src={binImg} alt="" loading="lazy" />
                        </div>
                        {error ? (
                            <span>{serverError}</span>
                        ) : (
                            <>
                                <h4>
                                    Are you sure you want to <br /> delete this{' '}
                                    {!AnswerIdDelete ? 'Question' : 'Answer'} ?
                                </h4>
                                <div class="quescbtn-box dismiss-modal">
                                    <Button
                                        disabled={loading ? true : false}
                                        text={
                                            loading ? (
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                'Yes'
                                            )
                                        }
                                        addedClass="yes"
                                        onClick={() => QueAnsDelete()}
                                    />
                                    <Button
                                        text="No"
                                        addedClass="no"
                                        onClick={handleClose2}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default React.memo(DeleteQueAnsModal)
