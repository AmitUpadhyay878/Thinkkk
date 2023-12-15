import React, { useEffect, useState } from 'react'
import request from '../../../util/request';

const PrivacyPolicy = () => {
    const [PPDataDesc, setPPDataDesc] = useState();
  
    useEffect(() => {
      request("POST", "/cms/view", {}, { slug: "privacy-policy" }, true)
        .then((res) => {
          setPPDataDesc(res.data.data.description);
        })
        .catch((err) => <h1>{err}</h1>);
    }, []);
  return (
    <div className='policy-content m-0' dangerouslySetInnerHTML={{ __html: PPDataDesc }} />
  )
}

export default PrivacyPolicy