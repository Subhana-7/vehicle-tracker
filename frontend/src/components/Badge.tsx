import type { ReactNode } from "react";

type IgnitionBadgeProps = {
  status: ReactNode;
};

export const IgnitionBadge = ({ status }: IgnitionBadgeProps) => (
  <span
    className={`text-xs font-semibold px-2 py-0.5 rounded
      ${status === "ON" ? "text-green-600 bg-green-50" : "text-gray-400 bg-gray-100"}`}
  >
    {status}
  </span>
);
