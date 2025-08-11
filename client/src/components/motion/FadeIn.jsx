/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { fadeIn } from "../../animations/fadeIn";

const FadeIn = ({children, delay=0, ...rest}) => {
    return (
        <motion.div {...rest} variants={fadeIn} initial="hidden" animate="visible" delay={delay}>
            {children}
        </motion.div>
    );
};

export default FadeIn;