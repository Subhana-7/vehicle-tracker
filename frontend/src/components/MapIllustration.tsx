export const MapIllustration = () => (
  <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs sm:max-w-sm" aria-label="Map illustration">
    {/* Clouds */}
    <ellipse cx="100" cy="38" rx="28" ry="12" fill="#e2e8f0" />
    <ellipse cx="118" cy="32" rx="20" ry="14" fill="#e2e8f0" />
    <ellipse cx="82" cy="34" rx="18" ry="11" fill="#e2e8f0" />
    <ellipse cx="220" cy="44" rx="22" ry="10" fill="#e2e8f0" />
    <ellipse cx="236" cy="38" rx="16" ry="12" fill="#e2e8f0" />
    {/* Chat bubble */}
    <rect x="230" y="48" width="36" height="22" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1"/>
    <circle cx="239" cy="59" r="2.5" fill="#94a3b8" />
    <circle cx="248" cy="59" r="2.5" fill="#94a3b8" />
    <circle cx="257" cy="59" r="2.5" fill="#94a3b8" />
    <polygon points="236,70 244,70 240,77" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1"/>

    {/* Map paper */}
    <rect x="90" y="55" width="140" height="120" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2"/>
    {/* Fold lines */}
    <line x1="160" y1="55" x2="160" y2="175" stroke="#e2e8f0" strokeWidth="1.5"/>
    <line x1="90" y1="115" x2="230" y2="115" stroke="#e2e8f0" strokeWidth="1.5"/>
    {/* Route path */}
    <path d="M115 150 Q135 100 160 110 Q185 120 205 85" stroke="#fbbf24" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="0"/>
    {/* Pin 1 */}
    <ellipse cx="160" cy="107" rx="6" ry="9" fill="#1e293b"/>
    <circle cx="160" cy="103" r="3" fill="white"/>
    {/* Pin 2 */}
    <ellipse cx="205" cy="82" rx="6" ry="9" fill="#1e293b"/>
    <circle cx="205" cy="78" r="3" fill="white"/>

    {/* Left person */}
    {/* Body */}
    <rect x="68" y="120" width="22" height="40" rx="4" fill="#1e293b"/>
    {/* Jacket */}
    <rect x="70" y="120" width="18" height="28" rx="3" fill="#2d3748"/>
    {/* Head */}
    <circle cx="79" cy="112" r="10" fill="#f59e0b"/>
    {/* Hair */}
    <path d="M70 108 Q79 100 88 108" fill="#1e293b"/>
    {/* Arms - reaching up */}
    <line x1="68" y1="130" x2="55" y2="108" stroke="#1e293b" strokeWidth="5" strokeLinecap="round"/>
    <line x1="90" y1="130" x2="92" y2="115" stroke="#1e293b" strokeWidth="5" strokeLinecap="round"/>
    {/* Legs */}
    <rect x="70" y="158" width="8" height="22" rx="3" fill="#1e293b"/>
    <rect x="81" y="158" width="8" height="22" rx="3" fill="#1e293b"/>
    {/* Shoes */}
    <ellipse cx="74" cy="180" rx="8" ry="4" fill="#fbbf24"/>
    <ellipse cx="85" cy="180" rx="8" ry="4" fill="#fbbf24"/>

    {/* Right person */}
    {/* Body */}
    <rect x="230" y="122" width="22" height="38" rx="4" fill="#1e293b"/>
    <rect x="232" y="122" width="18" height="26" rx="3" fill="#2d3748"/>
    {/* Head */}
    <circle cx="241" cy="114" r="10" fill="#f59e0b"/>
    {/* Hair */}
    <path d="M232 110 Q241 103 250 110" fill="#1e293b"/>
    {/* Arms */}
    <line x1="230" y1="132" x2="222" y2="115" stroke="#1e293b" strokeWidth="5" strokeLinecap="round"/>
    <line x1="252" y1="132" x2="265" y2="110" stroke="#1e293b" strokeWidth="5" strokeLinecap="round"/>
    {/* Legs */}
    <rect x="232" y="158" width="8" height="22" rx="3" fill="#1e293b"/>
    <rect x="243" y="158" width="8" height="22" rx="3" fill="#1e293b"/>
    {/* Shoes */}
    <ellipse cx="236" cy="180" rx="8" ry="4" fill="#fbbf24"/>
    <ellipse cx="247" cy="180" rx="8" ry="4" fill="#fbbf24"/>
  </svg>
);