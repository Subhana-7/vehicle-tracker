import { useCallback, useEffect, useState } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";

type Tab = {
  id: string;
  name: string;
};

export default function TripDetailsPage() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [trip, setTrip] = useState<TripDetails | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 8;

  const { id } = useParams();
  const navigate = useNavigate();

  // The active trip comes directly from the URL
  const activeTripId = id ?? null;

  // Load all trips
  const loadTrips = useCallback(async () => {
    const data = await getAllTrips();
    setTabs(data);
  }, []);

  useEffect(() => {
    const load = async () => {
      await loadTrips();
    };

    load();
  }, [loadTrips]);

  // Load selected trip
  useEffect(() => {
    if (!activeTripId) return;

    const loadTrip = async () => {
      const res = await getTripById(activeTripId);
      setTrip(res);
    };

    loadTrip();
  }, [activeTripId]);

  const handleTabSelect = (tripId: string) => {
    setCurrentPage(1);
    navigate(`/trips/details/${tripId}`);
  };

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
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 hover:bg-gray-100"
        >
          ←
        </button>
      </div>

      <HeaderCard
        title={trip?.name ?? "Trips"}
        onNew={() => setModalOpen(true)}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onUploadSuccess={loadTrips}
      />

      <Legend />

      {/* Map */}
      <MapCard>
        <TripMap points={trip?.route ?? []} />
      </MapCard>

      {/* Tabs */}
      <Tabs tabs={tabs} activeId={activeTripId} onSelect={handleTabSelect} />

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
