import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../components/Button'
import OurValueListing from '../../../../components/OurValueListing/OurValueListing'
import { contactus } from '../../../../config/routingConsts'
import { homePageData } from '../../HomepageData'
import { useInView } from 'react-intersection-observer'


const OurValues = ({ keydata }) => {

    const { t } = useTranslation()
    const ourValues = t(keydata, { returnObjects: true })

    const navigate = useNavigate()
    const onConatactUsClickFun = () => {
        navigate(contactus)
    }
    return (
        <div className="ourvalues-area spacer">
            {ourValues.map((valueData) => (
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="ourvalue-title title-text">
                                    <h3>{valueData.heading}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-start align-items-start">
                            <div className="col-lg-4 col-md-12 col-12">
                                <h2
                                    dangerouslySetInnerHTML={{
                                        __html: valueData.header
                                    }}
                                >
                                    {/* What Benefits Can <br /> Be Obtained? */}
                                </h2>
                            </div>
                            <div className="col-lg-6 col-md-12 col-12">
                                <p className="m-0 para">
                                    {valueData.desc}
                                    {/* These benefits can make your work skills better and
                            better. It improves your creativity, empowerment,
                            work force and this complex makes it more simple. */}
                                </p>
                            </div>
                            <div className="col-lg-auto col-md-12 col-12 ms-auto">
                                <div className="contact-btn">
                                    <Button
                                        isLink={false}
                                        addedClass="contact-us"
                                        // text="Contact Us"
                                        text={valueData.btnText}
                                        onClick={onConatactUsClickFun}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-12">
                                <div className="values-whole-box">
                                    <OurValueListing keydata="homeOurValue"  />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </div>
    )
}

export default OurValues
