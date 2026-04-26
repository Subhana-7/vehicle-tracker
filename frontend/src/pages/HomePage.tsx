import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { MapIllustration } from "../components/MapIllustration";
import { DashboardLayout } from "../components/DashboardLayout";
import { Modal } from "../components/Modal";
import { Card } from "../components/CardComponent";
import { Button } from "../components/Button";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <Card className="p-4 mb-4 w-full">
        <p className="text-base font-medium text-gray-800">👋 Welcome, User</p>
      </Card>

      {/* Main Upload Card */}
      <Card className="p-6 md:p-8 w-full">
        <div className="flex flex-col items-center justify-center text-center gap-6 py-4">
          {/* Map Illustration */}
          <MapIllustration />

          {/* Upload Button */}
          <Button
            text="Upload Trip"
            onClick={() => setModalOpen(true)}
            className="px-8"
          />

          {/* Helper text */}
          <p className="text-sm text-gray-500">
            Upload the{" "}
            <span className="underline text-gray-700 font-medium">Excel</span>{" "}
            sheet of your trip
          </p>

          <Button
            text="View Trip History"
            onClick={() => navigate("/trips")}
            variant="secondary"
            className="px-8"
          />
        </div>
      </Card>

      {/* Upload Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onUploadSuccess={() => navigate("/trips")}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;
