import { easeIn } from "framer-motion";

export const anim = () => {
  return {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,

      transition: {
        duration: 0.5,
        delay: 0.5,
        easeIn,
      },
    },
    exit: {
      opacity: 0,
      easeIn,
    },
  };
};
