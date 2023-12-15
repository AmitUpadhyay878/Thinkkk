import axios from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as RightarrowIcon } from '../../assets/images/rightarrow.svg'
import { signup } from '../../config/routingConsts'
import { useInView } from 'react-intersection-observer'

const PricePlanes = () => {
    const { ref, inView } = useInView({
        threshold: 0
    })

    const { t } = useTranslation()
    const pricePlan = t('pricePlan', { returnObjects: true })
    const navigate = useNavigate()

    return (
        <div className="pricing-area spacer" ref={ref}>
            {inView &&
                pricePlan.map((dataMap) => (
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="pricing-title title-text text-center">
                                    <h3>{dataMap.mainheading}</h3>
                                    <h2>{dataMap.subHeading}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="pricing-planbox">
                            {dataMap.freePlanData.map((cdData) => (
                                <div className="row justify-content-center">
                                    <div className="col-lg-auto col-md-12 col-12 g-0">
                                        <div className="pricing-card free-plan card ">
                                            <div className="pricing-cardbody card-body">
                                                <div
                                                    className="card-title"
                                                    style={{
                                                        color: '$primary'
                                                    }}
                                                >
                                                    {/* Free Plan */}
                                                    {cdData.heading}
                                                </div>
                                                <div
                                                    className="card-price"
                                                    dangerouslySetInnerHTML={{
                                                        __html: cdData.monthData
                                                    }}
                                                ></div>
                                                <hr className="green-border" />
                                                <ul className="price-listing">
                                                    {cdData.liData.map((l) => (
                                                        <li>{l.ldata}</li>
                                                    ))}
                                                    {/* <li>One Challenge</li>
                                        <li>5 Facts</li>
                                        <li>20 Questions & Answers</li>
                                        <li>20 Action Items</li> */}
                                                </ul>
                                                <div className="choose-btn">
                                                    <button
                                                        className="common-btn"
                                                        onClick={() =>
                                                            navigate(signup)
                                                        }
                                                    >
                                                        {cdData.btnText}
                                                        <span>
                                                            <RightarrowIcon />
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {dataMap.yearPlanData.map((yearData) => (
                                        <div className="col-lg-auto col-md-12 col-12 g-0">
                                            <div className="pricing-card  card">
                                                <div className="pricing-cardbody card-body">
                                                    <div className="card-title">
                                                        {yearData.heading}
                                                    </div>
                                                    <div
                                                        className="card-price"
                                                        dangerouslySetInnerHTML={{
                                                            __html: yearData.yearData
                                                        }}
                                                    >
                                                        {/* $25<span>/ Per Year</span> */}
                                                    </div>
                                                    <hr className="green-border" />
                                                    <ul className="price-listing">
                                                        {yearData.liData.map(
                                                            (l) => (
                                                                <li>
                                                                    {l.ldata}
                                                                </li>
                                                            )
                                                        )}
                                                        {/* <li>Unlimited Challenges</li>
                                        <li>Unlimited Facts</li>
                                        <li>Unlimited Questions & Answers</li>
                                        <li>Unlimited Action Items</li> */}
                                                    </ul>
                                                    <div className="choose-btn">
                                                        <button
                                                            className="common-btn"
                                                            onClick={() =>
                                                                navigate(
                                                                    signup,
                                                                    {
                                                                        state: 'price_1MshPOKszSkoNvUGsWyJwKI1'
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            {yearData.btnText}
                                                            <span>
                                                                <RightarrowIcon />
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* <div className="col-lg-4 col-md-12 col-12 g-0">
                            <div className="pricing-card monthly-plan card">
                                <div className="pricing-cardbody card-body">
                                    <div
                                        className="card-title"
                                        style={{ color: '$primary' }}
                                    >
                                        Monthly Plan
                                    </div>
                                    <div className="card-price">
                                        $29<span>/ Per Month</span>
                                    </div>
                                    <hr className="green-border" />
                                    <ul className="price-listing">
                                        <li>Up to 30 Thoughts </li>
                                        <li> Monthly Support</li>
                                        <li>Unlimited Statistic</li>
                                    </ul>
                                    <div className="choose-btn">
                                        <button className="common-btn">
                                            Choose Plan{' '}
                                            <span>
                                                <RightarrowIcon />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default PricePlanes
