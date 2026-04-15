export const FlameIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hand-drawn flame */}
      <path
        d="M 50 10 Q 55 30 60 45 Q 65 60 70 75 Q 72 85 70 95 Q 65 110 50 115 Q 35 110 30 95 Q 28 85 30 75 Q 35 60 40 45 Q 45 30 50 10 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Inner flame detail */}
      <path
        d="M 50 30 Q 52 45 54 55 Q 56 65 55 75 Q 53 85 50 90 Q 47 85 45 75 Q 44 65 46 55 Q 48 45 50 30 Z"
        fill="#000"
        opacity="0.2"
      />
    </svg>
  );
};
