import React, { useEffect, useState } from "react";
import request from "../../../util/request";

const PrivaciPolici = () => {
  const [PPDataTitle, setPPDataTitle] = useState();
  const [PPDataDesc, setPPDataDesc] = useState();

  useEffect(() => {
    request("POST", "/cms/view", {}, { slug: "privacy-policy" }, true)
      .then((res) => {
        setPPDataTitle(res.data.data.title);
        setPPDataDesc(res.data.data.description);
      })
      .catch((err) => <h1>{err}</h1>);
  }, []);

  return (
    <div className="col-lg-9 col-md-12 col-12">
      <div className="sidebar-content myaccount-content scrollbar">
        <div className="card">
          <div className="card-body">
            <div className="title-text">
              <h5>{PPDataTitle}</h5>
            </div>
            <div className="editprofile-box m-0">
              <div className="row">
                <div className="col-12">
                  <div
                    className="policy-content"
                    dangerouslySetInnerHTML={{ __html: PPDataDesc }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivaciPolici;
