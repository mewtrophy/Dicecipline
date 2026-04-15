export const CrownIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crown base - hand-drawn zigzag */}
      <path
        d="M 15 60 L 20 30 L 30 45 L 50 20 L 70 45 L 80 30 L 85 60 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      
      {/* Bottom band */}
      <rect
        x="15"
        y="60"
        width="70"
        height="12"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
      
      {/* Decorative circles */}
      <circle cx="20" cy="30" r="4" fill="currentColor" />
      <circle cx="50" cy="20" r="5" fill="currentColor" />
      <circle cx="80" cy="30" r="4" fill="currentColor" />
    </svg>
  );
};
