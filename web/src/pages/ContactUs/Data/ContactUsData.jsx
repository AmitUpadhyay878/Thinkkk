import { ReactComponent as F1 } from "../../../assets/images/emailAddress.svg"
import { ReactComponent as F2 } from "../../../assets/images/c2.svg"
import { ReactComponent as F3 } from "../../../assets/images/locationAddress.svg"
export const  ContactUsData = {
    CommonBanner : {
        title :"Contact Us",
        subtitle:"Have A query ? Let's talk.",
        desc:"Whether you need help using tool, want more information about our plan or anything else & our support team would love to assist you."
    },
    OVdata : [
        {
            photo : <F1/>,
            title:"Email Address",
            desc:"Contact@gmail.com"
        },
        {
            photo : <F2/>,
            title:"Phone Number",
            desc:"(480) 555-0103"
            
        },
        {
            photo : <F3/>,
            title:"Address",
            desc:"2464 Royal Ln. Mesa, New Jersey 45463"
        },
       
    ]
}