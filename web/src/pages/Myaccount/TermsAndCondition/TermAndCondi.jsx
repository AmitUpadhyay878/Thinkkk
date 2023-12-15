import React, { useEffect, useState } from "react";
import request from "../../../util/request";

const TermAndCondi = () => {
  const [TCDataTitle, setTCDataTitle] = useState();
  const [TCDataDesc, setTCDataDesc] = useState();

  useEffect(() => {
    request("POST", "/cms/view", {}, { slug: "terms-and-condition" }, true)
      .then((res) => {
        setTCDataTitle(res.data.data.title);
        setTCDataDesc(res.data.data.description);
      })
      .catch((err) => <h1>{err}</h1>);
  }, []);

  return (
    <div className="col-lg-9 col-md-12 col-12">
      <div className="sidebar-content myaccount-content scrollbar">
        <div className="card">
          <div className="card-body">
            <div className="title-text">
              <h5>{TCDataTitle}</h5>
            </div>
            <div className="editprofile-box m-0">
              <div className="row">
                <div className="col-12">
                  <div
                    className="policy-content"
                    dangerouslySetInnerHTML={{ __html: TCDataDesc }}
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

export default TermAndCondi;
