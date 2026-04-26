import { useEffect, useState } from "react";
import { TripItem } from "../components/Table";
import { Pagination } from "../components/Pagination";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card } from "../components/CardComponent";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { useNavigate } from "react-router-dom";

type Trip = {
  id: number;
  name: string;
};

type TripListProps = {
  trips: Trip[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onOpen: (id: number) => void;
};

import { getAllTrips } from "../services/trip.service";

const TripList = ({
  trips,
  selectedIds,
  onToggle,
  onDelete,
  onOpen,
}: TripListProps) => (
  <div className="w-full">
    {/* Desktop/Tablet header row */}
    <div className="hidden sm:flex items-center px-4 py-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Trips
      </span>
    </div>
    {/* Mobile header */}
    <div className="flex sm:hidden items-center px-3 py-2">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Trips
      </span>
    </div>

    {trips.map((trip, idx) => (
      <TripItem
        key={trip.id}
        trip={trip}
        isSelected={selectedIds.includes(trip.id)}
        onToggle={onToggle}
        onDelete={onDelete}
        onOpen={onOpen}
        isFirst={idx === 0}
      />
    ))}
  </div>
);

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchTrips = async () => {
    const data = await getAllTrips();
    const sorted = [...data].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    setTrips(sorted);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleToggle = (id: number) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleDelete = (id: number) => {
    console.log("Delete trip:", id);
  };

  const handleOpen = (id: number) => {
    navigate(`/trips/details/${id}`);
  };

  const PAGE_SIZE = 8;

  const paginatedTrips = trips.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const totalPages = Math.ceil(trips.length / PAGE_SIZE);

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <Card className="p-4 mb-3 w-full">
        <p className="text-sm font-medium text-gray-800">👋 Welcome, User</p>
      </Card>

      {/* Upload Action Card */}
      <Card className="p-4 sm:p-5 mb-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Button
            text="Upload Trip"
            variant="primary"
            onClick={() => setModalOpen(true)}
          />
          <p className="text-sm text-gray-400">
            Upload the Excel sheet of your trip
          </p>
        </div>
      </Card>

      {/* Trips List Section */}
      <div>
        {/* Section header with bulk actions */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-800">Your Trips</h2>
          {/* Desktop bulk actions — only visible when items selected */}
          {selectedIds.length > 0 && (
            <div className="hidden sm:flex items-center gap-2">
              <Button
                text="Delete"
                variant="secondary"
                size="sm"
                onClick={() => console.log("Bulk delete:", selectedIds)}
              />
              <Button
                text="Open"
                variant="open"
                size="sm"
                onClick={() => console.log("Bulk open:", selectedIds)}
              />
            </div>
          )}
        </div>

        <Card className="overflow-hidden">
          <TripList
            trips={paginatedTrips}
            selectedIds={selectedIds}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onOpen={handleOpen}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Card>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onUploadSuccess={fetchTrips}
      />
    </DashboardLayout>
  );
}
