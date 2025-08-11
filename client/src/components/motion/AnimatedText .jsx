import { motion } from "framer-motion";
import { waveAnimation } from "../../animations/waveAnimation";

const AnimatedText = ({ text }) => {
    return (
        <>
            {text.split("").map((letter, index) => (
                <motion.span
                    key={index}
                    initial={waveAnimation.initial}
                    animate={waveAnimation.animate}
                    transition={waveAnimation.transition(index)}
                >
                    {letter}
                </motion.span>
            ))}
        </>
    );
};

export default AnimatedText;
