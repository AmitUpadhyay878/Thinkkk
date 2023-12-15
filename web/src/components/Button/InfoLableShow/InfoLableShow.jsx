import React from 'react'
import {ReactComponent as CheckLogo} from '../../../assets/images/QandA/CheckLogo.svg'
import {ReactComponent as QandALogo} from '../../../assets/images/QandA/QandALogo.svg'
const InfoLableShow = ({
    commonClass="",
    text="",
    logo=""
}) => {
  return (
    <p className={commonClass}>
    <span>
     {logo=logo ? <CheckLogo/>:<QandALogo/>}
    </span>
   | {text}
  </p>
  )
}

export default React.memo(InfoLableShow)