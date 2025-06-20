import { easeInOut } from "framer-motion";

export const anim = () => {
  return {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: easeInOut,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
        ease: easeInOut,
      },
    },
  };
};
