import React from 'react'
import CommonBanner from '../../components/CommonBanner'
import CommonCard from '../../components/CommonCard'
import Aboutus from '../Homepage/components/Aboutus'
import SuccessStories from '../../components/SuccessStories'
import AskQuestion from '../../components/AskQuestion'
import Outcorevalue from './components/Outcorevalue'
import { aboutUsData } from './components/Data/AboutUsData'
import Helmet from 'react-helmet'
import { useTranslation } from 'react-i18next'

const AboutUs = () => {
    const { t } = useTranslation()
    const aboutUstab = t('aboutUstab', { returnObjects: true })
    return (
        <>
            {aboutUstab.map((abdata) => (
                <div className="inneraboutus-page">
                    {/* <Helmet>
                        <title>About us</title>
                        <meta name="aboutus" content="About us page" />
                    </Helmet> */}
                    <CommonBanner keydata="aboutUsCommonBaner" />
                    <Aboutus
                        // aboutus={aboutUsData?.IntroductionThinkk}
                        keydata="aboutUstab"
                    />
                    {/* <Aboutus  aboutus={aboutUstab.aboutUsCom}/> */}
                    {/* Our Mission */}
                    <div className="ourmission">
                        <Aboutus keydata="our_mission" />
                    </div>
                    <Outcorevalue />
                    <CommonCard />
                    <SuccessStories />
                    <AskQuestion keydata = "aboutUsFAQ"/>
                </div>
            ))}
        </>
    )
}

export default AboutUs
