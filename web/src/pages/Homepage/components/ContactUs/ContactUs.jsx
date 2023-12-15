import React from "react";
import { useTranslation } from "react-i18next";
import patternImg from "../../../../assets/images/pattern.png";
import ContactInfo from "../../../../components/ContactInfo/ContactInfo";
const ContactUs = () => {


  const {t} = useTranslation()
  const contactInfo = t('contactInfo',{returnObjects:true})
  return (
    <div className="contactus-area spacer">
      {contactInfo.map((infodata)=>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="contact-title title-text text-center">
              <h3>{infodata.mainheader}</h3>
              <h2>{infodata.subtitle}</h2>
            </div>
          </div>
        </div>
        <div className="contact-whole-box">
          <div className="contact-card card">
            <div className="contact-cardbody card-body">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="contactinfo-card">
                    <div className="contactinfo-cardbody">
                      <h3>Contact Infomation</h3>
                      <div className="contact-box">
                        <span>Email Address</span>
                        <p>
                          <a href="mailto:Contact@gmail.com">
                            Contact@gmail.com
                          </a>
                        </p>
                      </div>
                      <div className="contact-box">
                        <span>Phone Number</span>
                        <p>
                          <a href="tel:+91(480) 555-0103">(480) 555-0103</a>
                        </p>
                      </div>
                      <div className="contact-box">
                        <span>Address</span>
                        <p>2464 Royal Ln. Mesa, New Jersey 45463</p>
                      </div>
                    </div>
                    <div className="pattern-image">
                      <img src={patternImg} alt="" className="img-fluid" loading="lazy" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-12">
                  <ContactInfo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> )}
    </div>
  );
};

export default ContactUs;
