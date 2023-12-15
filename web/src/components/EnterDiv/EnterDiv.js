import React from 'react';
import { motion } from 'framer-motion';

const transition = { duration: 0.5, ease: "easeInOut" };

const transitionFade = { duration: 0.2, ease: "easeInOut" };

const EnterDiv = ({
    children,
    fade = true,
    initial = { y: -50, opacity: 0, transition },
    enter = { y: 0, opacity: 1, transition },
    exit = { y: -50, opacity: 0, transition }
}) => {

    if (fade) {
        initial = { y: 0, opacity: 0 };
        enter = { y: 0, opacity: 1, scale: 1, transitionFade };
        exit = { y: 0, opacity: 0, scale: 0.95, transitionFade };
    }

    return (
        <React.Fragment>
            <motion.div
                initial="exit"
                animate="enter"
                exit="exit"
                variants={{ initial, enter, exit }}
            >{children}</motion.div>
        </React.Fragment>
    )
}
export default EnterDiv;