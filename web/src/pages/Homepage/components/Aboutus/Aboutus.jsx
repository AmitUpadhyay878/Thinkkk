import React from 'react'
import Button from '../../../../components/Button'
import AppearDiv from '../../../../components/Appeardiv/AppearDiv'
import { aboutUs } from '../../../../config/routingConsts'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import aboutusbanner from '../../../../assets/images/aboutusbanner_webp.webp'
import whoweare from '../../../../assets/images/aboutus_who_we_are_left_webp.webp'
import ourmission from '../../../../assets/images/aboutus_who_we_are_right_webp.webp'
import { useInView } from 'react-intersection-observer'
const Aboutus = ({ aboutus, keydata }) => {
    const {ref, inView} = useInView({
        threshold: 0,
      });
    const { t } = useTranslation()
    const about_Us = t(keydata, { returnObjects: true })
    const navigate = useNavigate()
    const onClickFun = () => {
        navigate(aboutUs)
    }
    const imageView = {
        "home_about": aboutusbanner,
        "main_about":whoweare,
        "our_mission" : ourmission
    }
    return (
        <div className="about-area spacer" ref={ref}>
            <div className="container">
                { inView && about_Us?.map((aboutUsTranslationdata,index) => (
                    <div className="row" key={index}>
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="about-image">
                                <AppearDiv direction="left">
                                    <img
                                        // src={aboutusbanner}
                                        src={imageView[aboutUsTranslationdata.img]}
                                        alt=""
                                        className="img-fluid"
                                        loading="lazy"
                                    />
                                </AppearDiv>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="about-content title-text">
                                <AppearDiv direction="down">
                                    <h3>{aboutUsTranslationdata.title}</h3>
                                </AppearDiv>
                                <AppearDiv direction="up">
                                    <h2
                                        dangerouslySetInnerHTML={{
                                            __html: aboutUsTranslationdata.subTitle
                                        }}
                                    ></h2>
                                </AppearDiv>
                                <AppearDiv direction="right" delay={400}>
                                    {/* <p> {aboutUsTranslationdata.desc} </p> */}
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: aboutUsTranslationdata.desc
                                        }}
                                    ></p>
                                </AppearDiv>
                                {aboutUsTranslationdata.btnText ? 
                                <div className="read-more">
                                    <AppearDiv direction="up">
                                        <Button
                                            isLink={false}
                                            // text="Read More"
                                            text={
                                                aboutUsTranslationdata.btnText
                                            }
                                            onClick={onClickFun}
                                        />
                                    </AppearDiv>
                                </div> : ''}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Aboutus
