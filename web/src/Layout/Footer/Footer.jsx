import React from "react";
import { Link } from "react-router-dom";
//Route consts
import {
  aboutUs,
  contactus,
  home,
  price,
  privacypolicy,
  termsandconditions,
} from "../../config/routingConsts";
//Component
import NewsSlatter from "./components/NewsSlatter/NewsSlatter";
//Images/Logos
import { ReactComponent as EmailIcon } from "../../assets/images/email.svg";
import { ReactComponent as LocationIcon } from "../../assets/images/location.svg";
import { ReactComponent as PhonelIcon } from "../../assets/images/phone.svg";
import { ReactComponent as FooterlogoIcon } from "../../assets/images/footer-logo.svg";
import { GetCurrentYear } from "../../functions/Common";
import { useTranslation } from "react-i18next";


const Footer = () => {

  const {t} = useTranslation()
  const footerData = t('footerData' , {returnObjects:true})
  const linkData = {
    0 : home,
    1 : aboutUs,
    2: price,
    3: contactus
  }
  return (
    <>
     {footerData.map((fdata)=> 
    <div className="whole-footer">
      <div className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="first-part">
                <div className="footer-logo">
                  <Link to={home}>
                    <FooterlogoIcon />
                  </Link>
                  <div className="footer-text">
                    <p>
                     {fdata.paraDes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="second-part">
                <div className="footer-links">
                  <div className="links-title">{fdata.linkhedaing}</div>
                  <ul>
                    {fdata.liList.map((ld,index)=>
                    <li>
                      <Link to={linkData[index]}>{ld.li}</Link>
                    </li> )}
                    {/* <li>
                      <Link to={aboutUs}>About Us</Link>
                    </li>
                    <li>
                      <Link to={price}>Pricing</Link>
                    </li>
                    <li>
                      <Link to={contactus}>Contact Us</Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="third-part">
                <div className="footer-links">
                  <div className="links-title">{fdata.contactDetail}</div>
                  <ul className="link-box">
                    <li>
                    <a href="mailto:http://contact@gmail.com">
                        <EmailIcon className="icon" />
                      {fdata.email}
                    </a>
                    </li>
                    <li>
                    <a href="tel:4805550103">
                        <PhonelIcon className="icon" />
                      {fdata.phone}
                    </a>
                    </li>
                    <li>
                    <a href="https://goo.gl/maps/GSkjkYpVf29kKykk8" target="_black">
                      <LocationIcon className="icon" />
                     {fdata.location}
                    </a>
                    </li>
                    </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <NewsSlatter /> {/* Component */}
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row justify-content-start align-items-center">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="copy-right">
                <p className="m-0">
                  © {GetCurrentYear()} thinkkk. Copyright and rights reserved
                </p>
              </div>
            </div>
            <div className="col-lg-auto col-md-12 col-12 ms-auto">
              <div className="terms-link">
                <Link to={termsandconditions} target="_blank">Terms and Condtions</Link>
                <span></span>
                <Link to={privacypolicy} target="_blank">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
     )}
    </>
  );
};

export default Footer;
