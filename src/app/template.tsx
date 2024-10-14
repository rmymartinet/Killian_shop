"use client";

import { animatePageIn } from "@/utils/Animation";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useWindow from "./hooks/useWindow";

const TEXT = "sois fier de tes sapes";
const OPACITIES_DESKTOP = Array.from({ length: 9 }, (_, i) =>
  Math.max(90 - i * 10, 5)
);

const OPACITIES_TABLET = Array.from({ length: 20 }, (_, i) =>
  Math.max(95 - i * 6, 5)
);
const OPACITIES_MOBILE = Array.from({ length: 30 }, (_, i) =>
  Math.max(95 - i * 3, 5)
);

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { width } = useWindow();

  useEffect(() => {
    // Lancer l'animation lors du changement de route
    animatePageIn();
  }, [pathname]);

  return (
    <>
      <div className="overflow-hidden">
        <div
          id="sentence"
          className="min-h-screen w-screen flex flex-col justify-center bg-white z-10 fixed top-0 left-0"
          style={{ lineHeight: "1" }}
        >
          {width > 1024 &&
            OPACITIES_DESKTOP.map((opacity, index) => (
              <h1
                key={index}
                id={`text-${index}`}
                className="text-black text-[8.5vw] uppercase font-medium z-50"
                style={{ opacity: opacity / 100 }}
              >
                {TEXT}
              </h1>
            ))}
          {width > 498 &&
            width < 1024 &&
            OPACITIES_TABLET.map((opacity, index) => (
              <h1
                key={index}
                id={`text-${index}`}
                className="text-black text-[8vw] uppercase font-medium z-50"
                style={{ opacity: opacity / 100 }}
              >
                {TEXT}
              </h1>
            ))}
          {width <= 498 &&
            OPACITIES_MOBILE.map((opacity, index) => (
              <h1
                key={index}
                id={`text-${index}`}
                className="text-black text-[8vw] uppercase font-medium z-50"
                style={{ opacity: opacity / 100 }}
              >
                {TEXT}
              </h1>
            ))}
        </div>
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
