import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ReactComponent as C1 } from '../../assets/images/c1.svg'
import { ReactComponent as C2 } from '../../assets/images/c2.svg'
import { ReactComponent as C3 } from '../../assets/images/c3.svg'
import { ReactComponent as C4 } from '../../assets/images/c4.svg'
import { ReactComponent as C5 } from '../../assets/images/c5.svg'
import { ReactComponent as C6 } from '../../assets/images/c6.svg'

import {ReactComponent as V1} from  '../../assets/images/v1.svg'
import {ReactComponent as V2} from  '../../assets/images/v2.svg'
import {ReactComponent as V3} from  '../../assets/images/v3.svg'
import {ReactComponent as V4} from  '../../assets/images/v4.svg'
import {ReactComponent as V5} from  '../../assets/images/v5.svg'
import {ReactComponent as V6} from  '../../assets/images/v6.svg'

import {ReactComponent as P1} from '../../assets/images/savetime.svg'
import {ReactComponent as P2} from '../../assets/images/upgrde.svg'
import {ReactComponent as P3} from '../../assets/images/simplify.svg'
import {ReactComponent as P4} from '../../assets/images/cleanwork.svg'
import {ReactComponent as P5} from '../../assets/images/trust.svg'
import {ReactComponent as P6} from '../../assets/images/levelup.svg'

import { ReactComponent as F1 } from "../../assets/images/emailAddress.svg"
import { ReactComponent as F2 } from "../../assets/images/c2.svg"
import { ReactComponent as F3 } from "../../assets/images/locationAddress.svg"
import { useInView } from 'react-intersection-observer'

const OurValueListing = ({ OVdata, keydata }) => {
    const { t } = useTranslation()
    const ovCardList = t(keydata, { returnObjects: true })
    const imageView = {
        c1: <C1 />,
        c2: <C2 />,
        c3: <C3 />,
        c4: <C4 />,
        c5: <C5 />,
        c6: <C6 />,
        h1: <V1/>,
        h2: <V2/> ,
        h3 : <V3/>,
        h4 :<V4/>,
        h5:<V5/>,
        h6: <V6/>,
        p1 :<P1/>,
        p2:<P2/>,
        p3:<P3/>,
        p4:<P4/>,
        p5:<P5/>,
        p6:<P6/>,
        f1:<F1/>,
        f2: <F2/>,
        f3 : <F3/>
    }
   
    return (
        <>
            {ovCardList?.map((data, i) => (
                <>
                    {data?.cardData &&
                        data?.cardData.map((cd) => (
                            <motion.div
                                whileHover={{ scale: 1 }}
                                className="value-part"
                                key={i}
                            >
                                {/* {ovCardList.map((ovCardData) =>  */}
                                <div className="value-box">
                                    <div className="value-icon">
                                        {imageView[cd.image]}
                                        {/* <div
                                    dangerouslySetInnerHTML={{
                                        __html: data.photo
                                    }}
                                ></div> */}
                                        {/* <img src={data.photo} /> */}
                                        {/* <img src={require(`../../assets/images/v1.svg`)}/> */}
                                    </div>
                                    <div className="value-text">
                                        <h5>{cd.title}</h5>
                                        <p>{cd.desc}</p>
                                    </div>
                                </div>
                                {/* )} */}
                            </motion.div>
                        ))}
                </>
            ))}
        </>
    )
}

export default OurValueListing
