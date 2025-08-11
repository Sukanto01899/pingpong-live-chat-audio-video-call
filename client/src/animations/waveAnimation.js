export const waveAnimation = {
    initial: { y: 0 },
    animate: { y: -10 },
    transition: (index) => ({
      repeat: Infinity,
      repeatType: "reverse", // up → down → up
      delay: index * 0.1,     // stagger wave
      type: "spring",
      stiffness: 200,
      damping: 10
    })
  };
