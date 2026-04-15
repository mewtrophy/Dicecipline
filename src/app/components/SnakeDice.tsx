export const SnakeDice = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Snake body - hand-drawn style */}
      <path
        d="M 40 160 Q 30 140 45 120 Q 60 100 50 80 Q 40 60 60 50 Q 80 40 100 55 Q 120 70 140 60 Q 160 50 170 70"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Snake head */}
      <circle cx="170" cy="70" r="8" fill="currentColor" />
      <circle cx="168" cy="68" r="2" fill="white" />

      {/* Snake tongue */}
      <path
        d="M 176 70 L 186 68 M 176 70 L 186 72"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Dice - 3D perspective */}
      <g transform="translate(90, 120)">
        {/* Main face */}
        <rect
          x="0"
          y="0"
          width="50"
          height="50"
          fill="white"
          stroke="currentColor"
          strokeWidth="3"
        />

        {/* Side face for 3D effect */}
        <path
          d="M 50 0 L 65 10 L 65 60 L 50 50 Z"
          fill="#E8DCC8"
          stroke="currentColor"
          strokeWidth="3"
        />

        {/* Top face for 3D effect */}
        <path
          d="M 0 0 L 15 -10 L 65 -10 L 50 0 Z"
          fill="#CCCCCC"
          stroke="currentColor"
          strokeWidth="3"
        />

        {/* Dice dots - showing 6 */}
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <circle cx="12" cy="25" r="3" fill="currentColor" />
        <circle cx="12" cy="38" r="3" fill="currentColor" />
        <circle cx="38" cy="12" r="3" fill="currentColor" />
        <circle cx="38" cy="25" r="3" fill="currentColor" />
        <circle cx="38" cy="38" r="3" fill="currentColor" />
      </g>

      {/* Decorative motion lines */}
      <path
        d="M 150 90 L 160 85"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 155 95 L 165 92"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 148 100 L 156 98"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
