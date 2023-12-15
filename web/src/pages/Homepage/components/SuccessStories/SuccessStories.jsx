import React from "react";
import Slider from "react-slick";
import clientavtarImg from "../../../../assets/images/client-avtar.svg";

const SuccessStories = () => {
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
    <div className="sucess-story-area spacer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="story-title title-text text-center">
              <h3>Success Stories</h3>
              <h2>We Have Stories to Inspire You</h2>
            </div>
          </div>
        </div>
        <div className="story-card-box">
          <div className="row">
            <div className="col-12">
              <Slider className="success-slider" {...settings}>
                <div>
                  <div className="success-card">
                    <div className="success-cardbody">
                      <p>
                        Here is a helpful product for me. With Toro application
                        I explored the app Thoughts and I got growth in my work.
                        Here is User Friendly Product to Manage Your
                        Taskaccording to You.
                      </p>
                      <div className="successtitle-profile-box">
                        <div className="success-title">
                          <h3>Mark Jonsan</h3>
                          <p>CEO, Inproze</p>
                        </div>
                        <div className="success-profile">
                          <img
                            src={clientavtarImg}
                            alt=""
                            className="img-fluid"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="success-card">
                    <div className="success-cardbody">
                      <p>
                        Here is a helpful product for me. With Toro application
                        I explored the app Thoughts and I got growth in my work.
                        Here is User Friendly Product to Manage Your
                        Taskaccording to You.
                      </p>
                      <div className="successtitle-profile-box">
                        <div className="success-title">
                          <h3>Mark Jonsan</h3>
                          <p>CEO, Inproze</p>
                        </div>
                        <div className="success-profile">
                          <img
                            src={clientavtarImg}
                            alt=""
                            className="img-fluid"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
