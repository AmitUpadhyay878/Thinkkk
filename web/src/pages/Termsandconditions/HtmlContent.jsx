import React, { useEffect, useState } from "react";
import request from "../../util/request";

const HtmlContent = () => {
  const [TCData, setTCData] = useState("");

  const fetchTnc = async () => {
    await request("POST", "/cms/view", {}, { slug: "terms-and-condition" }, false)
      .then((res) => {
        setTCData(res.data.data.description);
        return res.data.data
      })
      .catch((err) => { console.log(err) })
  }

  useEffect(() => {
    fetchTnc()
  }, []);


  return (
    <div className="col-12" dangerouslySetInnerHTML={{ __html: TCData }} />
  );
};

export default HtmlContent;
