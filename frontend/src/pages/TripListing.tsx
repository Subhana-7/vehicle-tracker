import { useEffect, useState } from "react";
import { TripItem } from "../components/Table";
import { Pagination } from "../components/Pagination";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card } from "../components/CardComponent";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { useNavigate } from "react-router-dom";

type Trip = {
  id: string;
  name: string;
};

type TripListProps = {
  trips: Trip[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onOpen: (id: number) => void;
};

import { deleteTrips, getAllTrips } from "../services/trip.service";
import { StatusModal } from "../components/StatusModal";

const TripList = ({ trips, selectedIds, onToggle, onOpen }: TripListProps) => (
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
        onOpen={onOpen}
        isFirst={idx === 0}
      />
    ))}
  </div>
);

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    message: "",
  });

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

  const handleToggle = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleOpen = (id: number) => {
    navigate(`/trips/details/${id}`);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    try {
      await deleteTrips(selectedIds);

      setTrips((prev) => prev.filter((t) => !selectedIds.includes(t.id)));
      setSelectedIds([]);

      setStatusModal({
        isOpen: true,
        type: "success",
        message: "Trips deleted successfully",
      });
    } catch (err: any) {
      setStatusModal({
        isOpen: true,
        type: "error",
        message: err.message || "Delete failed",
      });
    }
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
          <div className="hidden sm:flex items-center gap-2">
            <Button
              text="Delete"
              variant="secondary"
              size="sm"
              disabled={selectedIds.length === 0}
              onClick={handleBulkDelete}
            />
          </div>
        </div>

        <Card className="overflow-hidden">
          <TripList
            trips={paginatedTrips}
            selectedIds={selectedIds}
            onToggle={handleToggle}
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
      <StatusModal
        isOpen={statusModal.isOpen}
        type={statusModal.type}
        message={statusModal.message}
        onClose={() => setStatusModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </DashboardLayout>
  );
}
