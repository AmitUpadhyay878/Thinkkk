import React from 'react'
import { useTranslation } from 'react-i18next'
import {  useNavigate } from 'react-router-dom'
import {signin} from '../../config/routingConsts'
import Button from '../Button'

const CommonBanner = ({bannerData,keydata}) => {
  const {t} = useTranslation()
  const aboutUsCommonBaner = t(keydata,{returnObjects:true})
  // const {title,subtitle,desc} = bannerData

const navigate = useNavigate()
  const handleClick=()=>{
    navigate(signin)
  }
  
  return (
    <div className="aboutusbanner-area">
      {aboutUsCommonBaner.map((ab)=>
    <div className="container">
        <div className="row">
            <div className="col-12">
                <div className="aboutus-title title-text text-center">
                   <h3> {ab.maintitle}</h3>
                   {/* <h2>Helping Our Companies Create Better <br /> Thinking for People {subtitle}</h2> */}
                  <h2>{ab.subtitle}</h2>
                   <p>{ab.desc}</p>
                   <div className="thought-btn">
                    {/* <button className='common-btn'>Let’s Start Thoughts<span><RightarrowIcon/></span></button> */}
                    <Button text={ab.btntext} isLink={true} onClick={handleClick} />
                   </div>
                </div>
            </div>
        </div>
    </div> )}
</div>
  )
}

export default CommonBanner
