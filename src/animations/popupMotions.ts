export const framerModalDarkBackgroundAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};
export const popupContainerSpring = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      default: {
        duration: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      },
      scale: {
        type: 'spring',
        damping: 5,
        stiffness: 100,
        restDelta: 0.002,
      },
    },
  },
};

// transition={{ type: "spring", stiffness: 100 }}
