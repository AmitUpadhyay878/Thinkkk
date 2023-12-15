import React from "react";
import HtmlContent from "./HtmlContent";
import { termsAndConditionData } from "./TermsAndConditionData";
import Helmet from 'react-helmet'
const Termsandconditions = () => {
  const { title, subtitle } = termsAndConditionData;
  return (
    <div className="policypage-area">
        <Helmet>
        <title>Terms & Conditions</title>
        <meta name="termsAndCondition" content="termsAndCondition page" />
    </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="title-text policy-title text-center">
              <h3>{title}</h3>
              <h2>{subtitle}</h2>
            </div>
          </div>
        </div>
        <div className="policy-whole-box">
          <div className="row">
            <HtmlContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Termsandconditions;
