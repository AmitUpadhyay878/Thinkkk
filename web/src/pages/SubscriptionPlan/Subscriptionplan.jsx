import React, { useState, useEffect, useRef, useCallback } from 'react'
import Table from 'react-bootstrap/Table'
import StatusImg from '../../assets/dashboardimg/status.png'
import dfileImg from '../../assets/dashboardimg/downloadfile.png'
import Button from '../../components/Button/Button'
import request from '../../util/request'
import data from '../../components/SuccessStories/Data/SuccessStoryData'
import {
    formatDateToMonthShortwithFormate,
    formatDateToMonthShortwithFormate3,
    formatDateToMonthShortwithFormate4,
    handleCurrency
} from '../../util/common'
import { Modal, Nav, Spinner, Dropdown } from 'react-bootstrap'
import {
    FailureToastNotification,
    SuccessToastNotification
} from '../../components/ToastServerError/ToasterMessage'
import { Navigate, useNavigate } from 'react-router-dom'
import Payment from '../Payment'
import warningImg from '../../assets/images/Warning.png'
import AmitPagination from '../../components/AmitPagination/AmitPagination'

const SubscriptionPlan = () => {
    const [visible, nonVisible] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    const [BC, setBC] = useState()
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const [pdfLoader, setPdfLoader] = useState(false)
    const [invoice, setInvoice] = useState([])
    useEffect(() => {
        nonVisible(false)
    }, [BC])

    const handleClick = () => {
        nonVisible(true)
    }

    // useEffect(() => {
    //     request('POST', `/payment/payment-history`, {}, {}, true)
    //         .then(({ data }) => {
    //             console.log('success data of Subscription plan', data?.data)
    //             setBC(data?.data)
    //             setInvoice(data?.meta?.totalCount)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }, [])
    const [cancelbutton, setCancelButton] = useState('')
    const handleCancleClick = async () => {
        console.log(BC?.subscriptionData?.subscriptionId)
        const payload = {
            subscriptionId: BC?.subscriptionData?.subscriptionId
        }
        setDisableBtn(true)
        request('POST', '/payment/cancel-subscription', payload, {}, true)
            .then(({ data }) => {
                console.log('res', data)
                // setBC(data?.data)
                setCancelButton(data)
                SuccessToastNotification(data?.meta?.message)
                setShow(false)
            })
            .catch((err) => {
                FailureToastNotification(err?.meta?.message)
            })
        setDisableBtn(false)
    }
    useEffect(() => {
        if (cancelbutton) {
            request('POST', `/payment/payment-history`, {}, {}, true).then(
                ({ data }) => {
                    setBC(data?.data)
                }
            )
        }
    }, [cancelbutton])

    const handleUpdateClick = () => {
        setDisableBtn(true)
        const payload = {
            priceId: BC?.subscriptionData?.planId
                ? BC?.subscriptionData?.planId
                : 'price_1MrafDKszSkoNvUGNYX13ahn',
            planName: BC?.plan
            // planId:BC?.subscriptionData?.planId,
            // subscriptionId:BC?.subscriptionData?.subscriptionId
        }
        console.log('payload', payload)
        request('post', '/payment/renew-checkout', payload, {}, true)
            .then((res) => {
                console.log(res?.data?.data?.url, 'URL Check')
                window.open(res?.data?.data?.url, '_self')
                // SuccessToastNotification(res?.data?.meta?.message)
            })
            .catch((err) => {
                FailureToastNotification(err.message)
            })
        setDisableBtn(false)
    }
    const [id, setid] = useState(null)
    const handlePdfLoader = (id) => {
        setPdfLoader(true)
        setid(id)
        setTimeout(() => {
            setPdfLoader(false)
            setid(null)
        }, 2500)
    }

    const handleClose2 = () => {
        setShow(false)
    }

    const cancleModalShow = () => {
        setShow(true)
    }

    // pagination////
    const [currentPage, setCurrentPage] = useState(1)
    const [DataLimit, setDataLimit] = useState(5)
    const [TotalPagies, setTotalPagies] = useState(1)
    useEffect(() => {
        setTotalPagies(Math.ceil(invoice / DataLimit))
    }, [invoice, DataLimit])

    const handleChange = (eventkey) => {
        setDataLimit(eventkey)
    }
    const handleChangePage = useCallback(
        (currentPage) => {
            setCurrentPage(currentPage)
            // localStorage.setItem('currentpage', JSON.stringify(currentPage))
        },
        [currentPage]
    )

    const [SortKey, setSortKey] = useState('')
    const [historyData, setHistoryData] = useState([])
    useEffect(() => {
        request(
            'POST',
            `/payment/payment-history`,
            {
                limit: DataLimit,
                page: currentPage,
                search: '',
                sortKey: SortKey,
                sortBy: -1
            },
            {},
            true
        ).then(({data}) => {
            setHistoryData(data.data.transactionHistoryData)
            setBC(data?.data)
            setInvoice(data?.meta?.totalCount)

        })
    }, [DataLimit, currentPage, SortKey])

    //// end pagination calling//////

    return (
        <>
            <div className="subscriptionplan-page">
                <div className="side-pagecontent recentthought-page">
                    <div className="recent-thoughtbox scrollbar">
                        <div className="card">
                            <div className="header-box">
                                <div className="title-text">
                                    <h2>Plan Details</h2>
                                </div>
                            </div>
                            <div className="card-body">
                                {BC ? (
                                    <>
                                        <div className="card subs-card ">
                                            <div className="card-title">
                                                Active Subscription
                                            </div>
                                            <hr className="my-0" />
                                            <div className="card-body">
                                                <div className="subscription-box">
                                                    <div className="yearly-plan">
                                                        {/* <h4>
                                                            {' '}
                                                            {[
                                                                'Free',
                                                                'Cancelled'
                                                            ].includes(BC.plan)
                                                                ? 'Free'
                                                                : 'Yearly'}{' '}
                                                            Plan{' '}
                                                        </h4>
                                                        
                                                        const scoreRating =
                                                            score > 70
                                                                ? "Excellent"
                                                                : score > 50
                                                                ? "Average"
                                                                : "Do better"
                                                        
                                                        */}
                                                        <h4>
                                                            {['Active','Cancelled'].includes(BC.plan) ? "Yearly":"Free"} Plan
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div className="cancel-subs-list active-plan-list">
                                                    {/* {[
                                                        'Free',
                                                        'Cancelled'
                                                    ].includes(BC.plan) ? (
                                                        <>
                                                            <div className="cancel-subs">
                                                                <span>
                                                                    You are
                                                                    eligible for
                                                                    following
                                                                    features.
                                                                </span>
                                                                <div className="feature-list">
                                                                    <ul>
                                                                        <li>
                                                                            One
                                                                            Challenge
                                                                        </li>
                                                                        <li>
                                                                            5
                                                                            Facts
                                                                        </li>
                                                                        <li>
                                                                            20
                                                                            Questions
                                                                            &
                                                                            Answers
                                                                        </li>
                                                                        <li>
                                                                            20
                                                                            Action
                                                                            Items
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="cancel-subs">
                                                                <span>
                                                                    You can get following features by upgrading your current plan.
                                                                </span>
                                                                <div className="feature-list">
                                                                    <ul>
                                                                        <li>
                                                                            Unlimited
                                                                            Challenges
                                                                        </li>
                                                                        <li>
                                                                            Unlimited
                                                                            Facts
                                                                        </li>
                                                                        <li>
                                                                            Unlimited
                                                                            Questions
                                                                            &
                                                                            Answers
                                                                        </li>
                                                                        <li>
                                                                            Unlimited
                                                                            Action
                                                                            Items
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                               
                                                                <Button
                                                                    isLink={
                                                                        false
                                                                    }
                                                                    commonClass="common-btn"
                                                                    type="button"
                                                                    onClick={handleUpdateClick}
                                                                    disabled={disableBtn}
                                                                    text={
                                                                        disableBtn
                                                                            ? 'Please Wait...'
                                                                            :'Upgrade Now'
                                                                    }
                                                                />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>
                                                                your
                                                                subscription
                                                                will get expired
                                                                on{' '}
                                                                {formatDateToMonthShortwithFormate3(
                                                                    BC
                                                                        ?.subscriptionData
                                                                        ?.endDate
                                                                )}
                                                                . It will get
                                                                renewed
                                                                automatically
                                                            </span>

                                                            <Button
                                                                isLink={false}
                                                                commonClass="common-btn"
                                                                type="button"
                                                                onClick={cancleModalShow}
                                                                disabled={
                                                                    disableBtn
                                                                }
                                                                text={
                                                                    disableBtn
                                                                        ? 'Please Wait...'
                                                                        : 'Cancel Subscription'
                                                                }
                                                            />
                                                        </>
                                                    )} */}

                                                    {BC?.plan === "Free" ? 
                                                         <>
                                                         <div className="cancel-subs">
                                                             <span>
                                                                 You are
                                                                 eligible for
                                                                 following
                                                                 features.
                                                             </span>
                                                             <div className="feature-list">
                                                                 <ul>
                                                                     <li>
                                                                         One
                                                                         Challenge
                                                                     </li>
                                                                     <li>
                                                                         5
                                                                         Facts
                                                                     </li>
                                                                     <li>
                                                                         20
                                                                         Questions
                                                                         &
                                                                         Answers
                                                                     </li>
                                                                     <li>
                                                                         20
                                                                         Action
                                                                         Items
                                                                     </li>
                                                                 </ul>
                                                             </div>
                                                         </div>
                                                         <div className="cancel-subs">
                                                             <span>
                                                                 You can get following features by upgrading your current plan.
                                                             </span>
                                                             <div className="feature-list">
                                                                 <ul>
                                                                     <li>
                                                                         Unlimited
                                                                         Challenges
                                                                     </li>
                                                                     <li>
                                                                         Unlimited
                                                                         Facts
                                                                     </li>
                                                                     <li>
                                                                         Unlimited
                                                                         Questions
                                                                         &
                                                                         Answers
                                                                     </li>
                                                                     <li>
                                                                         Unlimited
                                                                         Action
                                                                         Items
                                                                     </li>
                                                                 </ul>
                                                             </div>
                                                            
                                                             <Button
                                                                 isLink={
                                                                     false
                                                                 }
                                                                 commonClass="common-btn"
                                                                 type="button"
                                                                 onClick={handleUpdateClick}
                                                                 disabled={disableBtn}
                                                                 text={
                                                                     disableBtn
                                                                         ? 'Please Wait...'
                                                                         :'Upgrade Now'
                                                                 }
                                                             />
                                                         </div>
                                                     </>
                                                    : BC?.plan === "Cancelled" ? <>
                                                        <span>
                                                                your
                                                                subscription
                                                                will get expired
                                                                on{' '}
                                                                {formatDateToMonthShortwithFormate3(
                                                                    BC
                                                                        ?.subscriptionData
                                                                        ?.endDate
                                                                )}
                                                                . It will get
                                                                renewed
                                                                automatically
                                                            </span>
                                                            <label style={{color:"red"}}>You have cancelled your subscription from next billing cycle.</label>
                                                    </>:
                                                    <>
                                                    <span>
                                                       your
                                                       subscription
                                                       will get expired
                                                       on{' '}
                                                       {formatDateToMonthShortwithFormate3(
                                                           BC
                                                               ?.subscriptionData
                                                               ?.endDate
                                                       )}
                                                       . It will get
                                                       renewed
                                                       automatically
                                                   </span>
                                                   <Button
                                                       isLink={false}
                                                       commonClass="common-btn"
                                                       type="button"
                                                       onClick={cancleModalShow}
                                                       disabled={
                                                           disableBtn
                                                       }
                                                       text={
                                                           disableBtn
                                                               ? 'Please Wait...'
                                                               : 'Cancel Subscription'
                                                       }
                                                   />
                                                   </>         
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        {BC.plan === 'Free' ? (
                                            ''
                                        ) : (
                                            <>
                                                <div className="card subs-card invoice">
                                                    <div className="card-title">
                                                        Billing History
                                                    </div>
                                                    <hr className="my-0" />
                                                    <div className="card-body">
                                                        <Table
                                                            responsive
                                                            className="billing-table"
                                                        >
                                                            <thead>
                                                                <tr>
                                                                    <th>
                                                                        Product
                                                                    </th>
                                                                    <th>
                                                                        Date
                                                                    </th>
                                                                    <th>
                                                                        Amount
                                                                    </th>
                                                                    <th>
                                                                        Payment
                                                                        Method
                                                                    </th>
                                                                    <th>
                                                                        Status
                                                                    </th>
                                                                    <th>
                                                                        Download
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {/* {BC?.transactionHistoryData?.map( */}
                                                                {historyData.map(
                                                                    (
                                                                        h,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <>
                                                                                {' '}
                                                                                <tr>
                                                                                    <td>
                                                                                        {
                                                                                            h?.productName
                                                                                        }
                                                                                    </td>
                                                                                    {h.startDate && (
                                                                                        <td>
                                                                                            {formatDateToMonthShortwithFormate4(
                                                                                                h?.startDate
                                                                                            )}
                                                                                        </td>
                                                                                    )}
                                                                                    <td>
                                                                                        {
                                                                                            h?.amount
                                                                                        }{' '}
                                                                                        {h?.currency.toUpperCase()}
                                                                                        {/* {h?.currency === "eur" ? "€" : "$"}  */}
                                                                                        {/* {h?.currency &&
                                                                            handleCurrency(
                                                                                h?.currency
                                                                            )} */}
                                                                                    </td>
                                                                                    <td className="space">
                                                                                        {
                                                                                            h?.paymentType
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        <div className="status-icon">
                                                                                            {/* {h?.subscriptionStatus ==
                                                                                            'active' ? (
                                                                                                <p>
                                                                                                    Active
                                                                                                </p>
                                                                                            ) : (
                                                                                                <p>
                                                                                                    Inactive
                                                                                                </p>
                                                                                            )} */}

                                                                                            {[
                                                                                                'active',
                                                                                                'Cancelled'
                                                                                            ].includes(BC.plan)
                                                                                                ? 'Active'
                                                                                                : 'InActive'}
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <div className="download-btn">
                                                                                            <Nav.Link
                                                                                                as="a"
                                                                                                className="filed"
                                                                                                href={
                                                                                                    h?.invoiceUrl
                                                                                                }
                                                                                                rel="noopener noreferrer"
                                                                                                download={
                                                                                                    h?.invoiceUrl
                                                                                                }
                                                                                                onClick={() =>
                                                                                                    handlePdfLoader(
                                                                                                        h?.transactionId
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {pdfLoader &&
                                                                                                id ===
                                                                                                    h?.transactionId ? (
                                                                                                    <Spinner
                                                                                                        as="span"
                                                                                                        animation="border"
                                                                                                        size="sm"
                                                                                                        role="status"
                                                                                                        aria-hidden="true"
                                                                                                    />
                                                                                                ) : (
                                                                                                    <img
                                                                                                        src={
                                                                                                            dfileImg
                                                                                                        }
                                                                                                        alt=""
                                                                                                    />
                                                                                                )}
                                                                                            </Nav.Link>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </>
                                                                        )
                                                                    }
                                                                )}
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    // 'Please Wait...!!!'
                                    // <span
                                    //     style={{
                                    //         marginLeft: '600px',
                                    //         marginTop: '80px',
                                    //         marginBottom: '80px'
                                    //     }}
                                    // >
                                    //     <Spinner
                                    //         animation="border"
                                    //         color="#198754"
                                    //     />
                                    // </span>
                                    <span className='global-loader'>
                                        <Spinner
                                            animation="border"
                                            color="#198754"
                                        />
                                    </span>
                                )}
                            </div>
                            {/* addd pagination */}
                            {invoice >= 1 && (
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
                                                    invoice
                                                )}{' '}
                                                of {invoice} Invoice{' '}
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
                                                >
                                                    {DataLimit}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                    style={{
                                                        backgroundColor: 'green'
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
                                        <AmitPagination
                                            total={TotalPagies}
                                            current={currentPage}
                                            onChangePage={handleChangePage}
                                        />
                                    </div>
                                </div>
                            )}
                            {/* End pagination */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancle Modal */}

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="delete-modal"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Body>
                    <div className="detelemodal-box">
                        <div className="delete-image">
                            <img src={warningImg} alt="" loading="lazy" />
                        </div>
                        <h4>
                            Are you sure you would like to cancel the
                            subscription? Once you cancel your subscription,
                            money will not get refunded for the plan you have
                            purchased.
                        </h4>
                        <div className="quescbtn-box dismiss-modal">
                            <Button
                                text="Yes"
                                addedClass="yes"
                                onClick={handleCancleClick}
                            />
                            <Button
                                text="No"
                                addedClass="no"
                                onClick={handleClose2}
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default SubscriptionPlan
