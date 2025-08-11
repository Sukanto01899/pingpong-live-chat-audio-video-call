/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/fadeUp";

const FadeUp = ({children, delay=0, ...rest}) => {
    return (
        <motion.div {...rest} variants={fadeUp} initial="hidden" animate="visible" delay={delay}>
            {children}
        </motion.div>
    );
};

export default FadeUp;