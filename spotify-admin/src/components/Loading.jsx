import React, { useEffect, useState } from "react";

export default function Loading() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % 3);
    }, 300);
    return () => clearInterval(timer);
  }, []);

  const arcs = [
    "M10 38 Q24 30 38 38", // bottom arc
    "M8 26 Q24 16 40 26", // middle arc
    "M6 14 Q24 4 42 14",  // top arc
  ];

  const strokeStyles = [
    { stroke: "#555", strokeWidth: 2 },   // first arc - light black
    { stroke: "#333", strokeWidth: 3 },   // second arc - medium black
    { stroke: "#000", strokeWidth: 4 },   // third arc - thick black
  ];

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Spinning red glow ring */}
      <div className="absolute w-full h-full rounded-full border-4 border-red-400 animate-[spin_4s_linear_infinite] blur-sm opacity-20"></div>

      {/* Central red circle */}
      <div className="relative z-10 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 animate-[pulse_2.5s_ease-in-out_infinite]">
        <svg viewBox="0 0 48 48" className="w-16 h-16">
          {arcs.map((d, idx) => (
            <path
              key={idx}
              d={d}
              stroke={strokeStyles[idx].stroke}
              strokeWidth={strokeStyles[idx].strokeWidth}
              strokeLinecap="round"
              fill="none"
              style={{
                opacity: active === idx ? 1 : 0.2,
                transformOrigin: "center center",
                transform: active === idx ? "scale(1.1)" : "scale(1)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
