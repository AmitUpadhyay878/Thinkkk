import React, { useEffect, useState } from "react";
import request from "../../util/request";

const HtmlContent = () => {
  const [PPDataDesc, setPPDataDesc] = useState();

  useEffect(() => {
    request("POST", "/cms/view", {}, { slug: "privacy-policy" }, false)
      .then((res) => {
        setPPDataDesc(res.data.data.description);
      })
      .catch((err) => <h1>{err}</h1>);
  }, []);
  return (
    <>
      <div
        className="col-12"
        dangerouslySetInnerHTML={{ __html: PPDataDesc }}
      />
    </>
  );
};

export default HtmlContent;
