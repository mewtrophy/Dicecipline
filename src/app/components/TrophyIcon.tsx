export const TrophyIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Trophy cup - hand-drawn style */}
      <path
        d="M 30 25 L 35 60 Q 35 75 50 75 Q 65 75 65 60 L 70 25 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      
      {/* Left handle */}
      <path
        d="M 30 30 Q 20 30 18 40 Q 17 45 20 48 Q 25 50 30 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Right handle */}
      <path
        d="M 70 30 Q 80 30 82 40 Q 83 45 80 48 Q 75 50 70 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Base */}
      <rect
        x="40"
        y="75"
        width="20"
        height="15"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
      
      {/* Bottom platform */}
      <rect
        x="30"
        y="90"
        width="40"
        height="8"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
      
      {/* Top rim */}
      <line
        x1="28"
        y1="25"
        x2="72"
        y2="25"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
