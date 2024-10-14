"use client";

import { animatePageIn } from "@/utils/Animation";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TEXT = "sois fier de tes sapes";
const OPACITIES = [90, 80, 70, 60, 50, 40, 30, 20, 10, 10];

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Lancer l'animation lors du changement de route
    animatePageIn();
  }, [pathname]);

  return (
    <>
      <div className="overflow-hidden">
        <div
          id="sentence"
          className="min-h-screen w-screen bg-white z-10 fixed top-0 left-0"
          style={{ lineHeight: "1" }}
        >
          {OPACITIES.map((opacity, index) => (
            <h1
              key={index}
              id={`text-${index}`}
              className="text-black lg:text-[8vw] fixed top-0 left-0 uppercase font-medium z-50"
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
