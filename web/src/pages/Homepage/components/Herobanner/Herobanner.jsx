import React from 'react'
import { signin } from '../../../../config/routingConsts'
import { useNavigate } from 'react-router-dom'
import herobannerImg from '../../../../assets/images/herobanner_webp.webp'
import Button from '../../../../components/Button'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'

const Herobanner = () => {
    const { ref, inView } = useInView({
        threshold: 0
    })
    const { t } = useTranslation()
    const heroBanner = t('heroBanner', { returnObjects: true })
    const navigate = useNavigate()
    return (
        <div className="herobanner-area spacer" ref={ref}>
            <div className="container">
                {inView &&
                    heroBanner.map((bannerData) => (
                        <div className="row">
                            <div className="col-xl-7 col-lg-12 col-md-12 col-12">
                                <div className="banner-content">
                                    <h1
                                        dangerouslySetInnerHTML={{
                                            __html: bannerData.heading
                                        }}
                                    >
                                        {/* Create & Share
                                <br />
                                Amazing <span></span> */}
                                    </h1>
                                    <p>
                                        {bannerData.desc}
                                        {/* Thinkkk application is used to show the
                                different ideas associated with a particular
                                concept. It is a useful tool for brainstorming.
                                The concept is usually shown in the middle,
                                while the different ideas are shown branching
                                off in different directions. */}
                                    </p>
                                    <Button
                                        isLink={true}
                                        // text="Let's Start Challenges"
                                        text={bannerData.btnText}
                                        onClick={() => navigate(signin)}
                                    />
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-12 col-md-12 col-12">
                                <div className="banner-image">
                                    <img
                                        // data-src={bannerData.image}
                                        data-src={herobannerImg}
                                        className="img-fluid lazyload"
                                        alt="banner-image"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Herobanner
