import React from 'react'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'

import signup from '../../../../assets/images/ThinkkkProcess/Signup_new_webp.webp'
import Actionitem from '../../../../assets/images/ThinkkkProcess/Actionitem_new_webp.webp'
import CreateThought from '../../../../assets/images/ThinkkkProcess/CreateThought_new_webp.webp'
import Sharethethought from '../../../../assets/images/ThinkkkProcess/Sharethethought_new_webp.webp'
import { ReactComponent as Step1Img } from '../../../../assets/images/step1.svg'
import { ReactComponent as Step2Img } from '../../../../assets/images/step2.svg'
import { ReactComponent as Step3Img } from '../../../../assets/images/step3.svg'
import { ReactComponent as Step4Img } from '../../../../assets/images/step4.svg'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
const OurWorkflow = () => {

    const {ref, inView} = useInView({
        threshold: 0,
      });
    const { t } = useTranslation()
    const ourWorkFlow = t('ourWorkFlow', { returnObjects: true })
    let obj = {
        0: <Step1Img />,
        1: <Step2Img />,
        2: <Step3Img />,
        3: <Step4Img />
    }
    let sideImage = {
        0: signup,
        1: CreateThought,
        2: Actionitem,
        3: Sharethethought
    }
    const [eventKey, setEventKey] = useState(0)
    return (
        <div className="ourworkflow-area spacer" ref={ref}>
            { inView && ourWorkFlow.map((ourWorkFlowData) => (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="workflow-title title-text text-center">
                                <h3>{ourWorkFlowData.mainHeading}</h3>
                                <h2>{ourWorkFlowData.subHeading}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="work-flow-box">
                        <Tab.Container
                            className=""
                            id="left-tabs-example"
                            activeKey={eventKey}
                        >
                            <Row>
                                <Col lg={6} md={12} sm={12}>
                                    {ourWorkFlowData.btnClickData.map(
                                        (ListData, index) => (
                                            <Tab.Content className="workflow-tabs">
                                                <Tab.Pane eventKey={index}>
                                                    <div className="workflow-image">
                                                        <img
                                                            src={
                                                                sideImage[index]
                                                            }
                                                            className="img-fluid"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        )
                                    )}
                                </Col>

                                <Col lg={6} md={12} sm={12} className="ms-auto">
                                    <Nav
                                        variant="pills"
                                        className="flex-column workflow-pills"
                                    >
                                        {ourWorkFlowData.btnClickData.map(
                                            (ListData, index) => (
                                                <Nav.Item>
                                                    <Nav.Link
                                                        eventKey={index}
                                                        onMouseEnter={(e) => {
                                                            setEventKey(index)
                                                        }}
                                                    >
                                                        <div className="workflow-tab">
                                                            <div className="workflow-no">
                                                                <span>
                                                                    {obj[index]}
                                                                    {/* <Step1Img /> */}
                                                                </span>
                                                            </div>
                                                            <h5>
                                                                {
                                                                    ListData.header5
                                                                }
                                                            </h5>
                                                        </div>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            )
                                        )}
                                    </Nav>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OurWorkflow
