import React from 'react'
import { useNavigate } from 'react-router-dom'
import notFoundImage from '../../assets/images/404_2.jpg' 
import AmitButton from '../../Components/AmitButton'
import {home} from '../../config/routingConsts' 
const NotFound = () => {

  const navigate = useNavigate()

  const handleClick=()=>{
    navigate(home)
  }

  return (
    <div>
        <AmitButton text="Back To Home Page" commonClass="common-btn" type="button"  onClick={handleClick}/>
        <div>
        <img src={notFoundImage} alt="" className='img-fluid'/>
      </div>
    </div>
  )
}

export default NotFound