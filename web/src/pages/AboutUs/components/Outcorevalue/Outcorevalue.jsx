import React from 'react'
import { useTranslation } from 'react-i18next'
import OurValueListing from '../../../../components/OurValueListing/OurValueListing'
import { aboutUsData } from '../Data/AboutUsData'

const Outcorevalue = () => {
    const { t } = useTranslation()
    const outcorevalue = t('outcorevalue', { returnObjects: true })
    return (
        <div>
            <div className="outcorevalue-area ourvalues-area spacer">
                {outcorevalue?.map((ovdata) => (
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="outcore-title title-text text-center">
                                    <h3>{ovdata.maintitle}</h3>
                                    <h2>{ovdata.subtitle}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="values-whole-box">
                                    {/* <OurValueListing OVdata={aboutUsData?.OVdata} /> */}
                                    {/* <OurValueListing keydata={ovdata?.cardData} /> */}
                                    <OurValueListing keydata="outcorevalue" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Outcorevalue
