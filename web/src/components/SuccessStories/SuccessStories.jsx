import React from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import data from "./Data/SuccessStoryData";
import { useInView } from "react-intersection-observer";
const SuccessStories = () => {

  const {ref, inView} = useInView({
    threshold: 0,
  });

  const {t} = useTranslation()
  const successData = t('successData',{returnObjects:true})
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: false,
    draggable: true,
    easing: "linear",
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="sucess-story-area spacer" ref={ref}>
      {inView && successData.map((SData)=>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="story-title title-text text-center">
              <h3>{SData.mainHeading}</h3>
              <h2>{SData.subHeading}</h2>
            </div>
          </div>
        </div>
        <div className="story-card-box">
          <div className="row">
            <div className="col-12">
              <Slider className="success-slider" {...settings}>
                {data.map((successStory, i) => {
                  return (
                    <div>
                      <div className="success-card" key={i}>
                        <div className="success-cardbody">
                          <p>{successStory.desc}</p>
                          <div className="successtitle-profile-box">
                            <div className="success-title">
                              <h3>{successStory.name}</h3>
                              <p>{successStory.position}</p>
                            </div>
                            <div className="success-profile">
                              <img
                                src={successStory.avtar}
                                alt=""
                                className="img-fluid"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div> )}
    </div>
  );
};

export default SuccessStories;
