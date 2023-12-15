import React, { useEffect, useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    createthought,
    thoughts as tho
} from '../../../../config/routingConsts'

// Component Section
import Button from '../../../../components/Button/Button'
import { ProgressBar } from 'react-bootstrap'
import Deletemodal from '../../../../components/Deletemodal/Deletemodal'
import { useDispatch, useSelector } from 'react-redux'
import { thoughListingAction } from '../../../../Redux/Actions/ThoughAction'
import EditDeleteButton from '../../../../components/Button/EditDeleteButton/EditDeleteButton'
import InfoLableShow from '../../../../components/Button/InfoLableShow/InfoLableShow'
import AmitImagePreview from '../../../../components/AmitImagePreview/AmitImagePreview'
import { YoptaRenderer } from 'yopta-editor'
import { useTranslation } from 'react-i18next'
import vectorImg from '../../../../assets/dashboardimg/actionvector.svg'
const RecentThoughts = () => {
    const { thoughts, thoughtId } = useSelector((state) => state.Thought)

    const [show, setShow] = useState(false)
    const [currentthough, setCurrentThought] = useState(null)
    const location = useLocation()
    const { t } = useTranslation()

    const [showPreview, setShowPreview] = useState(false)
    const [imagePrev, setImagePrev] = useState('')
    const handlePreviewShow = (imagepath) => {
        setImagePrev(imagepath)
        setShowPreview(true)
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (location.state == 'deleteRecentThought') {
            dispatch(
                thoughListingAction({
                    limit: 5,
                    page: 1,
                    search: '',
                    sortKey: '',
                    sortBy: -1
                })
            )
        } else {
            dispatch(
                thoughListingAction({
                    limit: 5,
                    page: 1,
                    search: '',
                    sortKey: '',
                    sortBy: -1
                })
            )
        }
    }, [location.state, thoughtId])

    const handleClick = () => {
        navigate(createthought, { state: 'Dashboard' })
    }
    const handleListThought = () => {
        navigate(tho)
    }

    const handleUpdateData = (id) => {
        navigate(`${createthought}/${id}`, { state: 'Dashboard' })
    }

    const handleDelete = (id) => {
        setCurrentThought(id)
        setShow(true)
    }

    return (
        <div className="recent-thoughtbox recentg scrollbar">
            <div className="card">
                <div className="header-box">
                    <div className="title-text">
                        <h2>{t('recentcha')}</h2>
                    </div>
                    <div className="head-btnbox">
                        <Button
                            addedClass="view-btn"
                            isLink={false}
                            text="View All"
                            onClick={() => handleListThought()}
                        />
                        <Button
                            isLink={false}
                            logoClass="plus"
                            addedClass="thought-btn"
                            text="Create Challenge"
                            onClick={() => handleClick()}
                        />
                    </div>
                </div>
                <div className="card-body">
                    <div className="card-wholebox">
                        {thoughts && thoughts?.data?.length > 0 ? (
                            thoughts.data.map((thought, i) => {
                                return (
                                    <div className="card thoughtcard" key={i}>
                                        <div className="card-body">
                                            <div className="thought-main-box">
                                                <div className="image-content-box">
                                                    <div className="thought-image">
                                                        <img
                                                            src={
                                                                thought.thoughtImage
                                                            }
                                                            alt=""
                                                            className="img-fluid"
                                                            onClick={() =>
                                                                handlePreviewShow(
                                                                    thought.thoughtImage
                                                                )
                                                            }
                                                            style={{
                                                                cursor: 'pointer'
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="thought-content">
                                                        <Link
                                                            to={`${tho}/${thought.thoughtId}`}
                                                            style={{
                                                                textDecoration:
                                                                    'none'
                                                            }}
                                                            state="Challenges"
                                                        >
                                                            <h4>
                                                                {
                                                                    thought.thoughtName
                                                                }
                                                            </h4>
                                                        </Link>
                                                        {/* <p>{thought.thoughtDescription}</p> */}
                                                        {thought?.thoughtDescription && (
                                                            <>
                                                                {/* <YoptaRenderer
                                                                    className="editor-prefix"
                                                                    wrapCls="editor-renderer"
                                                                    data={JSON.parse(
                                                                        thought?.thoughtDescription
                                                                    )}
                                                                /> */}
                                                                <div
                                            dangerouslySetInnerHTML={{ __html: thought?.thoughtDescription }}
                                        />

                                                            </>
                                                        )}




                                                        {/* <YoptaRenderer
                                                            className="editor-prefix"
                                                            wrapCls="editor-renderer"
                                                            data={JSON.parse(
                                                                thought?.thoughtDescription
                                                            )}
                                                        /> */}
                           
                                                        <div className="action-box">
                                                            <InfoLableShow
                                                                text={`Action Items: ${thought.actionCount}`}
                                                                commonClass="action-btn"
                                                                logo="action"
                                                            />
                                                            <InfoLableShow
                                                                text={`Questions & Answers: ${thought.questionAnswerCount}`}
                                                                commonClass="action-btn"
                                                                logo=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="action-edit-box">
                                                    <EditDeleteButton
                                                        type="button"
                                                        commonClass="edit-btn"
                                                        text="Edit"
                                                        onClick={() =>
                                                            handleUpdateData(
                                                                thought.thoughtId
                                                            )
                                                        }
                                                    />
                                                    <EditDeleteButton
                                                        type="button"
                                                        commonClass="edit-btn"
                                                        text="Delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                thought?.thoughtId
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="progress-box">
                                            <ProgressBar
                                                now={thought.workProgress}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            // <p>No Data Found</p>
                            <div className="actionvector-box">
                                <div className="vector-image">
                                    <img
                                        src={vectorImg}
                                        alt=""
                                        className="img-fluid"
                                        loading="lazy"
                                    />
                                    <p>
                                        You haven’t added challenges over here.
                                    </p>
                                    <p>
                                        <span>
                                            So please create challenges and
                                            completed the your ideas.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Deletemodal
                show={show}
                setShow={setShow}
                currentthough={currentthough}
            />
            <AmitImagePreview
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                imagePrev={imagePrev}
                setImagePrev={setImagePrev}
            />
        </div>
    )
}

export default React.memo(RecentThoughts)
