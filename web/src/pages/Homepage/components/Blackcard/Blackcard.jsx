import React from 'react'
import blackcardImg from '../../../../assets/images/freecard.png'
import Button from '../../../../components/Button'
const Blackcard = () => {
    return (
        <div className="blackcard-area spacer">
            <div className="container">

                <div className="row">
                    <div className="col-12">
                        <div className="card-image">
                            <img src={blackcardImg} alt="" className='img-fluid' />
                            <div className="card-content">
                                <h4>It’s free always has been, and always will be.</h4>
                                <div className="thought-btn">
                                    <Button text="Let’s Start Challenges" commonClass="common-btn" isLink={true}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blackcard
