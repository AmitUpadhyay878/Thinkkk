import React, { useEffect, useState } from 'react'
import request from '../../../util/request';

const TermsAndCondition = () => {
    const [TCData,setTCData] = useState()

    useEffect(() => {
      request("POST", "/cms/view", {}, { slug: "terms-and-condition" }, true)
        .then((res) => {
          setTCData (res.data.data.description)
        })
        .catch((err) => <h1>{err}</h1>);
    }, []);
  return (
    <div className='policy-content m-0' dangerouslySetInnerHTML={{ __html: TCData }} />
  )
}

export default TermsAndCondition