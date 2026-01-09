import React from "react";

const components = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 120"
        width="24"
        height="120"
      >
        <defs>
          <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          filter="url(#glow1)"
          stroke="#FFD400"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M12 0 L9 14 L15 20 L8 36 L14 44 L10 64 L17 72 L11 90 L14 104 L9 120" />
          <path d="M9 16 L5 22" />
          <path d="M15 20 L19 28" />
          <path d="M8 38 L3 46" />
          <path d="M14 44 L19 50" />
          <path d="M10 66 L5 70" />
          <path d="M17 72 L20 78" />
        </g>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 120"
        width="24"
        height="120"
      >
        <defs>
          <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          filter="url(#glow2)"
          stroke="#FFD400"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M12 0 L11 12 L8 20 L15 32 L10 48 L16 58 L9 74 L14 88 L10 104 L13 120" />
          <path d="M11 14 L7 18" />
          <path d="M8 20 L4 26" />
          <path d="M15 34 L20 40" />
          <path d="M10 50 L5 54" />
          <path d="M16 60 L20 66" />
          <path d="M9 76 L3 82" />
        </g>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 120"
        width="24"
        height="120"
      >
        <defs>
          <filter id="glow3" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          filter="url(#glow3)"
          stroke="#FFD400"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M12 0 L14 10 L9 24 L15 36 L8 50 L13 62 L7 78 L15 88 L9 104 L12 120" />
          <path d="M14 12 L19 18" />
          <path d="M9 26 L4 32" />
          <path d="M15 38 L20 44" />
          <path d="M8 52 L3 60" />
          <path d="M13 64 L18 70" />
          <path d="M7 80 L2 86" />
        </g>
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 120"
        width="24"
        height="120"
      >
        <defs>
          <filter id="glow4" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          filter="url(#glow4)"
          stroke="#FFD400"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M12 0 L8 14 L15 26 L9 42 L16 54 L8 70 L14 82 L10 96 L13 110 L9 120" />
          <path d="M8 16 L4 22" />
          <path d="M15 28 L20 34" />
          <path d="M9 44 L5 48" />
          <path d="M16 56 L21 62" />
          <path d="M8 72 L3 78" />
          <path d="M14 84 L18 90" />
        </g>
      </svg>
    </div>
  );
};

export default components;
