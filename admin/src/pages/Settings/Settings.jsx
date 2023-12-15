import { Tab } from "bootstrap";
import React from "react";
import { Tabs } from "react-bootstrap";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsandCondition from "./TermsandCondition";

const Settings = () => {
  return (
    <div className="settings-page">
      <div className="side-pagecontent recentthought-page">
        <div className="recent-thoughtbox scrollbar">
          <div className="card">
            <div className="header-box">
              <div className="title-text">
                <h2>Settings</h2>
              </div>
            </div>
            <div className="setting-box">
              <Tabs
                defaultActiveKey="Privacy Policy"
                id="uncontrolled-tab-example"
                className="mb-3 setiing-tabs"
              >
                <Tab eventKey="Privacy Policy" title="Privacy Policy">
                    <PrivacyPolicy />
                </Tab>

                <Tab eventKey="Terms and Condtions" title="Terms and Condtions">
              <TermsandCondition />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
