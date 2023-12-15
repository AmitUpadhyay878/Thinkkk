import React from 'react'
import { Button } from 'react-bootstrap'

const Pricing = () => {
    return (
        <div className="pricing-area spacer">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="pricing-title title-text text-center">
                            <h3>Pricing</h3>
                            <h2>Choose The Best Plan For You</h2>
                        </div>
                    </div>
                </div>
                <div className="pricing-planbox">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-12 g-0">
                            <div className="pricing-card free-plan card">
                                <div className="pricing-cardbody card-body">
                                    <div
                                        className="card-title"
                                        style={{ color: '$primary' }}
                                    >
                                        Free Plan
                                    </div>
                                    <div className="card-price">
                                        $0<span>/ Per Life</span>
                                    </div>
                                    <hr className="green-border" />
                                    <ul className="price-listing">
                                        <li>Up to 2 Thoughts </li>
                                        <li> No Support</li>
                                        <li>Limited Statistic</li>
                                    </ul>
                                    <div className="choose-btn">
                                        <Button
                                            text="Choose Plan"
                                            isLink={true}
                                            commonClass="common-btn"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-12 g-0">
                            <div className="pricing-card yearly-plan card">
                                <div className="pricing-cardbody card-body">
                                    <div className="card-title">Free Plan</div>
                                    <div className="card-price">
                                        $0<span>/ Per Life</span>
                                    </div>
                                    <hr className="green-border" />
                                    <ul className="price-listing">
                                        <li>Up to 2 Thoughts </li>
                                        <li> No Support</li>
                                        <li>Limited Statistic</li>
                                    </ul>
                                    <div className="choose-btn">
                                        <Button
                                            text="Choose Plan"
                                            isLink={true}
                                            commonClass="common-btn"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-12 g-0">
                            <div className="pricing-card monthly-plan card">
                                <div className="pricing-cardbody card-body">
                                    <div className="card-title">Free Plan</div>
                                    <div className="card-price">
                                        $0<span>/ Per Life</span>
                                    </div>
                                    <hr className="green-border" />
                                    <ul className="price-listing">
                                        <li>Up to 2 Thoughts </li>
                                        <li> No Support</li>
                                        <li>Limited Statistic</li>
                                    </ul>
                                    <div className="choose-btn">
                                        <Button
                                            text="Choose Plan"
                                            isLink={true}
                                            commonClass="common-btn"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing
