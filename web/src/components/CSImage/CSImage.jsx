import React from "react";
import imageSource from "../../assets/images/account-vector.webp";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const DIRECTION = {
  right: "go-right",
  left: "go-left",
  top: "go-top",
  bottom: "go-bottom",
  fade: "go-fade",
  scale: "go-scale",
};
const IS_ONCE =
  process.env.NEXT_PUBLIC_NEXT_PUBLIC_IS_SCROLL_ANIMATION_REPEAT_TRIGGER_ONE;

const CSImage = ({
  imageUrl = "",
  isLocal = true,
  direction = "right",
  isAnimating = true,
  transitionDelay = "0ms",
  isAnimatingLayer = true,
}) => {
  const { blurdataurl } = imageSource;
  if (isLocal) {
    imageUrl = "" + imageUrl;
  }

  const [ref, inView] = useInView({
    trackVisibility: false,
    triggerOnce: IS_ONCE,
    threshold: 0.2,
    delay: 500,
  });

  const cls = isAnimating
    ? `Image-wrap ${inView ? "is-view" : ""} ${!isAnimatingLayer ? "no-layer" : ""
    } ${DIRECTION[direction]}`
    : "";
  return (
    <>
      <motion.div
        ref={ref}
        className={cls}
        style={{ "--trnasitionDelay": transitionDelay }}
      >
        <img
          blurdataurl={blurdataurl}
          placeholder="blur"
          data-src={imageUrl}
          sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
          alt="Picture of the author"
          width="100%"
          height="100%"
          priority={true}
          layout={"responsive"}
          className="lazyload"
        />
      </motion.div>
    </>
  );
};

export const ImageWithCS = ({
  src,
  blurdataurl,
  direction = "right",
  isAnimating = true,
  transitionDelay = "0ms",
  isAnimatingLayer = true,
}) => {
  const [ref, inView] = useInView({
    trackVisibility: false,
    triggerOnce: IS_ONCE,
    threshold: 0.2,
    delay: 500,
  });

  const cls = isAnimating
    ? `Image-wrap ${inView ? "is-view" : ""} ${!isAnimatingLayer ? "no-layer" : ""
    } ${DIRECTION[direction]}`
    : "";

  return (
    <>
      <motion.div
        ref={ref}
        className={cls}
        style={{ "--trnasitionDelay": transitionDelay }}
      >
        <img
          className={inView ? "is-animating lazyload" : "lazyload"}
          blurdataurl={blurdataurl}
          placeholder="blur"
          data-src={src}
          alt="Picture of the author"
          width="100%"
          height="100%"
          priority={true}
          layout={"responsive"}
        />
      </motion.div>
    </>
  );
};

export default React.memo(CSImage);
