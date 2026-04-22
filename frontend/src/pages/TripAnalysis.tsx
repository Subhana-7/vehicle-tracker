// pages/TripDetailsPage.tsx

import { useEffect, useState } from "react";
import { getAllTrips, getTripById } from "../services/trip.service";
import type { TripDetails } from "../types/trip";

import { Legend } from "../components/Legend";
import { TripTable } from "../components/Table";
import { MapCard } from "../components/MapCard";
import { StatsGrid, HeaderCard } from "../components/CardComponent";
import { Tabs } from "../components/Tabs";
import { DashboardLayout } from "../components/DashboardLayout";
import { TripMap } from "../components/TripMap";
import { Pagination } from "../components/Pagination";

type Tab = { id: string; label: string };

export default function TripDetailsPage() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [trip, setTrip] = useState<TripDetails | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  // Load all trips
  useEffect(() => {
    const loadTrips = async () => {
      const data = await getAllTrips();
      setTabs(data);

      if (data.length > 0) {
        setActiveTripId(data[0].id);
      }
    };

    loadTrips();
  }, []);

  console.log("tabs", tabs);

  // Load selected trip
  useEffect(() => {
    if (!activeTripId) return;

    const loadTrip = async () => {
      const res = await getTripById(activeTripId);
      setTrip(res);
    };

    loadTrip();
  }, [activeTripId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTripId]);

  const stats = trip
    ? [
        {
          id: "dist",
          value: `${trip.summary.distance} m`,
          label: "Total Distance",
          icon: "🗺️",
        },
        {
          id: "dur",
          value: `${trip.summary.duration}s`,
          label: "Duration",
          icon: "🕐",
        },
        {
          id: "idle",
          value: `${trip.summary.idling}s`,
          label: "Idling",
          icon: "⏳",
        },
        {
          id: "stop",
          value: `${trip.summary.stoppage}s`,
          label: "Stopped",
          icon: "🛑",
        },
      ]
    : [];

  const logs =
    trip?.route.map((p, i) => ({
      id: i,
      time: p.timestamp,
      point: `${p.latitude}, ${p.longitude}`,
      ignition: p.ignition.toUpperCase(),
      speed: `${p.speed} km/h`,
      travelDuration: "-",
      stoppedFrom: p.speed === 0 ? "Yes" : "No",
      distance: "-",
      overspeedingDuration: "-",
    })) ?? [];

  const paginatedLogs = logs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const totalPages = Math.ceil(logs.length / PAGE_SIZE);

  return (
    <DashboardLayout>
      <HeaderCard title={trip?.name ?? "Trips"} onNew={() => {}} />

      <Legend />

      {/* Map */}
      <MapCard>
        <TripMap points={trip?.route ?? []} />
      </MapCard>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeId={activeTripId}
        onSelect={(id: string) => setActiveTripId(id)}
      />

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Table */}
      <TripTable logs={paginatedLogs} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </DashboardLayout>
  );
}
