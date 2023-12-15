import React from 'react'
import CommonBanner from '../../components/CommonBanner'
import ContactDetail from './components/ContactDetail'
import GetinTouch from './components/GetinTouch/GetinTouch'
import { ContactUsData } from './Data/ContactUsData'


const ContactUs = () => {
  return (
    <div className='innercontact-page'>
      <CommonBanner keydata="contactcommonbanner"/>
      <ContactDetail />
      <GetinTouch />
    </div>
  )
}

export default ContactUs