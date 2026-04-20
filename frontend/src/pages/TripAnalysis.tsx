import { useState } from "react";
import {Legend } from "../components/Legend";
import { TripTable } from "../components/Table";
import { MapCard } from "../components/MapCard";
import { StatsGrid,HeaderCard } from "../components/CardComponent";
import { Tabs } from "../components/Tabs";
import { Pagination } from "../components/Pagination";
import { DashboardLayout } from "../components/DashboardLayout";

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const TABS = [
  { id: "colaba", label: "Colaba" },
  { id: "marine", label: "Marine Drive" },
  { id: "nariman", label: "Nariman Point" },
  { id: "malabar", label: "Malabar Hill" },
  { id: "bandra", label: "Bandra" },
  { id: "andheri", label: "Andheri" },
];

const STATS = [
  { id: "dist", value: "63 KM", label: "Total Distanced Travelled", color: "text-blue-500", icon: "🗺️" },
  { id: "dur", value: "1Hr 36 Mins", label: "Total Travelled Duration", color: "text-cyan-500", icon: "🕐" },
  { id: "ospeed_dur", value: "41 Mins", label: "Over Speeding Duration", color: "text-green-500", icon: "🚗" },
  { id: "ospeed_dist", value: "20.3 KM", label: "Over Speeding Distance", color: "text-blue-500", icon: "📍" },
  { id: "stopped", value: "41 Mins", label: "Stopped Duration", color: "text-cyan-500", icon: "🕐" },
];

const TRIP_LOGS = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  time: "11:30:24 PM to 11:30:24 PM",
  point: `40.7128° N, 74.0060° W`,
  ignition: i === 1 ? "OFF" : "ON",
  speed: i === 1 ? "" : "28.5 KM/H",
  travelDuration: "20 Mins",
  stoppedFrom: "10 Mins",
  distance: "10km",
  overspeedingDuration: "20 Minutes",
}));

const TOTAL_PAGES = 5;

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);


// ─── Trip Details Page ────────────────────────────────────────────────────────
export default function TripDetailsPage() {
  const [activeTab, setActiveTab] = useState("colaba");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <DashboardLayout>
      {/* Back arrow */}
      <div>
        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition text-sm cursor-pointer mb-3">
          <ArrowLeftIcon />
        </button>

        {/* Header card */}
        <HeaderCard title="Colaba" onNew={() => console.log("New clicked")} />
      </div>

      {/* Legend */}
      <Legend />

      {/* Map */}
      <MapCard children={undefined} />

      {/* Tabs */}
      <Tabs tabs={TABS} activeId={activeTab} onSelect={setActiveTab} />

      {/* Stats */}
      <StatsGrid stats={STATS} />

      {/* Table */}
      <TripTable logs={TRIP_LOGS} />

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={TOTAL_PAGES} onPageChange={setCurrentPage} />
    </DashboardLayout>
  );
}