import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Button from '../../../../components/Button';


const AskQuestion = () => {
    return (
        <div className="askquestion-area spacer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-12 col-12">
                        <div className="quest-title title-text">
                            <h3>Ask Questions</h3>
                            <h2>Frequently Asked <br /> Questions</h2>
                            <p>It is very simply steps to express the thought and
                                creativity. You can manage your work well in this</p>
                            <div className="contact-btn">
                                <Button text="Contact Us" isLink={false} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-12 col-12">
                        <Accordion className='faq-accordion'>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Can I Make Presentations in the Thinkkk?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel rerum delectus illum odio labore tempore aliquam exercitationem incidunt, dolorem, corporis nulla eveniet at provident non molestias quasi accusamus maxime eum.</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>How Do I Cancel My Subscription or Delete My Account?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam culpa dolorum magni, praesentium ipsa ea cupiditate facere id, facilis, voluptatem ratione provident voluptatum omnis sequi molestias est doloribus voluptatibus quis?</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Can Basic Users Collaborate With Paying Users?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam culpa dolorum magni, praesentium ipsa ea cupiditate facere id, facilis, voluptatem ratione provident voluptatum omnis sequi molestias est doloribus voluptatibus quis?</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>How can I be sure that my designs are private?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam culpa dolorum magni, praesentium ipsa ea cupiditate facere id, facilis, voluptatem ratione provident voluptatum omnis sequi molestias est doloribus voluptatibus quis?</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>How can I be sure that my designs are private?</Accordion.Header>
                                <Accordion.Body>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam culpa dolorum magni, praesentium ipsa ea cupiditate facere id, facilis, voluptatem ratione provident voluptatum omnis sequi molestias est doloribus voluptatibus quis?</p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AskQuestion
