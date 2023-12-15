import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import userIcon from '../../../../assets/dashboardimg/user.png'
import Button from '../../../../components/Button/Button'
import { createthought } from '../../../../config/routingConsts'
const HellouserCard = () => {
  const {t} = useTranslation()
  // const hellouserCard = t('hellouserCard',{returnObjects:true})
  const{user} = useSelector(state=>state.Auth)
      const navigate = useNavigate()   

  const [getUsername,setUsername] = useState(null)
          useEffect(()=>{
            setUsername(user?.firstName)
          },[user?.firstName])

          const handleClick=()=>{
            navigate(createthought)
          }
  return (
    <>
    <div className="thought-box">
    <h5> <span><img src={userIcon} alt="" /></span> Hello {getUsername},</h5>
    <h2>{t('hellocard')}</h2>
    <p>{t('helocardDesc')} </p>
    <div className="thought-btn">
     <Button isLink={true} text={t('helocardbtn')} onClick={handleClick} />
    </div>
  </div>
  </>
  )
}

export default HellouserCard 