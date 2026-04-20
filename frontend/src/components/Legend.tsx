const DEFAULT_LEGEND = [
  { color: "bg-blue-500",  label: "Stopped" },
  { color: "bg-pink-400",  label: "Idle" },
  { color: "bg-green-500", label: "Over speeding" },
];

export const Legend = ({ items = DEFAULT_LEGEND }) => (
  <div className="flex items-center gap-4 flex-wrap">
    {items.map(({ color, label }) => (
      <div key={label} className="flex items-center gap-1.5">
        <span className={`w-3 h-3 rounded-full ${color} shrink-0`} />
        <span className="text-xs text-gray-600">{label}</span>
      </div>
    ))}
  </div>
);