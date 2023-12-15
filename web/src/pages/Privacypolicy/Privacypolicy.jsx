import React from "react";
import { privacyPolicyData } from "./PrivacyPolicyData";
import HtmlContent from "./HtmlContent";
import Helmet from 'react-helmet'
const Privacypolicy = () => {

  const { title, subtitle, desc } = privacyPolicyData;
  return (
    <div className="privacypolicy-page">
        <Helmet>
        <title>Privacy Policy</title>
        <meta name="privacypolicy" content="privacypolicy page" />
    </Helmet>
      <div className="policypage-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="title-text policy-title text-center">
                <h3>{title}</h3>
                <h2 className="mb-2">{subtitle}</h2>
                <p>{desc}</p>
              </div>
            </div>
          </div>

          <div className="policy-whole-box">
            <div className="row">
              <HtmlContent/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacypolicy;
