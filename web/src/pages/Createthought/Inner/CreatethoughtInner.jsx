import React, { useState, useEffect, Suspense } from 'react'
import { Tab, Tabs, ProgressBar } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { createthought } from '../../../config/routingConsts'
import { useDispatch, useSelector } from 'react-redux'
import calendarIcon from '../../../assets/dashboardimg/calendar.png'
import { ReactComponent as BackarrowIcon } from '../../../assets/dashboardimg/backarrow.svg'
import { formatDateToMonthShortwithFormate } from '../../../util/common'
import Visualization from './components/Visualization'
import InfoLableShow from '../../../components/Button/InfoLableShow/InfoLableShow'
import { thoughViewAction } from '../../../Redux/Actions/ThoughAction'
import AmitImagePreview from '../../../components/AmitImagePreview/AmitImagePreview'
import Deletemodal from '../../../components/Deletemodal/Deletemodal'
import Button from '../../../components/Button/Button'
import { toast } from 'react-toastify'
import Facts from './components/Facts/Facts'
import Journal from './components/Journal'
import { YoptaRenderer } from 'yopta-editor'
import request from '../../../util/request'
import EditDeleteButton from '../../../components/Button/EditDeleteButton/EditDeleteButton'
const QuestionsandAnswers = React.lazy(() =>
    import('./components/QuestionsandAnswers')
)
const ActionItem = React.lazy(() => import('./components/ActionItem'))

