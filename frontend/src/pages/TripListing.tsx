import { useEffect, useState } from "react";
import {TripItem } from "../components/Table";
import { Pagination } from "../components/Pagination";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card } from "../components/CardComponent";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { useNavigate } from "react-router-dom";

type Trip = {
  id:number,
  name:string,
}

type TripListProps = {
  trips:Trip[];
  selectedIds:number[],
  onToggle:(id:string) => void;
  onDelete:(id:string) => void;
  onOpen:(id:string) => void;
}

import { getAllTrips } from "../services/trip.service";


const TOTAL_PAGES = 10;

const TripList = ({ trips, selectedIds, onToggle, onDelete, onOpen }:TripListProps) => (
  <div className="w-full">
    {/* Desktop/Tablet header row */}
    <div className="hidden sm:flex items-center px-4 py-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Trips</span>
    </div>
    {/* Mobile header */}
    <div className="flex sm:hidden items-center px-3 py-2">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Trips</span>
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
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTrips = async () => {
      const data = await getAllTrips();
      setTrips(data);
    };

    fetchTrips();
  }, []);

  console.log('---',trips)

  const handleToggle = (id:string) =>
    setSelectedIds((prev:any) =>
      prev.includes(id) ? prev.filter((x:any) => x !== id) : [...prev, id]
    );

  const handleDelete = (id:string) => {
    // TODO: wire to API
    console.log("Delete trip:", id);
  };

  const handleOpen = (id: string) => {
  navigate(`/trips/details/${id}`);
};

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <Card className="p-4 mb-3 w-full">
        <p className="text-sm font-medium text-gray-800">👋 Welcome, User</p>
      </Card>

      {/* Upload Action Card */}
      <Card className="p-4 sm:p-5 mb-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Button text="Upload Trip" variant="primary" onClick={() => setModalOpen(true)} />
          <p className="text-sm text-gray-400">Upload the Excel sheet of your trip</p>
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
            trips={trips}
            selectedIds={selectedIds}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onOpen={handleOpen}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={TOTAL_PAGES}
            onPageChange={setCurrentPage}
          />
        </Card>
      </div>
       <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </DashboardLayout>
  );
}