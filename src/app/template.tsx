"use client";

import { animatePageIn } from "@/utils/Animation";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Lancer l'animation lors du changement de route
    animatePageIn();
  }, [pathname]);

  return (
    <>
      <div className="overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
