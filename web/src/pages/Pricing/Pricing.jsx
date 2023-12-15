import React from 'react'
import CommonBanner from '../../components/CommonBanner'
import CommonCard from '../../components/CommonCard'
import PricePlanes from '../../components/PricePlans'
import AskQuestion from '../../components/AskQuestion'
import OurValues  from './components/OurValue'
import SuccessStories from '../../components/SuccessStories'
import { pricingData } from './PricingData'
import Helmet from 'react-helmet'
const PriceListingPage = () => {
  return (
    <div className="innerpricing-page">
       {/* <Helmet>
        <title>Price</title>
        <meta name="pricing" content="pricing page" />
    </Helmet> */}
        <CommonBanner keydata="pricingCommonBanner"/>
        <PricePlanes />
        <OurValues />
        <CommonCard />
        <SuccessStories />
        <AskQuestion keydata="priceFaq"/>
    </div>
  )
}

export default PriceListingPage
