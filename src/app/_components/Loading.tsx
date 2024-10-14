import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import React from "react";

const LoadingPage = ({
  setIsAnimated,
}: {
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const h1Refs = Array.from({ length: 9 }).map(() =>
    React.createRef<HTMLHeadingElement>()
  );

  useGSAP(() => {
    h1Refs.forEach((ref, index) => {
      gsap.to(ref.current, {
        opacity: 0.9 - index * 0.1,
        yPercent: 0,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          if (index === h1Refs.length - 1) {
            setIsAnimated(false);
          }
        },
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      {h1Refs.map((ref, index) => (
        <h1
          key={index}
          ref={ref}
          className="text-black text-[8vw] uppercase font-medium opacity-0"
          style={{ lineHeight: "1" }}
        >
          sois fier de tes sapes
        </h1>
      ))}
    </div>
  );
};

export default LoadingPage;
