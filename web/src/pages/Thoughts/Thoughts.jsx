import React, { useCallback, useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { Form, ProgressBar, Dropdown } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { createthought } from '../../config/routingConsts'
import { useSelector, useDispatch } from 'react-redux'
import { thoughListingAction } from '../../Redux/Actions/ThoughAction'

import Deletemodal from '../../components/Deletemodal/Deletemodal'
import Button from '../../components/Button/Button'
import AmitPagination from '../../components/AmitPagination/AmitPagination'
import InfoLableShow from '../../components/Button/InfoLableShow/InfoLableShow'
import EditDeleteButton from '../../components/Button/EditDeleteButton/EditDeleteButton'
import AmitImagePreview from '../../components/AmitImagePreview/AmitImagePreview'
import { Spinner } from 'react-bootstrap/esm'
import { ReactComponent as SearchIcon } from '../../assets/dashboardimg/search.svg'
import { YoptaRenderer } from 'yopta-editor'
import vectorImg from '../../assets/dashboardimg/actionvector.svg'

const Thoughts = () => {
    const { thoughts, thoughtID, loading, error } = useSelector(
        (state) => state.Thought
    )
    const { questionsanswers } = useSelector((state) => state.QueNAns)
    const { actionitems } = useSelector((state) => state.ActionItem)

    let totalToughts = thoughts?.meta?.totalCount

    const { register, handleSubmit } = useForm({ mode: 'all' })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const location = useLocation()

    const [searchChallenge,setSearchChallenge] = useState('')
    let timer
    const handleSearch = (e) =>{
        console.log(timer,"timer")
        if (timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=> {
            setSearchChallenge(e.target.value)
        },300)
        // setSearchChallenge(e.target.value)

    }

    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem('currentpage') || 1
    )
    const [currentthough, setCurrentThought] = useState('')
    const [DataLimit, setDataLimit] = useState(
        localStorage.getItem('pageLimit') || 10
    )

    const [thoughtFilterText, setthoughtFilterText] = useState('')
    const [TotalPagies, setTotalPagies] = useState(1)

    const [SortKey, setSortKey] = useState('')

    useEffect(() => {
        setTotalPagies(Math.ceil(totalToughts / DataLimit))
    }, [totalToughts, DataLimit])
    
    useEffect(() => {
        if ((location.state = 'challenges')) {
            dispatch(
                thoughListingAction({
                    limit: DataLimit,
                    page: currentPage,
                    // search: thoughtFilterText,
                    search : searchChallenge,
                    sortKey: SortKey,
                    sortBy: -1
                })
            )
        } else {
            dispatch(
                thoughListingAction({
                    limit: DataLimit,
                    page: currentPage,
                    // search: thoughtFilterText,
                    search : searchChallenge,
                    sortKey: SortKey,
                    sortBy: -1
                })
            )
        }
    }, [
        DataLimit,
        currentPage,
        SortKey,
        thoughtID,
        location.state,
        searchChallenge,
    ])


    // const pageLoadMore = () =>{
    //     if ((location.state = 'challenges')) {
    //         dispatch(
    //             thoughListingAction({
    //                 limit: DataLimit,
    //                 page: currentPage,
    //                 // search: thoughtFilterText,
    //                 search : searchChallenge,
    //                 sortKey: SortKey,
    //                 sortBy: -1
    //             })
    //         )
    //     } else {
    //         dispatch(
    //             thoughListingAction({
    //                 limit: DataLimit,
    //                 page: currentPage,
    //                 // search: thoughtFilterText,
    //                 search : searchChallenge,
    //                 sortKey: SortKey,
    //                 sortBy: -1
    //             })
    //         )
    //     }
    // }

    // useEffect(()=>{
    //     pageLoadMore()
    // },[DataLimit,
    //         currentPage,
    //         SortKey,
    //         thoughtID,
    //         location.state,
    //         searchChallenge])



    const handleClick = () => {
        navigate(createthought, { state: 'Challenges' })
    }

    const handleUpdateData = (id) => {
        navigate(`${createthought}/${id}`, { state: 'Challenges' })
    }

    const handleDelete = (id) => {
        setCurrentThought(id)
        setShow(true)
    }

    const handleChange = (eventkey) => {
        setDataLimit(eventkey)
        localStorage.setItem('pageLimit', eventkey)
        // setDataLimitLocalStorage(eventkey)
    }

    // const handleChange2 = (e) => {
    //     const getData = setTimeout(() => {
    //         setthoughtFilterText(e.target.value)
    //     }, 1000)
    //     clearInterval()
    // }

    const handleChangePage = useCallback(
        (currentPage) => {
            setCurrentPage(currentPage)
            localStorage.setItem('currentpage', JSON.stringify(currentPage))
        },
        [currentPage]
    )
    useEffect(() => {
        // setCurrentPage(currentPage > TotalPagies ? TotalPagies : currentPage);
        setCurrentPage(1)
    }, [TotalPagies])

    const onSubmit = (e, data) => {
        e.preventDefault()
    }

    const [imagePrev, setImagePrev] = useState('')
    const handlePreviewShow = (imagepath) => {
        setImagePrev(imagepath)
        setShowPreview(true)
    }
    return (
        <>
            <div className="side-pagecontent recentthought-page">
                <div className=" scrollbar">
                    <div className="card">
                        <div className="header-box">
                            <div className="title-text">
                                <h2>Challenges List</h2>
                            </div>
                            {/* {!loading && ( */}
                                <div className="head-btnbox">
                                    {/* {!thoughts?.data?.length === 0 && (
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <Form.Group
                                                className="mb-0 "
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Control
                                                    className="icontrol"
                                                    type="text"
                                                    placeholder="search"
                                                    name="thoughtSearch"
                                                    // {...register(
                                                    //     'thoughtSearch',
                                                    //     {
                                                    //         onChange: (e) => {
                                                    //             handleChange2(e)
                                                    //         }
                                                    //     }
                                                    // )}
                                                />
                                            </Form.Group>
                                        </Form>
                                    )} */}
                                    <div className="lang-account-box search-box challange-list">
                                        <Form.Group
                                            className="formbox"
                                            controlId="formBasicEmail"
                                        >
                                            <Form.Control
                                                type="search"
                                                placeholder="Search"
                                                className="icontrol"
                                                // value={searchChallenge}
                                                onChange={handleSearch}
                                            />
                                            <div className="search-icon">
                                                <SearchIcon />
                                            </div>
                                        </Form.Group>
                                    </div>

                                    <Button
                                        isLink={false}
                                        logoClass="plus"
                                        addedClass="thought-btn"
                                        text="Create Challenge"
                                        onClick={() => handleClick()}
                                    />
                                </div>
                            {/* )} */}
                        </div>
                        <div className="card-body thoughtcard-body">
                            <div className="card-wholebox">
                                {thoughts && thoughts?.data?.length > 0 ? (
                                    loading ? (
                                        <span
                                            style={{
                                                marginLeft: '600px',
                                                marginTop: '80px',
                                                marginBottom: '80px'
                                            }}
                                        >
                                            <Spinner
                                                animation="border"
                                                color="#198754"
                                            />
                                        </span>
                                    ) : (
                                        thoughts.data.map((thought, i) => {
                                            return (
                                                <div
                                                    className="card thoughtcard"
                                                    key={i}
                                                >
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
                                                                        onClick={() => {
                                                                            handlePreviewShow(
                                                                                thought.thoughtImage
                                                                            )
                                                                        }}
                                                                        style={{
                                                                            cursor: 'pointer'
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="thought-content">
                                                                    <Link
                                                                        // state="Thoughts"
                                                                        state="Challenges"
                                                                        to={`${thought.thoughtId}`}
                                                                        style={{
                                                                            textDecoration:
                                                                                'none'
                                                                        }}
                                                                    >
                                                                        <h4>
                                                                            {
                                                                                thought.thoughtName
                                                                            }
                                                                        </h4>
                                                                    </Link>
                                                                    {/* <p>
                                                                        {
                                                                            thought.thoughtDescription
                                                                        }
                                                                    </p> */}

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
                                                                            text={`Action Items: ${thought.actionCount}`}
                                                                            commonClass="action-btn"
                                                                            logo="action"
                                                                        />
                                                                        <InfoLableShow
                                                                            text={`Questions & Answers:${thought.questionAnswerCount}`}
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
                                                                            thought.thoughtId
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="progress-box">
                                                        <ProgressBar
                                                            now={
                                                                thought.workProgress
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )
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
                                        <p> You haven’t added challenges over here.</p>
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
                        {/* Pagination Section Start */}
                        {loading ||
                            (thoughts?.meta?.totalCount >= 1 && (
                                <div className="card thought-pagination">
                                    <div className="card-body">
                                        <div className="showing-pages">
                                            <p className="m-0">
                                                Showing{' '}
                                                {(currentPage - 1) * DataLimit +
                                                    1}{' '}
                                                to{' '}
                                                {Math.min(
                                                    currentPage * DataLimit,
                                                    totalToughts
                                                )}{' '}
                                                of {totalToughts} Challenges{' '}
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
                                                        backgroundColor:
                                                            'rgba(250, 85, 96, 0.1)'
                                                    }}
                                                >
                                                    {DataLimit}
                                                    {/* {JSON.parse(localStorage.getItem("pageLimit"))} */}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    style={{
                                                        backgroundColor:
                                                            'rgba(250, 85, 96, 0.1)'
                                                    }}
                                                >
                                                    <Dropdown.Item eventKey="10">
                                                        10
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="15">
                                                        15
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="20">
                                                        20
                                                    </Dropdown.Item>
                                                    {/* <Dropdown.Item eventKey="25">
                                                        25
                                                    </Dropdown.Item> */}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        <AmitPagination
                                            total={TotalPagies}
                                            current={currentPage}
                                            onChangePage={handleChangePage}
                                        />
                                        {/* <Button onClick={pageLoadMore}>Load More</Button> */}
                                    </div>
                                </div>
                            ))}
                        {/* Pagination Section End */}
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
        </>
    )
}

export default Thoughts
