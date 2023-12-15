import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Appeardiv.scss";
const AppearDiv = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
}) => {
  const [ref, inView] = useInView({
    trackVisibility: false,
    triggerOnce: true,
    threshold: 0.2,
    delay: 300,
  });
  return (
    <React.Fragment>
      <motion.div
        style={{ "--animationDelay": `${delay}ms` }}
        className={`${className} view ${direction} ${inView ? "in-view" : ""}`}
        ref={ref}
      >
        {children}
      </motion.div>
    </React.Fragment>
  );
};
export default AppearDiv;
