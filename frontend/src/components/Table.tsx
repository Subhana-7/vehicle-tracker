import { IgnitionBadge } from "./Badge";
import { Button } from "./Button";
import { ChevronRightRowIcon, TrashIcon } from "./Icons";
import { Card } from "./CardComponent";

export const TripTable = ({ logs }: any) => (
  <Card className="overflow-hidden">
    {/* Desktop & Tablet */}
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            {["Time", "Point", "Ignition", "Speed", "Details"].map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map((log: any, i: any) => (
            <tr
              key={log.id}
              className={`${i < logs.length - 1 ? "border-b border-gray-100" : ""} hover:bg-gray-50 transition`}
            >
              <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                {log.time}
              </td>
              <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">
                {log.point}
              </td>
              <td className="px-4 py-3">
                <IgnitionBadge status={log.ignition} />
              </td>
              <td className="px-4 py-3 text-xs text-gray-600">{log.speed}</td>
              <td className="px-4 py-3 text-xs text-gray-500 space-y-0.5 min-w-40">
                <div className="flex justify-between">
                  <span className="text-gray-400">Travel Duration</span>
                  <span className="font-medium text-gray-700">
                    {log.travelDuration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Stopped from</span>
                  <span className="font-medium text-gray-700">
                    {log.stoppedFrom}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Distance</span>
                  <span className="font-medium text-gray-700">
                    {log.distance}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Overspeeding Duration</span>
                  <span className="font-medium text-gray-700">
                    {log.overspeedingDuration}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/* Mobile */}
    <div className="sm:hidden">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Trip Logs
        </span>
      </div>
      {logs.map((log: any) => (
        <div
          key={log.id}
          className="border-b border-gray-100 px-4 py-3 space-y-2"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-700">
              {log.time}
            </span>
            <IgnitionBadge status={log.ignition} />
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Point</span>
              <span>{log.point}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Speed</span>
              <span>{log.speed || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Travel Duration</span>
              <span>{log.travelDuration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Stopped from</span>
              <span>{log.stoppedFrom}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Distance</span>
              <span>{log.distance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Overspeeding</span>
              <span>{log.overspeedingDuration}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

export const TripItem = ({
  trip,
  isSelected,
  onToggle,
  onDelete,
  onOpen,
  isFirst,
}: any) => (
  <>
    {/* Desktop / Tablet */}
    <div
      className={`hidden sm:flex items-center justify-between px-4 py-2.5 border-b border-gray-100 hover:bg-gray-50 transition ${isFirst ? "border-t border-gray-100" : ""}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(trip.id)}
          className="w-4 h-4 accent-slate-700 cursor-pointer shrink-0"
          aria-label={`Select ${trip.name}`}
        />
        <span className="text-sm text-gray-700 truncate">{trip.name}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          text="Delete"
          variant="secondary"
          size="sm"
          onClick={() => onDelete(trip.id)}
        />
        <Button
          text="Open"
          variant="open"
          size="sm"
          onClick={() => onOpen(trip.id)}
        />
      </div>
    </div>
    {/* Mobile */}
    <div
      className={`flex sm:hidden items-center justify-between px-3 py-3.5 border-b border-gray-100 hover:bg-gray-50 transition ${isFirst ? "border-t border-gray-100" : ""}`}
    >
      <span className="text-sm text-gray-700">{trip.name}</span>
      <div className="flex items-center gap-3 text-gray-400">
        <button
          onClick={() => onDelete(trip.id)}
          className="hover:text-red-400 transition cursor-pointer p-1"
          aria-label={`Delete ${trip.name}`}
        >
          <TrashIcon />
        </button>
        <button
          onClick={() => onOpen(trip.id)}
          className="hover:text-slate-700 transition cursor-pointer p-1"
          aria-label={`Open ${trip.name}`}
        >
          <ChevronRightRowIcon />
        </button>
      </div>
    </div>
  </>
);