const CreatethoughtInner = () => {
    const dispatch = useDispatch()
    const { thoughtId } = useParams()
    const {state} = useLocation()
    const navigate = useNavigate()
    const { questionsanswers } = useSelector((state) => state.QueNAns)
    const { actionitems } = useSelector((state) => state.ActionItem)
    const { thought, error, thoughts } = useSelector((state) => state.Thought)

    const [activeTab, setActiveTab] = useState('VisualizationTab')
    const [delShow, setDelShow] = useState(false)
    const [currentthough, setCurrentThough] = useState(null)

    useEffect(()=>{
        if(["ActionItemsTab",         
            "Facts",
            "Journal",
            "QuestionAnswerTab",
            "VisualizationTab"].includes(state)){
                setActiveTab(state)
            }
    },[state])


    useEffect(() => {
        if (error) {
          toast.error(error)
            navigate('/challenges', { state: 'challenges' })
        }
    }, [error])

   
    useEffect(() => {
        dispatch(thoughViewAction({ thoughtId: thoughtId }))
    }, [thoughtId])

    const [mathcID, setMatchId] = useState()

    useEffect(() => {
        request('POST', `/thought/list`, {}, {}, true).then((res) =>
            setMatchId(res?.data?.data)
        )
    }, [])

    //////  view thought 
    function viewActionADta() {
        dispatch(thoughViewAction({ thoughtId: thoughtId }))
    }
   
    ///// end view thought 



    const handleDelete = (id) => {
        setCurrentThough(id)
        setDelShow(true)
    }

    const handleEditThought = () => {
        navigate(`${createthought}/${thoughtId}`, { state: 'challenges' })
    }

    const [showPreview, setShowPreview] = useState(false)
    const [imagePrev, setImagePrev] = useState('')
    const handlePreviewShow = (imagepath) => {
        setImagePrev(imagepath)
        setShowPreview(true)
    }

    return (
        <>
            <div className="createthoughtinner-page settings-page">
                <div className="side-pagecontent createthought-page ">
                    <div className="card create-thought">
                        <div className="arrow-titlebox">
                            <div
                                className="back-arrow"
                                onClick={() => navigate(-1)}
                            >
                                <BackarrowIcon />
                            </div>
                            <div className="edit-delete-box">
                                {/* <Button
                                    isLink={false}
                                    text="Edit"
                                    onClick={handleEditThought}
                                />
                                <Button
                                    isLink={false}
                                    text="Delete"
                                    onClick={() => handleDelete(thoughtId)}
                                /> */}
                                <Deletemodal
                                    show={delShow}
                                    setShow={setDelShow}
                                    currentthough={currentthough}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-body createthought-body">
                        <div className=" scrollbar">
                            <div className="thoughtcard-body">
                                <div className="card-wholebox">
                                    <div className="card thoughtcard">
                                        <div className="card-body">
                                            <div className="thought-main-box">
                                                <div className="image-content-box">
                                                    <div className="thought-image">
                                                        <img
                                                            src={
                                                                thought?.thoughtImage
                                                            }
                                                            alt=""
                                                            className="img-fluid"
                                                            onClick={() =>
                                                                handlePreviewShow(
                                                                    thought?.thoughtImage
                                                                )
                                                            }
                                                            style={{
                                                                cursor: 'pointer'
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="thought-content">
                                                        <h4>
                                                            {
                                                                thought?.thoughtName
                                                            }
                                                        </h4>

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
                                                        <div className="action-box">
                                                            <InfoLableShow
                                                                text={`Action Items: ${thought?.actionCount}`}
                                                                commonClass="action-btn"
                                                                logo="action"
                                                            />
                                                            <InfoLableShow
                                                                text={`Questions & Answers: ${questionsanswers?.length}`}
                                                                commonClass="action-btn"
                                                                logo=""
                                                            />
                                                        </div>

                                                        <div className="action-edit-box">
                                                                <EditDeleteButton
                                                                    type="button"
                                                                    commonClass="edit-btn"
                                                                    text="Edit"
                                                                    onClick={handleEditThought}
                                                                />
                                                                <EditDeleteButton
                                                                    type="button"
                                                                    commonClass="edit-btn"
                                                                    text="Delete"
                                                                    onClick={() => handleDelete(thoughtId)}
                                                                />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="date-card">
                                            <span>
                                                <img
                                                    src={calendarIcon}
                                                    alt=""
                                                />
                                            </span>
                                            <p>
                                                {formatDateToMonthShortwithFormate(
                                                    thought?.createdAt
                                                )}
                                            </p>
                                        </div>
                                        <div className="progress-box">
                                            <ProgressBar
                                                now={thought?.workProgress}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card thought-actioncard">
                        <div className="card-body">
                            <Tabs
                                onSelect={(k) => setActiveTab(k)}
                                activeKey={activeTab}
                                id="uncontrolled-tab-example"
                                className=" setiing-tabs"
                            >
                                <Tab
                                    eventKey="VisualizationTab"
                                    title="Visualization"
                                >
                                    <div className="visual-box">
                                        <Visualization
                                            isActiveTab={
                                                activeTab === 'VisualizationTab'
                                            }
                                        />
                                    </div>
                                </Tab>

                                <Tab eventKey="Facts" title="Facts">
                                    <Suspense fallback={<div>Loading ...</div>}>
                                        <Facts
                                            isActiveTab={activeTab === 'Facts'} 
                                        />
                                    </Suspense>
                                </Tab>

                                <Tab
                                    eventKey="QuestionAnswerTab"
                                    title="Questions & Answers"
                                >
                                    <Suspense fallback={<div>Loading ...</div>}>
                                        <QuestionsandAnswers
                                            isActiveTab={
                                                activeTab ===
                                                'QuestionAnswerTab'
                                            }
                                        />
                                    </Suspense>
                                </Tab>

                                <Tab
                                    eventKey="ActionItemsTab"
                                    title="Action Items"
                                >
                                    <Suspense fallback={<div>Loading ...</div>}>
                                        <ActionItem
                                            isActiveTab={
                                                activeTab === 'ActionItemsTab'
                                            }
                                            viewActionADta = {viewActionADta}
                                        />
                                    </Suspense>
                                </Tab>

                                <Tab eventKey="Journal" title="Journal">
                                    <Suspense fallback={<div>Loading ...</div>}>
                                        <Journal
                                            isActiveTab={
                                                activeTab === 'Journal'
                                            }
                                        />
                                    </Suspense>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
            <AmitImagePreview
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                imagePrev={imagePrev}
                setImagePrev={setImagePrev}
            />
        </>
    )
}

export default CreatethoughtInner
