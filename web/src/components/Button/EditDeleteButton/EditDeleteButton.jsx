import React from 'react'
import {ReactComponent as Edit} from '../../../assets/images/ButtonLogo/EditLogo.svg'
import {ReactComponent as Delete} from '../../../assets/images/ButtonLogo/DeleteLogo.svg'
const EditDeleteButton = ({
    commonClass="",
    text = "", 
    type = "",
    onClick,
}) => {
  return (
   <button type={type} className={commonClass} onClick={onClick}><span>{text=="Edit" ?<Edit /> :<Delete /> }</span> {text}</button>
  )
}

export default React.memo(EditDeleteButton)