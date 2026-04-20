export const SpeedometerIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="18" cy="18" r="16" stroke="#1e293b" strokeWidth="2" fill="white" />
    <path
      d="M8 24 A11 11 0 0 1 28 24"
      stroke="#1e293b"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    {/* Tick marks */}
    <line x1="18" y1="8" x2="18" y2="11" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="9.5" y1="11.5" x2="11.6" y2="13.6" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="26.5" y1="11.5" x2="24.4" y2="13.6" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
    {/* Needle pointing upper-right */}
    <line x1="18" y1="18" x2="24" y2="12" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
    <circle cx="18" cy="18" r="2" fill="#1e293b" />
  </svg>
);