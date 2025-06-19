import { useEffect, useState } from "react";

const ScrollHint = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="
        fixed left-1/2 bottom-10 -translate-x-1/2 z-50
        px-8 py-4
        bg-gray-800 bg-opacity-60 backdrop-blur-md
        rounded-xl
        text-white text-lg font-semibold
        animate-pulse
        shadow-lg
        pointer-events-none
      "
      style={{ transition: "opacity 0.5s" }}
    >
      ↓ Scroll vers le bas ↓
    </div>
  );
}

export default ScrollHint;