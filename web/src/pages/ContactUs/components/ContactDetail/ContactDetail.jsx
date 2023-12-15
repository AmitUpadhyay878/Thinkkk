import React from 'react'
import OurValueListing from '../../../../components/OurValueListing/OurValueListing'
import { ContactUsData } from '../../Data/ContactUsData'

const ContactDetail = () => {
    return (
        <div>
            <div className="outcorevalue-area ourvalues-area spacer">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="values-whole-box">
                                <OurValueListing  keydata="contactcardList"/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ContactDetail
