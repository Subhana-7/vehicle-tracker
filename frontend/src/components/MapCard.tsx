import type { ReactNode } from "react";
import { Card } from "./CardComponent";

type MapCardProps = {
  children:ReactNode,
  height?:string
}

export const MapCard = ({
  children,
}:MapCardProps) => (
  <Card className="overflow-hidden">
    <div className="relative w-full h-62.5 sm:h-85 md:h-100 bg-gray-100 overflow-hidden">
      {children ?? (
        /* Static SVG map placeholder — replace children with <MapContainer> for Leaflet */
        <svg viewBox="0 0 560 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <rect width="560" height="300" fill="#f0ede8" />
          <rect x="0" y="80"  width="560" height="18" fill="#fff" stroke="#e0dbd0" strokeWidth="1"/>
          <rect x="0" y="150" width="560" height="14" fill="#fff" stroke="#e0dbd0" strokeWidth="1"/>
          <rect x="0" y="200" width="560" height="12" fill="#fff" stroke="#e0dbd0" strokeWidth="1"/>
          <rect x="0" y="240" width="560" height="10" fill="#fef9c3" stroke="#e0dbd0" strokeWidth="1"/>
          <rect x="80"  y="0" width="16" height="300" fill="#fff" stroke="#e0dbd0" strokeWidth="1"/>
          <rect x="160" y="0" width="14" height="300" fill="#fff" stroke="#e0dbd0" strokeWidth="1"/>
          <rect x="260" y="0" width="18" height="300" fill="#fff" stroke="#e0dbd0" strokeWidth="1"/>
          <rect x="360" y="0" width="12" height="300" fill="#fff" stroke="#e0dbd0" strokeWidth="1"/>
          <rect x="450" y="0" width="10" height="300" fill="#fef9c3" stroke="#e0dbd0" strokeWidth="1"/>
          <rect x="100" y="100" width="55" height="45" rx="3" fill="#e5e1d8"/>
          <rect x="170" y="100" width="80" height="45" rx="3" fill="#e5e1d8"/>
          <rect x="280" y="100" width="70" height="45" rx="3" fill="#e5e1d8"/>
          <rect x="100" y="165" width="55" height="30" rx="3" fill="#e5e1d8"/>
          <rect x="170" y="165" width="80" height="30" rx="3" fill="#e5e1d8"/>
          <rect x="280" y="165" width="70" height="30" rx="3" fill="#e5e1d8"/>
          <rect x="380" y="100" width="60" height="45" rx="3" fill="#e5e1d8"/>
          <rect x="380" y="165" width="60" height="30" rx="3" fill="#e5e1d8"/>
          <polyline points="120,89 200,89 240,150 300,150 340,110 390,110 430,150 460,150" fill="none" stroke="#3b82f6" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round"/>
          <circle cx="200" cy="89" r="8" fill="#3b82f6"/><circle cx="200" cy="89" r="4" fill="white"/>
          <rect x="162" y="72" width="76" height="18" rx="4" fill="#3b82f6"/>
          <text x="200" y="84" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">Stopped for 10 Mins</text>
          <circle cx="340" cy="110" r="8" fill="#f472b6"/><circle cx="340" cy="110" r="4" fill="white"/>
          <rect x="302" y="93" width="68" height="18" rx="4" fill="#f472b6"/>
          <text x="336" y="105" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">Idle for 18 Mins</text>
          <ellipse cx="120" cy="87" rx="7" ry="9" fill="#ef4444"/><circle cx="120" cy="84" r="3" fill="white"/>
          <ellipse cx="460" cy="148" rx="7" ry="9" fill="#ef4444"/><circle cx="460" cy="145" r="3" fill="white"/>
          <text x="170" y="77" fill="#9ca3af" fontSize="7">N Church St</text>
          <text x="270" y="77" fill="#9ca3af" fontSize="7">N Davidson St</text>
          <text x="20"  y="158" fill="#9ca3af" fontSize="7">W Trade St</text>
        </svg>
      )}
    </div>
  </Card>
);