import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import blackcardImg from '../../assets/images/freecard.png'
import { signin } from '../../config/routingConsts'
import Button from '../Button'

const CommonCard = () => {
    const {t} = useTranslation()
    const commonCard = t('commonCard',{returnObjects:true})
    const navigate= useNavigate()
    return (
        <div className="blackcard-area spacer">
            <div className="container">

                <div className="row">
                    <div className="col-12">
                        <div className="card-image">
                            <img src={blackcardImg} alt="" className='img-fluid' />
                            {commonCard.map((cardData)=>
                            <div className="card-content">
                                <h4>{cardData.title}</h4>
                                <div className="thought-btn">
                                    <Button isLink={true} text={cardData.btnText} onClick={()=>navigate(signin)} />
                                </div>
                            </div> )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CommonCard)
