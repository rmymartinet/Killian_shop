import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRef } from "react";
import SplitType from "split-type";
gsap.registerPlugin(useGSAP);

export const animatePageIn = () => {
  const sentence = document.getElementById("sentence");

  if (sentence) {
    gsap.set(sentence, {
      yPercent: 0,
    });

    gsap.to(sentence, {
      delay: 0.5,
      yPercent: 200,
      duration: 0.7,
      ease: "power3.inOut",
    });
  }
};

export const animatePageOut = (
  href: string,
  router: AppRouterInstance,
  onComplete: () => void
) => {
  const sentence = document.getElementById("sentence");

  if (sentence) {
    gsap.set(sentence, {
      yPercent: -200,
    });

    // Animation de descente avant de changer de page
    gsap.to(sentence, {
      yPercent: 0,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        router.push(href);
        onComplete();
      },
    });
  }
};

interface TextTransitionProps {
  textClassName?: string;
  animationConfig?: {
    opacity: number;
    y: number;
    duration: number;
    delay: number;
    stagger: number;
    ease: string;
  };
  children: React.ReactNode;
}

interface TitleTransitionProps {
  yposition?: number;
  children: React.ReactNode;
}

export const TextTransition = ({
  textClassName = "",
  animationConfig = {
    opacity: 0,
    y: 100,
    duration: 1,
    delay: 0.3,
    stagger: 0.03,
    ease: "power2.out",
  },
  children,
}: TextTransitionProps) => {
  const textRef = useRef(null);

  useGSAP(() => {
    const element = textRef.current;
    if (!element) return;

    const split = new SplitType(element);

    gsap.from(split.lines, {
      ...animationConfig,
    });
  }, [animationConfig]);

  return (
    <div ref={textRef} className={textClassName}>
      {children}
    </div>
  );
};

export const TitleTransition = ({
  yposition = 500,
  children,
}: TitleTransitionProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (elementRef.current) {
      const split = new SplitType(elementRef.current, { types: "chars" });

      gsap.fromTo(
        split.chars,
        {
          y: yposition,
        },
        {
          y: -600,
          duration: 1,
          stagger: 0.03,
          ease: "power2.out",
        }
      );

      return () => gsap.killTweensOf(split.chars);
    }
  }, [yposition]);

  return <div ref={elementRef}>{children}</div>;
};
