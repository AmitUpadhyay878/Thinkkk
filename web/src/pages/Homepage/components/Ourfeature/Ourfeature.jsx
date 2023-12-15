import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signin } from '../../../../config/routingConsts'
import featureprocessImg from '../../../../assets/images/feature-process_webp.webp'
import Button from '../../../../components/Button'
import { useTranslation } from 'react-i18next'

const Ourfeature = () => {
    const navigate = useNavigate()
    const {t} = useTranslation()
    const ourFeatures = t('ourFeatures',{returnObjects:true})
    return (
        <div className="ourfeature-area spacer">
            <div className="container">
                {ourFeatures.map((OFdata)=>


                <div className="row">
                    <div className="col-lg-4 col-md-12 col-12">
                        <div className="feature-title title-text">
                            <h3>{OFdata.mainheading}</h3>
                            <h2 dangerouslySetInnerHTML={{__html: OFdata.subHeading}}>
                                
                            </h2>
                            <p>
                               {OFdata.paraDec}
                            </p>
                            <div className="feature-btn">
                                <Button
                                    isLink={true}
                                    text={OFdata.btnText}
                                    onClick={() => navigate(signin)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12 col-12">
                        <div className="fprocess-image">
                            <img
                                data-src={featureprocessImg}
                                className="lazyload img-fluid"
                                alt="featureprocess"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div> )}
            </div>
        </div>
    )
}

export default Ourfeature
