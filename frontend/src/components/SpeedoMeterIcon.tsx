export const SpeedometerIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer arc (thick) */}
    <path
      d="M6 30 A18 18 0 0 1 42 30"
      stroke="black"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />

    {/* Tick marks */}
    <line x1="24" y1="10" x2="24" y2="16" stroke="black" strokeWidth="3" strokeLinecap="round" />
    <line x1="10" y1="18" x2="14" y2="21" stroke="black" strokeWidth="3" strokeLinecap="round" />
    <line x1="38" y1="18" x2="34" y2="21" stroke="black" strokeWidth="3" strokeLinecap="round" />

    {/* Needle */}
    <line
      x1="24"
      y1="30"
      x2="34"
      y2="20"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Center pivot */}
    <circle cx="24" cy="30" r="3" fill="black" />

    {/* Base */}
    <rect x="14" y="34" width="20" height="4" rx="2" fill="black" />
  </svg>
);