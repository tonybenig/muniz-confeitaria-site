import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
}

export default function Logo({ className = "", size = "md", variant = "dark" }: LogoProps) {
  // Dimensions based on size
  const dimensions = {
    sm: { width: 140, height: 60 },
    md: { width: 220, height: 95 },
    lg: { width: 340, height: 145 },
  };

  const currentDim = dimensions[size];

  // Colors from the brand image
  const tealColor = "#5EBCB6";
  const pinkColor = "#E05370";
  const yellowColor = "#F5B01E";
  const brownColor = "#4E3621";
  const textColor = variant === "dark" ? "#4E3621" : "#FDFBF7";

  return (
    <div className={`flex items-center select-none ${className}`} id="muniz-logo-container">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 520 220"
        style={{ maxWidth: currentDim.width, height: "auto" }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === ICON LAYER (muniz letter-by-letter drawing) === */}
        
        {/* 1. M-ARCHES (Teal, Pink, Yellow) */}
        {/* Teal Arch */}
        <path
          d="M 40,135 L 40,95 C 40,68 62,68 62,95 L 62,135"
          stroke={tealColor}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Pink Arch (overlapping) */}
        <path
          d="M 62,135 L 62,95 C 62,68 84,68 84,95 L 84,135"
          stroke={pinkColor}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Yellow Arch (overlapping) */}
        <path
          d="M 84,135 L 84,95 C 84,68 106,68 106,95 L 106,135"
          stroke={yellowColor}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 2. U-LETTER (Yellow-orange) */}
        <path
          d="M 140,92 L 140,118 C 140,136 175,136 175,118 L 175,92"
          stroke={yellowColor}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3. N-LETTER (Brown) */}
        <path
          d="M 205,135 L 205,100 C 205,76 235,76 235,100 L 235,135"
          stroke={brownColor}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 4. I-LETTER (Teal stem) */}
        <path
          d="M 270,95 L 270,135"
          stroke={tealColor}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Chocolate Heart above the 'i' */}
        <g transform="translate(270, 60)">
          {/* Brown Chocolate Base */}
          <path
            d="M 0,22 C -18,10 -15,-10 0,-3 C 15,-10 18,10 0,22 Z"
            fill={brownColor}
            transform="scale(1.1) rotate(-15)"
          />
          {/* White/Cream Swirl Inside */}
          <path
            d="M 0,16 C -12,8 -10,-6 0,-1 C 10,-6 12,8 0,16 Z"
            stroke="#FFF8EE"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            transform="rotate(-15) translate(0, 1)"
          />
        </g>

        {/* 5. Z-LETTER (Brown) */}
        <path
          d="M 298,95 L 345,95 L 298,135 L 345,135"
          stroke={brownColor}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* === SUBTITLE: CONFEITARIA (Serif, elegant, wide tracking) === */}
        <text
          x="195"
          y="185"
          fill={textColor}
          fontSize="24"
          fontFamily="Georgia, serif"
          letterSpacing="18"
          textAnchor="middle"
          fontWeight="bold"
        >
          CONFEITARIA
        </text>
      </svg>
    </div>
  );
}
