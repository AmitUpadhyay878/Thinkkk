import {ReactComponent as C1} from '../../../../assets/images/c1.svg'
import {ReactComponent as C2} from '../../../../assets/images/c2.svg'
import {ReactComponent as C3} from '../../../../assets/images/c3.svg'
import {ReactComponent as C4} from '../../../../assets/images/c4.svg'
import {ReactComponent as C5} from '../../../../assets/images/c5.svg'
import {ReactComponent as C6} from "../../../../assets/images/c6.svg"

//amit 18/10/2022
import AboutusLeft from '../../../../assets/images/aboutus_who_we_are_left_webp.webp'
import AboutusRight from '../../../../assets/images/aboutus_who_we_are_right_webp.webp'

export const aboutUsData = {
  CommonBanner: {
    title: "About Us",
    subtitle:<>Helping Our Companies Create Better <br/> Thinking for People</>,
    desc:
      "Thinkkk application is used to show the different ideas associated with a particular concept. It is a useful tool for brainstorming. The concept is usually shown in the middle, while the different ideas are shown branching off in different directions."
  },

OVdata : [
      {
          photo : <C1/>,
          title:"Data Security",
          desc : "We protect Your ideas,Thoughts data and do not share it with anyone."
      },
      {
            photo: <C2 />,
            title: "Make Leaders",
            desc: "We Will give you a opportunity to become a leaderwith your ideas"
      },
      {
            photo: <C3 />,
            title: "Work Passionate",
            desc: "You can do your work better way,and you will be able to focus our your work."
      },
      {
            photo: <C4 />,
            title: "Increase Knowledge",
            desc: "Our searching power would be increated for question and answer process related"
      },
     {
            photo: <C5 />,
            title: "Regular Updates",
            desc: "You will always be up to date with Action Item feature and your work will go much faster."
      },
      {
            photo: <C6 />,
            title: "Transparency",
            desc: "We will take care of your data and work and will always be ahead to help you."
        }
  ],
 

   //amit 18/10/2022 
  IntroductionThinkk: {
      image:AboutusLeft,
      title: "Introduce of Thinkkk",
      subtitle:"Who We Are",
      desc:
        <><p>Thinkkk application is used to show the different ideas associated with a particular concept. It is a useful tool for brainstorming. The concept is usually shown in the middle, while the different ideas are shown branching off in different directions. So, what is todo application?</p> <p>Todo application is the process of creating a thought and implementation. It involves brainstorming to document the different ideas associated with a concept, then placing those ideas onto the mind map itself.</p></>
    },

    //amit 18/10/2022 
    OurMission: {
      image:AboutusRight,
      title: "Our Mission",
      subtitle:"What We Do",
      desc:
        <><p>Thinkkk application is used to show the different ideas associated with a particular concept. It is a useful tool for brainstorming. The concept is usually shown in the middle, while the different ideas are shown branching off in different directions. So, what is todo application?</p><p>Todo application is the process of creating a thought and implementation. It involves brainstorming to document the different ideas associated with a concept, then placing those ideas onto the mind map itself.</p></>
    },
};
