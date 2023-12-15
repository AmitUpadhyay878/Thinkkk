import React from "react";
import ContactInfo from "../../../../components/ContactInfo/ContactInfo";
import GetinTouchImg from "../../../../assets/images/GetinTouch_webp.webp";
const GetinTouch = () => {
  
  return (
    <div className="contactus-area spacer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="contact-title title-text text-center">
              <h3>Get in Touch</h3>
              <h2>Contact Information</h2>
            </div>
          </div>
        </div>
        <div className="contact-whole-box">
          <div className="contact-card card">
            <div className="contact-cardbody card-body">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="vector-image">
                    <img src={GetinTouchImg} alt="" className="img-fluid" loading="lazy" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-12">
                  <ContactInfo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetinTouch;
