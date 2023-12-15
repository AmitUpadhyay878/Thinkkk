import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../components/Button'
import OurValueListing from '../../../../components/OurValueListing/OurValueListing'
import { contactus } from '../../../../config/routingConsts'
import { pricingData } from '../../PricingData'

const OurValue = () => {
    const {t} = useTranslation()
    const pricingOurValues = t('pricingOurValues',{returnObjects:true})

    const navigate = useNavigate()
    const onConatactUsClickFun = () => {
        navigate(contactus)
    }

    return (
        <div className="ourvalues-area spacer">
            {pricingOurValues.map((pov)=>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="ourvalue-title title-text">
                            <h3>{pov.heading}</h3>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-start align-items-center">
                    <div className="col-lg-4 col-md-12 col-12">
                        <h2 dangerouslySetInnerHTML={{__html: pov.header}}>
                            
                        </h2>
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                        <p className="m-0 para">
                            {pov.desc}
                        </p>
                    </div>
                    <div className="col-lg-auto col-md-12 col-12 ms-auto">
                        <div className="contact-btn">
                            <Button isLink={false} text={pov.btnText} onClick={onConatactUsClickFun}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="values-whole-box">
                            <OurValueListing keydata="pricingOurValues" />
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default OurValue
